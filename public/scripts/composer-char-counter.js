$(document).ready(function() {

  //count down characters from 140 in text area
  let characterCount = 0;
  $("textarea").on("input", function() {
    characterCount = 140 - (this.value.length);
    // replace hardcoded '140' with the character count
    $(this).parent().siblings().children("output").html(characterCount);

    //change negative numbers to red
    if (characterCount < 0) {
      $(this).parent().siblings().children("output").css("color", "red");
    } else {
      $(this).parent().siblings().children("output").css("color", "#545149");
    }
  });
  
});