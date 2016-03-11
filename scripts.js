// Display the initial quote
window.onload = quoteGenerator();

// The callback function to parse the data
function parseResponse(data) {
  document.getElementById("quote").innerHTML = data.quoteText;
  if(data.quoteAuthor){
    document.getElementById("author").innerHTML = '- ' + data.quoteAuthor;
  }
}

// TODO: Take this out of the global namespace someway somehow
var key;

function quoteGenerator() {

  // If the quote script already exists, remove it so we can load a new quote
  if(key){
    document.getElementById(key).remove();
  }

  // Randomly generate a quote key
  key = Math.floor(Math.random() * 10000) + 1;

  // Our source for quotes
  var quotesSrc = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&key=" + key + "&format=jsonp&jsonp=parseResponse";

  // Instead of using XMLHttpRequest, we have to use the 'script' tag
  // in order to get data from another domain
  dataSrc = document.createElement('script');

  // Give the script tag a unique id based on the quote key
  dataSrc.setAttribute("id", key);

  // Here is our data source with callback function
  dataSrc.src = quotesSrc;

  // Apend the script tag with the data source at the end of the document
  // We do this for JSONP; overcomes XMLHttpRequest same domain policy.
  document.body.appendChild(dataSrc);

}

//Get a new quote when button is clicked
document.getElementById("newQuote").addEventListener("click", function() {
  quoteGenerator(key);
});

function twitterShare(){
  var tweetAnchor = document.getElementById("tweet");
  var currentQuote = document.getElementById("quote").innerHTML;
  var currentQuoteAuthor = document.getElementById("author").innerHTML;
  var twitterShareUrl = 'https://twitter.com/share?&text=' + currentQuote + ' ' + currentQuoteAuthor;

  // Add the current quote to the Twitter share link
  tweetAnchor.setAttribute('href', twitterShareUrl);
}
