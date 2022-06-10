# Fungus Friends

Location app featuring various fungus friends from Spronq's beautiful garden.

## Table of Contents

* [Installation](#installation)
* [API](#api)
* [Vue](#vue)
* [TypeScript](#typescript)

## Installation

Clone the current repository using
```
git clone https://github.com/virgilseo/fungus-friends.git
```
Next, from the project folder you need to open a terminal window and run the following command
```
yarn install
```
After the installation is complete, then run this command
```
yarn serve
```
After this a browser window will open on localhost:8080 and you can start using the app.

If you close the browser window and want to use the app again just remember you can find the it @ localhost:8080.

## API
The application uses third party API's to fetch the map and images for the marker info box.

1. OpenStreeMap: https://www.openstreetmap.org/
2. Unsplash: https://unsplash.com/developers

The Unsplash API has a maximum limit of 50 requests per hour. After that, the app displays a placeholder image and an error message.

## Vue

The app was build using a powerful JavaScript front end framework, called Vue.js. Here is a link to their home page: https://vuejs.org/

## TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, that has become industry standard in front end development in recent years.

https://www.typescriptlang.org/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
