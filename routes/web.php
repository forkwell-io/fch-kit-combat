<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'MainController@index')->name('index');
Route::get('/dashboard', 'MainController@dashboard')->name('dashboard');

Route::resource('marker', 'MarkerController')->except(['index', 'create', 'show', 'edit', 'destroy']);
Route::get('/marker/fetch', 'MarkerController@fetch')->name('marker.fetch');
