'use strict';

var AJAX_TIMEOUT = 10000;
var quote = '';
var text = document.querySelector('.quote-text');
var author = document.querySelector('.quote-author');

function getQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous');
  xhr.setRequestHeader('X-Mashape-Key', 'GqnqB0E3q0mshQ8hdvBuP1pBoNwjp1Fh1b5jsnUaKnNJ6NS2J3');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.timeout = AJAX_TIMEOUT;

  xhr.onload = function(evt) {
    var stringData = evt.target.response;
    quote = JSON.parse(stringData);
    //alert(quote.quote + '\n' + quote.author);
    text.textContent = quote.quote;
    author.textContent = quote.author;
  };

  xhr.onloadstart = function() {
    console.log('loading started\n=========\n');
  };

  xhr.ontimeout = addError;
  xhr.onerror = addError;

  /**
   * show error message when data not loaded
   */
  function addError() {
    console.log('server error');
  }

  xhr.send();
}

var quoteBtn = document.querySelector('.get-quote');

window.addEventListener('load',getQuote);
quoteBtn.addEventListener('click', getQuote);
