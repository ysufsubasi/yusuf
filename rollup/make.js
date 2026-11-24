const fs=require('fs');
const icons={
 su:'<path d="M0,-55 C25,-20 40,0 40,20 A40,40 0 0 1 -40,20 C-40,0 -25,-20 0,-55Z" fill="none" stroke="#0B2A5B" stroke-width="6" stroke-linejoin="round"/>',
 egitim:'<path d="M-60,-35 L-60,35 Q-30,25 0,40 Q30,25 60,35 L60,-35 Q30,-45 0,-30 Q-30,-45 -60,-35Z M0,-30 L0,40" fill="none" stroke="#0B2A5B" stroke-width="6" stroke-linejoin="round"/>',
 saglik:'<path d="M0,45 C-70,0 -60,-50 -25,-50 C-10,-50 0,-38 0,-30 C0,-38 10,-50 25,-50 C60,-50 70,0 0,45Z" fill="none" stroke="#0B2A5B" stroke-width="6"/><path d="M-50,0 L-20,0 L-10,-20 L5,20 L15,0 L50,0" fill="none" stroke="#0B2A5B" stroke-width="6" stroke-linejoin="round"/>'
};
function rollup(id,title,l1,l2,c1,c2){return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 2000" width="425" height="1000">
<defs>
 <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F5FAF"/><stop offset=".35" stop-color="#CFE7FA"/><stop offset=".55" stop-color="#EAF5FD"/><stop offset="1" stop-color="#EAF5FD"/></linearGradient>
 <radialGradient id="glow${id}" cx=".5" cy=".18" r=".55"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
 <linearGradient id="gold${id}" x1="0" x2="1"><stop offset="0" stop-color="#D9A93A" stop-opacity="0"/><stop offset=".3" stop-color="#B8862A"/><stop offset=".6" stop-color="#F5D67A"/><stop offset="1" stop-color="#D9A93A" stop-opacity="0"/></linearGradient>
 <linearGradient id="ph${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
 <pattern id="dots${id}" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2.2" fill="#5E8FD0" opacity=".35"/></pattern>
</defs>
<rect width="850" height="2000" fill="url(#bg${id})"/>
<g opacity=".35">${Array.from({length:18},(_,i)=>`<path d="M425,350 L${-200+i*70},-50 L${-170+i*70},-50Z" fill="#fff"/>`).join('')}</g>
<rect width="850" height="900" fill="url(#glow${id})"/>
<g transform="translate(425,260) scale(1.6)">${icons[id]}</g>
<text x="425" y="${l2?520:560}" text-anchor="middle" font-family="Nunito,Poppins,Arial" font-weight="900" font-size="120" fill="#0B2A5B">${title}</text>
<path d="M250,620 Q425,585 600,620" stroke="url(#gold${id})" stroke-width="8" fill="none"/>
<text x="425" y="710" text-anchor="middle" font-family="Poppins,Arial" font-weight="600" font-size="62" fill="#0B2A5B">${l1}</text>
<text x="425" y="790" text-anchor="middle" font-family="Poppins,Arial" font-weight="600" font-size="62" fill="#0B2A5B">${l2||''}</text>
<path d="M270,850 Q425,820 580,850" stroke="url(#gold${id})" stroke-width="6" fill="none"/>
<rect y="880" width="850" height="800" fill="url(#ph${id})"/>
<text x="425" y="1300" text-anchor="middle" font-family="Arial" font-size="40" fill="#fff" opacity=".85">[ FOTOĞRAF ALANI ]</text>
<text x="425" y="1350" text-anchor="middle" font-family="Arial" font-size="28" fill="#fff" opacity=".7">üst kenarı maskeyle eritilecek</text>
<path d="M0,1600 Q300,1520 850,1540 L850,2000 L0,2000Z" fill="#F5D67A"/>
<path d="M0,1615 Q300,1535 850,1565 L850,2000 L0,2000Z" fill="#B8862A"/>
<path d="M0,1630 Q300,1555 850,1585 L850,2000 L0,2000Z" fill="#0B2A5B"/>
<path d="M0,1630 Q300,1555 850,1585 L850,2000 L0,2000Z" fill="url(#dots${id})"/>
<circle cx="425" cy="1720" r="45" fill="none" stroke="#fff" stroke-width="5"/>
<text x="425" y="1840" text-anchor="middle" font-family="Georgia,serif" font-size="62" fill="#fff" letter-spacing="4">LOGO</text>
<line x1="0" y1="1900" x2="850" y2="1900" stroke="#ff4d4d" stroke-width="3" stroke-dasharray="14 10"/>
<text x="425" y="1950" text-anchor="middle" font-family="Arial" font-size="26" fill="#ff8080">kaset bölgesi: önemli öğe koyma</text>
</svg>`;}
const html=`<html><head><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&family=Poppins:wght@600&display=swap" rel="stylesheet"></head>
<body style="margin:0;background:#e9e9e9;display:flex;gap:24px;padding:24px">
${rollup('su','Su Kuyusu','Bir damla,','bir gelecek.','#7a6a4f','#3d2f1c').replace('y="520"','y="520"')}
${rollup('egitim','Eğitim','Gelecek','ilimle başlar.','#6b7c8f','#2f3b4a')}
${rollup('saglik','Sağlık','Bir dokunuş,','bir umut.','#5f8a9a','#24424f')}
</body></html>`;
fs.writeFileSync('ornek.html',html);
