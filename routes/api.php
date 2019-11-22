<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');



Route::group(['middleware' => 'auth:api'], function(){
  Route::post('auth/charity', 'API\CharityController@canCreateCharity');
  Route::post('registerCharity', 'API\CharityController@registerCharity');
  Route::post('details', 'API\UserController@details');
});
Route::get('items', 'API\ItemController@index');
Route::get('displayCharities', 'API\CharityController@index');


// Route::post('/login', 'Api\LoginController@login');
// Route::post('/register', 'Api\RegisterController@register');
// Route::group(['middleware' => ['auth:api']], function ($group) {
 
   
 
// });