🛒 Online Store
<p align="center"> <img src="https://raw.githubusercontent.com/laravel/art/master/laravel-logo.png" width="180" alt="Laravel Logo"> </p> <p align="center"> A simple product management application built with Laravel, MySQL, JavaScript, and Bootstrap. </p>
📋 About the Project

This project is a simple Product Management CRUD application built with Laravel.

It demonstrates how to combine:

Laravel

PHP

MySQL

Eloquent ORM

Blade

JavaScript

Fetch API

Bootstrap 5

REST-style endpoints

CSRF protection

Server-side pagination

Server-side search

Factories and seeders

The application allows users to:

Create products

View products

Edit products

Delete products

Search products

Navigate through paginated results

🛠️ Technologies
Technology	Purpose
Laravel	Backend framework
PHP	Backend programming language
MySQL	Database
Eloquent	ORM
Blade	Server-side views
JavaScript	Frontend logic
Fetch API	Communication with Laravel
Bootstrap 5	UI styling
Composer	PHP dependency manager
NPM	Frontend dependency manager
🚀 Installation
1. Requirements

Before installing the application, make sure you have the following installed:

PHP

Composer

MySQL

Node.js and NPM

Git

You can verify your installations with:

php -v

composer -V

mysql --version

node -v

npm -v


Laravel's current installation documentation also recommends PHP, Composer, and Node/NPM or Bun for a typical development environment. {"fallbackMarkdown":"(Laravel
)","reference":{"matched_text":"","prefix":null,"start_idx":2026,"end_idx":2059,"safe_urls":["https://laravel.com/framework/docs","https://laravel.com/framework/docs/vite","https://laravel.com/framework/docs/vite?utm_source=chatgpt.com","https://laravel.com/framework/docs?utm_source=chatgpt.com"],"refs":[],"alt":"(Laravel
)","prompt_text":null,"type":"grouped_webpages","fallback_items":null,"style":null,"status":"done","error":null,"items":[{"title":"Installation | Laravel 13.x - The clean stack for Artisans and agents","url":"https://laravel.com/framework/docs?utm_source=chatgpt.com","attribution":"Laravel","pub_date":null,"snippet":"","attribution_segments":null,"supporting_websites":[{"title":"Asset Bundling (Vite) | Laravel 13.x - The clean stack for Artisans and agents","url":"https://laravel.com/framework/docs/vite?utm_source=chatgpt.com","pub_date":null,"snippet":"","attribution":"Laravel"}],"refs":[{"turn_index":0,"ref_type":"search","ref_index":3},{"turn_index":0,"ref_type":"search","ref_index":10}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

📥 2. Clone the Repository

Clone the project:

git clone YOUR_REPOSITORY_URL


Enter the project directory:

cd online-store

📦 3. Install PHP Dependencies

Run:

composer install


This installs the dependencies defined in:

composer.json

📦 4. Install JavaScript Dependencies

Run:

npm install


This installs the frontend dependencies defined in:

package.json

⚙️ 5. Configure Environment

Laravel uses the .env file for environment-specific configuration.

Copy the example environment file:

Windows
copy .env.example .env

macOS / Linux
cp .env.example .env


Then generate the Laravel application key:

php artisan key:generate

🗄️ 6. Create the MySQL Database

Create a database named:

CREATE DATABASE online_store;


You can also use another database name if you prefer.

🔧 7. Configure MySQL

Open your .env file and configure your database:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=online_store
DB_USERNAME=root
DB_PASSWORD=


If your MySQL installation has a password, specify it:

DB_PASSWORD=your_password

🏗️ 8. Run the Migrations

Create the database tables:

php artisan migrate


The migrations will create the required tables, including:

products


The products table contains:

id
name
price
stock
created_at
updated_at

🌱 9. Seed the Database

This project includes a ProductFactory and ProductSeeder.

The seeder creates 50 sample products.

Run:

php artisan db:seed


You can also reset the database and seed it in one command:

php artisan migrate:fresh --seed


⚠️ Warning: migrate:fresh deletes all existing database tables before running the migrations again.

