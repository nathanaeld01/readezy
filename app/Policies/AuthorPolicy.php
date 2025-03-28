<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Author;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AuthorPolicy {
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Author $author): bool {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(?User $user): Response {
        if (!$user)
            return Response::deny('Authentication required to creatte an author.');

        if (!$user->can('author:create'))
            return Response::deny('You do not have the necessary permissions.');

        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Author $author): bool {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(?User $user): Response {
        if (is_null($user))
            return Response::deny('Authentication required to delete an author.');

        if (!$user->can('author:delete'))
            return Response::deny('You do not have the necessary permissions.');

        return Response::allow();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Author $author): bool {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(?User $user, Author $author): Response {
        if (is_null($user))
            return Response::deny('Authentication required to permanently delete an author.');

        if (!$user->hasRole(Role::SuperAdmin))
            return Response::deny('Only Super-Admins can permanently delete an author.');

        return Response::allow();
    }
}
