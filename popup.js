$(document).ready(function () {
  // Show pop-up on page load
  $("#instructions-popup").show();

  // Close pop-up when close button is clicked
  $(".close-popup").click(function () {
    $("#instructions-popup").hide();

    // Redirect to another HTML page (replace 'new-page.html' with the actual file name)
    window.location.href = "index.html";
  });
});
