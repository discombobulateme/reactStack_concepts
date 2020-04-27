# Node + Typescript

## Initial project configuration
    1. mkdir folder > cd folder > `yarn init -y` > `yarn add express` > `yarn add typescript -D` > `yarn tsc --init`
    2. create folder `src`/`server.ts`
    3. uncomment and give path in `tsconfig.json`:

        Where I want my converted to .js files to go:

        `"outDir": "./dist",` /* Redirect output structure to the directory. */

        Connection with main files folder:

        `"rootDir": "./src",` /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */

        Now we need to send this information > `yarn tsc`  

    4. When importing Express into server.ts an error will appear, which will give this instruction to try to install this declaration file with: `yarn add @types/express -D`
    5. Write a peace of code to activate Node in server.ts > send it to translate: `yarn tsc`
    6. Initiate node server/ run build: `node dist/server.js` > open http://localhost:3333
    7. But it's too many commands... how to make life easier? Go to `package.json` and create a script to run the build: underneath "licenses" > `"scripts": { "build": "tsc", },`
    8. But... the problemm with that is that this build process takes too much time. Instead we can add to development process ts-node-dev. 1st delete the dist folder, than: `yarn add ts-node-dev -D` 
    9. Now, back to package.json and add dev environment script: `"dev:server": "ts-node-dev src/server.ts"`  > save and run: `yarn dev:server`  and you will see that when you save a file, server automatically reloads. This replaces both tsc (translation from ts to js) and nodemon (reload server automatically)
    10. Now, just a few more adjusts on our script to make it even faster: transpileOnly  (doesn't check code, just translates... who checks will be my IDE/ VCS) & ignore-watch node_modules: make just to never touch node_modules folder: `"dev:server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"` 
## Configuring Editor Config

    Used to able distinct IDE's to work together

    1. On VSC install: editorconfig > install 
    2. On VSC, project root, right click: "Generate editor config" > open file and write your own configuration ;)
