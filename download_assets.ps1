$images = @{
    "velvet-plum.jpg" = "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"
    "golden-peach.jpg" = "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80"
    "pear-bliss.jpg" = "https://images.unsplash.com/photo-1596799003551-ce039758782a?auto=format&fit=crop&w=600&q=80"
    "midnight-plum.jpg" = "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80"
    "chocolate-crunch.jpg" = "https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&w=600&q=80"
    "cookies-supreme.jpg" = "https://images.unsplash.com/photo-1553177595-4de6bb080e59?auto=format&fit=crop&w=600&q=80"
    "mango-velvet.jpg" = "https://images.unsplash.com/photo-1546890975-7596e98cd928?auto=format&fit=crop&w=600&q=80"
    "royal-date.jpg" = "https://images.unsplash.com/photo-1589134707255-6b5d92d53c39?auto=format&fit=crop&w=600&q=80"
    "bloom-latte.jpg" = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    "vanilla-dream.jpg" = "https://images.unsplash.com/photo-1461023058943-0708e52235eb?auto=format&fit=crop&w=600&q=80"
    "mocha-frost.jpg" = "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80"
    "butterscotch.jpg" = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80"
    "hazelnut-heaven.jpg" = "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80"
    "caramel-crush.jpg" = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80"
}

New-Item -ItemType Directory -Force -Path "public\assets\drinks"

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $path = "public\assets\drinks\$name"
    Write-Host "Downloading $name..."
    Invoke-WebRequest -Uri $url -OutFile $path
}

Write-Host "All downloads complete!"
