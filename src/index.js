// let fs = require("fs");
import 'dotenv/config';

/*
 * Nodemon is a library that keeps our script running, i.e. we do not need to re-enter npm start 
 * each time we make a change
 *
 * Babel is a library that "transpiles your code to vanilla JavaScript". This way, we can use newer
 * JS features that may not exist in Node.js yet. Change the .babelrc file to activate different
 * JS features
 * 
 * Open the .env file to store sensitive data separate from the source code
 * console.log(process.env.MY_SECRET);
 */
console.log('Node.js Project running Express, Nodemon, Babel');
//console.log(fs);