## Configuring ESLint

    EditorConfig + ESLint config will help to have a standard code pattern in a project

    1. Add ESLint: `yarn add eslint -D` > `yarn eslint --init` > (choose your favorite option: check syntax, find problems and force code style > type of module: because we are using Typescript, we can use JavaScript modules > which framework? as we are using Node: none of this > use typescript? y > where does proj run? Node > define style? use a popular style guide > Style guides: Standard: uses " ; "at the end of the line | Airbnb: " ; " at the end of le line + ' ' + , (end of object) | Google > config format: JSON > install with npm? N (because we are using yarn) > 
    2. install needed dependencies with yarn: "The config that you've selected requires the following dependencies: @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest" > yarn add in -D = development env + dependencies - whats is already installed (in green): yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest
    3.  **I had an error trying to add: "eslint-plugin-import@^2.20.1" I was able to taking ^ out: `yarn add -D eslint-plugin-import@2.20.1`  
    4. At VSC install ESLint > Cmd + Shift + Space: `Preferences: Open Settings (JSON)` > add the following configurations into file right after "editor.rules": 

            "[javascript]": {
                    "editor.codeActionsOnSave": {
                        "source.fixAll.eslint": true, 
                    }
                },
                "[javascriptreact]": {
                    "editor.codeActionsOnSave": {
                        "source.fixAll.eslint": true,
                    }
                },
                "[typescript]": {
                    "editor.codeActionsOnSave": {
                        "source.fixAll.eslint": true,
                    }
                },
                "[typescriptreact]": {
                    "editor.codeActionsOnSave": {
                        "source.fixAll.eslint": true,
                    },

    5. Create folder routes to separate the routes from the app file: src/routes/index.ts > import {Router} module from express (the routes module contains all the methods: get, post, put...): `import { Router } from 'express';` > create a basic structure as create a variable then export default:  `const routes = Router();` > `export default routes;`
    6. Get the route from server.ts and insert it into our new route file src/routes/index.ts: `app.get('/', (request, response) => response.json({ message: 'On Fire 🔥' }));` > but instead of app, use routes (as our new variable): `routes.get('/', (request, response) => response.json({ message: 'On Fire 🔥' }));`
    7. import routes into server: `import routes from './routes';` 
    8. a error will appear, we need to add another eslint extention: `yarn add -D eslint-import-resolver-typescript` what this extention does is to give the possibility to import typescripts files inside os each other, as by default it expects a js file import > go to .eslintrc.json file and add this configuration underneath "rules": 

            },
              "settings": {
                "import/resolver": {
                  "typescript": {}
              }
            }

    9. To reindent lines, in VSC: select lines > `Cmd + Shift + P` > Reindent
    10. But a few errors will persist, in import. That's because import expects a js file. To make it doesn't show as an error, go back to eslint congif and add to "rules"

            "rules": {
                "import/extensions": [
                  "error",
                  "ignorePackages",
                  {
                    "ts": "never"
                  }
                ]
            },

    11. Now to make the route function, we need to add a middleware into our app file server.ts. We do that by adding the function: use

            import express from 'express';
            import routes from './routes';
            
            const app = express();
            
            app.use(routes); // use = use ir as a middleware
            
            app.listen(3333, () => {
              console.log('🌮 Server started on port 3333');
            });

    12. Save and start server: `yarn dev:server`

## Configuring Prettier

    To make the code prettier ;). Is integrated with ESLint

    1. Add prettier and a few dependencies in the development : `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D` > go to eslint config file and add some rules:

            // recommended by typescript:
            "extends": [
                "airbnb-base",
                "plugin:@typescript-eslint/recommended",
                "prettier/@typescript-eslint",
                "plugin:prettier/recommended"
            ],
            // add prettier plugin
            "plugins": [
                "@typescript-eslint",
                "prettier"
              ],
            
            // make it a rule to return an error when a prettier error occur
            

    2. But prettier rules will conflict with previous one, so we must also create a prettier config file in our project root: `prettier.config.js` and add: 

            module.exports = {
              singleQuote: true,
              trailingComma: 'all',
              arrowParens: 'avoid',
            };

    3. Butttt you will see that ESLint will force to put this code into it's standard. To avoid that, we create a .eslintignore file on our project root and add: 

            /*.js
            node_modules
            dist

## Debugging Node
    1. VSC click on: Debug > create a lauch json file and configure it: 

            "version": "0.2.0",
              "configurations": [
                {
                  "type": "node",
            			// attach will run debug in the running application 
            			// launch will run debug when I launch the application
                  "request": "attach",
                  "protocol": "inspector",
                  "restart": true,
                  "name": "Debug",
                  "skipFiles": [
                    "<node_internals>/**"
                  ],
                  "outFiles": [
                    "${workspaceFolder}/**/*.js"
                  ]
                }
              ]

    2. As we are using "inspector" as a "protocol" we will need to add this flag into our scripts inside our package.json file: `"dev:server": "ts-node-dev --inspect --transpileOnly --ignore-watch node_modules src/server.ts"` this will allow VSC to connect with our code in the Dev environment
    3. Terminal will show that debugger is already listening to it: 

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_20.20.44.png](Node%20Typescript/Screen_Shot_2020-04-15_at_20.20.44.png)

    4. When I press play Debugger VSC will show a red line in the bottom: 

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_20.22.49.png](Node%20Typescript/Screen_Shot_2020-04-15_at_20.22.49.png)

    5. To test it, you can write a code that you know there's something wrong. Create a route, open insomnia, send. You're Debug Console will show you an error. 

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_21.21.51.png](Node%20Typescript/Screen_Shot_2020-04-15_at_21.21.51.png)

    6. You can click by the side of the code you want to separately verify, than send the route from insomnia again. You will see that the window Variables will show you what is it receiving back when you try to send the route

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_21.25.21.png](Node%20Typescript/Screen_Shot_2020-04-15_at_21.25.21.png)

    7. Now we can use another tool, the Watch. i can visualize a variable in real time. For example, we can + the expression I want to observe and it will return what is it reading:

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_21.28.41.png](Node%20Typescript/Screen_Shot_2020-04-15_at_21.28.41.png)

    8. I fix de code, then I receive the information automaticaly:

        ![Node%20Typescript/Screen_Shot_2020-04-15_at_21.39.12.png](Node%20Typescript/Screen_Shot_2020-04-15_at_21.39.12.png)

    9. Those are breakpoints that show us what is going on either globally and locally, all along the way
    10. Call Stack is everything that is call to execute the function
    11. Loaded scripts: which scripts were uses
    12. Breakpoints: we can filter
    
