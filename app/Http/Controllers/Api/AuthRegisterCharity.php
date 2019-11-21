<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Role;
use App\Charity;


class AuthRegisterCharity extends Controller
{
    public function authCharity($user_id) {
        $charity = Charity::where("user_id", "=", $user_id )
        ->get();
        dd($charity);
    }
}
