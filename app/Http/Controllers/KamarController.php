<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class KamarController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Kamar/Index', [
            'kamars' => Kamar::query()->latest('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Kamar/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'no_kamar' => ['required', 'string', 'max:20', 'unique:kamar,no_kamar'],
            'harga' => ['required', 'integer', 'min:0'],
            'fasilitas' => ['required', 'string'],
            'ketersediaan' => ['required', 'boolean'],
        ]);

        Kamar::create($validated);

        return to_route('kamar.index')->with('success', 'Kamar berhasil dibuat.');
    }

    public function edit(Kamar $kamar): Response
    {
        return Inertia::render('Kamar/Edit', ['kamar' => $kamar]);
    }

    public function update(Request $request, Kamar $kamar): RedirectResponse
    {
        $validated = $request->validate([
            'no_kamar' => ['required', 'string', 'max:20', Rule::unique('kamar', 'no_kamar')->ignore($kamar)],
            'harga' => ['required', 'integer', 'min:0'],
            'fasilitas' => ['required', 'string'],
            'ketersediaan' => ['required', 'boolean'],
        ]);

        $kamar->update($validated);

        return to_route('kamar.index')->with('success', 'Kamar berhasil diperbarui.');
    }

    public function destroy(Kamar $kamar): RedirectResponse
    {
        $kamar->delete();

        return to_route('kamar.index')->with('success', 'Kamar berhasil dihapus.');
    }
}
