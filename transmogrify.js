const transmogrify= function(){ 
  const items = {
    indexes: [],
    synonyms: []}
  let newSynonyms = Object.create(items);
  let amountOfSynonyms = 1;
  //let twitterString = document.querySelector('.originalTweet').innerText; //Grab tweet text
  let twitterString = "okay, three, okay"
  const bannedWords = ["in", "the", "at", "I'm", "we're", "this", "your", "these", "not", "of", "anything", "that", "and", "our", "to", "be", "necess...", "do", "with", "is", "no", "dems"];//constantly increasing banned words.
  
  const twitterStrtoArr = function(string) { //Input the string to output an array. 
    return string.toLowerCase().split(" "); 
  }

  const findRegX = function (word) {
    const regX = new RegExp(/\W/);
    const flaggedIndex = word.search(regX);
    return flaggedIndex;
  }

  const splitToArray = function() {
    let arr = word.split('');
    return arr;
  }

  const grabLastIndex = function(array) {
    punctuation = array[array.length-1];
    return punctuation;
  }

  // if(flaggedIndex !== -1){
  //   const array = splitToArray(word);

  // }
  
  //takes that twitter array, a number for amount of random words, and newSynonyms
  const randomize = function (array, num, synonymObject){
    let chosenIndexes = [];
    let potentialIndex = 0;
    //We go through this until we've filled the chosenIndexes to be replaced.
    while (chosenIndexes.length < num){
      potentialIndex = Math.floor(Math.random() * Math.floor(array.length));
      //Go through the array at random and choose an index. If that index has already been grabbed, or it's a banned word, skip.
      let potentialWord = array[potentialIndex];
      let flag= findRegX(potentialWord);
      console.log(flag);
      if(chosenIndexes.includes(potentialWord) || bannedWords.includes(potentialWord) || flag !== -1){  
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

  const boldWords = function(array) {
    console.log(array.map(word => `<b>${word}</b>`));
    return array;
 }

 const removePunctuation = function (array){
      array.forEach(function (word){
        let reg1= newRegExp(/\W/);
        if(word.search(reg1) !== -1){
          console.log("awesome");
          console.log(word)
        }
        else{
          console.log("sucks")
        }
      })
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
        const newWordsBold = boldWords(newWords); 
        addWordsToSynonymObject(newWordsBold, newSynonyms);
        console.log(newSynonyms.synonyms);
        const newTwitterString= integrateSynonyms(twitterArray, newSynonyms);
        //lengthOfWords(newSynonyms.words);
        displayText(newTwitterString);
      })
  }
  
  function integrateSynonyms(twitterArray, newSynonyms){//takes new synonyms and forces them into the old array. Returns combined string of old array.
    for(let i = 0; i< 5; i++){
      if(newSynonyms.synonyms[i]!=="undefined"){
        twitterArray[newSynonyms.indexes[i]]=newSynonyms.synonyms[i];
      } 
    }
    const newTwitterString = twitterArray.join(" ");
    return newTwitterString;
  }
  
  const addWordsToSynonymObject = function(newWordsBold, newSynonyms) {
    newWordsBold.forEach(function (word){
      newSynonyms.synonyms.push(word);
    })
  }

//  const checkIfPunctuation = function(string){
//    let lastIndex = string.charAt(string.length);
//    if(lastIndex == "!" || lastIndex == "," || lastIndex =="." )
//  }

 var reg1 = new RegExp(/\W/);
  
  let twitterArray = twitterStrtoArr(twitterString); //turn twitter array into variable
  console.log(twitterArray);
  let indexes = randomize(twitterArray, amountOfSynonyms, newSynonyms); //randomizes the indexes
  let wordstoSynonym = indexesToWords(indexes);
  //lengthOfWords(wordstoSynonym);
  console.log(grabSynonyms(wordstoSynonym));
}







