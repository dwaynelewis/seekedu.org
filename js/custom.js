(function($) {
  var $window = $(window),
    $doc = $(document),
    $tarikzhero = $("#tarikzhero"),
    $tarikzteam = $("#tarikzteam"),
    $tarikztestimonial = $("#tarikztestimonial"),
    $tarikzclients = $("#tarikzclients"),
    $container = $("#portfolio-container");

  ("use strict");
  $window.on("load", function() {
    $(".preloader").fadeOut("slow", function() {
      $(".preloader-top").addClass("slide-top");
    });

    //** LAZY LOAD GALLERY IMAGES */
    var isoTimeOut;
    var loadingImageCount = 0;
    onLazyImageLoaded = function(el) {
      if (isoTimeOut) {
        clearTimeout(isoTimeOut);
      }
      isoTimeOut = setTimeout(updateGalleryAfterTimeOut, 100);
    };

    function updateGalleryAfterTimeOut() {
      if ($containergal) {
        $containergal.isotope();
        $("#pics img.loaded").css("visibility", "visible");
        $("#pics img.loaded").addClass("revealed");
      }
      clearTimeout(isoTimeOut);
    }

    var myLazyLoad = new LazyLoad({
      elements_selector: "#pics img",
      callback_loaded: onLazyImageLoaded
    });

    $tarikzhero.owlCarousel({
      nav: true,
      navText: ["PREV", "NEXT"],
      items: 1,
      navSpeed: 400,
      video: true,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true
    });

    $tarikzteam.each(function(index) {
      var items_no = $(this).data("slides");
      $(this).owlCarousel({
        nav: true,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
          1024: {
            items: items_no
          },
          600: {
            items: 2
          }
        }
      });
    });

    $tarikztestimonial.each(function(index) {
      var items_no = $(this).data("slides");
      $(this).owlCarousel({
        nav: true,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        navSpeed: 400,
        responsive: {
          1024: {
            items: items_no
          },
          600: {
            items: 1
          }
        }
      });
    });

    $tarikzclients.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        1024: {
          items: 5
        },
        600: {
          items: 3
        }
      }
    });

    //Initiat WOW JS
    new WOW().init();

    //Topnav transition
    $window
      .scroll(function(event) {
        if ($doc.scrollTop() >= $(".background-area").height() / 6) {
          $("#home").addClass("scrolled");
        } else {
          $("#home").removeClass("scrolled");
        }
      })
      .trigger("scroll");

    // Mobile Menu
    $(".menu-open").on("click", function() {
      $(".menu-open").fadeToggle(200);
      $(".menu-close").fadeToggle(200);
      $(".main-menu").fadeToggle(500);
    });

    $(".menu-close").on("click", function() {
      $(".menu-open").fadeToggle(200);
      $(".menu-close").fadeToggle(200);
      $(".main-menu").fadeToggle(500);
    });

    //Navigation Scrolling
    $(".one-page a").on("click", function() {
      $(".menu-open").fadeToggle(200);
      $(".menu-close").fadeToggle(200);
      $(".main-menu").fadeToggle(500);

      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top
            },
            700
          );
          return false;
        }
      }
    });

    // Intialize Map
    google.maps.event.addDomListener(window, "load", init);

    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.67, -73.94), // New York

        scrollwheel: false,

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          {
            featureType: "all",
            stylers: [
              {
                saturation: -65
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                hue: "#00ffee"
              },
              {
                saturation: 80
              }
            ]
          },
          {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]
      };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById("map");

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      var image = "images/map-marker.png";
      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.67, -73.94),
        map: map,
        icon: image,
        draggable: true,
        animation: google.maps.Animation.DROP
      });
      marker.addListener("click", toggleBounce);

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
    }

    /*  ======================================
                isotope
            ====================================== */
    // init Isotope
    var isotope_content = $(".iso-content");
    isotope_content.isotope({
      itemSelector: ".iso-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: ".iso-item"
      }
    });
    // filter items on button click
    var isotope_nav = $(".iso-nav ul li");
    isotope_nav.on("click", function() {
      $(".iso-nav ul li").removeClass("gallery-active");
      $(this).addClass("gallery-active");
      var selector = $(this).attr("data-filter");
      $(".iso-content").isotope({
        filter: selector
      });
      return false;
    });

    // Isotope Load more button

    var $containergal = $(".iso-content");
    window.__$containergal = $containergal;
    var initShow = 8; //number of items loaded on init & onclick load more button
    var counter = initShow; //counter for load more button
    var iso = $containergal.data("isotope"); // get Isotope instance

    loadMore(initShow); //execute function onload

    function loadMore(toShow) {
      $containergal.find(".hidden").removeClass("hidden");

      var hiddenElems = iso.filteredItems
        .slice(toShow, iso.filteredItems.length)
        .map(function(item) {
          return item.element;
        });
      $(hiddenElems).addClass("hidden");
      $containergal.isotope("layout");

      //when no more to load, hide show more button
      if (hiddenElems.length == 0) {
        jQuery("#load-more").hide();
      } else {
        jQuery("#load-more").show();
      }
    }

    //append load more button
    $containergal.after(
      '<button id="load-more" class="tem-btn">Load More</button>'
    );

    //when load more button clicked
    $("#load-more").click(function() {
      if ($(".iso-nav li").data("clicked")) {
        //when filter button clicked, set initial value for counter
        counter = initShow;
        $(".iso-nav li").data("clicked", false);
      } else {
        counter = counter;
      }

      counter = counter + initShow;

      loadMore(counter);
    });

    //when filter button clicked
    $(".iso-nav li").click(function() {
      $(this).data("clicked", true);

      loadMore(initShow);
    });
  });
})(jQuery);
