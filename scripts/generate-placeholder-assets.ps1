# Generates editorial-style placeholder JPG/PNG files for local preview and deploy.
# Replace with real photography per docs/image-shot-list.md when ready.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$repoRoot = Split-Path $PSScriptRoot -Parent
$assetsDir = Join-Path $repoRoot 'assets'

$files = @(
  @{ Name = 'rita-hero.jpg'; W = 1600; H = 2000; A = [Drawing.Color]::FromArgb(45, 35, 28); B = [Drawing.Color]::FromArgb(120, 95, 62) },
  @{ Name = 'rita-01.jpg'; W = 1200; H = 1500; A = [Drawing.Color]::FromArgb(50, 38, 30); B = [Drawing.Color]::FromArgb(140, 110, 75) },
  @{ Name = 'rita-02.jpg'; W = 1200; H = 1500; A = [Drawing.Color]::FromArgb(42, 32, 26); B = [Drawing.Color]::FromArgb(110, 88, 58) },
  @{ Name = 'rita-03.jpg'; W = 1200; H = 1500; A = [Drawing.Color]::FromArgb(38, 30, 24); B = [Drawing.Color]::FromArgb(95, 78, 52) },
  @{ Name = 'rita-04.jpg'; W = 1200; H = 1500; A = [Drawing.Color]::FromArgb(48, 36, 28); B = [Drawing.Color]::FromArgb(125, 100, 68) },
  @{ Name = 'rita-05.jpg'; W = 1200; H = 1500; A = [Drawing.Color]::FromArgb(40, 32, 26); B = [Drawing.Color]::FromArgb(105, 85, 55) },
  @{ Name = 'portfolio-food-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(55, 40, 28); B = [Drawing.Color]::FromArgb(150, 105, 65) },
  @{ Name = 'portfolio-food-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(50, 38, 26); B = [Drawing.Color]::FromArgb(135, 98, 60) },
  @{ Name = 'portfolio-drinks-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(35, 28, 24); B = [Drawing.Color]::FromArgb(90, 70, 48) },
  @{ Name = 'portfolio-drinks-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(32, 26, 22); B = [Drawing.Color]::FromArgb(85, 65, 45) },
  @{ Name = 'portfolio-interior-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(30, 24, 20); B = [Drawing.Color]::FromArgb(75, 60, 42) },
  @{ Name = 'portfolio-interior-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(28, 22, 18); B = [Drawing.Color]::FromArgb(70, 55, 38) },
  @{ Name = 'portfolio-people-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(42, 34, 28); B = [Drawing.Color]::FromArgb(115, 92, 62) },
  @{ Name = 'portfolio-people-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(40, 32, 26); B = [Drawing.Color]::FromArgb(108, 88, 58) },
  @{ Name = 'portfolio-detail-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(38, 30, 24); B = [Drawing.Color]::FromArgb(100, 82, 55) },
  @{ Name = 'portfolio-detail-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(36, 28, 22); B = [Drawing.Color]::FromArgb(95, 78, 52) },
  @{ Name = 'portfolio-beauty-01.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(48, 38, 36); B = [Drawing.Color]::FromArgb(130, 105, 95) },
  @{ Name = 'portfolio-beauty-02.jpg'; W = 1000; H = 1250; A = [Drawing.Color]::FromArgb(44, 36, 34); B = [Drawing.Color]::FromArgb(120, 98, 88) },
  @{ Name = 'og-cover.jpg'; W = 1200; H = 630; A = [Drawing.Color]::FromArgb(20, 16, 12); B = [Drawing.Color]::FromArgb(100, 82, 55) }
)

function Save-GradientJpeg($path, $w, $h, $colorA, $colorB) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.Rectangle 0, 0, $w, $h),
    $colorA,
    $colorB,
    135
  )
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
}

function Save-Favicon($path) {
  $bmp = New-Object System.Drawing.Bitmap 32, 32
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([Drawing.Color]::FromArgb(20, 16, 12))
  $brush = New-Object System.Drawing.SolidBrush ([Drawing.Color]::FromArgb(200, 169, 106))
  $g.FillEllipse($brush, 4, 4, 24, 24)
  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null

foreach ($f in $files) {
  $out = Join-Path $assetsDir $f.Name
  Save-GradientJpeg $out $f.W $f.H $f.A $f.B
  Write-Host "Wrote $out"
}

Save-Favicon (Join-Path $assetsDir 'favicon.png')
Copy-Item (Join-Path $assetsDir 'favicon.png') (Join-Path $assetsDir 'apple-touch-icon.png') -Force
Write-Host 'Wrote favicon.png and apple-touch-icon.png'
Write-Host "Done. Replace placeholders with real images per docs/image-shot-list.md"
