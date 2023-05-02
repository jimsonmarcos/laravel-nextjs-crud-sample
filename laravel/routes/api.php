<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::controller(\App\Http\Controllers\Api\UsersController::class)->group(function () {
    Route::get('/users', 'index');
    Route::post('/user/add', 'store');
    Route::get('/user/{user}', 'show');
    Route::post('/user/{user}', 'update');
    Route::delete('/user/{user}', 'destroy');
});
