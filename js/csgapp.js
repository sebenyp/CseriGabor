$(document).ready(function () {
    doOnScreenChange();
});

$(function () {
    $('#myCarousel').carousel({
        pause: "false"
    });

    $('#playButton').click(function () {
        $('#myCarousel').carousel('cycle');
        $("#pauseButton").removeClass("hidden");
        $("#playButton").addClass("hidden");
    });

    $('#pauseButton').click(function () {
        $('#myCarousel').carousel('pause');
        $("#playButton").removeClass("hidden");
        $("#pauseButton").addClass("hidden");
    });

    $(".navbar-brand").click(function () {
        if (($(".navbar-collapse").hasClass("in")) && (window.innerWidth < 992)) {
            hideMenu();
        }
        $('#menucollapse a[href="#home"]').tab('show');
    });

    $("#menucollapse a").each(function () {
        $(this).click(function () {
            if (($(".navbar-collapse").hasClass("in")) && (window.innerWidth < 992)) {
                hideMenu();
            }
        });
    });
});

$('#myCarousel').bind('slide.bs.carousel', function (e) {
    doOnScreenChange();
});

// Latency on resize, wait 20ms after resizing to run the method.
$(window).resize(function () {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function () {
        doOnScreenChange();
    }, 20);
});

function doOnNext(type) {
    var element;
    if (type == "next") {
        element = $(".carousel-inner .next img");
    } else {
        element = $(".carousel-inner .prev img");
    }
    setAll(element);
}

function doOnScreenChange() {
    $("#imgViewContainer").height(window.innerHeight);
    var element = $(".carousel-inner .active img");
    setAll(element);
}

function setAll(element) {
    if (window.innerWidth < 992) {
        var neededHeight = window.innerHeight - 81;
        var neededWidth = window.innerWidth;
        $("#myCarousel").height(neededHeight);
        $("#menuButton").show();
        $("#fbButtonBigScreen").hide();
        $("#fbButtonSmallScreen").show();
        doCalculations(element, neededHeight, neededWidth);
    } else {
        var neededHeight = window.innerHeight - 21;
        var neededWidth = window.innerWidth - 161;
        $("#myCarousel").height(neededHeight);
        $("#menuButton").hide();
        $("#fbButtonBigScreen").show();
        $("#fbButtonSmallScreen").hide();
        doCalculations(element, neededHeight, neededWidth);
    }
}

function doCalculations(element, pHeight, pWidth) {
    var originalHeight = element.prop("naturalHeight");
    var originalWidth = element.prop("naturalWidth");
    var neededHeight = pHeight;
    var neededWidth = pWidth;
    var scale;
    var scaleX = neededWidth / originalWidth;
    var scaleY = neededHeight / originalHeight;
    if (scaleX < scaleY) {
        scale = scaleX;
    } else {
        scale = scaleY;
    }
    if (scale != undefined) {
        element.height(originalHeight * scale);
        element.width(originalWidth * scale);
    }
}

function hideMenu() {
    // if class contains "in", theoretically it doesn't need, but it's possible in future developement
    $("#menuButton").click();
}

// Gallery starts here
$("#imageViewerLeftButton").click(function () {
    var imgDb = $("#menu2 img").length;

    var actualImg = $(".viewed");
    var actualImgId = actualImg.attr("id") * 1;

    var prevImgId = actualImgId - 1;
    if (prevImgId < 0) prevImgId = imgDb - 1;
    var prevImg = $("#" + prevImgId);
    var prevImgSource = prevImg.attr("src");
    // leállítani a kattintást
    $("#imageViewer").fadeOut(200, function () {
        actualImg.removeClass("viewed")
        $("#imageViewer").attr("src", prevImgSource);
        prevImg.addClass("viewed");
    }).fadeIn(200);
    // visszatenni a kattintást
});

$("#imageViewerRightButton").click(function () {
    var imgDb = $("#menu2 img").length;

    var actualImg = $(".viewed");
    var actualImgId = actualImg.attr("id") * 1;

    var prevImgId = actualImgId + 1;
    if (prevImgId > (imgDb - 1)) prevImgId = 0;
    var prevImg = $("#" + prevImgId);
    var prevImgSource = prevImg.attr("src");

    $("#imageViewer").fadeOut(200, function () {
        actualImg.removeClass("viewed")
        $("#imageViewer").attr("src", prevImgSource);
        prevImg.addClass("viewed");
    }).fadeIn(200);
});

$('#imgViewContainer').css('height', window.innerWidth + 'px');

// Click on an image in gallery
$('.viewable').click(function () {
    $(".viewed").removeClass("viewed");
    $(this).addClass("viewed");
    $("#imgViewContainer").height(window.innerHeight);
    var src = $(this).attr('src'); //get the source attribute of the clicked image
    $('#imageViewer').attr('src', src); //assign it to the tag for your fullscreen div
    $('#imgViewContainer').fadeIn();
});

$("#imageViewerCloseButton").click(function () {
    $('#imgViewContainer').fadeOut();
});

//End of Gallery