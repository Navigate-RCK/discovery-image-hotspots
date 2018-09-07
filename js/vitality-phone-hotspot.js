jQuery(document).ready(function ($) {
    console.log("document ready");

    var iconsAnimatedFlag = false;

    var vitHealthPopup = "vit-health-popup";
    var vitHealthContent = "vit-health-popup-content";
    var vitWheelDiscClass = "vit-wheel-disc-bg-img";
    var hotspotClass = "vit-health-wheel-hotspot";
    var hotspotAnimationIdAttr = "data-animation-index";
    var honeyCombContainerClass = "vit-health-wheel-honeycomb-cont";
    var honeyCombClass = "honeycomb-holder";
    var honeycombAnimationIdAttr = "data-honeycomb-animation-index";
    var hotspotEl = $(`.${hotspotClass}[${hotspotAnimationIdAttr}]`);
    var hotspotElLength = $(hotspotEl).length;
    var hsIcon = "hs-icon";
    var hsIconSvg = "hs-icon-svg";
    var sliderContainerClass = "rck-slider-container";
    var sliderContainerAnimate = "rck-slider-container-animate";
    var dotClass = "dot";
    var selectedClass = "selected";
    var arrowClass = "arrow";

    var pulseSelected = function (currentIndex) {
        $(`.${hotspotClass}`).removeClass("pulse-animate");
        $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).addClass("pulse-animate");
        selectBreadCrumb(currentIndex);
    };

    var selectBreadCrumb = function (index) {
        $(`.${dotClass}`).removeClass(selectedClass);
        $(`.${dotClass}[${hotspotAnimationIdAttr}="${index}"]`).addClass(selectedClass);
    };

    var animateHoneyComb = function () {
        $(`.${honeyCombClass}:gt(0)`).hide();
        setInterval(function () {
            $(`.${honeyCombClass}:first`)
                .fadeOut(2000)
                .next()
                .fadeIn(2000)
                .end()
                .appendTo(`.${honeyCombContainerClass}`);
        }, 4000);
    };

    var hideIcons = function() {
        $(`.${vitWheelDiscClass}`).hide();
        // $(`.${sliderContainerClass}`).hide();
        $(`.${honeyCombContainerClass}`).hide();
    };

    var showIcons = function () {
        var delay = 300;

        // $(`.${honeyCombClass}`).each(function (index) {
        //     setTimeout(function () {
        //         $(`.${honeyCombClass}[${honeycombAnimationIdAttr}="${index}"]`).addClass("animate-honeycomb")
        //     }, delay);
        //     delay += (100 + (2 * (index + 1)));
        // });
        $(`.${vitWheelDiscClass}`).show();
        $(`.${vitWheelDiscClass}`).addClass("vit-wheel-disc-animate");
        // $(`.${sliderContainerClass}`).show();
        // $(`.${sliderContainerClass}`).addClass(sliderContainerAnimate);
        $(`.${honeyCombContainerClass}`).fadeIn(2000);

        $(`.${hotspotClass}`).each(function (index) {
            setTimeout(function () {
                $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${index}"]`).removeClass("hidden").addClass("animate-hotspot")
            }, delay);
            delay += (100 + (3 * (index + 1)));
        });

        setTimeout(function () {
            $(`.${hotspotClass}[${hotspotAnimationIdAttr}="0"]`).addClass("pulse-animate");
            $(`.${hotspotClass}`).removeClass("animate-hotspot").addClass("visible");
        }, 3500);
    };

    // showIcons();
    animateHoneyComb();

    var slider;
    if (navigator.msMaxTouchPoints) {

        $('#slider').addClass('ms-touch');

        $('#slider').on('scroll', function () {
            $('.slide-image').css('transform', 'translate3d(-' + (100 - $(this).scrollLeft() / 6) + 'px,0,0)');
        });

    } else {

        var slideLength = $(".rck-slide-wrapper").length;

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

        pulseSelected(currentIndex);

        slideOnClick(currentIndex);
    });

    $(`.${arrowClass}`).click(function () {
        var dotEl = $(this).parent().find($(`.${dotClass}`));
        var currentIndex;
        $(dotEl).each(function (index) {
            console.log(`dot index: ${$(this).attr(hotspotAnimationIdAttr)}`);
            if ($(this).hasClass(`selected`)) {
                currentIndex = index;
                console.log(`selected dot index: ${index}`);
            }
        });
        var nextIndex = currentIndex + 1;
        var prevIndex = currentIndex - 1;

        if (currentIndex === 0)
            prevIndex = dotEl.length - 1;

        if (currentIndex === dotEl.length - 1)
            nextIndex = 0;

        if ($(this).hasClass("left")) {
            pulseSelected(prevIndex);
            slideOnClick(prevIndex);
        } else if ($(this).hasClass("right")) {
            pulseSelected(nextIndex);
            slideOnClick(nextIndex);
        }
    });

    var animateHTML = function () {
        var elems,
            windowHeight;

        hideIcons();
        var init = function () {
            // console.log("init called");
            elems = document.getElementsByClassName("breadcrumb-inner");
            // console.log(elems);
            windowHeight = window.innerHeight;
            _addEventHandlers();
        };
        var _addEventHandlers = function () {
            // console.log("addEventHandlers");
            window.addEventListener('scroll', _checkVitalityWheelPosition);
            window.addEventListener('resize', init);
        };
        var _checkVitalityWheelPosition = function () {
            for (var i = 0; i < elems.length; i++) {
                if (elems[i]) {
                    var posFromTop = elems[i].getBoundingClientRect().top;
                    var posFromBottom = elems[i].getBoundingClientRect().bottom;
                    if (i === 0) {
                        // console.log(`[${i}] pos TOP: ${posFromTop}`);
                        // console.log(`[${i}] pos Bottom: ${posFromBottom}`);
                    }
                    console.log(`pos Bottom: ${posFromBottom}`);
                    console.log(`window height: ${windowHeight}`);
                    if (posFromBottom <= windowHeight && !iconsAnimatedFlag) {
                        console.log("VISIBLE");
                        showIcons();
                        iconsAnimatedFlag = true;
                    }

                }
            }
        };
        return {
            init: init
        }
    };
    animateHTML().init();
});

