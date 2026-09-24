<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $currentUser = $request->user();

        $users = User::query()
            ->with('detail')
            ->when(
                $currentUser->hasRole('penghuni'),
                fn ($query) => $query->whereKey($currentUser->id)
            )
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        if ($request->user()->hasRole('penghuni')) {
            abort(403);
        }

        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasRole('penghuni')) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'no_hp' => [
                'required',
                'integer',
                'digits_between:10,15',
                'unique:users,no_hp',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
            ],
        ]);

        $user = User::create($validated);

        $user->assignRole(config('permission.default_role'));

        return to_route('users.index')
            ->with('success', 'User berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, User $user): Response
    {
        $currentUser = $request->user();

        if (
            $currentUser->hasRole('penghuni')
            && $currentUser->id !== $user->id
        ) {
            abort(403);
        }

        return Inertia::render('Users/Edit', [
            'user' => $user->load('detail'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        User $user
    ): RedirectResponse {
        $currentUser = $request->user();

        if (
            $currentUser->hasRole('penghuni')
            && $currentUser->id !== $user->id
        ) {
            abort(403);
        }

        $hasDetail = collect(
            $request->only([
                'nama',
                'nik',
                'alamat',
                'jenis_kelamin',
            ])
        )->contains(
            fn (mixed $value): bool => filled($value)
        );

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'no_hp' => [
                'required',
                'integer',
                'digits_between:10,15',
                Rule::unique('users', 'no_hp')
                    ->ignore($user),
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
            ],

            'nama' => [
                $hasDetail ? 'required' : 'nullable',
                'string',
                'max:100',
            ],

            'nik' => [
                $hasDetail ? 'required' : 'nullable',
                'digits:16',
                Rule::unique('user_detail', 'nik')
                    ->ignore($user->detail?->id),
            ],

            'alamat' => [
                $hasDetail ? 'required' : 'nullable',
                'string',
            ],

            'jenis_kelamin' => [
                $hasDetail ? 'required' : 'nullable',
                Rule::in(['L', 'P']),
            ],
        ]);

        if (blank($validated['password'] ?? null)) {
            unset($validated['password']);
        }

        DB::transaction(function () use (
            $user,
            $validated,
            $hasDetail
        ): void {
            $user->update(
                collect($validated)
                    ->only([
                        'name',
                        'no_hp',
                        'password',
                    ])
                    ->all()
            );

            if ($hasDetail) {
                $user->detail()->updateOrCreate(
                    [],
                    collect($validated)
                        ->only([
                            'nama',
                            'nik',
                            'alamat',
                            'jenis_kelamin',
                        ])
                        ->all()
                );
            } elseif ($user->detail) {
                $user->detail->delete();
            }
        });

        return to_route('users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Request $request,
        User $user
    ): RedirectResponse {
        if ($request->user()->hasRole('penghuni')) {
            abort(403);
        }

        $user->delete();

        return to_route('users.index')
            ->with('success', 'User berhasil dihapus.');
    }
}

