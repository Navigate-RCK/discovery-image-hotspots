$(document).ready(function () {
    console.log("document ready");
    $(".pulse").click(function () {

        if (isMobile()) {
            if ($(this).find("i").hasClass("ti-plus")) {
                closeAllOtherPopups(this);
                togglePopupFromPulse(this);
            } else {
                closeAllOtherPopups(this);
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
        $(this).parent().parent().fadeOut();
        $(this).parent().parent().parent().find(".pulse").find("i").toggleClass("ti-plus").toggleClass("ti-minus");
    });

    $(".accordion-toggle").click(function () {
        $(this).find("i").toggleClass("ti-angle-up").toggleClass("ti-angle-down");
        $(this).next().slideToggle("fast");
    });

    function closeAllOtherPopups(currentPulse) {
        $(".hs-popup").fadeOut();
        $(".pulse").find("i").removeClass("ti-minus").addClass("ti-plus");
    }

    function togglePopupFromPulse(currentPulse) {
        if ($(currentPulse).find("i").hasClass("ti-plus"))
            $(currentPulse).next().fadeIn();
        else
            $(currentPulse).next().fadeOut();
        $(currentPulse).find("i").toggleClass("ti-plus").toggleClass("ti-minus");
    }

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }
});