const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const consumerKey = "7K1HECF7lBg43wCNqzeypgLbR";
const consumerSecret = "fJEcR0JWQRqstQEOZ2LUzuHzx5EknX9Bur5DAxwItnjL7mXoeA";
const encodedKey = encodeURIComponent(consumerKey);
const encodedSecret = encodeURIComponent(consumerSecret);
const basicAuth = btoa(`${encodedKey}:${encodedSecret}`);
let transformedTweet = 'Hello'
let counter = 0
let globalArray = []
let buttonClick = ""




const searchUser = function () {
    $.ajax({
        url: `${corsAnywhere}https://api.twitter.com/oauth2/token`,
        method: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: {
            grant_type: "client_credentials"
        },
        headers: {
            Authorization: "Basic " + basicAuth
        }
    }).then(function (response) {
        const bearerToken = response.access_token;

        return $.ajax({
            url: corsAnywhere + `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${$('#search').val().trim()}&tweet_mode=extended`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }).then(function (timeline) {
        counter = 0
        buttonClick = "user";
        globalArray = timeline;
        //assignTwitterID(timeline);
        splitTextUser(timeline);
        
    });
}
const searchKey = function () {
    $.ajax({
        url: `${corsAnywhere}https://api.twitter.com/oauth2/token`,
        method: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: {
            grant_type: "client_credentials"
        },
        headers: {
            Authorization: "Basic " + basicAuth
        }
    }).then(function (response) {
        const bearerToken = response.access_token;

        return $.ajax({
            url: corsAnywhere + `https://api.twitter.com/1.1/search/tweets.json?q=${$('#search').val().trim()}&result_type=popular&lang=en&tweet_mode=extended`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }).then(function (timeline) {
        counter = 0
        buttonClick = "";
        globalArray = timeline;
        //assignTwitterID(timeline);
        splitTextKey(timeline)
    });
}

const splitTextKey = function (timeline) {
    const textArray2 = timeline.statuses[counter].full_text.split(' ')
    for (i = 0; i < textArray2.length; i++) {
        if (textArray2[i].includes('RT') || textArray2[i].includes('#') || textArray2[i].includes('@') || textArray2[i].includes('|') || textArray2[i].includes('https') || textArray2[i].includes('...') || textArray2[i].includes('-') || textArray2[i].includes('&')) {
            textArray2.splice(i, 1)
        }

    }
    console.log(textArray2)
    console.log(timeline)
    $('#search').val('')
    const originalTweet = textArray2.join(' ')
    $('.originalTweetContainer').text(originalTweet)
}
const splitTextUser = function (timeline) {
    let textArray1 = timeline[counter].full_text.split(' ')
    for (i = 0; i < textArray1.length; i++) {
        if (textArray1[i].includes('RT') || textArray1[i].includes('#') || textArray1[i].includes('@') || textArray1[i].includes('|') || textArray1[i].includes('https') || textArray1[i].includes('...') || textArray1[i].includes('-')) {textArray1.splice(i, 1)}
    }
    console.log(textArray1)
    console.log(timeline)
    $('#search').val('')
    const originalTweet = textArray1.join(' ')
    $('.originalTweetContainer').text(originalTweet)
}

// const assignTwitterID = function (TwitterArray) {
//     let tweetID = TwitterArray.statuses[counter].id_str
//     document.getElementsByClassName("tweet").setAttribute("id", tweetID);
// }

const nextTweet = function () {
    counter++
    console.log(counter)
    if (counter >= 15) {
        counter = 0
    }
    if (buttonClick === "user") {
        splitTextUser(globalArray)
    }
    else {
        splitTextKey(globalArray)
    }
    
}

const twitterLink = function (string) {
    document.getElementById("twitterPost").href = `https://twitter.com/intent/tweet?text=${string}`;
}

//  const postTweet = function(message) {
//     $.ajax({
//         url: `${corsAnywhere}https://api.twitter.com/oauth2/token`,
//         method: "POST",
//         contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//         data: {
//             grant_type: "client_credentials"
//         },
//         headers: {
//             Authorization: "Basic " + basicAuth
//         }
//     }).then(function (response) {
//         const bearerToken = response.access_token;

//         return $.ajax({
//             url: corsAnywhere + `https://api.twitter.com/1.1/statuses/update.json?=${message}`,
//             method: "POST",
//             headers: {
//                 Authorization: "Bearer " + bearerToken,
//                 oauth_consumer_key= consumerKey,
//                 oauth_nonce="generated_oauth_nonce",
//                 oauth_signature="generated_oauth_signature",
//                 oauth_signature_method="HMAC-SHA1",
//                 oauth_timestamp="generated_timestamp",
//                 oauth_token="oauth_token",
//                 oauth_version="1.0"
//             }
//         });
//     });
// } 






$('#getTweetButton').on('click', searchUser)
$('#searchKey').on('click', searchKey)

$('#nextTweet').on('click', nextTweet)
//$('#export').on('click', postTweet(transformedTweet))

