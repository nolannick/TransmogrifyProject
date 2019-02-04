const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const consumerKey = "B1EHMtKxhNZnCtEdd3T0Rv3tD";
const consumerSecret = "rc7Oz78PNP9vcW9PMPSLTziMikdOE6ZmPGHSPymzQBQLMC9dMo";
const encodedKey = encodeURIComponent(consumerKey);
const encodedSecret = encodeURIComponent(consumerSecret);
const basicAuth = btoa(`${encodedKey}:${encodedSecret}`);
let transformedTweet = ''




const searchUser = function() {
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
        const textArray1 = timeline[0].full_text.split(' ')
        for (i = 0; i < textArray1.length; i++) {
            if (textArray1[i].includes('RT') || textArray1[i].includes('#') || textArray1[i].includes('@') || textArray1[i].includes('|') || textArray1[i].includes('https') || textArray1[i].includes('...') || textArray1[i].includes('-')) {
                textArray1.splice(i, 1)
            }

        }
        console.log(textArray1)
        console.log(timeline)
        $('#search').val('')
        const originalTweet = textArray1.join(' ')
        $('.originalTweet').text(originalTweet)
    });
}
const searchKey = function() {
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
        const textArray2 = timeline.statuses[0].full_text.split(' ')
        for (i = 0; i < textArray2.length; i++) {
            if (textArray2[i].includes('RT') || textArray2[i].includes('#') || textArray2[i].includes('@') || textArray2[i].includes('|') || textArray2[i].includes('https') || textArray2[i].includes('...') || textArray2[i].includes('-') || textArray2[i].includes('&')) {
                textArray2.splice(i, 1)
            }

        }
        textArray2.join(' ')
        console.log(textArray2)
        console.log(timeline)
        $('#search').val('')
        const originalTweet = textArray2.join(' ')
        $('.originalTweet').text(originalTweet)
    });
}

const postTweet = function(message) {
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
            url: corsAnywhere + `https://api.twitter.com/1.1/statuses/update.json?=${message}`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        
        });
    }).then(function () {

    });

}






$('#getTweetButton').on('click', searchUser);
$('#searchKey').on('click', searchKey)
//$('#export').on('click', postTweet(transformedTweet))

