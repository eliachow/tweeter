/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

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
            <img alt="profile picture" src="${tweetData.user.avatars}">
            <h4>${tweetData.user.name}</h4>
          </span>
          <span class="handle">${tweetData.user.handle}</span>
          </span>
          <div>${tweetData.content.text}</div>
        </header>
        <footer class="container">
          <span>${timeago.format(tweetData.created_at)}</span>
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


  //event listener submit
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    const textArea = $(this[0]).val();
    if (!textArea || textArea.trim() === "") {
      alert("Oops, we can't hear you, enter a tweet!");
    }
    if (textArea.length > 140) {
      alert("Tweet cannot exceed 140 characters");
    }
    $.ajax('/tweets', { method: 'POST', data: $(this).serialize() });
    
  });


  // fetch tweets from /tweets
  function loadTweets() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        console.log('Success: ', data);
        renderTweets(data);
      });
  }

  loadTweets();

});
