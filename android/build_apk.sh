#!/usr/bin/env bash
# Android ilova (APK) yig'ish — Gradle'siz, faqat Android SDK va JDK bilan.
# Ishga tushirish (Git Bash):  bash android/build_apk.sh
# Natija: dist/CyberShield.apk (+ ish stoliga nusxa)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/android"
OUT="$APP/build"
SDK="${ANDROID_HOME:-$HOME/AppData/Local/Android/Sdk}"
BT="$SDK/build-tools/$(ls "$SDK/build-tools" | sort -V | tail -1)"
JAR="$SDK/platforms/android-35/android.jar"
JDK="$(cygpath "${JAVA_HOME:?JAVA_HOME kerak (JDK 17+)}")/bin"
KEY="$APP/cybershield.keystore"   # imzo kaliti — yo'qotmang, yangilanishlar shu kalit bilan imzolanadi

rm -rf "$OUT" && mkdir -p "$OUT"/{res/mipmap-xxxhdpi,res/mipmap-xxhdpi,assets/site,classes,compiled}

# 1. Sayt fayllari → assets/site
cp -r "$ROOT/03_Website/"{index.html,css,js,icons,manifest.webmanifest} "$OUT/assets/site/"

# 2. Ikonka
cp "$ROOT/03_Website/icons/icon-192.png" "$OUT/res/mipmap-xxxhdpi/ic_launcher.png"
cp "$ROOT/03_Website/icons/apple-touch-icon.png" "$OUT/res/mipmap-xxhdpi/ic_launcher.png"

# 3. Resurslar va manifest
"$BT/aapt2" compile --dir "$OUT/res" -o "$OUT/compiled/res.zip"
"$BT/aapt2" link -I "$JAR" --manifest "$APP/AndroidManifest.xml" -A "$OUT/assets" \
  -o "$OUT/unsigned.apk" "$OUT/compiled/res.zip"

# 4. Java → dex
"$JDK/javac" -source 11 -target 11 -nowarn -classpath "$JAR" -d "$OUT/classes" $(find "$APP/src" -name "*.java") 2>&1 | grep -v "^warning\|^Note\|^1 warning" || true
"$BT/d8.bat" --release --min-api 24 --lib "$JAR" --output "$OUT" $(find "$OUT/classes" -name "*.class")
(cd "$OUT" && python -c "import zipfile; z=zipfile.ZipFile('unsigned.apk','a'); z.write('classes.dex'); z.close()")

# 5. Imzolash
if [ ! -f "$KEY" ]; then
  "$JDK/keytool" -genkeypair -keystore "$KEY" -alias cybershield -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass cybershield -keypass cybershield -dname "CN=CyberShield, O=Nozima, C=UZ" >/dev/null 2>&1
fi
"$BT/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"
mkdir -p "$ROOT/dist"
"$BT/apksigner.bat" sign --ks "$KEY" --ks-pass pass:cybershield --key-pass pass:cybershield \
  --out "$ROOT/dist/CyberShield.apk" "$OUT/aligned.apk"
"$BT/apksigner.bat" verify "$ROOT/dist/CyberShield.apk"

ls -la "$ROOT/dist/CyberShield.apk"
if [ -d "$HOME/Desktop" ]; then cp "$ROOT/dist/CyberShield.apk" "$HOME/Desktop/" && echo "Ish stoliga nusxalandi"; fi
