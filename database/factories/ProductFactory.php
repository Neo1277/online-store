<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(
                fake()->numberBetween(2, 4),
                true
            ),

            'price' => fake()->randomFloat(
                2,
                10,
                1000
            ),

            'stock' => fake()->numberBetween(
                0,
                100
            ),
        ];
    }
}
