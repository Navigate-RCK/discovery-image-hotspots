$(document).ready(function () {
    console.log("document ready");
    $(".pulse").click(function () {
        console.log("pulse click");
        console.log($(this).next());
        $(this).next().toggle();
        var pulse = this;
        var offset = $(pulse).offset();
        console.log(offset);
        console.log($(window).scrollTop());
    })
});