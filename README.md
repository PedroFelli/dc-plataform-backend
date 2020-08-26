###  FORMAT: 1.0
####  HOST: https://api-bossabox-pedro.herokuapp.com/

# Desafio Back-end VUTTR (Very Useful Tools to Remember)
  Um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

  Você pode testar os

# Technologies
This project was made using the follow technologies:

* [Typescript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://mongodb.com/docs)
* [Mongoose](https://mongoosejs.com/)
* [Jest](https://jestjs.io/)


# Installation

### Project
1.  Clone the git repository:

          git clone https://github.com/PedroFelli/VUTTR-api.git

2. In the new folder you will find a `example.env` file, duplicate it and rename it to `.env` only.
3. in the new `.env` file, the env variables to fit your environment `MONGODB_URL` and `APP_SECRET`.
4. Run `npm install` or `yarn` to install the packages.
8. In another window run `npm run start` or `yarn start` .
5. Open your browser and navigate to `localhost:3000` .
6. You should now see the APIs landing page.


## Run tests
To run the tests `npm test` or `yarn test`.

# Data Structures

## User (object)
+ name: "Pedro" (string)
+ email: "pedro@email.com"(string)
+ password: "yourpassord" (string)

## Login (object)

+ email: "pedro@email.com" (string)
+ password: "yourpassord" (string)

## Tool (object)
+ id: 5f288c77ec82b65011cf6ab5 (string)
+ title: Notion (string)
+ description: All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. (string)
+ link: "https://github.com/typicode/hotel" (string)
+ tags: ["organization","organizing"] (Array[string])


# User [/users]

### Create new User  [POST]
Create a new user to use the application.
+ Request (application/json)
    + Body

            {
                "name": "Pedro",
	            "email": "pedro@email.com",
	            "password": "12345678"
            },
    + Schema

            {
              "$users": "http://localhost/$users/",
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                },
              }
            }
+ Response 201 (application/json)
    + Attributes (User)

            {
           	  "name": "Pedro",
	            "email": "pedro@email.com",
            },


## Session [/session]

### Create new session(login) [POST]
  Create new session to get your `token`

+ Request (application/json)
    + Body

            {
	          "email": "pedro@email.com",
	          "password": "12345678"
          },
    + Schema

            {
              "$users": "http://localhost/$users/",
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                },
              }
            }
+ Response 201 (application/json)
    + Attributes (User)

            {
             "user": {
             "name": "Pedro",
             "email": "pedro@email.com"
              },

              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTY5ODM4MTMsImV4cCI6MTU5NzA3MDIxMywic3ViIjoiNWYzMDA2MTNjY2UyMjc1MDRiNTVhODUyIn0.1_vWJwR5yZ_3gMlG-63IEli9Zr2XzpC4qLolZV1Beqw"
            },


## Tools [/tools/all]
### To use these routes you need to add your `token` in the request  header

### Retrieve All Tools [GET]

+ Headers
  + Bearer JWT: `token`(required)
+ Response 200 (application/json)
    + Attributes (array[Tool])

## Tools [/tools/{$tag}]

### Retrieve All Tool with specific tag[GET]
+ Headers
    + Bearer JWT: `token`(required)
+ Parameters
    + tag (string)
+ Response 200 (application/json)
    + Attributes (array[Tool])

## Tools [/tools]
### Create new Tool  [POST]
Create a new Tool object.
+ Request (application/json)
    + Headers
       + Authentication: Bearer JWT(required)
    + Body

            {
            "title": "hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "link": "https://github.com/typicode/hotel",
              "tags": [
                "node",
                "organizing"
              ],
          },
    + Schema

            {
              "$tools": "http://localhost/$tools/",
              "type": "object",
              "properties": {
                "title": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "link": {
                  "type": "string"
                },
                "tags": {
                  "type": "array",
                    "items": {
                    "type": "string"
                  },
                  "minItems": 1
                }
              }
            }
+ Response 201 (application/json)
    + Attributes (Tool)


## Tools [/tools/{$id}]

### Delete Tool[DELETE]
Delete a tool, `id` must be real.
+ Headers
     + Bearer JWT: `token`(required)
+ Parameters
    + id (string)
+ Response 204 (application/json)

