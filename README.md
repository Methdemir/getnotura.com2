# Notura

Bağımsız Notura web sitesi: https://getnotura.com

Kaynak: Methdemir/getnotura.com, 0967f7205517beaff977f791b87ef11e44b5dfb3 (12 Kasım 2026). Mevcut Notura tasarımı, metinleri, yedi dili ve hukuki belgeleri korunur.

## Geliştirme

- `npm ci`
- `npm run validate` (çeviriler, rotalar, Astro check, build, çıktı denetimi)
- `npm run build`

Cloudflare Pages: production branch `main`, build `npm run build`, output `dist`, Node sürümü `.nvmrc`. GitHub Actions yalnız doğrular; GitHub Pages dağıtımı yapmaz.

## Yayın durumu

`src/config/site-release.ts` içindeki `siteReleaseStatus = "preview"` tüm Notura sayfalarında `noindex,follow` üretir. Hazır olduğunda bu tek değeri `"public"` yapın. Gizlilik ve kullanım koşulları önizlemede de doğrudan URL ile herkese açıktır. Robots taramaya izin verir.

Rotalar `src/i18n/locales.json`, `routes.json` ve `routes.ts` üzerinden üretilir. Yedi yayımlanmış dil × altı sayfa ve nötr İngilizce kök: 43 canonical URL.

## Eski adres uyumluluğu

Build, yayımlanmış dil/rota yapılandırmasından `public/_redirects` üretir. Eski `/notura/` URL’leri aynı domaindeki öneksiz Notura sayfasına; 20 eski stüdyo ürün/hukuk adresi `sarperstudios.com` üzerindeki aynı adrese HTTP 301 ile gider. Eğik çizgili ve çizgisiz yollar kapsanır. `app-ads.txt` eski kaynaktan birebir korunur.

`/takip/` ve alt dosya yolları `sarperstudios.com/takip/` karşılıklarına yönlenir. Eski PWA service worker’ı network-only olduğundan gezinmeler yeni domaine yönlenebilir; service worker scriptinin alan adı değiştiren yönlendirmesi tarayıcı tarafından kabul edilmez. Yeni domainde PWA’yı yeniden kurmak gerekebilir. Eski takip kabuğu doğrudan bir getnotura API’si çağırmıyor; pano `https://sarper-takip.docilebass13.chatgpt.site` iframe’inde çalışıyor.
