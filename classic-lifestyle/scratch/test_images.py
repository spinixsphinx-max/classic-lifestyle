import urllib.request

urls = [
    "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1600&q=90&fit=crop",
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=85&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76538823b5e?w=900&q=85&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=85&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=85&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&fit=crop",
]

req_headers = {'User-Agent': 'Mozilla/5.0'}

for idx, url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as resp:
            print(f"[{idx}] {resp.status} OK: {url[:60]}...")
    except Exception as e:
        print(f"[{idx}] FAILED ({e}): {url}")
