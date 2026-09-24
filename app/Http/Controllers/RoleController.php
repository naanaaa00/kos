<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::query()->with('permissions')->orderBy('name')->get(),
            'permissions' => Permission::query()->orderBy('name')->pluck('name'),
            'users' => User::query()->with('roles')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);
        $role->syncPermissions($validated['permissions'] ?? []);

        return to_route('roles.index')->with('success', 'Role berhasil dibuat.');
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,'.$role->id],
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        if ($role->hasPermissionTo('roles.manage')
            && ! in_array('roles.manage', $validated['permissions'] ?? [], true)
            && $role->users()->whereKey(auth()->id())->exists()) {
            return back()->withErrors(['permissions' => 'Permission pengelola akses pada role aktif tidak dapat dicabut.']);
        }

        $role->update(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions'] ?? []);

        return to_route('roles.index')->with('success', 'Role berhasil diperbarui.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        if ($role->hasPermissionTo('roles.manage') && $role->users()->whereKey(auth()->id())->exists()) {
            return back()->withErrors(['role' => 'Role aktif pengelola akses tidak dapat dihapus.']);
        }

        $role->delete();

        return to_route('roles.index')->with('success', 'Role berhasil dihapus.');
    }

    public function updateUserRoles(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        if ($user->is(auth()->user()) && ! Role::query()
            ->whereIn('name', $validated['roles'])
            ->whereHas('permissions', fn ($query) => $query->where('name', 'roles.manage'))
            ->exists()) {
            return back()->withErrors(['roles' => 'Akun yang sedang digunakan harus tetap memiliki role pengelola akses.']);
        }

        $user->syncRoles($validated['roles']);

        return to_route('roles.index')->with('success', 'Role pengguna berhasil diperbarui.');
    }
}
