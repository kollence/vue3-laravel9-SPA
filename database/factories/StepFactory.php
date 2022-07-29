<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Step>
 */
class StepFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categoriesIds = Category::pluck('id');
        return [
            'title' => $this->faker->word(2),
            'content' => $this->faker->paragraph(2),
            'category_id' => $categoriesIds->random()
        ];
    }
}
