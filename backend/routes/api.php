<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::apiResource('/tasks', TaskController::class)
    ->scoped([
        'task' => 'uuid'
    ])
    ->only(['index', 'store', 'destroy']);
