$(document).ready(function() {

//listen for event to count characters
let inputCount = 0;
const textAreaCount = 140;
  $("textarea").on("input", function() {
    inputCount = this.value.length;
    const characterCount = textAreaCount - inputCount;
    console.log("characterCount: ", characterCount)
  });
  
});