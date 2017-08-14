# jSeeker

A Github authenticated app that helps developers with Front-end JavaScript interview questions and job hunt organization. You are a jSeeker, a JavaScript Jobs Seeker.

* User will be authenticated through Github (if you don't have one, you should as a developer)

## Front-end JavaScript Developer Q & A
* User will have access to a list of front end questions, with the ability to google them in a link automatically
* User will be able to answer the questions, save those answers, and mark them as correct or not (self checking)
* User will be able to answer random questions, with an option of how many to generate
* Admin can add questions
* User will be able to do markdown syntax in their answers
* User can use (tab) to generate 2 spaces in the answer section

## Job Seeker
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
