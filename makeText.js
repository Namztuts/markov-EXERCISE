/** Command-line tool to generate Markov text. */
const fs = require('fs');
const { MarkovMachine } = require('./markov');
const axios = require('axios');
const process = require('process'); // built in module for cmd-line arguments

// node makeText.js file eggs.txt             | FILE
// node makeText.js url http://www.google.com | URL

function generateText(text) {
   let mm = new MarkovMachine(text);
   console.log(mm.makeText());
}

// read file and generate text from it
function makeText(path) {
   fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
         console.error(`Unable to read file: ${path}`, error);
         process.kill(1); //kill the process if error
      } else {
         generateText(data);
      }
   });
}

// read URL and make text from it
async function makeURLText(url) {
   let response;

   try {
      response = await axios.get(url);
   } catch (error) {
      console.error(`Unable to read URL: ${url}`, error);
      process.exit(1);
   }
   generateText(response.data);
}

// first two items in process.argv are always (0) path to node (1) path to file | the 3rd item, process.argv[2], would be 'file'/'url' in our use
// example input | node makeText.js file eggs.txt
let [method, path] = process.argv.slice(2); // creates an array starting with 3rd item
// using above example = ['file', 'eggs.txt'] | method = 'file' | path = 'eggs.txt'

if (method === 'file') {
   // if the method is file, run makeText()
   makeText(path);
} else if (method === 'url') {
   // if the method is url, run makeURLText()
   makeURLText(path);
} else {
   console.error(`Unknown method: ${method}`);
   process.exit(1);
}
