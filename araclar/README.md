# Tasarım araçları (roll-up / baskı işleri)

Bu ortamda kurulu olanlar ve ne işe yaradıkları:

| Araç | Kaynak (GitHub) | Ne için |
|---|---|---|
| Inkscape | inkscape/inkscape | SVG → PDF, yazıları eğriye çevirme |
| Ghostscript | ArtifexSoftware/ghostpdl | PDF'i CMYK'ya çevirme (matbaa) |
| ImageMagick | ImageMagick/ImageMagick | Fotoğraf boyutlandırma, format dönüştürme |
| rembg | danielgatis/rembg | Fotoğraftan arka planı otomatik silme |
| Tabler Icons | tabler/tabler-icons | 5000+ çizgi ikon (SVG) |
| Lucide | lucide-icons/lucide | 1500+ çizgi ikon (SVG) |
| dotted-map | NTag/dotted-map | Noktalı dünya haritası (alt dalga için) |
| Fontlar | google/fonts | Poppins, Nunito, Montserrat, Playfair Display, Baloo 2 |

## Komutlar

```bash
# Baskıya hazır CMYK PDF (85x200 cm roll-up)
araclar/baski-pdf.sh tasarim.svg 850 2000

# Noktalı dünya haritası
node araclar/noktali-harita.js '#5E8FD0' harita.svg

# Fotoğraf arka planını sil
rembg i foto.jpg foto-seffaf.png

# İkon bul
ls node_modules/@tabler/icons/icons/outline | grep -i heart
ls node_modules/lucide-static/icons | grep -i droplet
```

## Senin bilgisayarın için (GitHub'daki ücretsiz uygulamalar)

- **Upscayl** (upscayl/upscayl): Yapay zekâ ile fotoğraf büyütme. Roll-up için küçük fotoğrafları büyütürken şart.
- **Inkscape** (inkscape.org): Ücretsiz Illustrator alternatifi. Logo, ikon ve dalgalar için.
- **GIMP / Krita**: Ücretsiz Photoshop alternatifleri.
- **Photopea** (photopea.com, açık kaynak değil): Tarayıcıda çalışan Photoshop benzeri, PSD açar.
