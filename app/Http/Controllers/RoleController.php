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
            'roles' => Role::query()->with('permissions')->withCount('users')->orderBy('name')->paginate(10),
            'permissions' => Permission::query()->orderBy('name')->pluck('name'),
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

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role berhasil dibuat.']);

        return back();
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

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role berhasil diperbarui.']);

        return back();
    }

    public function destroy(Role $role): RedirectResponse
    {
        if ($role->hasPermissionTo('roles.manage') && $role->users()->whereKey(auth()->id())->exists()) {
            return back()->withErrors(['role' => 'Role aktif pengelola akses tidak dapat dihapus.']);
        }

        $role->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role berhasil dihapus.']);

        return back();
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
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Akun yang sedang digunakan harus tetap memiliki role pengelola akses.']);

            return back();
        }

        $user->syncRoles($validated['roles']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role pengguna berhasil diperbarui.']);

        return back();
    }
}