🧪 10. Generate More Test Products

The default ProductSeeder creates 50 products:

Product::factory()
    ->count(50)
    ->create();


You can change this to:

Product::factory()
    ->count(100)
    ->create();


or:

Product::factory()
    ->count(1000)
    ->create();


Then run:

php artisan migrate:fresh --seed


This is useful for testing pagination and search.

▶️ 11. Start the Laravel Server

Run:

php artisan serve


The application will normally be available at:

http://127.0.0.1:8000


Open:

http://127.0.0.1:8000/products

🔍 12. Product Search

The application includes server-side product searching.

For example:

/api/products?search=keyboard


Laravel receives the search term:

$search = $request->input('search');


and searches the database:

$query->where(
    'name',
    'like',
    '%' . $search . '%'
);


The search is performed by the database rather than downloading every product to the browser.

📄 13. Pagination

Products are paginated on the Laravel side.

The application currently displays:

10 products per page


This is controlled by:

Product::latest()->paginate(10)


For example, if the database contains 50 products:

Page 1 → 10 products
Page 2 → 10 products
Page 3 → 10 products
Page 4 → 10 products
Page 5 → 10 products


The JavaScript application displays Bootstrap pagination controls.

🔌 14. API Endpoints

The application uses the following endpoints:

Method	Endpoint	Description
GET	/api/products	Get products
GET	/api/products?search=keyboard	Search products
GET	/api/products?page=2	Get page 2
POST	/api/products	Create product
PUT	/api/products/{id}	Update product
DELETE	/api/products/{id}	Delete product
📁 15. Project Structure

The most important files are:

online-store/
│
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── ProductController.php
│   │
│   └── Models/
│       └── Product.php
│
├── database/
│   ├── factories/
│   │   └── ProductFactory.php
│   │
│   ├── migrations/
│   │   └── xxxx_xx_xx_create_products_table.php
│   │
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── ProductSeeder.php
│
├── public/
│   └── js/
│       └── products.js
│
├── resources/
│   └── views/
│       └── products.blade.php
│
├── routes/
│   └── web.php
│
├── .env
├── composer.json
├── package.json
└── README.md

🔄 16. Application Flow

The application works approximately like this:

                    Browser
                       │
                       │
                       ▼
              products.blade.php
                       │
                       │
                       ▼
                 products.js
                       │
                       │ fetch()
                       ▼
               Laravel Routes
                       │
                       ▼
             ProductController
                       │
                       ▼
                Product Model
                       │
                       ▼
                    MySQL
                       │
                       ▼
                  JSON Response
                       │
                       ▼
                 products.js
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Product Table        Pagination

🔐 17. CSRF Protection

The application uses Laravel's CSRF protection for modifying requests.

The Blade view contains:

<meta
    name="csrf-token"
    content="{{ csrf_token() }}"
>


JavaScript reads the token:

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');


And sends it with POST, PUT, and DELETE requests:

headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': csrfToken
}


This prevents errors such as:

CSRF token mismatch.

🎨 18. Bootstrap

The interface uses Bootstrap 5 for styling.

The Blade view loads Bootstrap through its CDN:

<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet"
>


Bootstrap is used for:

Forms

Buttons

Tables

Cards

Pagination

Navigation

Responsive layouts

Badges

🧹 19. Reset the Database

If you want to completely reset your development database:

php artisan migrate:fresh --seed


This will:

Delete existing tables
        ↓
Run migrations
        ↓
Run ProductSeeder
        ↓
Create 50 products

🐛 20. Troubleshooting
CSRF Token Mismatch

If you see:

CSRF token mismatch.


make sure your Blade file contains:

<meta
    name="csrf-token"
    content="{{ csrf_token() }}"
>


and your JavaScript sends:

'X-CSRF-TOKEN': csrfToken

Database Connection Error

Check your .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=online_store
DB_USERNAME=root
DB_PASSWORD=


Then clear Laravel's configuration cache:

php artisan config:clear

Products Are Not Showing

Check that the migrations have been executed:

