# Tea Share App

## What is it?

This app is for tea enthusiasts to connect by sharing their favorite tea blends and discovering new blends. Users simply sign up, login, post their favorite tea blends, and browse tea blends shared by others. Users can also post reviews for tea blends.

- New users can sign up for an account

- Users with an account can log in

- On the Teas page, a logged in user can add a new tea to the list. Click on a tea title to see it's reviews and post a review. Click on a username to see which teas they've reviewed.

- A logged in user can see their list of tea reviews by clicking on the My Reviews button in the navbar. This is also where they can edit or delete their reviews.

- Users can log out by clicking the LOG OUT button in the navbar.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

See Environment Setup below for instructions on installing these tools if you don't already have them. Otherwise, skip ahead to the installation section.

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

We recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

## Installation

In a terminal, type the following:

```console
git clone git@github.com:jgifford82/tea-share.git
cd tea-share
code .
```

VSCode should open. Open a terminal in VSCode and type in:

```sh
bundle install
npm install --prefix client
```

## Server

You can use the following commands to run the application:

- `sudo service postgresql start`: start the database server (must be run everytime the computer reboots) and enter your password
- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

A browser window should open to: http://localhost:4000/
