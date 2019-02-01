const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const consumerKey = "B1EHMtKxhNZnCtEdd3T0Rv3tD";
const consumerSecret = "rc7Oz78PNP9vcW9PMPSLTziMikdOE6ZmPGHSPymzQBQLMC9dMo";
const encodedKey = encodeURIComponent(consumerKey);
const encodedSecret = encodeURIComponent(consumerSecret);
const basicAuth = btoa(`${encodedKey}:${encodedSecret}`);




const getTweet = function() {
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
            url: corsAnywhere + "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump",
            method: "GET",
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }).then(function (timeline) {
        console.log(timeline);
        return timeline;
    });
}


$('#getTweetButton').on('click', getTweet);
