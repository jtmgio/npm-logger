#NPM BOILERPLATE
Boilerplate for creating new npm modules


####Conventions
- The name of modules should be in the format of `@memberclicks/mc-{modulename}` where module is the name of the new module you are creating 
- The entry point file should be named in accordance with the name of the module. i.e. If the module name is mc-errors, the entry point file should be named mc-errors.js
- When adding a new github repo with the new module code, the name of the repo should be in the format of `npm-{modulename}` i.e. for mc-errors the corresponding repo name is npm-errors 


####Steps for getting started
- Make sure you have the latest versions of npm and node installed
- After creating your user at [https://www.npmjs.com](npmjs.com), contact the super admin to add you to the organization
- Once you are added, using the terminal, login to the npm registry for the memberclicks org `npm login --scope=@memberclicks` This will take you through the process of logging in with prompts for your username and password 
- Copy this repo using the [https://import.github.com/new](https://import.github.com/new), renaming it to `npm-{name-of-your-module}`, and clone it locally to a directory of your choosing. General location is an npm modules folder created in you user's directory.
- Run `npm init --scope=@memberclicks` this will take you through a series of prompts to update __package.json__
  - Update the name of the module, the description and the name of the main file following the conventions
  - The version should be 0.0.0
  - Rename the entry point file following the conventions i.e. if my new module was named __mc-textformatter__, __mc-index.js__ should be renamed to __mc-textformatter.js__
- Update README.md with any pertinent information for using the module  
When you are ready to publish your module run `npm publish`  
To publish any future updates you will need to update the version with `npm version patch` and then run `npm publish`


####Installing
- To install the new module in your project, run `npm install @memberclicks/{yourmodulename} --save` in your project's __server__ directory. This will install the module under __node_modules/@memberclicks__.  
- To update the module to the latest version  
  - cd into your project's __server__ directory
  - run `npm install @memberclicks/{yourmodulename}@latest --save` This will update your module to the latest version as well as the version number in __package.json__
- To see what packages need updating run `npm outdated`

####Use
To use, require the new module using the full path of the module  
`var newmodule = require('@memberclicks/{yourmodulename}');`
