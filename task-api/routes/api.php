<?php

use App\Http\Controllers\TaskContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('tasks', TaskContoller::class)->only(['index', 'store', 'update', 'destroy']);
