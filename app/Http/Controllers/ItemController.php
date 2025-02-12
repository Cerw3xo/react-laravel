<?php

namespace App\Http\Controllers;

use App\Models\item;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class ItemController extends Controller
{
   private function getItemValidation() 
   {
   return [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string|max:555',
        'price' => 'required|numeric|min:0',
        'count' => 'required|integer|min:0',
    ];
}

    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
       return Inertia::render('Items/Index', [
        'items' => Item::with('user:id,name')->latest()->get(),
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
        $validated = $request->validate($this->getItemValidation());
        $request->user()->items()->create($validated);
        return redirect(route('items.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(item $item)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item): RedirectResponse    {
        Gate::authorize('update', $item);
        $validated = $request->validate($this->getItemValidation());
        $item->update($validated);
        return redirect(route('items.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item): RedirectResponse    {
        Gate::authorize('delete', $item);
        $item->delete();
        return redirect(route('items.index'));
    }
}
