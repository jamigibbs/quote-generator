(function(window, undefined) {

  function QuoteModule() {

    var key;

    this.quoteGenerator = function quoteGenerator() {

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

    };

  }

  // The callback function to parse the data
  this.parseResponse = function parseResponse(data) {
    document.getElementById("quote").innerHTML = data.quoteText;
    if(data.quoteAuthor){
      document.getElementById("author").innerHTML = '- ' + data.quoteAuthor;
    }
  };

  function twitterShare(){
    var tweetAnchor = document.getElementById("tweet");
    var currentQuote = document.getElementById("quote").innerHTML;
    var currentQuoteAuthor = document.getElementById("author").innerHTML;
    var twitterShareUrl = 'https://twitter.com/share?&text=' + currentQuote + ' ' + currentQuoteAuthor;

    // Add the current quote to the Twitter share link
    tweetAnchor.setAttribute('href', twitterShareUrl);
  }

  // Launch twitter sharing when button clicked
  document.getElementById('tweet').addEventListener('click', function(){
    twitterShare();
  });

  // Expose access to the constructor
  window.QuoteModule = QuoteModule;

})(window);

var QuoteModule = new QuoteModule();

// Display first quote
QuoteModule.quoteGenerator();

// Get new quote when button clicked
document.getElementById("newQuote").addEventListener("click", function() {
  QuoteModule.quoteGenerator();
});
