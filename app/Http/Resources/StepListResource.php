<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StepListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title'=> $this->title,
            'content' => substr($this->content, 0, 50) . '...',
            'category' => $this->category->name,
            'image' => $this->image[0]->image ?? null,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
