jQuery(document).ready(function ($) {
    console.log("document ready");
    if (isMobile()) {
        // console.log("is mobile so move popups form mobile");
        movePopupsForMobile();
    }

    // $(window).resize(function () {
    //     if (isMobile()) {
    //         closeAllPopups();
    //         movePopupsForMobile();
    //     }
    // });

    // $(".pulse").click(function () {
    //
    //     if (isMobile()) {
    //         if ($(this).find("i").hasClass("ti-plus")) {
    //             closeAllPopups();
    //             togglePopupFromPulse(this);
    //         } else {
    //             closeAllPopups(this);
    //         }
    //     } else {
    //         togglePopupFromPulse(this);
    //     }
    //     // var pulse = this;
    //     // var offset = $(pulse).offset();
    //     // console.log(offset);
    //     // console.log($(window).scrollTop());
    //     // $(this).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
    // });

    $(".pulse-vitality").click(function () {

        if (isMobile()) {
            if (!$(this).hasClass("pulse-vitality-selected")) {
                closeAllPopups();
                togglePopupFromPulse(this);
            } else {
                closeAllPopups(this);
            }
        } else {
            togglePopupFromPulse(this);
        }
        // var pulse = this;
        // var offset = $(pulse).offset();
        // console.log(offset);
        // console.log($(window).scrollTop());
        // $(this).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
    });

    // $(".pulse-vitality").hover(
    //     function () {
    //         console.log(".pulse-vitality hover in");
    //         var popupId = $(this).attr("data-popup-id");
    //         var popupSelector = `.hs-popup[data-popup-id="${popupId}"]`;
    //         $(popupSelector).fadeIn();
    //     }/*,
    //     function () {
    //         console.log(".pulse-vitality hover out");
    //         var popupId = $(this).attr("data-popup-id");
    //         var popupSelector = `.hs-popup[data-popup-id="${popupId}"]`;
    //         $(popupSelector).fadeOut();
    //     }*/
    // );

    $(".hs-popup").click(function () {

    });

    $(".hs-popup>.header>i").click(function () {
        var popupContainer = $(this).parent().parent();
        var popupId = $(popupContainer).attr("data-popup-id");
        var pulseSelector = `.pulse-vitality[data-popup-id="${popupId}"]`;
        $(popupContainer).fadeOut();
        $(pulseSelector).toggleClass("pulse-vitality-selected");
    });

    $(".accordion-toggle").click(function () {
        $(this).closest(".footer").prev().find(".accordion-container").slideToggle("fast");
        $(this).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
        $(this).closest(".footer").prev().find(".heading-divider").toggle();
        // $(this).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
        // $(this).next().slideToggle("fast");
    });

    function closeAllPopups() {
        $(".hs-popup").hide();
        $(".pulse-vitality").removeClass("pulse-vitality-selected");
    }

    function togglePopupFromPulse(currentPulse) {
        var popupId = $(currentPulse).attr("data-popup-id");
        var popupSelector = `.hs-popup[data-popup-id="${popupId}"]`;
        // console.log("popup id " + popupId);
        // console.log("popup selector " + popupSelector);
        // console.log($(popupSelector).hasClass("hidden"));
        if (!$(currentPulse).hasClass("pulse-vitality-selected")) {
            $(popupSelector).fadeIn();
            // $(popupSelector).animate({
            //     width: "toggle"
            // });
        } else {
            $(popupSelector).fadeOut();
        }
        $(currentPulse).toggleClass("pulse-vitality-selected");
    }

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function movePopupsForMobile() {
        $(".hs-popup").each(function () {
            var parent2 = $(this).parents(".image-overlay");
            var currentEl = $(this).detach();
            // console.log(parent2);
            // console.log(currentEl);
            $(parent2).append(currentEl);
        });
    }
});