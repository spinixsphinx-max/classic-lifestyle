$urls = @(
    'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800',
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
)

foreach ($url in $urls) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.Method = "HEAD"
        $req.UserAgent = "Mozilla/5.0"
        $res = $req.GetResponse()
        Write-Host "OK: $url -> $($res.StatusCode)"
        $res.Close()
    } catch {
        Write-Host "FAIL: $url -> $($_.Exception.Message)"
    }
}
