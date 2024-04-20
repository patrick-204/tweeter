/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  // Render tweets form
  const createTweetElement = function(tweet) {
    // Article 
    const $tweetArticle = $('main article');
    $tweetArticle.addClass('tweet-article');

    // Header 
    const $header = $tweetArticle.find('header');
    const $div = $header.find('div');
    $div.addClass('tweeter-info');
    const $img = $div.find('img');
    $img.attr('src', tweet.user.avatars);
    const $nameSpan = $div.find('span').eq(0); 
    $nameSpan.text(tweet.user.name);
    const $handleSpan = $header.find('span').eq(1); 
    $handleSpan.text(tweet.user.handle);

    // Tweet/paragraph
    const $tweetParagraph = $tweetArticle.find('p');
    // Add the tweet content 
    $tweetParagraph.text(tweet.content.text);

    // Footer
    const $footer = $tweetArticle.find('footer');
    const $output = $footer.find('output');
    $output.attr('name', 'datetime').text(tweet.created_at);
    const $icons = $footer.find('span i');
    $icons.eq(0).addClass('fa-brands fa-font-awesome');
    $icons.eq(1).addClass('fa-solid fa-retweet');
    $icons.eq(2).addClass('fa-solid fa-heart');

    return $tweetArticle;
  };

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
    }

    $('main').append(createTweetElement(tweetData));
});
