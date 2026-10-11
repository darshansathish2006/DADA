"""Download only the Latin font files used by the design; no runtime CDN needed."""
from pathlib import Path
from urllib.request import Request, urlopen
import re

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'assets' / 'fonts'
ROOT.mkdir(parents=True, exist_ok=True)
URL = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400..750&family=Space+Mono:wght@400;700&display=swap'
request = Request(URL, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'})
css = urlopen(request, timeout=30).read().decode()
blocks = re.findall(r'/\* latin \*/\s*(@font-face\s*\{.*?\})', css, re.S)
if not blocks:
    blocks = re.findall(r'@font-face\s*\{.*?\}', css, re.S)
if not blocks:
    raise RuntimeError('No font declarations found; no files changed.')
output = []
for index, block in enumerate(blocks):
    remote = re.search(r'url\((https://[^)]+)\)', block).group(1)
    filename = f'dada-font-{index}.{remote.rsplit(".", 1)[1]}'
    (ROOT / filename).write_bytes(urlopen(remote, timeout=30).read())
    output.append(block.replace(remote, './' + filename))
(ROOT / 'fonts.css').write_text('\n\n'.join(output) + '\n', encoding='utf-8')
print(f'Downloaded {len(blocks)} Latin font files.')
for family in ('barlowcondensed', 'dmsans', 'spacemono'):
    license_url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    (ROOT / f'{family}-LICENSE.txt').write_bytes(urlopen(license_url, timeout=30).read())
