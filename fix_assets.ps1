$images = @{
    "chocolate-crunch.jpg" = "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80"
    "pear-bliss.jpg" = "https://images.unsplash.com/photo-1622597467836-f38240662c8b?auto=format&fit=crop&w=600&q=80"
    "mango-velvet.jpg" = "https://images.unsplash.com/photo-1623065422900-058f9188e914?auto=format&fit=crop&w=600&q=80"
    "cookies-supreme.jpg" = "https://images.unsplash.com/photo-1550505095-81378a675071?auto=format&fit=crop&w=600&q=80"
    "vanilla-dream.jpg" = "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80"
}

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $path = "public\assets\drinks\$name"
    Write-Host "Downloading $name..."
    Invoke-WebRequest -Uri $url -OutFile $path
}

Copy-Item -Path "C:\Users\abdul\.gemini\antigravity\brain\b9a2fbee-e1ae-4cd4-8df0-1b2af761d170\royal_date_1790276980324.png" -Destination "public\assets\drinks\royal-date.jpg" -Force

Write-Host "Fixed downloads complete!"
