$drinks = @{
    "bloom-latte.jpg" = "A premium iced Lotus Biscoff latte in a tall glass with ice cubes, dark aesthetic background with subtle pink neon glow, ultra realistic food photography, high quality, 4k"
    "vanilla-dream.jpg" = "A premium smooth vanilla iced latte in a tall glass with ice cubes, dark aesthetic background with subtle pink neon glow, ultra realistic food photography, high quality, 4k"
    "butterscotch.jpg" = "A premium iced butterscotch and caramel coffee in a tall glass with ice cubes, dark aesthetic background with subtle pink neon glow, ultra realistic food photography, high quality, 4k"
    "hazelnut-heaven.jpg" = "A premium hazelnut iced coffee in a tall glass with ice cubes, dark aesthetic background with subtle pink neon glow, ultra realistic food photography, high quality, 4k"
    "caramel-crush.jpg" = "A premium iced caramel macchiato coffee in a tall glass with ice cubes and caramel drizzle, dark aesthetic background with subtle pink neon glow, ultra realistic food photography, high quality, 4k"
}

foreach ($name in $drinks.Keys) {
    $prompt = $drinks[$name]
    $url = "https://image.pollinations.ai/prompt/" + [uri]::EscapeDataString($prompt) + "?width=600&height=600&nologo=true"
    $path = "public\assets\drinks\$name"
    Write-Host "Generating $name..."
    Invoke-WebRequest -Uri $url -OutFile $path
    Write-Host "Successfully generated $name"
}

Write-Host "All cold coffees generated successfully!"
