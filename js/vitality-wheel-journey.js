// var animateHTML = function () {
//     var elems,
//         windowHeight;
//     var init = function () {
//         // console.log("init called");
//         elemsCirc = document.getElementsByClassName('rck-circ-vit-wheel-journey-single-chart');
//         // console.log(elems);
//         windowHeight = window.innerHeight;
//         _addEventHandlers();
//     };
//     var _addEventHandlers = function () {
//         // console.log("addEventHandlers");
//         window.addEventListener('scroll', _checkPositionCircleProgress);
//         window.addEventListener('resize', init);
//     };
//     var _checkPositionCircleProgress = function () {
//         // console.log("_checkPositionCircleProgress");
//         // console.log(elemsCirc);
//         for (var i = 0; i < elemsCirc.length; i++) {
//             if (elemsCirc[i]) {
//                 var posFromTop = elemsCirc[i].getBoundingClientRect().top;
//                 var posFromBottom = elemsCirc[i].getBoundingClientRect().bottom;
//                 var circPb = elemsCirc[i].querySelector(".rck-circ-vit-wheel-journey-disc");
//                 var circPbClass = circPb.className.baseVal;
//                 if (i === 0) {
//                     // console.log(circPb);
//                     // console.log(`[${i}] pos TOP: ${posFromTop}`);
//                     // console.log(`[${i}] pos Bottom: ${posFromBottom}`);
//                 }
//                 if (posFromTop - windowHeight <= 0 && posFromBottom >= 0) {
//                     resultClass = replaceClass(circPbClass, "rck-circ-vit-wheel-journey-disc-hidden", "rck-circ-vit-wheel-journey-disc-animate");
//                     circPb.className.baseVal = resultClass;
//                     // console.log("VISIBLE");
//                     // console.log(resultClass);
//                     // console.log(circPb.className);
//                     // circPb.className = circPb.className.replace('rck-circ-progress-hidden', 'rck-circ-progress-animate');
//                     // elemsCirc[i].className = elemsCirc[i].className.replace('rck-circ-progress-hidden', 'rck-circ-progress-animate');
//                 }
//
//                 if (posFromBottom < 0 || posFromTop - windowHeight > 0) {
//                     resultClass = replaceClass(circPbClass, "rck-circ-vit-wheel-journey-disc-animate", "rck-circ-vit-wheel-journey-disc-hidden");
//                     circPb.className.baseVal = resultClass;
//                     // console.log("INVISIBLE");
//                     // elemsCirc[i].className = elemsCirc[i].className.replace('rck-circ-progress-animate', 'rck-circ-progress-hidden');
//
//                 }
//             }
//         }
//     };
//     var replaceClass = function (className, classToRemove, classToAdd) {
//         // console.log(className);
//         var classArray = className.split(" ");
//         // console.log(classArray);
//         var resultClassArray = [];
//         for (var i = 0; i < classArray.length; i++) {
//             if (classArray[i] !== classToRemove) {
//                 resultClassArray.push(classArray[i]);
//             }
//         }
//         // console.log(resultClassArray);
//         var resultClass = "";
//         for (var i = 0; i < resultClassArray.length; i++) {
//             if (resultClassArray[i] !== classToAdd) {
//                 resultClass += resultClassArray[i];
//                 resultClass += " ";
//             }
//         }
//         resultClass += classToAdd;
//         // console.log(resultClass);
//         return resultClass;
//     }
//     return {
//         init: init
//     }
// };
// animateHTML().init();

