var tweets = jQuery(".tweet");
	
jQuery(tweets).each( function( t, tweet ) { 

var id = jQuery(this).attr('id');

twttr.widgets.createTweet(
  id, tweet, 
  {
    conversation : 'none',    // or all
    cards        : 'hidden',  // or visible 
    linkColor    : '#cc0000', // default is blue
    theme        : 'light'    // or dark
  });

});


