module.exports = {
  presets: [
    //converts only functionalities that browser/ environment don't understant
    '@babel/preset-env',
    //add react functionalities to this version, like HTML inside JS
    '@babel/preset-react'  
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};