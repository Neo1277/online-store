<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Online Store App #

## Overview ##

Simpple CRUD JavaScript + Laravel

## Requirements ##

*   PHP >= 8.1
*   Composer
*   Laravel 12
*   MySQL
*   Git (optional, for version control)

## Setup Instructions ##

*   Clone the repository
```
git clone https://github.com/Neo1277/online-store.git
cd online-store
``` 

*   Install PHP dependencies
```
composer install
``` 

*   Create a MySQL database for the application, for example:
```
online_store
``` 

*   Copy .env file
```
cp .env.example .env
``` 

*   Set up environment variables
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
``` 

*   Also make sure APP_URL is set correctly:
```
APP_URL=http://localhost
``` 

*   Generate application key
```
php artisan key:generate
``` 

*   Run database migrations
```
php artisan migrate
``` 

*   Seed the database (optional)
```
php artisan db:seed
``` 

*   Serve the application
```
php artisan serve
``` 

*   The application will be accessible at http://127.0.0.1:8000/products
