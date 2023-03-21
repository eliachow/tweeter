/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //render each tweet from data array
  const renderTweets = function(tweets) {
  // loops through tweets
    for (const element of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweets-container').append(createTweetElement(element));
    }
  };

  //render article element for each tweet
  function createTweetElement(tweetData) {
    const $tweet = $(`<article class="container tweet">
        <header>
          <span class="container user-info">
          <span class="container">
            <img src="${tweetData.user.avatars}">
            <h4>${tweetData.user.name}</h4>
          </span>
          <span class="handle">${tweetData.user.handle}</span>
          </span>
          <div>${tweetData.content.text}</div>
        </header>
        <footer class="container">
          <span>${tweetData.created_at} days ago</span>
          <span>
            <i class="fa-solid fa-flag icon"></i>
            <i class="fa-sharp fa-solid fa-retweet icon"></i>
            <i class="fa-sharp fa-solid fa-heart icon"></i>
          </span>
        </footer>
      </article>`);
  
    // return rendered <article>
    return $tweet;
  }

  renderTweets(data);


  //event listener submit
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    $.ajax( '/tweets', { method: 'POST', data: $( this ).serialize() }) 
  })


});
