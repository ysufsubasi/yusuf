// Noktalı dünya haritası SVG üretir: node araclar/noktali-harita.js [renk] [cikti.svg]
const DottedMap = require('dotted-map').default;
const fs = require('fs');
const renk = process.argv[2] || '#5E8FD0', out = process.argv[3] || 'noktali-harita.svg';
const map = new DottedMap({ height: 60, grid: 'diagonal' });
fs.writeFileSync(out, map.getSVG({ radius: 0.22, color: renk, shape: 'circle', backgroundColor: 'transparent' }));
console.log('yazıldı:', out);
