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
    var animationIdAttr = "data-animation-index";
    var hotspotEl = $(`.${hotspotClass}[${animationIdAttr}]`);
    var hotspotElLength = $(hotspotEl).length;
    var showPulse = true;
    $(hotspotEl).click(function () {
        var currentIndex = Number($(this).attr(animationIdAttr));
        var prevIndex = currentIndex-1;
        var nextIndex = currentIndex+1;
        console.log(currentIndex);
        console.log(hotspotElLength-1);
        if (nextIndex < hotspotElLength && showPulse) {
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).toggleClass("visible");
            // $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).fadeIn();
            $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).fadeIn().addClass("visible pulse");
            $(this).removeClass("pulse");

            // if (nextIndex < hotspotElLength-1) {
            //     $(`.${hotspotClass}[${animationIdAttr}="${nextIndex}"]`).addClass("visible pulse");
            // }
        } else if (currentIndex === hotspotElLength-1 && showPulse) {
            $(this).removeClass("pulse");
            showPulse = false;
        }

        if ($(`.${vitHealthPopup}`).hasClass("hidden")) {
            $(`.${vitHealthPopup}`).slideToggle("fast").removeClass("hidden");
        }

        $(`.${vitHealthContent}[${animationIdAttr}]`).hide();

        $(`.${vitHealthContent}[${animationIdAttr}="${currentIndex}"]`).fadeIn();

        // if (currentIndex > 0) {
        //     $(`.${vitHealthContent}[${animationIdAttr}="${prevIndex}"]`).hide();
        // }
    })
});