<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @component('components.head')
    @endcomponent
</head>
<body>
    <div id="app">
        @component('components.navbar', ['credits' => $credits])
        @endcomponent

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
