/* Source for download button: https://www.w3schools.com/tags/att_a_download.asp */

/* Creates a button that downloads a file. The file contains a map the the
 * grooming salon. */
function createButton() {
  var mapDownloadCol = document.getElementsByClassName("column-right")[0];

  //Creating the link to the file
  var link = document.createElement("a");
  link.href = "map.pdf";
  link.download = "map.pdf";

  //Creating the button
  var button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Directions";

  //Placing the button with the link on the page
  link.appendChild(button);
  mapDownloadCol.appendChild(link);
}

createButton();