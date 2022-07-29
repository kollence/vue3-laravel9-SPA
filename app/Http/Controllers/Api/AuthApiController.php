<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        try{
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed'],
            ]);
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
    
            $token = $user->createToken('my-app-token')->plainTextToken;
    
            $response = [
                'user' => $user,
                'token' => $token
            ];
    
            return response()->json(['data'=> $response]);
        }catch(\Exception $e){
            return response()->json(['err' => $e->getMessage()]);
        }
    }

    public function login(Request $request)
    {
        try{
            $request->validate([
                'email' => ['required', 'string', 'email', 'max:255'],
                'password' => ['required'],
            ]);

            $user = User::where('email', $request->email)->first();

            if(!$user || !Hash::check($request->password, $user->password)){
                return response(['message' => 'Bad enteries'], 401);
            }
    
            $token = $user->createToken('my-app-token')->plainTextToken;
    
            $response = [
                'user' => $user,
                'token' => $token
            ];
    
            return response()->json(['data'=> $response]);
        }catch(\Exception $e){
            return response()->json(['err' => $e->getMessage()]);
        }
    }

    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens()->delete();

            return ['message' => 'logged out'];
        } catch (\Exception $e) {
            return ['err' => $e->getMessage()];
        }
        
    }
}
