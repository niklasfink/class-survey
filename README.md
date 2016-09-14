# class-survey

This is the git project for a class survey tool which teachers can use to let students type in their information in the beginning of a semester or school year for a later look up of important stuff like picture, name, advisor, class and other custom fields.

The front-end will be written in Typescript with Angular 2 and will be ported to mobile platforms. The backend will be either PHP or Node.js

## Getting Started
To use this project, your computer needs:
- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en/)

## Project Configuration (via CLI)
You will need to clone the repository before installing the project dependencies with `npm` and finally running the project with `gulp`.
```
git clone https://github.com/niklasfink/class-survey.git
cd class-survey
npm install
npm install -g gulp cordova ionic
gulp
```
Now you should see the app live at `http://localhost:8000/`.

If you get a semantic error while running the gulp command in /node_modules/angular2/src/facade/promise.d.ts add the following code at the top of the promise.d.ts file.
```
declare var Promise: PromiseConstructor; 
```
