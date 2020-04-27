# README_React Native

Multiplatform, convert into a native interface (Java and Objective C) as it installs a JavaScript Core dependency inside of mobile.

Architecture:

![README_React%20Native/Screen_Shot_2020-04-12_at_21.21.01.png](README_React%20Native/Screen_Shot_2020-04-12_at_21.21.01.png)

Metro Bundler is comparable to Webpack.

Sintax:

- Component declaration = React JS
- No Html
- Styles are applied without class or id
- Every <Text /> needs its own style
- Uses Yoga library, that converts css syntax into Objective C and Java
- [Configuring](https://react-native.rocketseat.dev/)
    1. MAC: download XCode
    2. Follow [this installation tutorial](https://react-native.rocketseat.dev/android/macos)
    3. For editing files in terminal: `sudo nano ~/.bash_profile` > save: `ctrl + O` > Enter > `ctrl + X`
    4. Running into issues... 
        1. Tools folder doesn't appear: [download it direct from here](https://developer.android.com/studio#downloads)  the package "Command line tools only" and unpack it inside of your `Android/Sdk` folder
        2. Android emulator gives an error:  "Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081FAILURE: Build failed with an exception. What went wrong:Task 'installDebug' not found in project ':app'."  Solved it by instead of configuring my  `~/.bash_profile` I changed the configuration into: `~/.zshrc`
- Creating a new project
    1. `react-native init projectName`
    2. Troubleshooting: make sure to have [Gradle](https://docs.gradle.org/current/userguide/installation.html#installation) installed
    3. `cd project` > `react-native run-ios —simulator "iPhone 6s"`or just `react-native run-ios`
    4. Or, if you want to open Android emulator: `react-native run-android`
    5. This will open another terminal tab, the metro bundler. It heard our files changes and build a bundle. It will also appear the emulator with the Welcome to React screen

        ![README_React%20Native/Screen_Shot_2020-04-13_at_15.00.37.png](README_React%20Native/Screen_Shot_2020-04-13_at_15.00.37.png)

    6. Troubleshooting: Build failed - Task 'installDebug' not found in project ':app' . Solved changing configuration from ~/.bash_profile into ~/.zshrc
    7. A project is created with several folders, including android and ios, because react native works natively with their languages. Our main file will be: App.js
    8. Reload: To test it, you can change, for example, the default texts: try to change Step One for another thing like: Hello p :). It will change automatically, but you can also refresh your emulator with `cmd + R` or in the metro bundler with `R` or shaking your physical device
    9. Create a `src` folder in the project root > then a `index.js`file inside of it
    10. Delete App.js
    11. Inside of src/index.js is the basic structure, such as in ReactJS:

        ```jsx
        import React from 'react';
        import { View } from 'react-native';

        export default function App() {
          return <View />;
        }
        ```

    12. In root index.js I change the import from the previous App.js file to my src folder: 

        ```jsx
        import {AppRegistry} from 'react-native';
        import App from './src';
        import {name as appName} from './app.json';

        AppRegistry.registerComponent(appName, () => App);
        ```

- Differences between ReactJS and Native
    - In React Native there's no elements, there's Components
    - One is: <View />, that represents a html container, such as: div, footer, header, main, section...
    - <Text /> is used for any kind of text: p, span, strong, h1, h2, ...
    - There's no semantics on react-native
    - There's no style pattern. Everything needs to be done with css for each Component but there's no .css file. Style is created inside .js
    - Css properties are written with camelCase instead of -: background-color will be backgroundColor
    - There's no class nor id, your Component gets a Property that receives a variable name, and that variable contains an object

    ```jsx
    export default function App() {
      return <View style={styles.container} />;
    }

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#7159c1',
      },
    });
    ```

    - By default everything is "display: flex"
    - There's no inheritance! Each Component must have it's own style
    - As in ReactJS, Components must be inside of a container, but that can be a fragment: <> </>. Here you see how to apply an inline style (StatusBar) and how to create a variable that holds the other components styles (View - styles.coontainer | Text - styles.title)

        ```jsx
        <>
          <StatusBar barStyle="light-content" backgroundColor='#FFF'></StatusBar>
          <View style={styles.container}>
            <Text style={styles.title}>discombobulateme, bitte</Text>
          </View>
        </>
          );
        }

        const styles = StyleSheet.create({
          container: {
          },

          title:{
            color: '#FFF',
            fontSize: 32,
            fontWeight: 'bold',
          },
        });
        ```

- Listing API projects
    1. open backend server: cd `backend` > `yarn dev`
    2. open Insomnia and create a few projects
    3. `yarn add axios`
    4. import axios: src/`services`/`api.js` 
    5. Options to configure baseURL depends on what you are using: 
        - iOS Emulator: localhost - iOS sees localhost as the MacOS
        - iOS Device: IP
        - Android Emulator - Option 1: localhost (adb reverse) adb android interface, reverse: redicts doors into emulator Android emulator is a virtual machine: sees [localhost](http://localhost) as itself, not the localhost we need to tell it to redirect 'tcp:3333'= localhost address into 'tcp: 3333' emulator door
        - Android Emulator - Option 2 (Android Studio localhost emulator): 10.0.2.2
        - Android Emulator - Option 3 (Genymotion): 10.0.3.2
        - Android Devide: IP

            ```jsx
            import axios from 'axios';

            const api = axios.create({
              baseURL: 'http://localhost:3333',
            });

            export default api;
            ```

    6. Import axios on src/index.js `import api from './services/api';`
    7. Import useEffect and useState: `import React, { useEffect, useState } from 'react';` 
    8. Create a variable to storage our application data: `const [projects, setProjects] = useState([]);` being projects = initial value and setProjects = updated value
    9. Create a function that will be called when the variable above changes: `useEffect()` using the get method: `api.get('projects').then(*response* => { setProjects(response.data); }) }, []);` make sure to use then to wait for response. Don't use async function in useEffect
    10. Full code:

        ```jsx
        import api from './services/api';

        export default function App() {
          const [projects, setProjects] = useState([]);

          useEffect(() => {
            api.get('projects').then(response => {
              console.log(response.data);
              setProjects(response.data);
            })
          }, []);
        ```

    11. How to see the log? 
        1. metro bundler: will automatically show log

            ![README_React%20Native/Screen_Shot_2020-04-13_at_18.36.56.png](README_React%20Native/Screen_Shot_2020-04-13_at_18.36.56.png)

        2. From emulator, access menu `Cmd + D` > `Debuger` > it will open `localhost` debuger in browser > check `console` in inspector. Attention! Is not possible to visualise Network, nor Performance, only Console

            ![README_React%20Native/Screen_Shot_2020-04-13_at_18.35.58.png](README_React%20Native/Screen_Shot_2020-04-13_at_18.35.58.png)

    12. List/ view array on the screen with map( )> 

        ```jsx
        <View style={styles.container}>
                {projects.map(project => (
                  <Text style={styles.project} key={project.id}>{project.title}</Text>
                ))}
              </View>
        ```

    13. Scrolling: `import {  ScrollView } from 'react-native';` and use it instead of <View /> ***not possible to use justifyContent nor alignItems*  | specifically for lists, use: { Flatlist } component
    14. Understanding FlatList and SafeArea

        ```jsx
        <SafeAreaView style={styles.container}>
         <FlatList
          data={projects} 
          keyExtrator={project => project.id} 
          renderItem={({ item: project }) => (
             <Text style={styles.project}>{project.title}</Text>
             )}
          />
         </SafeAreaView>
        ```

- Creating new projects
    1. Create a button. If we use Button component from react, but it has its own style. Than we can use: TouchableOpacity `import { TouchableOpacity } from 'react-native';` 

        ```jsx
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add project</Text>
        </TouchableOpacity>
        ```

    2. Create a button style
    3. Create a function for when I click my button. It's exactly equal the one on my frontend project

        ```jsx
        async function handleAddProjects() {
            const response = await api.post('projects', {
              title: `Novo projeto ${Date.now()}`,
              owner: 'discombobulateme'
            });

            const project = response.data;

            setProjects([...projects, project]);
        }
        ```

    4. Add the function to button

        ```jsx
        <TouchableOpacity 
         activeOpacity={0.6} 
         style={styles.button}
         onPress={handleAddProjects}
         >
         <Text style={styles.buttonText}>Add project</Text>
        </TouchableOpacity>
        ```

    5. Full code

        ```jsx
        export default function App() {
          const [projects, setProjects] = useState([]);

          useEffect(() => {
            api.get('projects').then(response => {
              console.log(response.data);
              setProjects(response.data);
            })
          }, []);
          
          async function handleAddProjects() {
            const response = await api.post('projects', {
              title: `Novo projeto ${Date.now()}`,
              owner: 'discombobulateme'
            });

            const project = response.data;

            setProjects([...projects, project]);
          }

          return (
            <>
              <StatusBar barStyle="light-content" backgroundColor='#FFF'translucent />

              <SafeAreaView style={styles.container}>
                <FlatList
                  data={projects}
                  keyExtrator={project => project.id}
                  renderItem={({ item: project }) => (
                    <Text style={styles.project}>{project.title}</Text>
                  )}
                />
              </SafeAreaView>

              <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button}
                onPress={handleAddProjects}
                >
                <Text style={styles.buttonText}>Add project</Text>
              </TouchableOpacity>
            </>
          );
        }
        ```