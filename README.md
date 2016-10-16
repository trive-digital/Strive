# Postal by TRIVE

Magento 2 CE frontend system based on PostCSS and Gulp.

## Features

## Requirements

1. [Magento CE](https://magento.com/products/community-edition) installed on your machine
1. [NodeJS](http://nodejs.org/) (with npm package manager)
2. [GulpJS](https://github.com/gulpjs/gulp) `$ npm install -g gulp` (you may need sudo for mac)

## Installation

## Usage

### Postal


### Gulp
- `gulp` - Default gulp task (runs 'css', 'static', 'watch' & 'browser-sync' tasks). It watches css, html, images & js files. Browser-sync injects css file into the browser. These files, if changed, are auto transferred from your theme to pub/static folder, so you will not need to deploy magento static content. At the moment, gulp.watch does not register new files automatically, but it does a great job in tracking modified files. So if you add a new css/html/image/js file, you'll need to stop a gulp task and run it again. (gulp-watch plugin will be probably added in the next release to fix this)

- `gulp clean` - Removes everything in `var/cache`, `var/generation`, `var/view_preprocessed` & `pub/static` folder (Except .htaccess, magento blank & magento luma theme)

- `gulp deploy` - It's a short of `bin/magento setup:static-content:deploy`. There is no problem to use longer option either :)


## Demo

Working demo of Postal can be checked here: [http://postal.jakesharpdev.com/](http://postal.jakesharpdev.com/)
