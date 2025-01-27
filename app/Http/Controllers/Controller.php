<?php

namespace App\Http\Controllers;

use Cloudinary\Configuration\Configuration;

Configuration::instance([
    'url' => [
        'forceVersion' => false,
    ]
]);

abstract class Controller {
    //
}
