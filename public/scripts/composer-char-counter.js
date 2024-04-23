$(document).ready(() => {
  const maxCharLim = 140;

  $("#tweet-text").on('input', function() {
    // Number of chars
    let charsLength = this.value.length;

    // Get the remaining amount of chars
    let charsLeft = maxCharLim - charsLength;

    // Find the counter element
    const counterRef = $(this).closest('form').find('.counter');

    counterRef.text(charsLeft);

    // If there are over 140 chars then turn the counter red
    if (charsLeft < 0) {
      counterRef.addClass('over-char-count');
    } else {
      counterRef.removeClass('over-char-count');
    }
  });
});