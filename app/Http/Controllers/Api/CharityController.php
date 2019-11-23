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

    if($request->user()->charity != null){
      return response()->json([
        'success' => false, 
        'error'=>'Yout got charity',
        'message' => 'Please leave',
    ], 401); 
          
    }else {
        $charity = Charity::create([
            'user_id' => $request->user()->id,
            'Name' => $request->name,
            'Char_address' => $request->char_address,
            'Char_information' => $request->char_information,   
          ]);
          $user =  $request->user();
          $user->role_id = 1;
          $user->save();
          
          return response()->json([
            'success' => true, 
            'name' => $request->name,
            'message' => 'You have opened a charity',
            'status' => 'success',
            'user_id' => $request->user()->id,             
        ], $this->successStatus);    
    }
  }
    public function canCreateCharity(Request $request, User $User) {
      $users = User::get();
      $charities = Charity::get();
      return response()->json([
        'status' => $request->user()->charity == null,
      ]);
      
    }

    public function index() {
      $all_charities = Charity::get();
      return $all_charities;
    }

    
    
}

