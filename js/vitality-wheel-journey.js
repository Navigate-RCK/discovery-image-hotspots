
jQuery(document).ready(function ($) {

    console.log("document ready");

    var vitHealthPopup = "vit-health-popup";
    var vitHealthContent = "vit-health-popup-content";
    var hotspotClass = "vit-health-wheel-hotspot";
    var hotspotAnimationIdAttr = "data-animation-index";
    var honeyCombClass = "honeycomb-holder";
    var honeycombAnimationIdAttr = "data-honeycomb-animation-index";
    var hotspotEl = $(`.${hotspotClass}[${hotspotAnimationIdAttr}]`);
    var hotspotElLength = $(hotspotEl).length;
    var hsIcon = "hs-icon";
    var hsIconSvg = "hs-icon-svg";
    var sliderContainerClass = "rck-slider-container";

    var pulseSelected = function (currentIndex, nextIndex) {
        if (nextIndex <= hotspotElLength) {
            // $(`.${hotspotClass}`).find(`.${hsIcon}, .${hsIconSvg}`).removeClass("selected").addClass("unselected");
            // $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).find(`.${hsIcon}`).removeClass("unselected").addClass("selected");
            // $(`.${hotspotClass}`).removeClass("pulse");
            // $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).removeClass("pulse");
            // if (nextIndex < hotspotElLength-1) {
            //     $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${nextIndex}"]`).addClass("pulse");
            // }
            $(`.${hotspotClass}`).removeClass("pulse-animate");
            $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).removeClass("pulse-animate");
            if (nextIndex < hotspotElLength) {
                $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${nextIndex}"]`).addClass("pulse-animate");
            }
        }
    };

    var showIcons = function () {
        var delay = 300;

        $(`.${honeyCombClass}`).each(function (index) {
            setTimeout(function () {
                $(`.${honeyCombClass}[${honeycombAnimationIdAttr}="${index}"]`).addClass("animate-honeycomb")
            }, delay);
            delay += (100 + (2 * (index + 1)));
        });

        $(`.${hotspotClass}`).each(function (index) {
            setTimeout(function () {
                $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${index}"]`).removeClass("hidden").addClass("animate-hotspot")
            }, delay);
            delay += (100 + (3 * (index + 1)));
        });

        setTimeout(function () {
            $(`.${hotspotClass}[${hotspotAnimationIdAttr}="1"]`).addClass("pulse-animate");
            $(`.${hotspotClass}`).removeClass("animate-hotspot").addClass("visible");
        }, 3500);
    };

    showIcons();

    var slider;
    if (navigator.msMaxTouchPoints) {

        $('#slider').addClass('ms-touch');

        $('#slider').on('scroll', function () {
            $('.slide-image').css('transform', 'translate3d(-' + (100 - $(this).scrollLeft() / 6) + 'px,0,0)');
        });

    } else {

        var slideLength = $(".slide-wrapper").length;

        slider = {

            el: {
                slider: $("#slider"),
                holder: $(".holder"),
                imgSlide: $(".slide-image")
            },

            slideWidth: $('#slider').width(),
            touchstartx: undefined,
            touchmovex: undefined,
            movex: undefined,
            index: 0,
            longTouch: undefined,
            slideCount: slideLength,

            init: function () {
                this.bindUIEvents();
            },

            bindUIEvents: function () {

                this.el.holder.on("touchstart", function (event) {
                    slider.start(event);
                });

                this.el.holder.on("touchmove", function (event) {
                    slider.move(event);
                });

                this.el.holder.on("touchend", function (event) {
                    slider.end(event);
                });

            },

            start: function (event) {
                // Test for flick.
                this.longTouch = false;
                setTimeout(function () {
                    window.slider.longTouch = true;
                }, 250);

                // Get the original touch position.
                this.touchstartx = event.originalEvent.touches[0].pageX;

                // The movement gets all janky if there's a transition on the elements.
                $('.animate').removeClass('animate');
            },

            move: function (event) {
                // Continuously return touch position.
                this.touchmovex = event.originalEvent.touches[0].pageX;
                // Calculate distance to translate holder.
                this.movex = this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
                // Defines the speed the images should move at.
                var panx = 100 - this.movex / 6;
                if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
                    this.el.holder.css('transform', 'translate3d(-' + this.movex + 'px,0,0)');
                }
                if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
                    this.el.imgSlide.css('transform', 'translate3d(-' + panx + 'px,0,0)');
                }
            },

            end: function (event) {
                // Calculate the distance swiped.
                var absMove = Math.abs(this.index * this.slideWidth - this.movex);
                // Calculate the index. All other calculations are based on the index.
                if (absMove > this.slideWidth / 2 || this.longTouch === false) {
                    if (this.movex > this.index * this.slideWidth && this.index < this.slideCount - 1) {
                        this.index++;
                    } else if (this.movex < this.index * this.slideWidth && this.index > 0) {
                        this.index--;
                    }
                }
                // Move and animate the elements.
                this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index * this.slideWidth + 'px,0,0)');

                pulseSelected(this.index, this.index + 1);

            },

            slideByIndex: function (index) {
                this.index = index;
                // Move and animate the elements.
                this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index * this.slideWidth + 'px,0,0)');
            }

        };

        slider.init();
    }

    var slideOnClick = function (index) {
        if (slider) {
            slider.slideByIndex(index);
        }
    };

    $("button").click(function () {
        console.log("button click - move to index 2");
        slideOnClick(2);
    });

    $(hotspotEl).click(function () {
        var currentIndex = Number($(this).attr(hotspotAnimationIdAttr));
        var prevIndex = currentIndex - 1;
        var nextIndex = currentIndex + 1;

        pulseSelected(currentIndex, nextIndex);

        slideOnClick(currentIndex);
    });

    // $(hotspotEl).click(function () {
    //     var $img = jQuery(this).find(`.${hsIconSvg}`);
    //     var imgID = $img.attr('id');
    //     var imgClass = $img.attr('class');
    //     var imgURL = $img.attr('src');
    //
    //     jQuery.get(imgURL, function (data) {
    //         // Get the SVG tag, ignore the rest
    //         var $svg = jQuery(data).find('svg');
    //
    //         // Add replaced image's ID to the new SVG
    //         if (typeof imgID !== 'undefined') {
    //             $svg = $svg.attr('id', imgID);
    //         }
    //         // Add replaced image's classes to the new SVG
    //         if (typeof imgClass !== 'undefined') {
    //             $svg = $svg.attr('class', imgClass + ' replaced-svg');
    //         }
    //
    //         // Remove any invalid XML tags as per http://validator.w3.org
    //         $svg = $svg.removeAttr('xmlns:a');
    //
    //         // Check if the viewport is set, else we gonna set it if we can.
    //         if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //             $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    //         }
    //
    //         // Replace image with new SVG
    //         $img.replaceWith($svg);
    //
    //     }, 'xml');
    // });
});