@extends('layouts.full')

@section('content')
<main-map login-url="{{ route('login') }}"
fetch-marker-url="{{ route('marker.fetch') }}"
create-marker-url="{{ route('marker.store') }}"
user-name="{{ Auth::check() ? Auth::user()->name : '' }}">
    <coronavirus></coronavirus>
</main-map>
@endsection
