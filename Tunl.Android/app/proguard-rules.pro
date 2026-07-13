# Play Billing, Google Mobile Ads, UMP, and Kotlinx Coroutines each bundle
# their own consumer-rules.pro / proguard.txt inside their AARs, which AGP
# merges in automatically -- verified present in each pinned version's cache
# (billing-ktx:9.1.0, play-services-ads:23.6.0, user-messaging-platform:4.0.0,
# kotlinx-coroutines-core). No extra keep rules needed for them here.

# MainActivity.NativeBridge is called from JS via @JavascriptInterface;
# R8's default rules already keep any class/method carrying that annotation,
# but it's listed explicitly since a stripped bridge method would fail
# silently at the JS call site rather than at compile/lint time.
-keepclassmembers class com.theodoracatos.tunl.MainActivity$NativeBridge {
    @android.webkit.JavascriptInterface <methods>;
}
