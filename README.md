# Help Radar

## Installation

### 1. Clone

Clone this project into **htdocs** folder as **"help-radar"**.

### 2. Install dependencies

Required:

- [Node JS](https://nodejs.org/en/)
- [Composer](https://getcomposer.org/)

Go to project directory.

```
cd help-radar
```

Install dependencies.

```
npm install
composer install
```

### 4. Setup project.

You may need to set up a Hypertext Transfer Protocol Secure (HTTPS) to allow the browser to locate users to their current location in the map.

...

Create a new empty database named **"help_radar"**.

Edit ```help-radar/.env```. If the file does not exist, copy and rename ```help-radar/.env.example``` to ```htlp-radar/.env```. Configure the following information to connect to database.

```
...

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=help_radar
DB_USERNAME=root
DB_PASSWORD=

...
```

Generate a Laravel Application Key.

```
php artisan key:generate
```

Generate tables using **migration**.

```
php artisan migrate
```

## Viewing the application

```https://localhost/path/to/help-radar/public```
