# jSeeker

A Github authenticated app that helps developers with Front-end JavaScript interview questions and job hunt organization. You are a jSeeker, a JavaScript Jobs Seeker.

* User will be authenticated through Github (if you don't have one, you should as a developer)

## User Stories : Front-end JavaScript Developer Q & A
* As an unauthenticated user, you can view question categories and questions
* As an unauthenticated user, you can generate random questions with a specific number
* As an authenticated user, you can answer these questions and save them
* As an authenticated user, you can generate markdown in your answers
* As an authenticated user, you can answer generated random questions (quizzes)

## User Stories : Job Seeker
* User will be able to create a list of jobs he has applied to on a job search site
* User will be able to see a tally of how many jobs he has applied to in each job search site, and

* The app will be live at [https://jseeker.herokuapp.com](https://jseeker.herokuapp.com)

## Dependencies
* Back-end
1. mongoDB / mongoose
2. express
3. ejs
4. passport / passport-github
5. dotenv
6. morgan

* Front-end
1. jQuery
2. bootstrap 3.x

## How to install
* create '.env' configuration file and fill up the corresponding values after registering the app in twitter
```
MONGODB_URI=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK=
```
* `npm start`

## Models
```
user
+----> _id
+----> github_id
+----> name
+----> avatar
+-----------> [ answers ]
+-----------> [ applications ]

question_categories
+----> _id
+----> category
+-----------> [ questions ]

questions
+----> _id
+----> category.id
+----> question
+----> answer_link

answers
+----> _id
+----> user.id
+----> question.id
+----> answer
+----> mark

```
## pages
1. index.ejs - homepage / login

## To Do
* refactor to ES6 standards
* refactor routes, error handling

## Author
Neptune Michael Cabelin

## License
MIT
