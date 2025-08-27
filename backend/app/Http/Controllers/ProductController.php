<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon; //PHP date/time library
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function index()
    {
        return Product::select('title','description','image')->get();
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'required|image',
        ]);
        $imageName = Str::random().'.'.$request->image->getClientOrginalExtension();
        //store the images : in storage (public)-> create folder(product)inside it file (image),with this name($imageName)
        Storage::disk('public')->putFileAs( //u have to run this command (php artisan storage:link)
            'product/image',     // folder
            $request->file('image'), // uploaded file
            $imageName           // custom name
        );

        return response()->json([
             'message'=>'item added successfully'
        ]);

    }


    public function show(Product $product)
    {
        return response()->json([
            'product'=>$product
       ]);
    }


    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'nullable',
        ]);

        $product->fill($request->post())->update();

        if ($request->hasFile('image')) {
            if ($product->image) { //check if there is a image
                  $exist = Storage::disk('public')->exists('product/image/{$product->image}');
                  if ($exist) { //if there is delete it
                    Storage::disk('public')->delete('product/image/{$product->image}');
                  }
            }

            //create new image
            $imageName = Str::random().'.'.$request->image->getClientOrginalExtension();
            //store the images : in storage (public)-> create folder(product)inside it file (image),with this name($imageName)
            Storage::disk('public')->putFileAs(
                'product/image',     // folder
                $request->image, // uploaded file
                $imageName           // custom name
            );
            $product->image = $imageName;
              $product->save();
        }

        return response()->json([
             'message'=>'item updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) { //check if there is a image
            $exist = Storage::disk('public')->exists('product/image/{$request->image}');
            if ($exist) { //if there is delete it
              Storage::disk('public')->delete('product/image/{$request->image}');
            }
        }
        $product->delete();

        return response()->json([
            'message'=>' deleted successfully'
       ]);

    }
}
