const synonyms = {indexes: [], words: []
}
let newSynonyms = Object.create(synonyms);
let amountOfSynonyms = 5;
let word = ""
let queryURL= `https://wordsapiv1.p.mashape.com/words/${word}/synonyms`; //variable to change the api request per word
let twitterString = "Look at all of this stuff that I'm putting down in this string"; //dummy twitter string
const bannedWords = ["in", "the", "at", "I'm", "we're", "this", "your", "these", "not", "of", "anything"];//constantly increasing banned words.

const twitterStrtoArr = function(string) { //Input the string to output an array.
  return string.split(" "); 
}

const randomize = function (array, num, synonymObject){//takes that twitter array, a number for amount of random words, and newSynonyms
  let chosenIndexes = [];
  let potentialIndex = 0;
  while (chosenIndexes.length < num){//We go through this until we've filled the chosenIndexes to be replaced.
    potentialIndex = Math.floor(Math.random() * Math.floor(array.length));
    /*
      Go through the array at random and choose an index. If that index has already been grabbed, or it's a banned word, skip.
    */
    if(chosenIndexes.includes(array[potentialIndex]) || bannedWords.includes(array[potentialIndex])){  
    } else {
      chosenIndexes.push(array[potentialIndex]);
      console.log(synonymObject.indexes);  
      synonymObject.indexes.push(potentialIndex);//add indexes to synonym object array for later use
    }
  }
  return chosenIndexes;
}

const indexesToWords = function(chosenIndexes) {//turns the indexes into words.
  let chosenWords = [];
  chosenIndexes.forEach(function (word){
    chosenWords.push(word);
  })
  console.log(chosenWords);
  return chosenWords;
}

async function integrateSynonyms(twitterArray, newSynonyms){//takes new synonyms and forces them into the old array. Returns array (to be turned into a string)
  for(let i = 0; i< 5; i++){
    if(newSynonyms.words[i]!=="undefined"){
      twitterArray[newSynonyms.indexes[i]]=newSynonyms.words[i];
      console.log(newSynonyms.words[1])
      console.log(twitterArray[newSynonyms.indexes[i]]);
    } 
    console.log(twitterArray);
  }
  console.log(twitterArray);
  return twitterArray;
}

const grabSynonyms = function(indexesToWords) { //grabs the chosen indexes and fetches synonyms for them.
  
  indexesToWords.forEach(function (word){
    queryURL = `https://wordsapiv1.p.mashape.com/words/${word}/synonyms`;
    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: {
        "X-Mashape-Key": "a4b964e282msh1e623fbe6a9e7a0p1ad416jsn793a80aeda68",
        "Accept": "application/json"
      }
    }).then(function (response){
      let synonym = response.synonyms[0];
      newSynonyms.words.push(synonym);
      console.log(newSynonyms.words)
    })
  })
}

let twitterArray = twitterStrtoArr(twitterString); //turn twitter array into variable
console.log(twitterArray);
let indexes = randomize(twitterArray, amountOfSynonyms, newSynonyms); //randomizes the indexes
console.log(indexes);
let wordstoSynonym = indexesToWords(indexes);
grabSynonyms(wordstoSynonym);
setTimeout(function(){integrateSynonyms(twitterArray, newSynonyms);}, 5000); //async await



// const sortBannedWords = function(array, counter) {
//   array.forEach(function (word){
//     if (bannedWords.includes(word)){
//       counter++;
//     }
//   })
//   return counter;
// }

// // const findSynonym = function(tweet) {
// //   let tweetArray = twitterStrtoArr(tweet);
// //   console.log(tweetArray);
// //   let bannedWords = 0;
// //   bannedWords = sortBannedWords(tweetArray, bannedWords);
// //   randomize(tweetArray, 5, bannedWords)
// // }

// // findSynonym(twitterString);

//end? tweetArray.join(" ")





