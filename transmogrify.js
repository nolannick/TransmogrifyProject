const transmogrify= function(){ 
  const items = {
    indexes: [],
    changedIndexes: [],
    synonyms: []}
  const oldWords = { //Feel like I'm missing out on something cool by using inheritance here somehow.
  }
  let newSynonyms = Object.create(items);
  let spongedWords = Object.create(oldWords);
  let twitterString = document.querySelector('.originalTweetContainer').innerText; //Grab tweet text
  //let twitterString = "sup isn't this ain't proud faul't bann't banned"; 
  const twitterStrtoArr = function(string) { //Input the string to output an array. 
    return string.split(" "); 
  }

  let twitterArray = twitterStrtoArr(twitterString);

  let amountOfSynonyms = (twitterArray.length/5);
  console.log(amountOfSynonyms);
  const bannedWords = ["a", "an", "in", "the", "at", "i'm", "we're", "this", "your", "these", "not", "of", "anything", "that", "and", "our", "to", "be", "necess...", "do", "with", "is", "no", "dems", "it", "its", "it's", "these", "i", "by", "he", "for", "my", "from", "are", "msm", "bs"];//constantly increasing banned words.
  
  const findRegX = function (word) {
    const regX = new RegExp(/\W/);
    const flaggedIndex = word.search(regX);
    return flaggedIndex;
  }

  const splitToArray = function(word) {
    let arr = word.split('');
    return arr;
  }

  const grabLastIndex = function(splitWord) {
    punctuation = splitWord[splitWord.length-1];
    punctuation;
    return punctuation;
  }
  const grabRestOfWord = function(array) {
    word = array.splice(0, array.length-1);
    joinedWord= word.join('');
    console.log(joinedWord)
    return joinedWord;
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
      let flag = findRegX(potentialWord);
      if(chosenIndexes.includes(potentialWord) || bannedWords.includes(potentialWord) || potentialWord.includes("'")){  
      } else {
        console.log(chosenIndexes.push(array[potentialIndex]));
        console.log(synonymObject.indexes);
        //add indexes to synonym object array for later use
        synonymObject.indexes.push(potentialIndex);
      }
    }
    return chosenIndexes;
  }

  
  const scrubWords = function(spongedWords, chosenWords) {
    let i = 0;
    for(let index in spongedWords) {
      
      console.log(index)
      if(findRegX(spongedWords[i].word) !==-1){
        let arrayWord = splitToArray(spongedWords[i].word);
        spongedWords[i]["punctuation"] = grabLastIndex(arrayWord);
        spongedWords[i]["scrubbedWord"] = grabRestOfWord(arrayWord);
        chosenWords[i]=spongedWords[i].scrubbedWord//will push new word onto chosenWords array
        newSynonyms.changedIndexes.push(i);
        console.log(chosenWords[i])
      }
      
      i++;
    } 
    console.log(newSynonyms.changedIndexes)
   }

  const indexesToWords = function(chosenIndexes) {
    let chosenWords = [];
    for(let i=0; i<chosenIndexes.length; i++){//change foreach
      chosenWords.push(chosenIndexes[i]);
      console.log(spongedWords[i]= new Object());
      console.log(spongedWords[i]["word"]=chosenIndexes[i]); 
    }
    console.log(spongedWords[1].word)
    console.log(chosenWords);
    scrubWords(spongedWords, chosenWords);
    console.log(spongedWords[0].word);
    return chosenWords;
  }
  
//   const boldWords = function(array) {
//     console.log(array.map(word => `<b>${word}</b>`));
//     return array;
//  }


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
        //const newWordsBold = boldWords(newWords); 
        addWordsToSynonymObject(newWords, newSynonyms);
        newSynonyms.changedIndexes.forEach(function (index){
          let punctuation = spongedWords[index].punctuation;
          console.log(newSynonyms.synonyms[index] += punctuation);
        })
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
  
  const addWordsToSynonymObject = function(newWords, newSynonyms) {
    newWords.forEach(function (word){
      newSynonyms.synonyms.push(word);
    })
  }

 var reg1 = new RegExp(/\W/); //need to avoid grabbing apostrophes! incorporate apostrophes into the regex
  
   //turn twitter array into variable
  console.log(twitterArray);
  let indexes = randomize(twitterArray, amountOfSynonyms, newSynonyms); //randomizes the indexes
  let wordstoSynonym = indexesToWords(indexes);
  //lengthOfWords(wordstoSynonym);
  grabSynonyms(wordstoSynonym);

  // THIS IS HOW WE GRAB THE PUNCTUATION AND PUT IT BACK ON THE CHOSEN INDEX
  // SHOULD I PUT THEM IN THE AJAX CALL? YES. BEFORE PUT BACK INTO A STRING
  // newSynonyms.changedIndexes.forEach(function (index){
  //   let punctuation = spongedWords[index].punctuation;
  //   console.log(newSynonyms.synonyms[index] += punctuation);
  // })


}