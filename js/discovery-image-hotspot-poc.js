jQuery(document).ready(function($) {
    console.log("document ready");
    if (isMobile()) {
        // console.log("is mobile so move popups form mobile");
        movePopupsForMobile();
    }

    $(window).resize(function () {
        if (isMobile()) {
            closeAllPopups();
            movePopupsForMobile();
        }
    });

    $(".pulse").click(function () {

        if (isMobile()) {
            if ($(this).find("i").hasClass("ti-plus")) {
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

    $(".hs-popup>.header>i").click(function () {
        var popupContainer = $(this).parent().parent();
        var popupId = $(popupContainer).attr("data-popup-id");
        var pulseSelector = `.pulse[data-popup-id="${popupId}"]`;
        $(popupContainer).fadeOut();
        $(pulseSelector).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
    });

    $(".accordion-toggle").click(function () {
        $(this).find("i").toggleClass("ti-angle-up").toggleClass("ti-angle-down");
        $(this).next().slideToggle("fast");
    });

    function closeAllPopups() {
        $(".hs-popup").hide();
        $(".pulse").find("i").removeClass("ti-minus").addClass("ti-plus");
    }

    function togglePopupFromPulse(currentPulse) {
        var popupId = $(currentPulse).attr("data-popup-id");
        var popupSelector = `.hs-popup[data-popup-id="${popupId}"]`;
        // console.log("popup id " + popupId);
        // console.log("popup selector " + popupSelector);
        // console.log($(popupSelector).hasClass("hidden"));
        if ($(currentPulse).find("i").hasClass("ti-plus")) {
            $(popupSelector).fadeIn();
            // $(popupSelector).animate({
            //     width: "toggle"
            // });
        } else
            $(popupSelector).fadeOut();
        $(currentPulse).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
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