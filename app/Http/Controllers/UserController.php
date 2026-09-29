<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $currentUser = $request->user();

        $users = User::query()
            ->with(['detail', 'roles'])
            ->when(
                $currentUser->hasRole('penghuni'),
                fn ($query) => $query->whereKey($currentUser->id)
            )
            ->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::query()->orderBy('name')->pluck('name'),
        ]);
    }

    public function create(Request $request): Response
    {
        $this->abortWhenTenantActsOutsideOwnAccount($request);

        return Inertia::render('Users/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->abortWhenTenantActsOutsideOwnAccount($request);

        $user = User::create($request->validate($this->storeRules()));
        $user->assignRole(config('permission.default_role'));

        return to_route('users.index')->with('success', 'User berhasil dibuat.');
    }

    public function edit(Request $request, User $user): Response
    {
        $this->abortWhenTenantActsOutsideOwnAccount($request, $user);

        return Inertia::render('Users/Edit', [
            'user' => $user->load('detail'),
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $this->abortWhenTenantActsOutsideOwnAccount($request, $user);

        $hasDetail = collect($request->only(['nama', 'nik', 'alamat', 'jenis_kelamin']))
            ->contains(fn (mixed $value): bool => filled($value));

        $validated = $request->validate($this->updateRules($user, $hasDetail));

        if (blank($validated['password'] ?? null)) {
            unset($validated['password']);
        }

        DB::transaction(function () use ($user, $validated, $hasDetail): void {
            $user->update(collect($validated)->only(['name', 'no_hp', 'password'])->all());

            if ($hasDetail) {
                $user->detail()->updateOrCreate(
                    [],
                    collect($validated)->only(['nama', 'nik', 'alamat', 'jenis_kelamin'])->all()
                );
            } elseif ($user->detail) {
                $user->detail->delete();
            }
        });

        return to_route('users.index')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $this->abortWhenTenantActsOutsideOwnAccount($request);

        $user->delete();

        return to_route('users.index')->with('success', 'User berhasil dihapus.');
    }

    /**
     * Penghuni hanya boleh mengelola akunnya sendiri.
     */
    private function abortWhenTenantActsOutsideOwnAccount(Request $request, ?User $user = null): void
    {
        $currentUser = $request->user();

        if ($currentUser->hasRole('penghuni') && ($user === null || $currentUser->isNot($user))) {
            abort(403);
        }
    }

    /** @return array<string, array<int, mixed>> */
    private function storeRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'no_hp' => ['required', 'integer', 'digits_between:10,15', 'unique:users,no_hp'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    private function updateRules(User $user, bool $hasDetail): array
    {
        $detailPresence = $hasDetail ? 'required' : 'nullable';

        return [
            'name' => ['required', 'string', 'max:255'],
            'no_hp' => ['required', 'integer', 'digits_between:10,15', Rule::unique('users', 'no_hp')->ignore($user)],
            'password' => ['nullable', 'string', 'min:8'],
            'nama' => [$detailPresence, 'string', 'max:100'],
            'nik' => [$detailPresence, 'digits:16', Rule::unique('user_detail', 'nik')->ignore($user->detail?->id)],
            'alamat' => [$detailPresence, 'string'],
            'jenis_kelamin' => [$detailPresence, Rule::in(['L', 'P'])],
        ];
    }
}
