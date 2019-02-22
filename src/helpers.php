<?php

use Spatie\Refraction\Refraction;

function refract(string $component, array $props = []) {
    return new Refraction($component, $props);
}
