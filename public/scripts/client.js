/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
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
  
    // return <article>
    return $tweet;
  }


  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


});
