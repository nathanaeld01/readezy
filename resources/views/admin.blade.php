<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/apps/admin/app.js', "resources/css/admin.css", "resources/apps/admin/pages/{$page['component']}.vue"], 'build/admin')
        @inertiaHead
    </head>
    <body id="app" data-page="{{ json_encode($page); }}"></body>
</html>