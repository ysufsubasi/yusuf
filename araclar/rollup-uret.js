// Roll-up serisi üretici.
// Kullanım: node araclar/rollup-uret.js proje/ornek
// proje.json'u okur; her afiş için cikti/ klasörüne SVG, PNG önizleme ve CMYK baskı PDF'i üretir.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const DottedMap = require('dotted-map').default;

const dir = path.resolve(process.argv[2] || 'proje/ornek');
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'proje.json'), 'utf8'));
const out = path.join(dir, 'cikti'); fs.mkdirSync(out, { recursive: true });
const R = Object.assign({ lacivert: '#0B2A5B', mavi: '#1F5FAF', acikMavi: '#CFE7FA', zemin: '#EAF5FD',
  altinKoyu: '#B8862A', altinAcik: '#F5D67A', harita: '#5E8FD0' }, cfg.renkler || {});
const Wmm = cfg.olcu?.genislik_mm || 850, Hmm = cfg.olcu?.yukseklik_mm || 2000;
const W = 850, H = Math.round(850 * Hmm / Wmm), mm = 850 / Wmm;      // tasarım birimi: 850 genişlik
const KASET = (cfg.olcu?.kaset_mm ?? 100) * mm;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const mime = f => ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' })[path.extname(f).toLowerCase()];
const dataUri = f => `data:${mime(f)};base64,${fs.readFileSync(f).toString('base64')}`;
const dosya = f => f && (path.isAbsolute(f) ? f : path.join(dir, f));

function ikon(ad) {
  for (const p of [`node_modules/@tabler/icons/icons/outline/${ad}.svg`, `node_modules/lucide-static/icons/${ad}.svg`]) {
    const f = path.join(__dirname, '..', p);
    if (fs.existsSync(f)) return fs.readFileSync(f, 'utf8').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<path stroke="none"[^>]*\/>/, '');
  }
  if (fs.existsSync(dosya(ad))) return null; // kendi ikon dosyası
  throw new Error(`İkon bulunamadı: ${ad} (node_modules/@tabler/icons/icons/outline içinde ara)`);
}

const map = new DottedMap({ height: 60, grid: 'diagonal' });
const mapSvg = map.getSVG({ radius: 0.22, color: R.harita, shape: 'circle', backgroundColor: 'transparent' });
const mapVB = mapSvg.match(/viewBox="([^"]+)"/)[1], mapInner = mapSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

