$(document).ready(function() {

  //listen for event to count down characters from 140 in text area
  let characterCount = 0;
  $("textarea").on("input", function() {
    characterCount = 140 - (this.value.length);
    console.log("characterCount: ", characterCount);
  });
  
});