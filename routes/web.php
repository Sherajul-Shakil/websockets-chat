<?php

use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


Route::post('send-message', function (Request $request) {
    event(new Message($request->username, $request->message));
    return ['success' => true];
});


// https://webjourney.dev/laravel-pusher-real-time-chat-application-build-with-javascript-jquery