php artisan migrate:status


Then seed the database:

php artisan db:seed

JavaScript Changes Are Not Appearing

If you're using Laravel's Vite setup, run:

npm run dev


For a production build:

npm run build


Laravel's documentation recommends Vite for bundling frontend assets in modern Laravel applications. {"fallbackMarkdown":"(Laravel
)","reference":{"matched_text":"","prefix":null,"start_idx":9725,"end_idx":9745,"safe_urls":["https://laravel.com/framework/docs/vite","https://laravel.com/framework/docs/vite?utm_source=chatgpt.com"],"refs":[],"alt":"(Laravel
)","prompt_text":null,"type":"grouped_webpages","fallback_items":null,"style":null,"status":"done","error":null,"items":[{"title":"Asset Bundling (Vite) | Laravel 13.x - The clean stack for Artisans and agents","url":"https://laravel.com/framework/docs/vite?utm_source=chatgpt.com","attribution":"Laravel","pub_date":null,"snippet":"","attribution_segments":null,"supporting_websites":[],"refs":[{"turn_index":0,"ref_type":"search","ref_index":10}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

📚 Laravel Documentation

For more information about Laravel, visit the official documentation:

Laravel Documentation

https://laravel.com/docs

Laravel GitHub Repository

https://github.com/laravel/laravel

📄 License

This project is intended for educational and development purposes.

Laravel itself is open source and distributed under the MIT license. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":10125,"end_idx":10144,"safe_urls":["https://github.com/laravel/laravel","https://github.com/laravel/laravel?utm_source=chatgpt.com"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","fallback_items":null,"style":null,"status":"done","error":null,"items":[{"title":"GitHub - laravel/laravel: Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation for your next big idea — freeing you to create without sweating the small things. · GitHub","url":"https://github.com/laravel/laravel?utm_source=chatgpt.com","attribution":"GitHub","pub_date":null,"snippet":"","attribution_segments":null,"supporting_websites":[],"refs":[{"turn_index":0,"ref_type":"search","ref_index":8}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

<p align="center"> Built with ❤️ using Laravel, PHP, MySQL, JavaScript and Bootstrap. </p> ``` :::

One note about the logo: I used the Laravel logo asset hosted from Laravel's official GitHub organization. The official Laravel repository and organization are maintained by Laravel, and Laravel's current docs/repository confirm the framework and its current structure. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":10529,"end_idx":10561,"safe_urls":["https://github.com/laravel","https://github.com/laravel/laravel","https://github.com/laravel/laravel?utm_source=chatgpt.com","https://github.com/laravel?utm_source=chatgpt.com"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","fallback_items":null,"style":null,"status":"done","error":null,"items":[{"title":"GitHub - laravel/laravel: Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation for your next big idea — freeing you to create without sweating the small things. · GitHub","url":"https://github.com/laravel/laravel?utm_source=chatgpt.com","attribution":"GitHub","pub_date":null,"snippet":"","attribution_segments":null,"supporting_websites":[{"title":"Laravel · GitHub","url":"https://github.com/laravel?utm_source=chatgpt.com","pub_date":null,"snippet":"","attribution":"GitHub"}],"refs":[{"turn_index":0,"ref_type":"search","ref_index":8},{"turn_index":0,"ref_type":"search","ref_index":1}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

You can save the block above directly as README.md in the root of your project.{"fallbackMarkdown":"","reference":{"matched_text":" ","prefix":null,"start_idx":10648,"end_idx":10648,"safe_urls":[],"refs":[],"alt":"","prompt_text":null,"type":"sources_footnote","sources":[{"title":"Installation | Laravel 13.x - The clean stack for Artisans and agents","url":"https://laravel.com/framework/docs?utm_source=chatgpt.com","attribution":"Laravel"},{"title":"GitHub - laravel/laravel: Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation for your next big idea — freeing you to create without sweating the small things. · GitHub","url":"https://github.com/laravel/laravel?utm_source=chatgpt.com","attribution":"GitHub"}],"has_images":false},"showLoginRequiredCard":false}