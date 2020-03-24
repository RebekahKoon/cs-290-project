/* Javascript carousel source:
 * https://medium.com/@marcusmichaels/how-to-build-a-carousel-from-scratch-in-vanilla-js-9a096d3b98c9
 */

!(function(d) {
  var carouselPhotoClass = "carousel-photo",
    pictures = d.getElementsByClassName(carouselPhotoClass),
    totalPictures = pictures.length,
    slide = 0,
    moving = true;

  //Carousel sources in the order they appear in the slideshow
  var sources = ["Source: myanimals.com", "Source: shutterstock.com",
    "Source: gettyimages.com", "Source: shutterstock.com", "Source: shutterstock.com",
    "Source: shutterstock.com"
  ];

  //Links to all images used in the carousel in order
  var sourcesLinks = ["https://myanimals.com/health/care-and-well-being/bath-time/how-to-give-a-dog-a-bath-in-the-winter/", "https://www.shutterstock.com/search/bathing+dog", "https://www.gettyimages.com/detail/photo/cavalier-king-charles-spaniel-dog-grooming-session-royalty-free-image/969091296", "https://www.shutterstock.com/search/puppy+grooming?section=1&search_source=base_related_searches&noid=1", "https://www.shutterstock.com/search/dog+groomer", "https://www.shutterstock.com/search/puppy+grooming?section=1&search_source=base_related_searches&noid=1"];

  /* Sets the first image as the active image as well as the next and
   * previous images.  */
  function initializeCarousel() {
    pictures[totalPictures - 1].classList.add("prev");
    pictures[0].classList.add("active");
    pictures[1].classList.add("next");

    /* Putting the source information under the picture by creating a link
     * Source: https://stackoverflow.com/questions/4772774/how-do-i-create-a-link-using-javascript */
    var link = document.createElement('a');
    var linkText = document.createTextNode(sources[0]);
    link.appendChild(linkText);
    link.title = "Source";
    link.href = sourcesLinks[0];
    /* Source for opening a link in a new window:
     * https://www.thesitewizard.com/html-tutorial/open-links-in-new-window-or-tab.shtml */
    link.target = "_blank";

    //Appending the link under the image
    d.getElementById("source-text").appendChild(link);
  }

  /* Adds event listeners to the next and previous buttons that go
   * to the next/previous picture. */
  function createEventListeners() {
    var next = d.getElementsByClassName("carousel-next-button")[0],
      prev = d.getElementsByClassName("carousel-prev-button")[0];

    next.addEventListener("click", nextPicture);
    prev.addEventListener("click", prevPicture);
  }

  /* Goes to the next picture in the slideshow. */
  function nextPicture() {
    //Only goes to next picture if the slideshow isn't moving already
    if (!moving) {
      /* Goes to beginning of slideshow if the current picture is the last
       * picture in the slideshow */
      if (slide === (totalPictures - 1)) {
        slide = 0;
      } else {
        slide++;
      }

      //Moving the carousel to the new slide
      moveCarouselTo(slide);
    }
  }

  /* Goes to previous picture in the slideshow. */
  function prevPicture() {
    if (!moving) {
      /* Goes to the end of the slideshow if the current picture is the last
       * picture in the slideshow */
      if (slide === 0) {
        slide = totalPictures - 1;
      } else {
        slide--;
      }

      //Moving the carousel to the new slide
      moveCarouselTo(slide);
    }
  }

  /* Disables the ability to move to a new picture if the slideshow is
   * currently moving. */
  function disableMove() {
    moving = true;

    //Cannot move
    setTimeout(function() {
      moving = false;
    }, 500);
  }

  /* Moves carousel to the new slide. Determines which slide is next and
   * which slide is the previous slide. */
  function moveCarouselTo(slide) {
    //Can only change pictures if the slideshow is not moving
    if (!moving) {
      disableMove();

      var oldPrev = slide - 2,
        oldNext = slide + 2,
        newPrev = slide - 1,
        newNext = slide + 1;

      //Finding which pictures were the old previous and next
      if (totalPictures - 1 > 3) {
        if (newPrev <= 0) {
          oldPrev = totalPictures - 1;
        } else if (newNext >= totalPictures - 1) {
          oldNext = 0;
        }
      }

      /* Determining the old/new previous/next images new slide is at
       * the beginning or end of the slideshow */
      if (slide === 0) {
        newPrev = totalPictures - 1;
        oldPrev = totalPictures - 2;
        oldNext = slide + 1;
      } else if (slide === totalPictures - 1) {
        newPrev = slide - 1;
        newNext = 0;
        oldNext = 1;
      }

      //Creating the next, previous, and current images
      pictures[newPrev].className = carouselPhotoClass + " prev";
      pictures[newNext].className = carouselPhotoClass + " next";
      pictures[slide].className = carouselPhotoClass + " active";

      //Erasing the source information of the previous image
      d.getElementById("source-text").textContent = "";

      //Creating the current image's source
      var link = document.createElement('a');
      var linkText = document.createTextNode(sources[slide]);
      link.appendChild(linkText);
      link.title = "Source";
      link.href = sourcesLinks[slide];
      link.target = "_blank";

      //Putting the source information under the image
      d.getElementById("source-text").appendChild(link);

      //Changing the classes of the old previous/next images
      pictures[oldPrev].className = carouselPhotoClass;
      pictures[oldNext].className = carouselPhotoClass;
    }
  }

  /* Creates the carousel when the website loads */
  function createCarousel() {
    initializeCarousel();
    createEventListeners();

    moving = false;

    //Source for automatic slideshow: https://www.w3schools.com/jsref/met_win_setinterval.asp
    setInterval(nextPicture, 5000);
  }

  createCarousel();
}(document));