jQuery(document).ready(function($){
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

    var pulseSelected = function(currentIndex, nextIndex) {
        if (nextIndex <= hotspotElLength) {
            // $(`.${hotspotClass}`).find(`.${hsIcon}, .${hsIconSvg}`).removeClass("selected").addClass("unselected");
            $(`.${hotspotClass}`).removeClass("pulse");
            // $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).find(`.${hsIcon}`).removeClass("unselected").addClass("selected");
            $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${currentIndex}"]`).removeClass("pulse");
            if (nextIndex < hotspotElLength-1) {
                $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${nextIndex}"]`).addClass("pulse");
            }
        }
    };

    var showIcons = function() {
        var delay = 500;

        $(`.${honeyCombClass}`).each(function (index) {
            setTimeout(function(){
                $(`.${honeyCombClass}[${honeycombAnimationIdAttr}="${index}"]`).addClass("animate-honeycomb")
            },delay);
            delay += (100 + (2 * (index+1)));
        });

        $(`.${hotspotClass}`).each(function (index) {
            setTimeout(function(){
                $(`.${hotspotClass}[${hotspotAnimationIdAttr}="${index}"]`).addClass("animate-hotspot")
            },delay);
            delay += (100 + (2 * (index+1)));
        });
    };

    showIcons();

    var slider;
    if (navigator.msMaxTouchPoints) {

        $('#slider').addClass('ms-touch');

        $('#slider').on('scroll', function() {
            $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
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

            init: function() {
                this.bindUIEvents();
            },

            bindUIEvents: function() {

                this.el.holder.on("touchstart", function(event) {
                    slider.start(event);
                });

                this.el.holder.on("touchmove", function(event) {
                    slider.move(event);
                });

                this.el.holder.on("touchend", function(event) {
                    slider.end(event);
                });

            },

            start: function(event) {
                // Test for flick.
                this.longTouch = false;
                setTimeout(function() {
                    window.slider.longTouch = true;
                }, 250);

                // Get the original touch position.
                this.touchstartx =  event.originalEvent.touches[0].pageX;

                // The movement gets all janky if there's a transition on the elements.
                $('.animate').removeClass('animate');
            },

            move: function(event) {
                // Continuously return touch position.
                this.touchmovex =  event.originalEvent.touches[0].pageX;
                // Calculate distance to translate holder.
                this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
                // Defines the speed the images should move at.
                var panx = 100-this.movex/6;
                if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
                    this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
                }
                if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
                    this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
                }
            },

            end: function(event) {
                // Calculate the distance swiped.
                var absMove = Math.abs(this.index*this.slideWidth - this.movex);
                // Calculate the index. All other calculations are based on the index.
                if (absMove > this.slideWidth/2 || this.longTouch === false) {
                    if (this.movex > this.index*this.slideWidth && this.index < this.slideCount-1) {
                        this.index++;
                    } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
                        this.index--;
                    }
                }
                // Move and animate the elements.
                this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');

                pulseSelected(this.index, this.index + 1);

            },

            slideByIndex: function(index) {
                this.index = index;
                // Move and animate the elements.
                this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
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
        var prevIndex = currentIndex-1;
        var nextIndex = currentIndex+1;
        // console.log(currentIndex);
        // console.log(hotspotElLength-1);

        pulseSelected(currentIndex, nextIndex);

 /*       if (nextIndex <= hotspotElLength) {
            $(`.${hotspotClass}`).find(`.${hsIcon}`).removeClass("selected").addClass("unselected");
            $(this).find(`.${hsIcon}`).removeClass("unselected").addClass("selected");
            $(this).removeClass("pulse");
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).toggleClass("visible");
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).fadeIn();
            // $(`.${hotspotClass}[${animationIdAttr}="${currentIndex}"]`).addClass("visible");
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]>*[class~icon]`).addClass("visible");
            if (nextIndex < hotspotElLength-1) {
                $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).addClass("pulse");
            }
        } else if (currentIndex === hotspotElLength-1) {
            // $(this).removeClass("pulse");
        }

        if (currentIndex == 0) {
            // $(`.${hotspotClass}[${animationIdAttr}="${currentIndex}"]`).removeClass("pulse");
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]>*[class~icon]`).addClass("visible");
        }*/

        slideOnClick(currentIndex);

        // if ($(`.${vitHealthPopup}`).hasClass("hidden")) {
        //     $(`.${vitHealthPopup}`).slideToggle("fast").removeClass("hidden");
        // }
        //
        // $(`.${vitHealthContent}[${animationIdAttr}]`).hide();
        //
        // $(`.${vitHealthContent}[${animationIdAttr}="${currentIndex}"]`).fadeIn();

        // if (currentIndex > 0) {
        //     $(`.${vitHealthContent}[${animationIdAttr}="${prevIndex}"]`).hide();
        // }
    });
});