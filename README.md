

# MyDiary Badge (build status, coverage status and Maintainability)
[![Build Status](https://travis-ci.org/supershegs/MyDiary.svg?branch=diary)](https://travis-ci.org/supershegs/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/supershegs/MyDiary/badge.svg)](https://coveralls.io/github/supershegs/MyDiary)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c8e93f8605acff751f6/maintainability)](https://codeclimate.com/github/supershegs/MyDiary/maintainability)

An online journal where users can pen down their thoughts and feelings.
Please take a preview [here](https://supershegs.github.io/MyDiary/UI/).

#Project Name: MyDiary
 MyDiary is an online journal where users can pen down their thoughts and feelings.  
   
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system
Software to install to reused the codes for development
A browser like google, mozilla to output your display.
Get to download and install node.
get a text editor like visual studio or sublime.
open the project with text editor listed above and typed in npm install into the terminal to install the neccessary development tools and framework for the program to run

### Running the test
```
npm run test
```
### Starting server
```
npm start
```
### Building 
```
npm run build
``` 
  ###To run
type in npm start to run the application and watch for the server is running on port 3000 before testing with postman

### End point tested
>**Base Url for authentication** = `api/v1/auth`
>**Base Url for entries** = `api/v1/entries/`

| Http-Method | URL | funtionality |
|---|---|
|POST|** /auth/signup **|Register a user|
|POST|** /auth/login **|Login a user|
| POST| /entries|Register a user|Add an entry by a signed in user|
| GET|** /entries/*entryId* ** |Fetch the details of an entry for a user|
| GET|** /entries**|Fetch all the entries for a user.|
| PUT|** /entries/*entryId* **|Modify a diary entry|
|DELETE|** /entries/*entryId* **|Delete a diary entry|


##  Tools used (Built With) 
Express - the javascript framework for server
Mocha - To test the api endpoint, so as to be sure that they are functioning 
JWT- Used json web token for user authication
Versioning
We adopt our technical for versioning the root. For the versions available, see the tags on this repository.
Acknowledgments
Hat tip to anyone whose code was used
Inspiration
npm documentation
w3school
friends and well wisher

 ###  Required Features 
Users can create an account and log in.  
Users can view all entries to their diary.  
Users can view the contents of a diary entry.  
Users can add or modify an entry. 

### Having two section
The front-end and back-end
the UI design are inside the UI folder

### Task
Write tests for the API endpoints
Ensure to test all endpoints and see that they work using Postman.


