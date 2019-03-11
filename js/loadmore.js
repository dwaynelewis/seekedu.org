(function ($) {

    'use strict';

/*  ======================================
                isotope
            ====================================== */
        // init Isotope
        var isotope_content = $('.iso-content');
        isotope_content.isotope({
            itemSelector: '.iso-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.iso-item'
            }
        });
        // filter items on button click
        var isotope_nav = $('.iso-nav ul li');
        isotope_nav.on('click', function () {
            $('.iso-nav ul li').removeClass('gallery-active');
            $(this).addClass('gallery-active');
            var selector = $(this).attr('data-filter');
            $('.iso-content').isotope({
                filter: selector
            });
            return false;
        });

        // Isotope Load more button

		var $container = $('.iso-content');
		var initShow = 8; //number of items loaded on init & onclick load more button
		var counter = initShow; //counter for load more button
		var iso = $container.data('isotope'); // get Isotope instance

		loadMore(initShow); //execute function onload

		function loadMore(toShow) {
			$container.find(".hidden").removeClass("hidden");

			var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
				return item.element;
			});
			$(hiddenElems).addClass('hidden');
			$container.isotope('layout');

			//when no more to load, hide show more button
			if (hiddenElems.length == 0) {
				jQuery("#load-more").hide();
			} else {
				jQuery("#load-more").show();
			};

		}

		//append load more button
		$container.after('<button id="load-more" class="tem-btn"> Load More</button>');

		//when load more button clicked
		$("#load-more").click(function() {
			if ($('.iso-nav li').data('clicked')) {
				//when filter button clicked, set initial value for counter
				counter = initShow;
				$('.iso-nav li').data('clicked', false);
			} else {
				counter = counter;
			};

			counter = counter + initShow;

			loadMore(counter);
		});

		//when filter button clicked
		$(".iso-nav li").click(function() {
			$(this).data('clicked', true);

			loadMore(initShow);
		});
    });

}(jQuery));
