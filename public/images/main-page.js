(function ($) {

	var columns = $('.column'),
		diagrams = $('.diagrams');


	if($(window).width() <= 768) {
		$(document).ready (function($) {
			$('.sk-circle').hide(0);
			//$('#preloader-video').get(0).play();
			$.cookie('preloader', true, { path: '/' });
			loadbar(1050);

		});
		
		$(document).ready (function() {			
			var ids = $('a.diagram');
			var blocks = $('.diagram-navigation-column');
			var search = '';	
			for(var i=1; i <=ids.length; i++){
				search = "a#list_"+i;
				var el = $(search);
			
				$(search).remove();
				el.appendTo('.diagram-navigation-column');
			}
			var blocks = $('.diagram-navigation-column');
			for(var i = 0; i < blocks.length; i++){
				if(i > 0){
					blocks.eq(i).remove();
				}
			}
		});
		
	} else {
		$(document).ready (function($) {
			if (typeof(Storage) !== "undefined") {
				if (sessionStorage.getItem('preloader') == null) {
					$('.sk-circle').hide(0);
					sessionStorage.setItem('preloader', 'true');
					$('#page-preloader').css({
	    				'background-color': 'white',
	    				'background-image': 'none'
	    			});
					loadbar(5000);
				} else {
					$('#page-preloader').css({
	    				'background-color': '',
	    				'background-image': ''
	    			});
					$('.page-preloader-video').hide(0);
					loadbar(500);
				}
			} else {
				if($.cookie('preloader')) {
					$('#page-preloader').css({
	    				'background-color': '',
	    				'background-image': ''
	    			});
					$('.page-preloader-video').hide(0);
					loadbar(1050);
				} else {
					$('.sk-circle').hide(0);
					$.cookie('preloader', true, { path: '/' });
					$('#page-preloader').css({
	    				'background-color': 'white',
	    				'background-image': 'none'
	    			});
					loadbar(5000);
				}
			}
		});
	}

	$(window).on('load', changeLogoLabelSize);

	$(window).on('resize', changeLogoLabelSize);

	function changeLogoLabelSize () {
		$('.logo-label img').height($('.sidenav .logo-img').height());
	}

})(jQuery);