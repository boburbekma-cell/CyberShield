package uz.cybershield.girls;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

// Saytni (assets/site) ilova ichida ochadi — internet kerak emas.
public class MainActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.parseColor("#05070c"));
        getWindow().setNavigationBarColor(Color.parseColor("#05070c"));

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#05070c"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true); // progress localStorage'da saqlanadi
        s.setAllowFileAccess(true);
        web.addJavascriptInterface(new Bridge(), "AndroidApp");

        // Ichki sahifalar ilovada, tashqi havolalar brauzerda ochiladi
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri uri = req.getUrl();
                if ("file".equals(uri.getScheme())) return false;
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
                return true;
            }
        });

        setContentView(web);
        if (state != null) web.restoreState(state);
        else web.loadUrl("file:///android_asset/site/index.html");
    }

    // Natijalar sahifasidagi CSV'ni Telegram, email va h.k. orqali yuborish
    class Bridge {
        @JavascriptInterface
        public void share(String text, String title) {
            Intent i = new Intent(Intent.ACTION_SEND);
            i.setType("text/plain");
            i.putExtra(Intent.EXTRA_SUBJECT, title);
            i.putExtra(Intent.EXTRA_TEXT, text);
            startActivity(Intent.createChooser(i, title));
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
