# Node Concepts

- Whats is Node.js?

    [Node.js](https://nodejs.org/en/) is a platform for backend (business rules, to talk with third parts) development that uses JavaScript language. It's built on Chrome's V8 JavaScript engine. 

    It can be compared to: PHP, Python or Ruby.

    It's based on ROUTES, not on final users events.

    **Characteristics:** 

    - Event-loop architecture (monitors events, as a while loop)
    - Call Stack: executes in pile/ stack
    - Node single thread: alocated in only 1 processor core, but uses libuv in the back (C++), and that takes advantage of multiple computer processors
    - Non blocking I/O: input and putput are never blocked, I can return a client message in small parts. That means that front and back end are always communicating, which allows real time applications

        ![Node%20Concepts/IMG_4320.jpg](Node%20Concepts/IMG_4320.jpg)

    ![https://cdn-images-1.medium.com/max/1600/1*fBEbMgk6--QtIUUed3KcMQ.png](https://cdn-images-1.medium.com/max/1600/1*fBEbMgk6--QtIUUed3KcMQ.png)

    **Benefits:** 

    - Work with multiple clients (frontend) using a same backend
    - Uses a standard communication protocol: JSON, including communication with external services
    - Uses the same structure for: front/ back and mobile

- What is NMP and Yarn?

    Both are package managers for JS, comparable to other languages such as: composer for PHP, GEMS for Ruby and PIP for Python

- API REST - what is it?

    A RESTful API is an application program interface ([API](https://searchapparchitecture.techtarget.com/definition/application-program-interface-API)) that uses HTTP requests to GET, PUT, POST and DELETE data.

    A RESTful API is based on representational state transfer ([REST](https://searchapparchitecture.techtarget.com/definition/REST-REpresentational-State-Transfer)), an architectural style and approach to communications.

    Is works in a requests - response flux:

    ![Node%20Concepts/IMG_4319.jpg](Node%20Concepts/IMG_4319.jpg)

- Frameworks: Express

    [Express](http://expressjs.com/) is a fast, unopinionated, minimalist web framework for Node.js.

    That means that the structure is minimal, you create what you want, there's only a few but very functional functions and works very well with microservices. Un-opinionated allows the developer and trusts the developer to make the right decisions and puts more control in their hands.

    To install, on your backend project folder:

        yarn add express

    That will create a package.json file

    As a contrast, opinionated frameworks lock or guides you into their way of doing things. Examples: Adonis.js , Nest.js

- Nodemon and Script

    Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

    To install, inside of your backend project folder:

        yarn add nodemon -D

    -D will create it inside of DEV environment only.

    To execute: 

        yarn nodemon src/index.js

    **SCRIPT**

    Instead of executing with this command, you can create an script on your package.json file.

    This is how to add an script for dev environment at package.json :

        {
          "name": "backend",
          "version": "1.0.0",
          "main": "src/index.js",
          "license": "MIT",
          "scripts": {
            "dev": "nodemon"
          },
          "dependencies": {
            "express": "^4.17.1"
          },
          "devDependencies": {
            "nodemon": "^2.0.2"
          }
        }

    In this script we added the main file path into main property:

     "main": "src/index.js",

    And created another property inside of the object, giving it the nodemon value. 

    "scripts": {
        "dev": "nodemon"
      },

    Than, to execute you can type only: 

        yarn dev

- HTTP Codes

    1XX informational

    2XX Success

    200 Success

    201 Created

    3XX Redirection

    301 Moved permanently

    302 moved

    4XX Client error

    400 Bad request

    401 Unauthorized

    404 Not found

    5XX Server error

    500 Internal server error

- HTTP Methods

    HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.

    **Main methods:** 

    GET: get an info in the backend

    http://api.com/users   -  **users = route/ resource**

    POST: creates an info in the backend

    http://api.com/users

    PUT: changes, replaces all current info of the target resource

    http://api.com/users/1   -  **1 = parameter, it's needed to know what to change**

    PATCH: changes, replaces partial modifications to a resource

    http://api.com/users/1 

    DELETE: deletes the specified resource

    http://api.com/users/1  

    For detailed explanation check [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

    Examples: 

        //get is the only method that can be tested on browser
        //the others need Insomnia
        app.get('/metodoget', (request, response) => {
          return response.json([
            'Teste envio 1',
            'Teste envio2',
          ]);
        });
        
        //Method POST creates a new information
        //this is a simulation that 'Teste envio 3' was created
        app.post('/metodoget', (request, response) => {
          return response.json([
            'Teste envio 1',
            'Teste envio2',
            'Teste envio 3',
          ]);
        });
        
        //Method PUT needs a unique identification, id, to know what to change
        //this is a simulation that 1 was changed to 4
        app.put('/metodoget/:id', (request, response) => {
          return response.json([
            'Teste envio 4',
            'Teste envio2',
            'Teste envio 3',
          ]);
        });
        
        //Method DELETE deletes an information
        //this is a simulation that 1 "Teste" was deleted
        app.delete('/metodoget/:id', (request, response) => {
          return response.json([
            'Teste envio 4',
            'Teste envio2',
          ]);
        });
        
        //in which door I want this to go?
        app.listen(3333, () => {
          console.log('🦉');
        });

    Request content

    ![Node%20Concepts/IMG_4318.jpg](Node%20Concepts/IMG_4318.jpg)

    **FILTERING CONTENT**

    An example on how to create a search filter

        app.get('/projects', (request, response) => {
          const { title } = request.query;
        
          //filtering a result
          const results = title
            ? projects.filter(project => project.title.includes(title))
            : projects;
        
          return response.json(results);
        });

    And teste it in Insomnia

    ![Node%20Concepts/Screen_Shot_2020-04-10_at_10.39.29.png](Node%20Concepts/Screen_Shot_2020-04-10_at_10.39.29.png)

    With the filter (check the checkbox to habilitate it)

    As I wrote on the Query: title = react, filter returns only the id where this info appears

    ![Node%20Concepts/Screen_Shot_2020-04-10_at_10.39.50.png](Node%20Concepts/Screen_Shot_2020-04-10_at_10.39.50.png)

- Insomnia

    [Insomnia](https://insomnia.rest/) is a cross-platform desktop application to interact with HTTP-based APIs. Some functionalities are: testing HTTP methods, authentication helpers, code generation, and environment variables.

    Workspaces. Core concept used for isolating projects within Insomnia. All data, except for global settings, are stored at the workspace-level.

    [Detailed documentation.](https://support.insomnia.rest/category/19-using-insomnia) 

    GET method:

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.21.13.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.21.13.png)

    POST method

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.23.52.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.23.52.png)

    Observe that for PUT and DELETE it is necessary that the route inform an id!

    PUT method

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.25.47.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.25.47.png)

    DELETE method

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.27.20.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.27.20.png)

    **Environment variables**

    Insomnia can also create your dev, production and other environments needed. 

    You can set it on "Manage Environment" and create a new "Subenvironment". 

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.33.11.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.33.11.png)

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.33.33.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.33.33.png)

    After creating the environment, attribute it into the route path (to access path options: ctrl + space)

    ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.34.01.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.34.01.png)

- Basic HTTP server structure

    This is the very basic structure:

        //import express = node framework that offers microservices
        const express = require('express');
        
        //intiate application
        const app = express();
        
        //define response route that I want to observe
        //address, function that returns a response, how do I want this response
        app.get('/projects', (request, response) => {
          return response.json({ message: 'Hello Paloma beautiful dev :)' });
        });
        
        //get is the only method that can be tested on browser
        //the others need Insomnia
        
        //in which door I want this to go?
        app.listen(3333, () => {
          //this console log allows me to visually check if the connection is ok
        	console.log('🦉');
        });

- Parameters Types

    How our client (frontend/ Insomnia) sends information.

    - Query Params: Nominated parameters

        Mostly used for filters and pagination. Filter = list = GET parameter. It's the ones sent to the routes after "?".

        How do we see it in the URL address? 

        ?: start my parameters

        title= (filter name) Diego(what am I searching for) & (more filter) `http://localhost:3333/projects?title=React&owner=Diego`

        This is how can I simulate it in Insomnia and on my code: 

        `console.log(query)` will show it the search made in Insomania: { title: React }

        How do I see it in my code? 

        `const query = request.query;`

        *`console*.log(query);`

        Destructured:

        `const {title} = request.query;`

        *`console*.log(title);`

        ![Node%20Concepts/Screen_Shot_2020-04-08_at_13.56.03.png](Node%20Concepts/Screen_Shot_2020-04-08_at_13.56.03.png)

    - Route Params: Identify unique resource (:id)

        Identify resources when updating/ deleting (:id). Because I need to tell my backend which resource I want to change. Can also use request BODY (request content).

        In my code: 

        (destructured, to return only the request, not the whole object)

        `const { id } = request.params;`

        *`console*.log(id);`

    - Request Params: Body request

        All the rest. Creates/ changes/ edits a resource using JSON. Ex: when a user needs to update a form.

        In my code: `const body = request.body;`  + make sure to tell Express to understand JSON: `app.use(express.json());`If you don't do it, it will return an "undefined" message

        In Insomnia: Body - JSON

        ![Node%20Concepts/Screen_Shot_2020-04-08_at_14.09.38.png](Node%20Concepts/Screen_Shot_2020-04-08_at_14.09.38.png)

- UUIDV4 Universally unique identifier

    This is a library used to create random ID's [https://www.npmjs.com/package/uuidv4](https://www.npmjs.com/package/uuidv4)

- Middleware

    Its a function that works as a requisition interceptor, before the response getting back to user. Able to: totally interrupt or change requisition data.

    [See more info](https://blog.rocketseat.com.br/middlewares-no-express-js/).

    Understanding... 

    When am I gonna use it? My routes are also a middleware, but I will use this function when I want this process to occur automatically in one or more routes of my application.

    How does it looks like?  I can use all the request/ response parameter: body, query, route. 

    - #1 Applying to all routes

            //this function is a Middleware
            //It works as a requisition interceptor, before the response getting back to user
            //this function below allows me to see all the requests a user does
            function logRequest(request, response, next) {
              const { method, url } = request;
            
              const logLabel = `[${method.toUpperCase()}] ${url}`;
            
              console.log(logLabel); //I can see in the terminal which route was requested
            
              return next(); //next = next middleware in the linear path = a route
            	//if this next is not there, the app is interrupted
            }
            
            app.use(logRequest);

        Here you see the code and calling the LIST/ GET method in Insomnia. It returns in the terminal/ console.log:

        ![Node%20Concepts/Screen_Shot_2020-04-10_at_13.25.54.png](Node%20Concepts/Screen_Shot_2020-04-10_at_13.25.54.png)

        Same here when I use CREATE/ POST

        ![Node%20Concepts/Screen_Shot_2020-04-10_at_13.26.39.png](Node%20Concepts/Screen_Shot_2020-04-10_at_13.26.39.png)

    - #2 Applying to only 1 route

            function logRequest(request, response, next) {
              const { method, url } = request;
            
              const logLabel = `[${method.toUpperCase()}] ${url}`;
            
              console.log(logLabel);
            
              return next(); //next = next middleware in the linear path = a route
            }
            
            // app.use(logRequest);
            
            //instead of calling to all the routes, as above: app.use(logRequest); 
            //I can make it as below: an interceptor to 1 route only
            app.get('/projects', logRequest, (request, response) => {
              const { title } = request.query;
            
              //filtering a result
              const results = title
                ? projects.filter(project => project.title.includes(title))
                : projects;
            
              return response.json(results);
            });

    - #3 Applying in between routes

        For example, to measure the time in between requesting/ responding to the route

            function logRequest(request, response, next) {
              const { method, url } = request;
            
              const logLabel = `[${method.toUpperCase()}] ${url}`;
            
              console.time(logLabel);
              
            	//!!! when in between routes, return is out!!!
              next(); 
            
              console.timeEnd(logLabel);
            }
            
            app.use(logRequest);

        In the console log you will see how long did it take. 

        ![Node%20Concepts/Screen_Shot_2020-04-10_at_13.44.18.png](Node%20Concepts/Screen_Shot_2020-04-10_at_13.44.18.png)

    - #4 Using a middleware as validation

        1 Possibility: inserting middleware in the route

            function validateProjectId(request, response, next) {
              const { id } = request.params;
            
              //this will totally stop the process if the ID is not identified
              if (!isUuid(id)) {
                return response.status(400).json({ error: 'Invalid project ID'});
              }
            
              return next();
            }
            
            app.use(logRequest);
            
            //the middleware validateProjectId is used before request/ response
            app.put('/projects/:id', validateProjectId, (request, response) => {
              const { id } = request.params;
              const { title, owner } = request.body;
              
              const projectIndex = projects.findIndex(project => project.id === id);
              
              if (projectIndex < 0) {
                return response.status(400).json({ error: 'Project not Found' })
              }
            
              const project = {
                id,
                title,
                owner,
              };
            
              projects[projectIndex] = project;
            
              return response.json(project);
            });
            
            app.delete('/projects/:id', validateProjectId, (request, response) => {
              const { id } = request.params;
            
              const projectIndex = projects.findIndex(project => project.id === id);
              
              if (projectIndex < 0) {
                return response.status(400).json({ error: 'Project not Found' })
              }
            
              projects.splice(projectIndex, 1);
              //204 status because it will return an empty thing
              return response.status(204).send();
            });

        Another way is making it globally:

            function validateProjectId(request, response, next) {
              const { id } = request.params;
            
              //this will totally stop the process if the ID is not identified
              if (!isUuid(id)) {
                return response.status(400).json({ error: 'Invalid project ID'});
              }
            
              return next();
            }
            
            app.use(logRequest);
            //in all the routes that ID is needed, use this validator
            app.use('/projects/:id', validateProjectId);