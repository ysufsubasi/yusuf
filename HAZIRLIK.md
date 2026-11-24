# Roll-up işi: hazırlık listesi

## 1. Senin bilgisayarına kurulacaklar (evde)

- [ ] **Photoshop**: Lisans yoksa öğrenirken **photopea.com** kullan (ücretsiz, tarayıcıda çalışıyor, PSD açıyor).
- [ ] **Upscayl** (upscayl.org, GitHub: upscayl/upscayl): Küçük fotoğrafları yapay zekâ ile büyütür. Roll-up için şart.
- [ ] **Fontlar** (fonts.google.com'dan indir, çift tıkla, "Yükle"): Poppins, Nunito, Montserrat, Playfair Display.
- [ ] **Inkscape** (isteğe bağlı, inkscape.org): Gönderdiğim SVG dosyalarını açıp düzenlemek için.
- [ ] Photoshop eğitimi: YouTube'da sırasıyla şunları izle:
  1. "Photoshop katmanlar dersi"
  2. "Photoshop layer mask"
  3. "Photoshop gradient tool"
  4. "Photoshop pen tool dersi"
  5. "Photoshop generative fill"
  6. "Photoshop CMYK PDF kaydetme"

## 2. Müşteriden alınacaklar (bana gönder)

- [ ] **Logo**: Tercihen **SVG, AI, EPS veya PDF** (vektör). Yoksa en az 2000 px genişliğinde, **arka planı şeffaf PNG**.
- [ ] **Kurumsal renkler**: Renk kodları (HEX veya CMYK) varsa iste. Yoksa ben logodan çıkarırım.
- [ ] **Kaç roll-up, hangi konular**: Örneğin Gazze, Su Kuyusu, Sağlık...
- [ ] **Her afiş için başlık ve slogan**: Yoksa ben yazarım, onaya sunarız.
- [ ] **Fotoğraflar**: Her afiş için **orijinal dosya** iste.
  - WhatsApp'tan gelen fotoğraflar sıkıştırılmış olur, işe yaramaz. "Belge olarak gönder" demelerini iste veya Google Drive linki al.
  - En az 3000 px uzun kenar olsun. Değilse Upscayl ile büyütürüz.
  - Dikey veya kare fotoğraf daha iyi; insan yüzü ortada olsun.
- [ ] **Ölçü**: 85×200 mi, 100×200 mü, 80×200 mü? **Matbaaya sor.**
- [ ] **Matbaanın şartları**: Taşma payı kaç mm? Kaset (alt) bölgesi kaç cm? Dosya formatı PDF mi?
- [ ] **İletişim bilgisi**: Web sitesi, telefon, QR kod, IBAN olacak mı?
- [ ] **Teslim tarihi**

## 3. Bana gerekenler (işe başlarken)

Yeni oturumu **"yusuf" ortamında** aç, araçlar otomatik kurulsun. Sonra şunları yükle:
1. Logo dosyası
2. Fotoğraflar (her afiş için, dosya adıyla: gazze.jpg, su.jpg…)
3. Ölçü, başlık ve sloganlar (yazıyla mesaj olarak yeterli)
4. Beğendikleri bir örnek varsa onun görseli

## 4. Hazır sistem (benim tarafım, kuruldu ✓)

```
proje/<musteri>/proje.json   ← ölçü, renk, logo, her afişin ikon/başlık/slogan/fotoğrafı
proje/<musteri>/foto/        ← fotoğraflar
proje/<musteri>/logo.png
node araclar/rollup-uret.js proje/<musteri>
  → cikti/XX.svg              (Inkscape/Illustrator'da düzenlenebilir)
  → cikti/XX-CMYK.pdf         (matbaaya gidecek, gerçek ölçüde, yazılar eğri)
  → cikti/SERI-ONIZLEME.png   (müşteriye onay için)
```

İkon isimleri: `ls node_modules/@tabler/icons/icons/outline` (örn. droplet, tent, heartbeat, book, users-group, school, home-heart)

## 5. İş akışı

1. Müşteriden malzemeleri topla (Bölüm 2).
2. Ben `proje.json`'u doldurur, ilk taslakları üretirim.
3. Önizlemeyi müşteriye onaya gönder. Düzeltmeleri bana ilet.
4. Fotoğraf rötuşu, renk ayarı veya ince işler gerekirse sen Photoshop'ta SVG/PNG üzerinden yaparsın.
5. CMYK PDF'leri matbaaya gönder. Mümkünse önce **1 tane deneme baskı** iste, renkleri kontrol et.
