<?php

namespace App\Enums;

enum Permission: string {
    case CREATE = 'create';
    case EDIT = 'edit';
    case HIDE = 'hide';
    case RESTORE = 'restore';
    case DELETE = 'delete';
}
