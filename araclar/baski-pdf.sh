#!/usr/bin/env bash
# SVG -> baskıya hazır CMYK PDF (gerçek ölçüde, yazılar eğriye çevrilmiş).
# Kullanım: araclar/baski-pdf.sh tasarim.svg [genislik_mm=850] [yukseklik_mm=2000]
set -e
in="$1"; w="${2:-850}"; h="${3:-2000}"; base="${in%.*}"; tmp="$(mktemp --suffix=.svg)"
# kök <svg> etiketinin width/height değerlerini gerçek mm ölçüsüne ayarla
python3 - "$in" "$tmp" "$w" "$h" <<'PY'
import re,sys
s=open(sys.argv[1],encoding='utf8').read()
def fix(m):
    t=re.sub(r'\s(width|height)="[^"]*"','',m.group(0))
    return t[:-1]+f' width="{sys.argv[3]}mm" height="{sys.argv[4]}mm">'
open(sys.argv[2],'w',encoding='utf8').write(re.sub(r'<svg\b[^>]*>',fix,s,count=1))
PY
inkscape "$tmp" --export-type=pdf --export-text-to-path --export-filename="$base-rgb.pdf"
gs -q -dBATCH -dNOPAUSE -dSAFER -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress \
   -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK \
   -sOutputFile="$base-CMYK.pdf" "$base-rgb.pdf"
rm -f "$base-rgb.pdf" "$tmp"; echo "hazır: $base-CMYK.pdf (${w}x${h} mm)"
