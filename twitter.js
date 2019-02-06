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
        assignTwitterIDUser(timeline);
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
        assignTwitterID(timeline);
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
    $('#search').val('')
    const originalTweet = textArray2.join(' ')
    $('.originalTweetContainer').text(originalTweet)
}
const splitTextUser = function (timeline) {
    let textArray1 = timeline[counter].full_text.split(' ')
    for (i = 0; i < textArray1.length; i++) {
        if (textArray1[i].includes('RT') || textArray1[i].includes('#') || textArray1[i].includes('@') || textArray1[i].includes('|') || textArray1[i].includes('https') || textArray1[i].includes('...') || textArray1[i].includes('-')) { textArray1.splice(i, 1) }
    }
    $('#search').val('')
    const originalTweet = textArray1.join(' ')
    $('.originalTweetContainer').text(originalTweet)
}


const assignTwitterID = function (twitterArray) {
    let tweetID = twitterArray.statuses[counter].id_str;
    document.getElementById('tweetEmbedContainer').innerHTML = `<div class="tweet" id="${tweetID}"></div>`;
    // document.getElementById('tweetEmbedContainerTransmog').innerHTML = `<div class="tweet" id="${tweetID}"></div>`
    embedTweetJS();
    // $("#tweetEmbedContainerTransmog").find("p.Tweet-text").text = 'Testing';
    // Tweet-text is the class of the <p> elemnt that contains the tweet text
    // assignTransmogEmbed("");
}


const assignTwitterIDUser = function (twitterArray) {
    let tweetID = twitterArray[counter].id_str;
    document.getElementById('tweetEmbedContainer').innerHTML = `<div class="tweet" id="${tweetID}"></div>`;
    // document.getElementById('tweetEmbedContainerTransmog').innerHTML = `<div class="tweet" id="${tweetID}"></div>`;
    embedTweetJS();
    // assignTransmogEmbed("");
}

const assignTransmogEmbed = function (textForTweet) {
    setTimeout(function () {
        let shadowRootTwitter = $('twitter-widget#twitter-widget-3')[0].shadowRoot;
        shadowRootTwitter.querySelectorAll('p')[0].innerText = textForTweet;
    }, 1000)
}

const nextTweet = function () {
    counter++
    if (counter >= 15) {
        counter = 0
    }
    if (buttonClick === "user") {
        splitTextUser(globalArray)
        assignTwitterIDUser(globalArray)
    }
    else {
        splitTextKey(globalArray)
        assignTwitterID(globalArray)
    }

}

const twitterLink = function (string) {
    document.getElementById("twitterPost").href = `https://twitter.com/intent/tweet?text=${string}`;
}

$('#getTweetButton').on('click', searchUser)
$('#searchKey').on('click', searchKey)
$('#nextTweet').on('click', nextTweet)

