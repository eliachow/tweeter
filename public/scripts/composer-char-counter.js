$(document).ready(function() {

//listen for event to count characters
let characterCount = 0;
  $("textarea").on("input", function() {
    characterCount = this.value.length;
    console.log("characterCount: ", characterCount)
  });
  
});