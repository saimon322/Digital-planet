var isScrolling = false;
var scrollPos = 0;
var isFirstScreen;
var isLastScreen;
var winWidth = $(window).width();

$(document).ready(function () {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // Header nav menu toggle open/close
  $(".menu-btn").click(function(e){
    $(".menu-btn, .menu").toggleClass("active");
    $("body").toggleClass("overflow");
    $(".section-content").toggleClass("opacity");
  });

  slickify();
  winWidth = $(window).width();
  $(window).resize(function(){
      winWidth = $(window).width();
      if ($windowWidth < 992) {
          slickify();   
      }
  });

  // Page scroll to the top on loading
  $(window).on('beforeunload', function(){
    $(window).scrollTop(0);
  })

  // Adding scroll event
  window.addEventListener('scroll', function(e) {
    // Make actions only when page not scrolling now
    if (! isScrolling && winWidth > 1200) {  
      firstSection = $(".section-first.active").length;
      lastSection = $(".section-last.active").length;

      // Detects new state and compares it with the new one
      let scrollPosNew = - (document.body.getBoundingClientRect()).top;

      // Down (if scroll down and first screen is active)
      if (scrollPosNew > scrollPos && firstSection)
        scrollDown()
      // Up (if scroll up and last screen is active)
      else if (scrollPosNew < scrollPos && lastSection)
        scrollUp()
    }
  });

  // Scroll by buttons
  $(".btn-scroll").click(function(){   
    firstSection = $(".section-first.active").length;
    lastSection = $(".section-last.active").length;
    
    // Down (if first screen is active)
    if (firstSection)
      scrollDown();
    // Up (if last screen is active)
    else if (lastSection)
      scrollUp()
});

function scrollDown() {
  let h = $(window).height();
  // Scroll to the last screen
  $('body, html').stop().animate({scrollTop: h}, 1000);
  isScrolling = true;
  scrollPos = h;
  setTimeout(function() {isScrolling = false;}, 1000)
  $(".section").toggleClass("active");
}

function scrollUp() {
  // Scroll to the top of window (to the first screen)
  $('body, html').stop().animate({scrollTop: 0}, 1000);
  isScrolling = true;
  scrollPos = 0;
  setTimeout(function() {isScrolling = false;}, 1000)
  $(".section").toggleClass("active");
}

function slickify() {
  $('.slick').slick({
    responsive: [
        {breakpoint: 9999, settings: "unslick"},
        {breakpoint: 992}
    ]
  });
}