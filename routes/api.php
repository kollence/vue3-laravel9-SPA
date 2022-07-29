<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StepsController;
use App\Http\Controllers\Api\AuthApiController;

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
//Public
Route::post('/register', [AuthApiController::class, 'register']);
Route::post('/login', [AuthApiController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);

//Protected
Route::group(['middleware'=>'auth:sanctum'], function () {
    Route::apiResource('steps', StepsController::class);
    Route::post('/logout', [AuthApiController::class, 'logout']);
    Route::get('/user', function(Request $request){
        return ['data' => [
            'user' => $request->user(),
            'token' => $request->bearerToken()
        ]];
        
    });
});



