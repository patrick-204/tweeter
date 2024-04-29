/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  // Helper function for displaying error message
  const displayError = (errorMessage) => {
    const $errorTweet = $('.tweet-error');
    $errorTweet.text(errorMessage);
    $errorTweet.removeClass('hidden');
  };

  // Helper function for hiding error message
  const hideError = () => {
    const $errorTweet = $('.tweet-error');
    $errorTweet.empty();
    $errorTweet.addClass('hidden');
  }

  // GET tweets from the server /tweets page
  const loadTweets = () => {
    // Ajax request for loading tweets
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function(tweetData) {
        renderTweets(tweetData);
      },
      error: function(xhr, status, error) {
        displayError(`Error when reading existing tweets: ${error}`);
      }
    });
  }

  // Render tweets
  const renderTweets = function(tweets) {
    // Clear existing tweets so are not duplicated
    $('.tweets').empty();

    // Loop through tweets
    for (const tweet of tweets) {
      // Call createTweetElement function to create a tweet article element
      const $tweetArticle = createTweetElement(tweet);

      // Prepend the created tweet article element to the tweets container
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
    const $tweetParagraph = $('<p>').text(tweet.content.text).css('word-wrap', 'break-word');

    // Get the date of the tweet
    let tweetDate = new Date(tweet.created_at);

    // convert the date to the format timeago is expecting
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
      displayError("Tweet cannot be empty!");
      return false;
    }

    // Ensure the maximum tweet chars have not been exceeded
    if (tweetData.length > maxChars) {
      displayError("You have exceeded 140 characters! Please reduce tweet size.");
      return false;
    }

    return true;
  };

  // GET and render existing tweets when page loads
  loadTweets();

  // Event listener for form submission
  $('form').submit(function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Checks if tweet is valid
    if (!isTweetValid($(this))) {
      return;
    }

    // Hide errors if tweet is valid
    hideError();

    // Serialize the form data in query string format
    const formData = $(this).serialize();

    // Send query string formatted text to Server 
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: formData,
      success: function(response) {
        console.log("it worked");
        // Add the new tweet to the page dynamically
        loadTweets();
        // Clear the text area and set counter to 140 after successful tweet
        $('textarea').val('');
        $('.counter').text('140');
      },
      error: function(xhr, status, error) {
        displayError(`Error when Submitting tweet!: ${error}`);
      }
    });
  });
});
