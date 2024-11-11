const { MarkovMachine } = require('./markov');

describe('create markov', function () {
   let mm;

   beforeEach(function () {
      mm = new MarkovMachine('the cat in the hat');
   });

   test('1. check words are correct', function () {
      expect(mm.words).toEqual(['the', 'cat', 'in', 'the', 'hat']);
   });

   test('2. checks if chains are correct', function () {
      const expected = new Map([
         ['the', ['cat', 'hat']],
         ['cat', ['in']],
         ['in', ['the']],
         ['hat', [null]],
      ]);
      expect(mm.chains).toEqual(expected);
   });

   test('3. checks that makeText returns a string', function () {
      const text = mm.makeText();
      expect(text).toEqual(expect.any(String));
   });
});
