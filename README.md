# drinks

## The Iron Yard Final Project 2016


This is a web application designed to have some fun with.  It is utilizing two different APIs one from Googles Natural Language API and a cocktail API.  This application can recommend a drink based on how you are feeling! It also can display a list of random drinks for those indecisive people out there and also has a search function of over 3000 cocktail receipes.

### View [My Site](https://happyhr.herokuapp.com) LIVE (it's hosted on Heroku)

The site is continuously deployed onto Heroku on every commit to the Master Branch.

*This application is written using Angular JS*

This is a mainly node based project, so if you do not have node.js already installed on your local machine you must do so in order to use the Node Package Manager(npm) in order to install all of the apps dependencies. All necessary installs will be located at the end of the README.

To work on this code after the repo is cloned you will need to run an `npm install` in your terminal in order to download all dependencies necessary to run the build of this web app.

### Installations

You will need to install node first in order to install all other dependencies.

* [Install node.js](https://nodejs.org/en/)
* [Install mocha](https://mochajs.org/#installation)
* [Install chai](http://chaijs.com/)
* [Install grunt](http://gruntjs.com/getting-started)

### Testing

As for testing you will need to install the mocha framework and chai library onto your machine, and for automated task running this app is using grunt, You will need to install some tasks to run onto your gruntfile in order to work on this project smoothly.
These tasks include:
* grunt-contrib-jshint
* grunt-contrib-clean
* grunt-contrib-concat
* grunt-contrib-copy
* grunt-contrib-concat
* grunt-contrib-watch
* grunt-contrib-sass
* grunt-karma

You are going to want to save those as dev-dependencies while installing so use
(example)

`npm install --save-dev grunt-contrib-jshint`
