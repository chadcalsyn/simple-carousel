/*************************************************************************************
    carousel.js
    
    DESCRIPTION
    A simple carousel example that displays a number of image in a horizontal bar
    with dots below it to represent each page and left and right navigation
    buttons. It also features a simple lightbox feature when clicking each image.
    
    AUTHOR      Chad M. Calsyn
    CREATED     9/7/2016
    UPDATED     9/7/2016
    VERSION     1.0
    
*************************************************************************************/

var numImages;      /* Total number of images in the carousel */
var numToDisplay;   /* Number of images to display at one time */
var numPages;       /* Number of pages necessary to display the images */
var firstShown;     /* The first image currently being displayed */

/* Adjust the number of images displayed based on the window width */
$(window).resize(function(){

    if($(window).width() >= 1200) {
        numToDisplay = 5;
        initCarousel();
    }
    if($(window).width() >= 800 && $(window).width() < 1200) {
        numToDisplay = 4;
        initCarousel();
    }
    if($(window).width() >= 450 && $(window).width() < 800) {
        numToDisplay = 2;
        initCarousel();
    }
    if($(window).width() < 450) {
        numToDisplay = 1;
        initCarousel();
    }

});        

$(document).ready(function(){    

    /* Call the resize function above to set the number of images to display */
    $(window).trigger('resize');

    /* Use the lightbox-link class to make the link for each image open in a lightbox effect */
    $('.lightbox-link').click(function(e) {	
        e.preventDefault();     
        $('#lightbox-content').html('<img src="' + $(this).attr("href") + '" />');
        $('#lightbox').fadeIn(200);

    });

    $('#lightbox').click(function() { 
        $(this).fadeOut(200);
    });        

});

/************************************************************** 
   function: initCarousel
   Initializes (or re-initializes) the carousel by adding 
   the page dots and navigation buttons 
   Parameters: none
   Return value: none
**************************************************************/
function initCarousel() {

    /* Remove the page dots and navigation (if they exist yet) */
    $(".carousel-pages").remove();
    $("#nav-prev").remove();
    $("#nav-next").remove();

    /* Count the number of images and determine number of pages needed */
    numImages = $(".image-carousel .item").length;
    numPages = Math.ceil(numImages / numToDisplay);

    /* Create the HTML for the page dots */
    pagesHTML = '<UL class="carousel-pages"><LI class="current"><a href="javascript:void(0);" onclick="changeCarouselPage(1)">Page 1</a></LI>';
    for(i = 1; i < numPages; i++) {
        pagesHTML += '<LI><a href="javascript:void(0);" onclick="changeCarouselPage(' + ((i * numToDisplay)+1) + ')">Page ' + (i + 1) + '</a></LI>';
    }
    pagesHTML += '</UL>';        

    /* Add the page dots after the carousel */
    $(".image-carousel").each(function() {
        $(this).after(pagesHTML);
        $(this).after('<button id="nav-prev" onclick="carouselNav(-1)" disabled="disabled">Previous</button> <button id="nav-next" onclick="carouselNav(1)">Next</button>');
    });

    /* Hide all the images that shouldn't appear... */
    for(i = numToDisplay + 1; i <= numImages; i++) {
        $(".image-carousel .item:nth-child(" + i + ")").hide();
    }
    /* Then show the images that should appear */
    for(i = 1; i <= numToDisplay; i++) {
        $(".image-carousel .item:nth-child(" + i + ")").show();
    }

    /* Reset the carousel to the beginning */
    firstShown = 1;
    
}

/************************************************************** 
   function: changeCarouselPage
   Moves the carousel according to a page dot click
   or a navigation button click
   Parameters: x (The index of the first image to show)
   Return value: none
**************************************************************/
function changeCarouselPage(x) {

    /* Hide all the carousel items */
    $(".image-carousel .item").hide(20);  /* Delay of 20ms creates a slight animation effect */

    /* Starting with new first image, display the new set of images */
    for(i = x; i < x + numToDisplay; i++) {
        $(".image-carousel .item:nth-child(" + i + ")").show(20);
    }

    /* Change the highlighted page dot */
    $(".carousel-pages li").removeClass("current");
    $(".carousel-pages li:nth-child(" + ((x - 1) / numToDisplay + 1) + ")").addClass("current");

    /* Disable the previous navigation button if at the beginning */
    if(x == 1)        
        $("#nav-prev").attr("disabled","disabled");
    else
        $("#nav-prev").removeAttr("disabled");

    /* Ditto for the next navigation button if at the end */
    if(numImages - x < numToDisplay)        
        $("#nav-next").attr("disabled","disabled");
    else
        $("#nav-next").removeAttr("disabled");            
    
    /* Update the global variable for first item shown */
    firstShown = x;

}

/************************************************************** 
   function: carouselNav
   Middle-man function for the previous and next navigation
   before calling changeCarouselPage
   Parameters: x (1 for next page, -1 for previous page)
   Return value: none
**************************************************************/    
function carouselNav(x) {

    /* Determine the next first image to show */
    var makeThisFirst = firstShown + (x * numToDisplay);

    /* Call changeCarouselPage to make the change */
    changeCarouselPage(makeThisFirst);

}    