function afis(a, kilavuz) {
  const id = a.dosya_adi;
  const baslik = [].concat(a.baslik), slogan = [].concat(a.slogan || []);
  const bFont = baslik.length > 1 ? 105 : 120, bTop = 470;
  const bY = baslik.map((_, i) => bTop + i * bFont * 0.95);
  const kavis1 = bY[bY.length - 1] + 70, sTop = kavis1 + 95;
  const sY = slogan.map((_, i) => sTop + i * 78), kavis2 = (sY[sY.length - 1] || sTop) + 60;
  const fotoTop = kavis2 + 20, dalga = H - 400;
  const ik = ikon(a.ikon);
  const ikonSvg = ik !== null
    ? `<g transform="translate(${W/2 - 105},140) scale(8.75)" fill="none" stroke="${R.lacivert}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ik}</g>`
    : `<image href="${dataUri(dosya(a.ikon))}" x="${W/2-105}" y="140" width="210" height="210"/>`;
  const foto = a.foto && fs.existsSync(dosya(a.foto))
    ? `<image href="${dataUri(dosya(a.foto))}" x="0" y="${fotoTop}" width="${W}" height="${dalga + 120 - fotoTop}" preserveAspectRatio="xMidYMid slice" mask="url(#fm${id})"/>`
    : `<rect x="0" y="${fotoTop}" width="${W}" height="${dalga + 120 - fotoTop}" fill="#8a9bb0" mask="url(#fm${id})"/>
       <text x="${W/2}" y="${(fotoTop + dalga) / 2 + 60}" text-anchor="middle" font-family="Poppins" font-size="40" fill="#fff">[ FOTOĞRAF: ${esc(a.foto || 'yok')} ]</text>`;
  const logoF = dosya(cfg.logo);
  const logo = logoF && fs.existsSync(logoF)
    ? `<image href="${dataUri(logoF)}" x="${W/2-170}" y="${H - KASET - 300}" width="340" height="240" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${W/2}" y="${H - KASET - 130}" text-anchor="middle" font-family="Playfair Display" font-size="70" fill="#fff" letter-spacing="4">LOGO</text>`;
  const ray = Array.from({ length: 18 }, (_, i) => `<path d="M${W/2},350 L${-200 + i*70},-50 L${-170 + i*70},-50Z" fill="#fff"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${Wmm}mm" height="${Hmm}mm">
<defs>
 <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${R.mavi}"/><stop offset="${300/H}" stop-color="${R.acikMavi}"/><stop offset="${800/H}" stop-color="${R.zemin}"/><stop offset="1" stop-color="${R.zemin}"/></linearGradient>
 <radialGradient id="gl${id}" cx=".5" cy=".18" r=".55"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
 <linearGradient id="au${id}" x1="0" x2="1"><stop offset="0" stop-color="${R.altinKoyu}" stop-opacity="0"/><stop offset=".3" stop-color="${R.altinKoyu}"/><stop offset=".6" stop-color="${R.altinAcik}"/><stop offset="1" stop-color="${R.altinKoyu}" stop-opacity="0"/></linearGradient>
 <linearGradient id="fg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff"/></linearGradient>
 <mask id="fm${id}" maskUnits="userSpaceOnUse" x="0" y="${fotoTop}" width="${W}" height="${H}"><rect x="0" y="${fotoTop}" width="${W}" height="${dalga + 120 - fotoTop}" fill="url(#fg${id})"/></mask>
 <clipPath id="wc${id}"><path d="M0,${dalga+30} Q300,${dalga-45} ${W},${dalga-15} L${W},${H} L0,${H}Z"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg${id})"/>
<g opacity=".35">${ray}</g>
<rect width="${W}" height="900" fill="url(#gl${id})"/>
${ikonSvg}
${baslik.map((t, i) => `<text x="${W/2}" y="${bY[i]}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="${bFont}" fill="${R.lacivert}">${esc(t)}</text>`).join('\n')}
<path d="M250,${kavis1} Q425,${kavis1-35} 600,${kavis1}" stroke="url(#au${id})" stroke-width="8" fill="none"/>
${slogan.map((t, i) => `<text x="${W/2}" y="${sY[i]}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="62" fill="${R.lacivert}">${esc(t)}</text>`).join('\n')}
${slogan.length ? `<path d="M270,${kavis2} Q425,${kavis2-30} 580,${kavis2}" stroke="url(#au${id})" stroke-width="6" fill="none"/>` : ''}
${foto}
<path d="M0,${dalga} Q300,${dalga-80} ${W},${dalga-60} L${W},${H} L0,${H}Z" fill="${R.altinAcik}"/>
<path d="M0,${dalga+15} Q300,${dalga-65} ${W},${dalga-35} L${W},${H} L0,${H}Z" fill="${R.altinKoyu}"/>
<path d="M0,${dalga+30} Q300,${dalga-45} ${W},${dalga-15} L${W},${H} L0,${H}Z" fill="${R.lacivert}"/>
<g clip-path="url(#wc${id})" opacity=".55"><svg x="-60" y="${dalga-20}" width="${W+120}" height="${H-dalga}" viewBox="${mapVB}" preserveAspectRatio="xMidYMid slice">${mapInner}</svg></g>
${logo}
${kilavuz ? `<line x1="0" y1="${H-KASET}" x2="${W}" y2="${H-KASET}" stroke="#ff4d4d" stroke-width="3" stroke-dasharray="14 10"/>
<text x="${W/2}" y="${H-KASET+50}" text-anchor="middle" font-family="Poppins" font-size="26" fill="#ff8080">kaset bölgesi (${KASET/mm} mm)</text>` : ''}
</svg>`;
}

const onizlemeler = [];
for (const a of cfg.afisler) {
  const svg = path.join(out, `${a.dosya_adi}.svg`), png = path.join(out, `${a.dosya_adi}-onizleme.png`);
  fs.writeFileSync(svg, afis(a, false));
  const tmp = path.join(out, `.${a.dosya_adi}-k.svg`); fs.writeFileSync(tmp, afis(a, true));
  execFileSync('rsvg-convert', ['-w', '600', '-o', png, tmp]); fs.unlinkSync(tmp);
  onizlemeler.push(png);
  if (!process.argv.includes('--hizli')) execFileSync(path.join(__dirname, 'baski-pdf.sh'), [svg, Wmm, Hmm], { stdio: 'ignore' });
  console.log('✓', a.dosya_adi);
}
execFileSync('convert', [...onizlemeler, '-bordercolor', '#e5e5e5', '-border', '20', '+append', path.join(out, 'SERI-ONIZLEME.png')]);
console.log('Bitti →', out);
