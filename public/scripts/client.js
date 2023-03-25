/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //render each tweet from data array
  const renderTweets = function(tweets) {

    // clear existing rendered tweets to avoid duplication & reverse order to have newest rendered at the top
    $('#tweets-container').empty();
    tweets.reverse();

    // loops through each tweets to send tweet object data to render the article
    for (const element of tweets) {
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

    return $tweet;
  }


  //event listener on form submit
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //check if text area value is blank
    const textArea = $(this[0]).val();
    if (!textArea || textArea.trim() === "") {
      alert("Oops, we can't hear you, enter a tweet!");
    }

    //check if characters exceed 140
    if (textArea.length > 140) {
      alert("Tweet cannot exceed 140 characters");
    }
    
    //when a new tweet is submitted in the form load tweets & clear the text area
    $.ajax('/tweets', {
      method: 'POST',
      data: data,
      success: function() {
        loadTweets();
        $('#tweet-text').val('');
      }
    });
    
  });


  // fetch tweets data from /tweets
  function loadTweets() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        console.log('Success: ', data);
        renderTweets(data);
      });
  }

  //load existing tweets
  loadTweets();

});
