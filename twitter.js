
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

const oauth = OAuth({
  consumer: { key: 'mZKJLpu54IxnOTGsDhEmxWgCF', secret: '0vwO6vx2OyJlVJ6DW1X96ihBuoAhnRmN9IdeU5Immu35VXSt98'},
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

const signature = oauth.authorize(request, token);
console.log(signature);

//This generates the uauth_nonce key for the oAuth request
function genNonce() {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
    const result = [];
    window.crypto.getRandomValues(new Uint8Array(32)).forEach(c =>
        result.push(charset[c % charset.length]));
    return result.join('');
}
const nonce = genNonce();
console.log(nonce);

//This generates the timestamp for the oAuth request
var ts = Math.round((new Date()).getTime() / 1000);
console.log(ts);

const oAuthRequest = function () {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/request_token',
        method: 'POST',
        headers: {
            Authorization: `OAuth oauth_callback="http://localhost:8000", oauth_consumer_key="mZKJLpu54IxnOTGsDhEmxWgCF", oauth_nonce="${nonce}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${ts}"`
        }

    }).then(function (response) {
        console.log(response);
    })
}


$('#twitterLogin').on('click', oAuthRequest);


//var provider = new firebase.auth.TwitterAuthProvider();

// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
//     // You can use these server side with your app's credentials to access the Twitter API.
//     var token = result.credential.accessToken;
//     var secret = result.credential.secret;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });


// const tokenize = function() {
//     const queryURL = `https://api.twitter.com/oauth2/token`;
//     $.ajax({
//         url: qURL,
//         method: 'POST',
//         Host: 'api.twitter.com',
//         'User-Agent': 'My Twitter App v1.0.23',
//         Authorization: 'Basic 338634982-u3qBJRKvVWy2w6alBTrKxPfi1jxOFHFUHQdYNEOB',
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         'Content-Length': '29',
//         'Accept-Encoding': 'gzip',
//         grant_type='client_credentials'

//     }).then(function(response) {
//         console.log(response);

//     })
//   }

// const getTweet = function(userId){
//     const queryURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userId}`;
//     $.ajax({
//       url: queryURL,
//       method: 'GET'
//     }).then(function(response) {
//         console.log(response);

//     })
//   }

// Declare variables to hold twitter API url and user name
// var twitter_api_url = 'http://search.twitter.com/search.json';
// var keyword = 'trump';
// var tweet_limit = 3;

// // Enable caching
// $.ajaxSetup({ cache: true });

// /* The returned JSON object will have a property called "results" where we find
// *	a list of the tweets matching our request query
// */

// $.getJSON(
//     twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=%23' + keyword,
//     /* ------ grabs 3 latest tweets where searched for #keyword (#hashtag) -------- */

//     //twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=%40' + keyword,
//     /* ------ grabs 3 latest tweets where searched for @keyword (@username) -------- */

//     //twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=' + keyword,
//     /* ------ grabs 3 latest tweets where searched for raw keyword (keyword) - Might get some foreign tweets this way -------- */

//     function(data){
//         $.each(data.results, function(i, tweet){
//         // Uncomment line below to show tweet data in Fire Bug console
//         // Very helpful to find out what is available in the tweet objects
//         console.log(tweet);

//         // Before we continue we check that we got data
//             if(tweet.text !== undefined){

//                 // Calculate how many hours ago was the tweet posted
//                 var date_tweet	=	new Date(tweet.created_at);
//                 var date_now	=	new Date();
//                 var date_diff	=	date_now - date_tweet;
//                 var hours		=	Math.round(date_diff/(1000*60*60));
//                 var user_url	=	'<a href="http://www.twitter.com/'+keyword+'/status/'+tweet.id+'">'+'@'+ keyword+'<\/a>';
//                 var text_string =	tweet.text;

//                 var username_text_string	=	text_string.replace('@'+keyword, '<span class="tweet-tag">@'+keyword+'<\/span>'); // *Use one of these variables below
//                 var hash_text_string		=	text_string.replace('#'+keyword, '<span class="tweet-tag">#'+keyword+'<\/span>'); // *Use one of these variables below
//                 var user_avatar				=	tweet.profile_image_url;
//                 var user_name				=	tweet.from_user_name;

//                 // Build the html string for the current tweet
//                 var tweet_html	=	'<div class="tweet-item">';
//                 tweet_html		+=	'<img src="' + user_avatar + '" alt="Twitter User ' + user_name + '\'s Avatar">';
//                 tweet_html		+=	'<div class="tweet-text">';
//                 tweet_html		+=	'<a href="http://www.twitter.com/';
//                 tweet_html		+=	keyword + '/status/' + tweet.id + '">';
//                 tweet_html		+=	hash_text_string + '<\/a> '; // *Replace the variable here based on how you're searching
//                 tweet_html		+=	' hours ago<\/span><\/div><\/div>';
//                 /*
//                 You can grab other stuff from the Object, like these:
//                 created_at:
//                 from_user:
//                 from_user_id:
//                 from_user_id_str:
//                 from_user_name:
//                 geo:
//                 id:
//                 id_str:
//                 iso_language_code:
//                 profile_image_url:
//                 profile_image_url_https:
//                 source:
//                 text:
//                 to_user:
//                 to_user_id:
//                 to_user_id_str:
//                 to_user_name:
//                 More on that here: https://dev.twitter.com/docs/using-search
//                 */

//                 // Append html string to tweet_container div
//                 $('#tweets').append(tweet_html);
//             }
//         });
//     }
// );