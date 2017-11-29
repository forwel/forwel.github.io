function videoResize (selector) {
	var height,
		width,
		video,
		originalRatio = 16/9;
	$(selector).each(function (index) {
		height = $(this).height();
		width = $(this).width();
		video = $(this).children();
		
		if (width / height >= originalRatio) {
			video.css({
				'width': width,
				'height': width / originalRatio,
				'margin-top': (height - (width / originalRatio)) / 2,
				'margin-left': ''
			})
		} else {
			video.css({
				'width': height * originalRatio,
				'height': height,
				'margin-top': '',
				'margin-left': (width - (height * originalRatio)) / 2
			})
		}
	})
}

$(document).ready(function() {
	$(".lightbox-open").fancybox({
		theme : 'light'
	});
	
    var width = $(window).width();
	videoResize('.cn-video-container');
	
    $(window).resize(function() {
        width = $(window).width();
		videoResize('.cn-video-container');
    });

    //Всплывашка
    $(".fancybox").fancybox();

    if (width > 975) {

        //Анимация
        $(".s_advantages .item").animated("zoomIn", "fadeOut");
        $(".s_advantages form").animated("fadeInRight", "fadeOut");
        $(".s_results .item").animated("fadeInUp", "fadeOut");
        $(".s_services .item").animated("fadeIn", "fadeOut");
        $(".s_conditions .tab_item").animated("fadeIn", "fadeOut");
        $(".s_projects .tab_item").animated("fadeIn", "fadeOut");
		
		
        $(".cn-card .cn-card__item").animated("fadeInUp", "fadeOut");
		
        $(".s_step .item").not(".item4").animated("fadeInLeft", "fadeOut");
        $(".s_step .item.item4").animated("fadeIn", "fadeOut");

    }
    var device = $("html").attr("class");
    if (device.indexOf("desktop") != -1) {
        //маска телефона
        $('input[name=phone]').maskinp("+7 (999) 999-99-99");
    }

    //кнопка подробнее
    $(".fancybox[href='#popup_desc']").click(function() {
        var desc = $(this).parent().find(".desc").html();
        $("#popup_desc").html(desc);
    });

    //переключатель
    $(".s_why .wrap .item").click(function() {
        $(".s_why .wrap .item").removeClass("active").eq($(this).index()).addClass("active");
        $(".s_why .bottom .info").hide().eq($(this).index()).fadeIn()
    });

    //слайдер
    $(".s_partners .carousel").owlCarousel({
        items: 6,
        slideSpeed: 1000,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsMobile: [479, 1]
    });
    $(".s_reviews .carousel").owlCarousel({
        singleItem: true,
        slideSpeed: 1000
    });
    //кнопки слайдера
    $(".prevButton").click(function() {
        $(this).parent().find(".carousel").trigger("owl.prev");
    });
    $(".nextButton").click(function() {
        $(this).parent().find(".carousel").trigger("owl.next");
    });

    //Отправка формы
    $("form").submit(function(e) {
        e.preventDefault;
        var f = $(this);
        $('.ierror', f).removeClass('ierror');
        var name = $('input.name', f).val();
        var phone = $('input.phone', f).val();
        var error = false;
        if (name == '') {
            $('input.name', f).addClass('ierror');
            error = true;
        }
        if (phone == '') {
            $('input.phone', f).addClass('ierror');
            error = true;
        }
        if (error) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open("#thanks");
        });
        return false;
    });

    //меню
    $(".scroll").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href')
          , top = $(id).offset().top - 30;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
	
    $(window).scroll(function() {
		if ($(window).scrollTop() > $(window).height() + 10) {
			$('.cn-section-hero__contain').css('visibility', 'hidden');
		} else {
			$('.cn-section-hero__contain').css('visibility', 'visible');
		}
        var $sections = $('section,header');
        $sections.each(function(i, el) {
            var top = $(el).offset().top;
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop() + 100;
            var id = $(el).attr('id');

            if (scroll > top && scroll < bottom) {
                $('.menu li.active').removeClass('active');
                $('.menu a[href="#' + id + '"]').parent().addClass('active');

            }
        })
    });

    $(".menu_small button").click(function() {
        $(".menu").slideToggle();
    });
    $(".menu a").click(function() {
        if (width < 975) {
            $(".menu").css("display", "none");
            $(".c-hamburger").removeClass("is-active");
        }
    });

    if (!$.browser.safari) {
        (function() {

            "use strict";

            var toggles = document.querySelectorAll(".c-hamburger");

            for (var i = toggles.length - 1; i >= 0; i--) {
                var toggle = toggles[i];
                toggleHandler(toggle);
            }
            ;
            function toggleHandler(toggle) {
                toggle.addEventListener("click", function(e) {
                    e.preventDefault();
                    (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
                });
            }

        }
        )();
    }
});
