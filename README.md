# omdb-test
test api omdb

### REQUIRED
You need a least 

####  GOOGLE Crédentials
    SET GSHEET_API_KEY_PATH var on the .env doc and give path to your .json key file 
    GSHEET_SPREADSHEET_ID an ID of a Google Sheet doc


#### OMDB API Crédential
    SET OMDB_API_KEY on the .env file 

### Install
You can use

    $ nvm use
to set the correct NPM version

### Makefile
This package contain a Makefile in to start easier the project
install dépendency:

    $ make 
or

    $ make install
Starting the project: 

    $ make start


This app use Express Js ands respond to 2 endpoints:

* [/films](http://localhost:5400/films)
to get the JSON of all film base on the search promt `Fast & Furious`

* [export](http://localhost:5400/export)
To export a list of film in Gsheet base on the search prompt `Pirates des caraïbes`

* [/auth/films](http://localhost:5400/auth/films)
  secure route idem to /films needs a Bearer Token

* [/auth/export](http://localhost:5400/auth/export)
  secure route idem to /export needs a Bearer Token

* [/login](http://localhost:5400/login)
  login route to authenticate

you can log in with: 

    username: 'john_doe',
    password: 'jojom'
