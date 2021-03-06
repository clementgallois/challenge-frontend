## Personal Notes

app url: https://hiboo-challenge.herokuapp.com/

using react-create-app for simplicity

#### Features
* Ordering of the list
* Map of the devices with hovering effect synchronized with the locations list


### Third party libraries
 * google-react-map (allow to used components as markers, easy to use)
 * momentjs (to validate & format dates)

# Hiboo Frontend Challenge 2018

![hiboo](http://hiboo-preprod.herokuapp.com/assets/logo-1dc0622627df9b16cfe34026f48b408ddcb2e08b4186fd5f13841a39d0d0c4cd.png)

"Where's my stuff?"

The goal is to build a React microsite that allows the user to see the GPS locations of all their trackers.

## Functional Requirements

* Single page app that contains a list of devices with their `name`, `last_seen` date, `address` displayed by `last_seen` desc.
* When clicking on a device, show a list of all its positions: `address` and relative `date`; This list should be ordered by `date` desc.

## Non-functional requirements

* Challenge is submitted as pull request against this repo ([fork it](https://help.github.com/articles/fork-a-repo/) and [create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)).
* The microsite should be deployed to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

## Technology hints

* Use ReactJS to build your app, that's the only _must-have_
* use any tool/framework you'd like, but make sure to explain why you choosed it in your PR.
* We love Sass, BEM and Webpack here at hiboo, but feel free to use what you're the most confortable with.

## Bonus (from least impressive to most 💪)

* Responsive design
* Allow the lists to be ordered by date / name
* Show a map of the devices using the lat-long coordinates stored in the JSON file (see below).

## Data

You will gather the data from a collection of online JSON files.
These files are a simulated JSON API, with the following format:

* [devices.json](https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/devices.json)
  ```json
  [
    {
      "id": "xxxxxxxxxxxxxxx",
      "name": "example",
      "last_seen": "2001-01-01T01:01:00.000Z"
    },
    ...
  ]
  ```
* [locations.json](https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/locations.json)
  ```json
  [
    {
      "id": "yyyyyyyyyyyyyyyyyyyyy",
      "lat": 48.894436,
      "long": 1.404684,
      "date": "2001-01-01T01:01:00.000Z",
      "address": "Full address as a string",
      "device_id": "xxxxxxxxxxxxxxx"
    },
    ...
  ]
  ```

Links :

* https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/devices.json
* https://raw.githubusercontent.com/hibooapp/challenge-frontend/master/data/locations.json
