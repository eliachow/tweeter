/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  // render tweet form using slideDown when nav button is clicked
  // 👉👉👉import form, blocking post request
  const $newTweetForm = $(`
         
        
  `);


  $(".bounce").on("click", function() {
    $('#new-tweet-form-container')
      .append($newTweetForm)
      .slideDown("slow");
  });


  // -------------------------------------------------------------------------

  //render each tweet from data array
  const renderTweets = function(tweets) {

    // clear existing rendered tweets to avoid duplication & reverse order to have newest rendered at the top
    $('#tweets-container').empty();
    tweets.reverse();

    // loop through each tweets to send tweet object data to render the article
    for (const element of tweets) {
      $('#tweets-container').append(createTweetElement(element));
    }
  };

  //render article element for each tweet
  // text method escapes unsafe characters, protecting text area from unintential JS
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
          <div class="text-input">
            ${$("<div>").text(tweetData.content.text).html()}
          </div>
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

  // render error message
  function error(msg) {
    const $error = $(`
      <div class="error-msg">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span class="error-message">${msg}</span>
        <i class="fa-solid fa-circle-exclamation"></i>
      </div>
    `);

    //empty existing messages and input new content, using slide down effect
    $('.error-notification')
      .empty()
      .append($error)
      .slideDown("slow");
  }

  //event listener on form submit
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const textArea = $(this[0]).val();
    
    //check if text area value is blank
    if (!textArea.trim()) {
      error(`Oops, we can't hear you, enter a tweet!`);
    }

    //check if characters exceed 140
    if (textArea.length > 140) {
      error(`Tweet cannot exceed 140 characters`);
      return;
    }
    
    //when a new tweet is submitted in the form load tweets, clear the text area, & reset character counter to 140.
    $.ajax('/tweets', {
      method: 'POST',
      data: data,
      success: function() {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').val(140);
        $(".error-notification").slideUp("slow");
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


