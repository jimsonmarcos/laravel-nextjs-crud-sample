## Laravel

This app uses [Laravel version 9](https://laravel.com/docs/9.x).

Installation Instructions
- `composer install`
- copy .env.example to .env
- `php artisan key:generate`
- edit .env and update database config
- `php artisan config:clear`
- `php artisan migrate:fresh --seed`
- `php artisan serve`
