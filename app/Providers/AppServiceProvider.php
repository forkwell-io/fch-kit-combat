<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Marker;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        // Share views
        
        view()->composer('*', function ($view) {
            if (Auth::check())
            {
                $credits = 3 - Marker::where('user_id', auth()->user()->id)
                    ->whereDate('created_at', Carbon::today()->toDateString())->count();

                $view->with('credits', $credits);
            }
            else
            {
                $view->with('credits', null);
            }
        });
    }
}
