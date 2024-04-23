/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  

  // GET tweets from the server /tweets page
  const loadTweets = () => {
      $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function(tweetData) {
        renderTweets(tweetData);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }

  // Render tweets
  const renderTweets = function(tweets) {
    // Loop through tweets
    for (const tweet of tweets) {
      // Call createTweetElement function to create a tweet article element
      const $tweetArticle = createTweetElement(tweet);

      // Append the created tweet article element to the #tweets-container
      $('.tweets').prepend($tweetArticle);

      // Update the datetime for each new tweet
      $('.ttimeago').timeago();
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

    // Get the date of the tweet
    let tweetDate = new Date(tweet.created_at);

    // convert the date to the format timeago is exopecting
    let isoDate = tweetDate.toISOString();

    // Footer
    const $footer = $('<footer>');
    const $time = $('<time>').addClass('ttimeago').attr('datetime', isoDate);
    const $span = $('<span>');
    const $icon1 = $('<i>').addClass('fa fa-brands fa-font-awesome');
    const $icon2 = $('<i>').addClass('fa fa-solid fa-retweet');
    const $icon3 = $('<i>').addClass('fa fa-solid fa-heart');
    $span.append($icon1, $icon2, $icon3);
    $footer.append($time, $span);

    // Append all elements in article to article
    $tweetArticle.append($header, $tweetParagraph, $footer);

    return $tweetArticle;
  };

  // Helper function for determing if tweet is valid
  const isTweetValid = function(form) {
    const maxChars = 140;

    // Get the tweet data
    const tweetData = $(form).find('textarea[name="text"]').val().trim();

    // Ensure the tweet is not empty
    if (!tweetData) {
      alert("Tweet is empty! At least on character is required.")

      // Clear the form
      $('textarea').val('');

      // Reset the counter and remove the red color
      $('.counter').text('140').removeClass('over-char-count');

      return;
    }

    // Ensure the maximum tweet chars have not been exceeded
    if (tweetData.length > maxChars) {
      alert("You have exceeded 140 characters! Please reduce tweet size.")

      // Clear the form
      $('textarea').val('');

      // Reset the counter and remove the red color
      $('.counter').text('140').removeClass('over-char-count');

      return;
    }

    return true;
  };

  // GET and render tweets when page loads
  loadTweets();

  // Event listener for form submission
  $('form').submit(function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Checks if tweet is valid
    if (!isTweetValid($(this))) {
      return;
    }

    // Serialize the form data in query string format
    const formData = $(this).serialize();

    // Send query string formatted text to Server 
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: formData,
      success: function(response) {
        console.log("it worked");
        $('textarea').val('');
        $('.counter').text('140');
      },
      error: function(xhr, status, error) {
        console.log("error");
      }
    });
  });
});