## Separating the routes files
    1. Create a file just for a type of route we will deal with. For example, to create an app for scheduling appointments, an `appointments.routes.ts` can be a good name > inside of it we will list our routes: 

            import { Router } from 'express'; //express module for routes
            
            const appointmentsRouter = Router();
            
            appointmentsRouter.post('/', (request, response) => {});
            
            export default appointmentsRouter;

    2. And in our main index.ts file we will link this file: 

            import { Router } from 'express';
            import appointmetnsRouter from './appointments.routes';
            
            const routes = Router();
            
            // use allows me to not repeat the path when creating a route in other fiels
            routes.use('/appointments', appointmetnsRouter);
            
            export default routes;

    3. While not having a database, we can store values in an empty array at `appointments.routes.ts` file: `const appointments = [];`
    4. To have automatic id's, remember, use library: uuidv4: `yarn add uuidv4` . This is how you can use it: 

            import { uuid } from 'uuidv4'; // unique universal id
            
            const appointments = [];
            
            appointmentsRouter.post('/', (request, response) => {
              const { provider, date } = request.body;
            
              const appointment = {
                id: uuid(), // inside of the object returns as a function
                provider,
                date,
              };
            
            	appointments.push(appointment);
            
              return response.json(appointment);
            });

    5. Insomnia also allow us to add a time stamp function, so it can return the exactly time we are sending the method: `Ctrl + Space` and choose :). This one will return with a time zone, which will probably not be the one you are at

        ![Node%20Typescript/Screen_Shot_2020-04-16_at_12.02.10.png](Node%20Typescript/Screen_Shot_2020-04-16_at_12.02.10.png)

        ![Node%20Typescript/Screen_Shot_2020-04-16_at_12.05.16.png](Node%20Typescript/Screen_Shot_2020-04-16_at_12.05.16.png)

    6. How to allow schedules only in round times?  add a library called date fns: `yarn add date-fns` > import libraries: startOfHour and parseISO (converts the string that comes back when method is sent by insomnia into a date js format):  `import { startOfHour, parseISO } from 'date-fns';` > include a variable for pasedDates > change constant object that received date into date: parsedDate:

            appointmentsRouter.post('/', (request, response) => {
              const { provider, date } = request.body;
            
              const parsedDate = startOfHour(parseISO(date));
            
              const appointment = {
                id: uuid(),
                provider,
                date: parsedDate,
              };

    7. And how to avoid 2 appointments at a time? We create a verification :) For that we can add another library from date-fns called isEqual: `import { startOfHour, parseISO, isEqual } from 'date-fns';` > then we create the verification:

        What 'findAppointmentsInSameDate' does is to search in each appointment inside os 'appointments' if the 'parsedDate' (a time booked by the user) exists. If it does, it returns an error: 400 and gives a message to the user

            const findAppointmentsInSameDate = appointments.find(appointment =>
                isEqual(parsedDate, appointment.date),
              );
            
              if (findAppointmentsInSameDate) {
                return response
                  .status(400)
                  .json({ message: 'This slot is already booked' });
              }

    8. You will see an error at appointments: "Variable 'appointments' implicitly has an 'any[]' type.". How to solve it? Creating a Type for it, using interface:

            interface Appointment {
              id: string;
              provider: string;
              date: Date; // because parseISO transforms it into js Date type
            }
            
            const appointments: Appointment[] = []; // we attribute the interface here

#Software architecture

## Routes (route: receive request, call another file, return response)
## Model/ Entity (data format)

    They define the data format. It will be created everytime we need this data to be stored. 

    We will clean the appointmens.route.ts file breaking it into several small files:

    1. create a folder: src/`models` > file: `Appointment.ts` we create a class **[to learn more about what a class/ constructor is](https://javascript.info/classes) for it:

            import { uuid } from 'uuidv4'; // because id will always come from this lib
            
            class Appointment {
              id: string;
            
              provider: string;
            
              date: Date;
            
              constructor(provider: string, date: Date) {
                this.id = uuid();
                this.provider = provider;
                this.date = date;
              }
            }
            
            export default Appointment;

    2. This will allow us to, instead of creating an Appointment interface for every single file, just importing it into the files, now in the `appointments.routes.ts`: `import Appointment from '../models/Appointment';` > And instead of needing a const to have a whole object at, just having a new Appointment: `const appointment = new Appointment(provider, parsedDate);`
## Creating repositories (data storage)

    Repository is a connection between the persistence and the route Persistency ↔ Repository ↔ Route . Repository is where we search for persisted information in the data base or in a variable, for example. In the repository I can have a method find to look for information, os a create, to create am information. We shall have only one per module. 

    1. create a repositories folder and an AppointmentsRepository.ts file: `src/repositories/AppointmentsRepository.ts` This file will be responsible for all the methods to be applied in my data. 
    2. create a class: 

            import Appointment from '../models/Appointment';
            
            class AppointmentsRepository {
              private appointments: Appointment[]; // not accessible outise the class
            
              constructor() {
                this.appointments = []; // = const appointments = Appointment[] = []
              }
            	
            	//to creare an appointment
              public create(provider: string, date: Date) {
                
              }
            }

    3. Now, continuing to clean the `appointments.routes.ts` file: what should be inside of this repository? 1st is the appointment schedule, so we need to transfere from appointments routes into repository:

            const appointment = new Appointment(provider, parsedDate);

    4. Now Typescript is bothered in this line, let's understand the error: 

        ![Node%20Typescript/Screen_Shot_2020-04-17_at_12.30.43.png](Node%20Typescript/Screen_Shot_2020-04-17_at_12.30.43.png)

    5. When we create a method inside of class in Typescript it is recommended to leave the return of the method. The return is the same format as the model. How do we know that??? Passing the mouse over the return:

        ![Node%20Typescript/Screen_Shot_2020-04-17_at_12.35.03.png](Node%20Typescript/Screen_Shot_2020-04-17_at_12.35.03.png)

    6. What you need to do is specify it after the function method after ' : '

            public create(provider: string, date: Date): Appointment {
                const appointment = new Appointment(provider, date);

    7. Import AppointmentsRepository inside of appointments routes: `import AppointmentsRepository from '../repositories/AppointmensRepository';`
    8. Instantiate the class: 

            const appointmentRepository = new AppointmentsRepository();

    9. That means that now we can use our methods (get/ post/ put( \o/, so, let's do it!

            const appointment = appointmentsRepository.create(provider, parsedDate);

    10. Now our [] appointments is not public anymore, so, how will the schuduler find what time is available or not? So... let's clean the appointments routes code a bit more... and change this:

            const findAppointmentsInSameDate = appointments.find(appointment =>
                isEqual(parsedDate, appointment.date),
              );

        Into this inside of repository: 

            public findByDate(date: Date): Appointment | null {
                const findAppointment = this.appointments.find(appointment =>
                  isEqual(date, appointment.date),
                );
            
                return findAppointment || null;
              }

        That means that we created a public functions to be able to search for an appointment. Null is something that it will require... 

    11. 
## Listing appointments: why repositories?

    We will create a route to see all the appointments. 

    1. Lets start on our repository creating a storage for this:

            public all(): Appointment[] {
                return this.appointments;
              }

    2. And now we create a route on out routes file: 

            appointmentsRouter.get('/', (request, response) => {
              const appointments = appointmentsRepository.all();
            
              return response.json(appointments);
            });

## SOC Separation of Concerns: each part of our code needs only ONE concern. - Working with data

    DTO Data Transfer Object: when we refactor our code, passing information from one place to another.

    1. On repository

            class AppointmentsRepository {
              private appointments: Appointment[];
            ---
            
            // DTO Data Transfer Object
            interface CreateAppointmentDTO {
              provider: string, 
              date: Date
            }
            
            ---
            // as a NON NAMED PARAMETER
            public create(data: CreateAppointmentDTO): Appointment {
                const appointment = new Appointment(data.provider, data.date);
            
                this.appointments.push(appointment); // I get the new appointment and save
            
                return appointment;
            }
            
            // OR desestructured, with NAMED PARAMETER
            public create({ provider, date }: CreateAppointmentDTO): Appointment {
                const appointment = new Appointment(provider, date);

    2. Why using a named parameter? Because arguments are not explicit, it can get super confusing after a while to understand what is this argument doing there and what for. Check the difference:

            // non named, using arguments:
            const appointment = appointmentsRepository.create(provider, parsedDate);
            
            // names parameters, using object:
            const appointment = appointmentsRepository.create({
                provider,
                date: parsedDate,
            });

    3. Using Typescript functions to create named parameters. On our models file, instead of creating a, interface to define our parameters type, we will use a function called Omit<>. That will automatically get the types defined inside of the class but exclude the one we don't want it to be passed because we are getting it static from an external library:

            // Instead of this: 
            class Appointment {
              id: string;
            
              provider: string;
            
              date: Date;
            
              constructor(provider: string, date: Date) {
                this.id = uuid();
                this.provider = provider;
                this.date = date;
              }
            }
            
            // we will have this, if we want all the parameters 
            constructor({ provider, date }: Appointment)
            
            // and this, using Omit<> if we want to exclude something
            // class name + what I want to exclude
            constructor({ provider, date }: Omit<Appointment, 'id'>)

    4. Now we have to remember of going into our repository and sending an Object {} instead of parameters ():

            public create({ provider, date }: CreateAppointmentDTO): Appointment {
                const appointment = new Appointment({ provider, date });

## Services (stores the business rules)

    How do I identify my business rules? Are the specificities of our code, the many if/ elses. 

    Every service receives ONLY responsible for one service

    1. Create a services folder with a service that does one thing and name it accordingly, in this case: src/services/CreateAppointmentService.ts >  needs to be public, file needs to start with Caps, use a class with ONLY one method: execute or run
    2. Separating what is a business rule from what is data transformation that my code needs  that is not a business rule. example: 

            // This is a date format
            const parsedDate = parseISO(date);
            
            // This is a business rule, it says: you can only have a booking when hour is round
            const appointmentDate = startOfHour(parsedDate);

    3. What we will do now is to change all business rules from routes into service file and solve one problem by one, because changing will bring several. Love them. But... what do we need to remember, what do we need to do into this file? 1. Receive information | 2. Make an error/ exception handling (tratativa) ex: status messages | 3. Access repository
    4. Services do not have direct access to request/ response data!

            // this is route before services exist:
            if (findAppointmentInSameDate) {
                  return response
                    .status(400) // error
                    .json('This slot is already booked');
                }
            
            // this is service:
            if (findAppointmentInSameDate) {
                  throw Error('This slot is already booked');
            }

            // this is routes after: using a try/catch and returning err.message
            appointmentsRouter.post('/', (request, response) => {
              try {
                const { provider, date } = request.body;
            
                const parsedDate = parseISO(date);
            
                const createAppointment = new CreateAppointmentService(
                  appointmentsRepository,
                );
            
                const appointment = createAppointment.execute({
                  date: parsedDate,
                  provider,
                });
            
                return response.json(appointment);
              } catch (err) {
                return response.status(400).json({ error: err.message });
              }

    5. **Dependency Inversion (SOLID):** when my service* (can be apply to others too) needs an external dependency, such as our appointments.repository, instead of instantiating this repository class inside of our service class, we will receive it as a parameter of our class o_O/ constructor. This will make sure that this database is being used in all the services, otherwise it would create a new [ ] database inside of every service. In other words: I need to start this repository as a parameter os this class.

            // import repository: 
            // when I need the parameter of a class to be the instantiate from another class
            import AppointmentsRepository from '../repositories/AppointmensRepository';
            
            // then instantiate it and use it as a parameter
            constructor(appointmentsRepository: AppointmentsRepository) { }

    6. 
## SOLID

    SOLID are principles object-oriented programming, is an acronym for 5 design principles intended to make software designs more understandable, flexible and maintainable: 

    - Single-responsibility: A class should only have a single responsibility
    - Open–closed: Software entities ... should be open for extension, but closed for modification
    - Liskov substitution: Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program
    - Interface segregation: Many client-specific interfaces are better than one general-purpose interface
    - Dependency inversion: One should "depend upon abstractions, [not] concretions
