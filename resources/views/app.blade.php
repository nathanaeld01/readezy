<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" <?php if(request()->routeIs('admin.*')) echo "class='admin'" ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/apps/root/app.js', "resources/css/app.css", "resources/apps/root/pages/{$page['component']}.vue"], 'build/web')
        @inertiaHead
    </head>
    <body id="app" data-page="{{ json_encode($page); }}"></body>
</html>