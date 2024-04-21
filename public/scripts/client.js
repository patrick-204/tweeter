/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
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
  ]

  // Render tweets
  const renderTweets = function(tweets) {
    // Loop through tweets
    for (const tweet of tweets) {
      // Call createTweetElement function to create a tweet article element
      const $tweetArticle = createTweetElement(tweet);

      // Append the created tweet article element to the #tweets-container
      $('.container').append($tweetArticle);
    }
  };

  // Creat tweets
  const createTweetElement = function(tweet) {
    // Create tweet article element
    const $tweetArticle = $('<article>').addClass('tweet-article');

    // Header 
    const $header = $('<header>');
    const $div = $('<div>').addClass('tweeter-info');
    const $img = $('<img>').attr('src', tweet.user.avatars);
    const $nameSpan = $('<span>').text(tweet.user.name);
    const $handleSpan = $('<span>').text(tweet.user.handle);
    $div.append($img, $nameSpan);
    $header.append($div, $handleSpan);

    // Tweet/paragraph
    const $tweetParagraph = $('<p>').text(tweet.content.text);

    // Footer
    const $footer = $('<footer>');
    const $output = $('<output>').attr('name', 'datetime').text(tweet.created_at);
    const $span = $('<span>');
    const $icon1 = $('<i>').addClass('fa fa-brands fa-font-awesome');
    const $icon2 = $('<i>').addClass('fa fa-solid fa-retweet');
    const $icon3 = $('<i>').addClass('fa fa-solid fa-heart');
    $span.append($icon1, $icon2, $icon3);
    $footer.append($output, $span);

    // Append all elements in article to article
    $tweetArticle.append($header, $tweetParagraph, $footer);

    return $tweetArticle;
  };

  // Render the tweets with the fake data taken from initial-tweets.json
  renderTweets(data);
});
