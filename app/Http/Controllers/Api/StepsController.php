<?php

namespace App\Http\Controllers\Api;

use App\Models\Step;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStepRequest;
use App\Http\Resources\StepListResource;
use App\Http\Resources\StepShowResource;

class StepsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $order = request('order_column', 'created_at');
            if(!in_array($order, ['id', 'title', 'created_at'])){
                $order = 'created_at';
            }
        $direction = request('direction', 'desc');
            if(!in_array($direction, ['asc', 'desc'])){
                $direction = 'desc';
            }
        $perPage = request('perPage', 10);
            if(!in_array($perPage, [5, 10,15,20])){
                $perPage = 10;
            }

        $steps = Step::with(['category','image'])
        ->when(request('search_category'), function($q){
            $q->where('category_id', request('search_category'));
        })
        ->when(request('search_id'), function($q){
            $q->where('id', request('search_id'));
        })
        ->when(request('search_title'), function($q){
            $q->where('title','like', '%'.request('search_title').'%');
        })
        ->when(request('search_content'), function($q){
            $q->where('content','like', '%'.request('search_content').'%');
        })
        ->when(request('search_global'), function ($query) {
            $query->where(function($q) {
                $q->where('id', request('search_global'))
                    ->orWhere('title', 'like', '%'.request('search_global').'%')
                    ->orWhere('content', 'like', '%'.request('search_global').'%');

            });
        })
        ->orderBy($order, $direction)
        ->paginate($perPage);
        return StepListResource::collection($steps);
        } catch (\Exception $e) {
            return ['err' => $e->getMessage()];
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStepRequest $request)
    {

        try {
            $step = Step::create($request->validated()); 

            if($request->hasFile('image')){
                $file = $request->file('image');
                $filename = $step->title.'-image-'.time().rand(1,100).'.'.$file->extension();
                $file->move(public_path('step_images'),$filename);
                Image::create([
                    'step_id' => $step->id,
                    'image' => $filename
                ]);
            }
            return new StepShowResource($step);
        } catch (\Exception $e) {
            return ['message'=> $e->getMessage()];
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Step $step)    
    {
        return new StepShowResource($step);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Step $step, StoreStepRequest $request)
    {
        // dd($request->all());
        try {
            $step->update($request->validated()); 

            if($request->hasFile('image')){
                if($step->image->isNotEmpty()){
                    $image_path = public_path('step_images').'/'.$step->image[0]->image;
                    if(file_exists($image_path)) {
                        $step->image()->delete();
                        // return ['ima'=>$image_path];
                        unlink($image_path); 
                    }  
                }
                $file = $request->file('image');
                $filename = $step->title.'-image-'.time().rand(1,100).'.'.$file->extension();
                $file->move(public_path('step_images'),$filename);
                Image::create([
                    'step_id' => $step->id,
                    'image' => $filename
                ]);
            }
            // return ['nema'=>'nista'];
            return new StepShowResource($step);
        } catch (\Exception $e) {
            return ['message'=>$e->getMessage()];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Step $step)
    {
        if($step->image->isNotEmpty()){
            $image_path = public_path('step_images').'/'.$step->image[0]->image;
            if(file_exists($image_path)) {
                $step->image()->delete();
                // return ['ima'=>$image_path];
                unlink($image_path); 
            }  
        }
        $step->delete();
        return response()->noContent();
    }
}
