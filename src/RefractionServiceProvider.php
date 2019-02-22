<?php

namespace Spatie\Refraction;

use Illuminate\Support\ServiceProvider;

class RefractionServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/refraction.php' => config_path('refraction.php'),
            ], 'config');
        }
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/refraction.php', 'refraction');
    }
}
