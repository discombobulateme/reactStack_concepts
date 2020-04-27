# README_React Concepts

Is a library for build interfaces. Can be used for ALL that is visible, including VR.

Is [SPA Single Page Applications](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58): backend returns a JSON and Frontend controls routes and data. 

Page loads only once, then data is transmitted back and forth.

Everything is inside Javascript!

**React:** is the react library used for build interfaces

**ReactJS**: react behaviour in browser

**React Native**: react + native libraries for mobile construction

[Quick pattern check](https://reactpatterns.com/)

[About import/ export](https://javascript.info/import-export)

Basic code construction:

 

```jsx
//import react library
import React from 'react';

//a function that returns something
function (props) {
  return <h1>Hello, {props.name}</h1>;
}

//export
export default;
```

- Sharing responsabilities: back-end (business rules) / front-end (interface)
- One API, multiple clients (1 API-REST back-end: mobile, web clients)
- Its a [declarative programming](https://tylermcginnis.com/imperative-vs-declarative-programming/) (vs imperative = dev need to describe each step) = dev tell the expected result, and the programming behaves according the states that we give
    - Declarative programming always get actual state, never compares to previous one

JSX

- write HTML inside JS - functions written in JS returns a HTML

```jsx
function Button() {
	return (<button type="button"><span class="icon">></span></button>)}
```

- create our own elements with react

```jsx
function Header() { return <Button /> }
```

- Configuring Babel

    Browser still needs a conversion to understand new technologies such as react functionalities, Babel translates "transpilates" (from: transpilation = programming convertion) our components and libraries into JS 

    Adding to project and installing:

    1. mkdir frontend
    2. `yarn init -y install` package.json = project dependencies
    3. mkdir src folder
        1. index.js
    4. mkdir public folder
        1. index.html `html:5` for VSC to create the html structure
        2. `div#app` for VSC to create a basic div structure
    5. `yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli`
    6. `babel.config.js`
        1. D[ocumentation](https://babeljs.io/docs/en/presets) for more presets. This can be used in ALL react projects:

        ```jsx
        module.exports = {
          presets: [
            //converts only functionalities that browser/ environment don't understant
            '@babel/preset-env',
            //add react functionalities to this version, like HTML inside JS
            '@babel/preset-react'  
          ],
        };
        ```

    7. `yarn add @babel/cli` allows a simpler syntax
    8. `yarn babel src/index.js --out-file public/bundle.js` allows me to redirect babel transpilation automatic into other file. out file means that we are asking to send the information from index into bundle file
    9. add script into index.html file `<script src="bundle.js"></script>` and that will be responsible for showing the result in every browser
- [Configuring](https://webpack.js.org/configuration/) Webpack

    Webpack get the Babel translation and creates Bundle, a file containing all application code. For each file (.js, .css, .png) it converts in a different ways

    - Loaders: webpack teaches Browsers how to import other files such as CSS, images. Some loaders: babel-loader (JS), css-loader, image-loader
    - Live reload: it automatics reloads the page without the need to refresh
    1. Add webpack.config.js in the project root
    2. `yarn add babel-loader` helps webpack to understand how to deal with javascript
    3. That says: Yo! When I need a .js file that is NOT inside of node_modules, convert it to me using babel :)

    ```jsx
    const path = require('path');

    module.exports = {
      //this is the directory path
      //we use this to all OS can understand
      //in MAC we can use simply: '/src/index.js'
      entry: path.resolve(__dirname, 'src', 'index.js'),
      //where does the transpilation goes?
      output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
      },
      //creating some rules
      module: {
        rules: [
          //each of this is a diferent loader
          {
            test: /\.js$/, //regular expression that says: look only for js files
            exclude: /node_modules/, //those are node responsability, not webpack
            use: {
              loader: 'babel-loader',
            }
          }
        ]
      },
    };
    ```

    4. `yarn webpack --mode development`

    5. `yarn add webpack-dev-server -D` webpack development server

    6.  add it into webpack.config.js before modules

    ```jsx
    //connects to webpack development server
      devServer: {
        contentBase: path.resolve(__dirname, 'public'),
      },
    ```

    7. LIVE RELOADING: `yarn webpack-dev-server --mode development` starts the application in server mode, and that keeps monitoring changes in the bundle file, extended from index.js file. !!! only when you open the [localhost](http://localhost) file!!! (check in terminal log which one is sending you to)

- Componentization

    ![README_React%20Concepts/Screen_Shot_2020-04-12_at_17.48.02.png](README_React%20Concepts/Screen_Shot_2020-04-12_at_17.48.02.png)

    Organization: **componentization**. That means that I can isolate the logic of a component without interfering in the rest of the application, its a group of: **logical, structure (HTML) and stylization** **(CSS)**. They can be repeated as much as needed.

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_17.11.01.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_17.11.01.png)

    HTML document get a <div>, there is where my react code will be. INDEX.JS has the html that will be seen in the browser, that is JSX = html inside the js. But in INSPECT show this html in the elements structure, right below the <div>

    Now, see what happens when we apply the componentization structure: 

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_17.44.26.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_17.44.26.png)

    Inside of INDEX.JS I render the component, written as a html tag: <App /> but the html is written inside of a function in the App.js component, which I export and then import into index.js. Inspect still "sees" the <h1> element inside of the < div> .

    And now, another component, a HEADER, that usually goes in everypage

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_18.07.24.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_18.07.24.png)

    INDEX.JS renders the 'app' id that goes to the INDEX.HTML, but get the infos from APP.JS, the main application file. App.js imported the HEADER.JS, which has the function that returns the html that will be rendered in the browser. In INSPECT we see that now inside the <div> there's a < header>.

    When I want 2 components to appear follow by each other I need to have them inside of an element, a <div> (or it will give me an error) for example:

    ```jsx
    function App() {
      return (
        <div>
          <Header />
          <Header />
        </div>
      );
    };
    ```

    But it creates a html element, and when we don't want that we can involve them with:

    **Fragment**

    `<> </>` creates a container to envolve one or more components without creating a visual effect at DOM

    ```jsx
    <>
    	<Header />
      <Header />
    </>
    ```

- Properties (props)

    ![README_React%20Concepts/propertyReact.jpg](README_React%20Concepts/propertyReact.jpg)

    Information that goes from Component father to son. It's like an html attribute, but in react it calls property

    At APP.JS inside `<Header/>` tag now there's a property called "`title`"

    At HEADER.JS component, Header function takes a property: `function Header(props)` and inside of the "html" structure, I insert this props in between `{title}`

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_22.14.03.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_22.14.03.png)

    In the above example Header shows the props version where ALL the properties will be there

    ```jsx
    export default function Header(props) {
      return (
        <header>
          <h1>{props.title}</h1>
        </header>
      );
    }
    ```

    , and the destructured version, when I choose only the properties that I want to use

    ```jsx
    export default function Header({ title }) {
      return (
        <header>
          <h1>{ title }</h1>
        </header>
      );
    }
    ```

    Children: when I want to access my component content

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_22.25.37.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_22.25.37.png)

    When my component contains several html elements inside I need to call, together with the properties, the children property

    ```jsx
    export default function Header({ title, children }) {
      return (
        <header>
          <h1>{ title }</h1>

          { children }
        </header>
      );
    }
    ```

    [Key property](https://reactjs.org/docs/lists-and-keys.html#keys)

    Keys help React identify which items have changed, are added, or are removed. Every time that I need to interact with an array react needs an identification, a react property called key that needs to have an specific name. This has to be inserted in the 1st element, or an error returns in INSPECT

    ![README_React%20Concepts/Screen_Shot_2020-04-11_at_22.44.04.png](README_React%20Concepts/Screen_Shot_2020-04-11_at_22.44.04.png)

    To correct it: (the name you give to the key, must be a unique one, often the name of the array or the id)

    ```jsx
    <ul>
    	{ projects.map(project => <li key={project}>{ project }</li>) }
    </ul>
    ```

- State and Immutability

    ![README_React%20Concepts/stateReact.jpg](README_React%20Concepts/stateReact.jpg)

    State { useState } is the information that your component will keep. It returns an array with 2 positions/ parameters: [ 1st the variable with initial value, function to update the previous value]

    To use it, I need to import it from react: `import React, { useState } from 'react';`

    This variable: `const projects = ['App development', 'Front-ent web'];` becomes:

    ```jsx
    //useState goes around my array
    //than const [ 1st the variable with initial value, function to update the previous value]
    const [projects, setProjects] = useState(['App development', 'Front-ent web']);
    ```

    And the function, instead of: `function handleAddProject() {projects.push(`New Project ${Date.now()}`); }` becomes

    ```jsx
    function handleAddProject() {
        setProjects([...projects, `New Project ${Date.now()}`]);
      }
    ```

    Why? To be able to apply the immutability concept: I need to return a new array, instead of modifying the original

    Instead of push, that doesn't respect immutability, use SPREAD operator, that copies everything from one array into another

    Full function:

    ```jsx
    import React, { useState } from 'react';
    import Header from './components/Header';

    function App() {
      const [projects, setProjects] = useState(['App development', 'Front-ent web']);

      function handleAddProject() {
        setProjects([...projects, `New Project ${Date.now()}`]);
      }

      return (
        <>
          <Header title='Projects'/>
          <ul>
            { projects.map(project => <li key={project}>{ project }</li>) }
          </ul>
          <button type="button" onClick={handleAddProject}>Add Projects</button>
        </>
      );
    };
    export default App;
    ```

- Importing CSS and images
    1. Add loaders: `yarn add style-loader css-loader` **I ran into error, and had to install also: `npm install style-loader --save` to solve it
    2. Configure Webpack to added loaders (inside of module rules)

        ```jsx
        {
          test: /\.css$/, 
          exclude: /node_modules/, 
          use: [
        		 { loader: 'style-loader '},//inserts interpreted css and injects in in html
        	   { loader: 'css-loader '}, //reads css file and interprete imports, such as images
          ]
        }
        ```

    3. Create a script at package.json to start server with a shorter syntax (underneath "license")

        ```jsx
        "scripts": {
            "dev": "webpack-dev-server --mode development",
            "build": "webpack --mode production"
          },
        ```

    4. Now you can start with: `yarn dev` for development environment and `yarn build` for production environment
    5. Add loader for files: `yarn add file-loader`
    6. Configure Webpack to added loaders (inside of module rules)

        ```jsx
        {
        	test: /.*\.(gif|png|jpe?g)$/i, //?= with or withou e | i = case insensitiv
        	use: {
        		loader: 'file-loader',
        	}
        }
        ```

    7. Create a folder to hold all images called:  **assets**, inside src
    8. Add an image: 

        ```jsx
        import backgroundImage from './assets/background.jpg';

        <img width={1000} src={backgroundImage}/>
        ```

- Listing and Registering API projects: connecting back and front
    1. Start node on terminal: cd backend > yarn dev 

        ![README_React%20Concepts/Screen_Shot_2020-04-12_at_13.04.13.png](README_React%20Concepts/Screen_Shot_2020-04-12_at_13.04.13.png)

    2. Open Insomnia and create a few projects
    3. Add Axios: responsible for api calling, connecting front and backend `yarn add axios`
    4. Create a folder **services** inside src. File that communicate with external services.
    5. Inside of services folder create a **api.js** file

        ```jsx
        import axios from 'axios';

        const api = axios.create({
          baseURL: 'http://localhost:3333' //this baseURL were settled at Insomnia and Node
        });

        export default api;
        ```

    6. Connect api.js with App.js

        ```jsx
        import api from './services/api';
        ```

    7. { [useEffect](https://medium.com/better-programming/understanding-the-useeffect-dependency-array-2913da504c44) } react function that start a function when I have an altered information, or when I need it to start after a user behaviour `import React, { useState, useEffect } from 'react';` > the function takes 2 parameters: 1st (which function I want to start) and second [when I want it to start = dependency array] `useEffect((1st) => {}, [2nd] );` The dependency array is the second optional argument in the `useEffect` function. As the name implies, it is an array of dependencies that, when changed from the previous render, will recall the effect function defined in the first argument. Dependency arrays usually takes the variables used in the first parameter.

        ```jsx
        function App() {
          const [projects, setProjects] = useState([]); //initialize State w/ data type as will follow [], {}

          useEffect(() => {
            api.get('projects').then(response => {
              setProjects(response.data);
            })
          }, []); //dependency array
        ```

    8. Adding CORS to backend. `yarn add cors` > at index.js import cors `const cors = require('cors');` > call it `app.use(cors());` this allows frontend to have access to this environment. When going to production it will need an address
    9. Add babel plugin that manage to understand await function: `yarn add @babel/plugin-transform-runtime` 
    10. Add plugin configuration into babel.config.js

        ```jsx
        module.exports = {
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        };
        ```

    11. Now I can check in INSPECTOR that I can add a new project in the browser using button and it will appear directly the new project in the browser. In Inspect/ Network we can also check that it returns a 200 code = success

        ![README_React%20Concepts/Screen_Shot_2020-04-12_at_14.15.02.png](README_React%20Concepts/Screen_Shot_2020-04-12_at_14.15.02.png)

    12. Full code:

    ```jsx
    function App() {
      const [projects, setProjects] = useState([]); //initialize State w/ data type as will follow [], {}

      useEffect(() => {
        api.get('projects').then(response => {
          setProjects(response.data);
        });
      }, []); //dependency array

      async function handleAddProject() {

        const response = await api.post('projects', {
          title: `New Project ${Date.now()}`,
          owner: 'discombobulateme',
        });

        const project = response.data;

        setProjects([...projects, project]);
      }

      return (
        <>
          <Header title='Projects'/>

          <ul>
            { projects.map(project => <li key={project.id}>{ project.title }</li>) }
          </ul>

          <button type="button" onClick={handleAddProject}>Add Projects</button>
        </>
      );
    };
    ```