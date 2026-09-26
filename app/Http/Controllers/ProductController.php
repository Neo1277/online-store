<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Show the products page.
     */
    public function index()
    {
        return view('products');
    }

    /**
     * Return all products as JSON.
     */
    public function list(Request $request)
    {
        // Get the search value from the URL.
        //
        // Example:
        // /api/products?search=keyboard
        $search = $request->input('search');


        // Start the query.
        $query = Product::query();


        // Only apply the search condition if
        // the user actually entered something.
        if ($search) {

            $query->where(
                'name',
                'like',
                '%' . $search . '%'
            );
        }


        // Return paginated results.
        //
        // 10 products per page.
        return response()->json(
            $query
                ->latest()
                ->paginate(10)
                ->withQueryString()
        );
    }


    /**
     * Create a new product.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    /**
     * Update an existing product.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($data);

        return response()->json($product);
    }

    /**
     * Delete a product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
