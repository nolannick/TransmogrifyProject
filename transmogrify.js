const transmogrify= function(){
  
  const synonyms = {indexes: [], words: []
  }
  let newSynonyms = Object.create(synonyms);
  let amountOfSynonyms = 3;
  let twitterString = document.querySelector('.originalTweet').innerText; //Grab tweet text
  //let twitterString = "Well that didn't work so let's look more into health problems and code that actually may work okay okay"
  const bannedWords = ["in", "the", "at", "I'm", "we're", "this", "your", "these", "not", "of", "anything", "that", "and", "our", "to","be", "necess..."];//constantly increasing banned words.
  
  const twitterStrtoArr = function(string) { //Input the string to output an array. 
    return string.toLowerCase().split(" "); 
  }
  
  //takes that twitter array, a number for amount of random words, and newSynonyms
  const randomize = function (array, num, synonymObject){
    let chosenIndexes = [];
    let potentialIndex = 0;
    //We go through this until we've filled the chosenIndexes to be replaced.
    while (chosenIndexes.length < num){
      potentialIndex = Math.floor(Math.random() * Math.floor(array.length));
      //Go through the array at random and choose an index. If that index has already been grabbed, or it's a banned word, skip.
      if(chosenIndexes.includes(array[potentialIndex]) || bannedWords.includes(array[potentialIndex])){  
      } else {
        chosenIndexes.push(array[potentialIndex]);
        console.log(synonymObject.indexes);
        //add indexes to synonym object array for later use
        synonymObject.indexes.push(potentialIndex);
      }
    }
    return chosenIndexes;
  }
  
  // let wordLengths = [];
  // const lengthOfWords = function(wordsArray){
  //   wordsArray.forEach(function (word){
  //     wordLengths.push(word.length);
  //   })
  //   console.log(wordLengths);
  // }
  
  
  
  const indexesToWords = function(chosenIndexes) {
    let chosenWords = [];
    chosenIndexes.forEach(function (word){
      chosenWords.push(word);
    })
    console.log(chosenWords);
    return chosenWords;
  }
  
  //Once you go async you never go back
  async function grabSynonyms(indexesToWords){
    const urls = [];
    const newWords = [];
    indexesToWords.forEach(function(word){
      urls.push(`https://wordsapiv1.p.mashape.com/words/${word}/synonyms`);
    })
    
    const urlPromises = urls.map(url =>$.ajax({
            url: url,
            method: 'GET',
            headers: {
              "X-Mashape-Key": "a4b964e282msh1e623fbe6a9e7a0p1ad416jsn793a80aeda68",
              "Accept": "application/json"
            }
      }));
      Promise.all(urlPromises).then(res => {
        for (const property in res) {
          newWords.push(res[property].synonyms[0]);  
        } 
        addWordsToSynonymObject(newWords, newSynonyms);
        console.log(newSynonyms.words);
        const newTwitterString= integrateSynonyms(twitterArray, newSynonyms);
        //lengthOfWords(newSynonyms.words);
        displayText(newTwitterString);
      })
  }
  
  function integrateSynonyms(twitterArray, newSynonyms){//takes new synonyms and forces them into the old array. Returns combined string of old array.
    for(let i = 0; i< 5; i++){
      if(newSynonyms.words[i]!=="undefined"){
        twitterArray[newSynonyms.indexes[i]]=newSynonyms.words[i];
      } 
    }
    const newTwitterString = twitterArray.join(" ");
    return newTwitterString;
  }
  
  const addWordsToSynonymObject = function(newWords, newSynonyms) {
    newWords.forEach(function (word){
      newSynonyms.words.push(word);
    })
  }
  
  let twitterArray = twitterStrtoArr(twitterString); //turn twitter array into variable
  console.log(twitterArray);
  let indexes = randomize(twitterArray, amountOfSynonyms, newSynonyms); //randomizes the indexes
  let wordstoSynonym = indexesToWords(indexes);
  //lengthOfWords(wordstoSynonym);
  console.log(grabSynonyms(wordstoSynonym));
  
}







