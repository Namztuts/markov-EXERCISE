class MarkovMachine {
   /* build markov machine; read in text.*/

   constructor(text) {
      // text = ('the cat in the hat')
      let words = text.split(/[ \r\n]+/); // regEx for any combination of spaces, returns, or newline characters of length one or more
      // text.split = [ 'the', 'cat', 'in', 'the', 'hat' ]
      this.words = words.filter((char) => char !== ''); // gets rid of any empty spaces
      this.makeChains();
   }

   makeChains() {
      let chains = new Map();

      for (let i = 0; i < this.words.length; i += 1) {
         let word = this.words[i];
         let nextWord = this.words[i + 1] || null;

         if (chains.has(word)) chains.get(word).push(nextWord);
         // adds nextWord to the list of following words if word already exists in chains
         else chains.set(word, [nextWord]); // creates a new entry with word as the key and [nextWord] as the value if word doesn’t exist in chains
      }

      this.chains = chains; // a Map where each word points to an array of possible next words
      // chains = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}
   }

   // pick random choice from array
   static choice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
   }

   // return random text from chains
   makeText(numWords = 100) {
      let keys = Array.from(this.chains.keys()); // keys = ["the", "cat", "in", "hat"]
      let key = MarkovMachine.choice(keys); // key = pick a random key from 'keys'
      let out = [];

      // produce markov chain until reaching termination word
      while (out.length < numWords && key !== null) {
         out.push(key); // adding the key to the list of words
         key = MarkovMachine.choice(this.chains.get(key)); // setting the key again for next loop
      }

      return out.join(' '); //joining all the words with a space
   }
}

// exporting to use in makeText.js
module.exports = {
   MarkovMachine,
};
let mm = new MarkovMachine('the cat in the hat');
// console.log(mm.makeChains());
// console.log(mm.makeText((numWords = 50)));
