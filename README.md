# Very short description of the package

[![Latest Version on Packagist](https://img.shields.io/packagist/v/spatie/laravel-banana.svg?style=flat-square)](https://packagist.org/packages/spatie/laravel-banana)
[![Build Status](https://img.shields.io/travis/spatie/laravel-banana/master.svg?style=flat-square)](https://travis-ci.org/spatie/laravel-banana)
[![Quality Score](https://img.shields.io/scrutinizer/g/spatie/laravel-banana.svg?style=flat-square)](https://scrutinizer-ci.com/g/spatie/laravel-banana)
[![Total Downloads](https://img.shields.io/packagist/dt/spatie/laravel-banana.svg?style=flat-square)](https://packagist.org/packages/spatie/laravel-banana)

Mount JavaScript components as full page documents in Blade views.

As a full page document:

```js
namespace App\Http\Controllers;

use App\User;

class UsersController
{
    public function index()
    {
        $users = User::all();
        
        return mount('users', [
            $users => 'users',
        ]);
    }
}
```

As a widget in a view:

```html
<section>
    <h1>Media</h1>

    @mount('media-uploader', [
        'initial' => $media,
    ])
</section>
```

With Webpack, you can register all components under a root path so `mount` behaves just like Laravel Blade views.

```
resources/
  js/
    components/
      admin/
        dashboard.js
    app.js
```

```php
return mount('admin.dashboard', $data);
```

## Installation

You can install the package via composer:

```bash
composer require spatie/laravel-banana
```

Next, you'll need to set up the package in your scripts. Assuming you're using Webpack (or Laravel Mix), this will register all Vue components in the specified directory.

```js
import Banana from 'laravel-banana';
import vue from 'laravel-banana/vue';
import createComponents from 'laravel-banana/webpack';

const context = require.context('./pages', true, /\.js$/);

Banana.load(createComponents(context, vue));

Banana.mount();
```

React is also supported:

```js
import Banana from 'laravel-banana';
import react from 'laravel-banana/react';
import createComponents from 'laravel-banana/webpack';

const context = require.context('./pages', true, /\.js$/);

Banana.load(createComponents(context, react));

Banana.mount();
```

## Usage

### As documents

`mount` works just like a Laravel view. You can pass data as the second function argument, or by chaining `with` calls.

```php
return mount('admin.dashboard', ['stats' => $stats]);
```

```php
return mount('admin.dashboard')->with('stats, $stats);
```

```php
return mount('admin.dashboard')->with(['stats, $stats]);
```

The component will be mounted in a configured layout view. The default layout can be set in config.

```php
<?php

return [
    'layout' => 'layouts.app',
];
```

The above expects a `layouts.app` Blade view to exist that echoes a `$slot` variable where the component should be mounted.

```html
<!doctype html>
<html>
    <head>
        ...
        <script defer src="{{ mix('js/app.js') }}"></script>
    </head>
    <body>
        {{ $slot }}
    </body>
</html>
```

### As widgets

`@mount` works just like a Blade `@include` directive. You can pass data as the second directive argument.

```html
@mount('media-uploader', [
    'initial' => $media,
])
```

### View composers

Banana is compatible with your application's existing view composers. All data will be passed as props to the created component.

```php
Banana::composer('profile.*', function ($view) {
    $view->with('user', Auth::user());
});
```

### With Turbolinks

If you're building a Turbolinks application, you'll need to mount the components on every page load.

```js
window.addEventListener('turbolinks:load', () => {
    Banana.mount();
});
```

### Testing

``` bash
composer test
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email freek@spatie.be instead of using the issue tracker.

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

We publish all received postcards [on our company website](https://spatie.be/en/opensource/postcards).

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## Support us

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

Does your business depend on our contributions? Reach out and support us on [Patreon](https://www.patreon.com/spatie). 
All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
