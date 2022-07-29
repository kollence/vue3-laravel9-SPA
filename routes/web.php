<?php

use Illuminate\Support\Facades\Route;


Route::view('/{any?}', 'dashboard')
    ->name('dashboard')
    ->where('any', '.*');
