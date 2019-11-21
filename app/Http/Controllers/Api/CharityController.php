<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Role;
use App\Charity;


class CharityController extends Controller
{
    public $successStatus = 200;

    //Protected route with react router? or auth here in laravel?
    // What is the second parametr? USER   
    public function registerCharity(Request $request, User $User) {
     
        $charity = Charity::create([
            'user_id' => $request->user()->id,
            'Name' => $request->name,
            'Char_address' => $request->char_address,
            'Char_information' => $request->char_information,   
          ]);
          $user =  $request->user();
          $user->role_id = 1;
          $user->save();

          //$request->user()->role_id 
        // TASK: when logged in user register charity - change his role 
         // $role_id = $user->role_id;
          return response()->json([
            'success' => true, 
            'name' => $request->name,
            'message' => 'You have opened a charity',
            'status' => 'success',
            //'user_id' => $request->user()->id,
           // 'role_id' => $role_id                
        ], $this->successStatus);    
    }
    public function canCreateCharity(Request $request) {
      if($request->user()->charity == null) {
        return true;
      } 
      return false;
    }
}

