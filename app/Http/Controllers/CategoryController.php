<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;


class CategoryController extends Controller
{
   private function getCategoryValidation() 
   {
   return [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string|max:555'
    ];
}

    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
       return Inertia::render('Categories/Index', [
        'categories' => Category::get(),
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->getCategoryValidation());
        Category::create($validated);
        return redirect(route('categories.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse    {
        Gate::authorize('update', $category);
        $validated = $request->validate($this->getCategoryValidation());
        $category->update($validated);
        return redirect(route('categories.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse    {
        Gate::authorize('delete', $category);
        $category->delete();
        return redirect(route('categories.index'));
    }
}
