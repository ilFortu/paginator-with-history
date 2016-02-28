/**
 * Created by antoniofortunato on 02/02/16.
 *
 * Never ending scroll with history
 */
// Create closure.

//jnes
(function ($) {

  // Plugin definition.
  $.fn.paginatorHistory = function (options) {


    //default settings: todo....
    var defaults = {

      textColor: '#000',
      backgroundColor: '#FFF',
      ajaxDoneBeforeItemsInPage: function () {
      },
      ajaxDoneAfterItemsInPage: function () {
      }
    };

    var settings = $.extend({}, defaults, options);


    var paramPage = "page";
    var $paginatorListContainer = this.find(".paginator-list-container");
    var url = this.data("paginator-url") + "?" + paramPage + "=";

    var $next = this.find(".paginator.next");
    var $prev = this.find(".paginator.prev");
    var itemList = ".list-items-page";
    var item = ".item";
    var linkItem = ".paginator-item-link";
    var currentPage = this.find(itemList).data("page");


    var loadingNext = false;
    var loadingPrev = $prev.attr("data-page") == 0 ? true : false;


    //if at start it's not the first page I call a previous page...
    if ($prev.attr("data-page") > 0) {

      loadingPrev = true;
      console.log("PREV");

      ajaxCall($prev.attr("data-page"), false);

    }


    this.on("click", linkItem, function (evt) {
      //evt.preventDefault();

      changeLocation($(this).parents(itemList).attr("data-page"), $(this).parents(item).attr("id"));

    });


    $(window).scroll(function () {
      // handle scroll events to update content
      var scrollPos = $(window).scrollTop();

      //console.log(scrollPos + $(window).height());


      //next page..
      if (!loadingNext && $next.position().top - 200 < scrollPos + $(window).height()) {

        loadingNext = true;
        console.log("NEXT");

        ajaxCall($next.attr("data-page"), true);
      }


      //prev page

      if (!loadingPrev && scrollPos - $prev.position().top < 200) {

        loadingPrev = true;
        console.log("PREV");

        ajaxCall($prev.attr("data-page"), false);


      }


      //half window
      var scrollHalfPosition = $(window).scrollTop() + ($(window).height() / 2);


      $(".list-items-page").each(function () {


        var top = $(this).position().top;
        var bottom = $(this).position().top + $(this).height();


        //  console.log(scrollHalfPosition +" || "+ top +" / "+ bottom);

        if ($(this).attr("data-page") != currentPage && top <= scrollHalfPosition && scrollHalfPosition <= bottom) {


          //console.log($(this).position().top +" |||| "+ scrollHalfPosition +" || "+ top +" / "+ bottom);

          currentPage = $(this).attr("data-page");
          changeLocation(currentPage, null);

        }


      });


    });


    function ajaxCall(page, isNext) {

      page = parseInt(page);

      $.ajax({
        url: url + page,
        context: document.body
      }).done(function (content) {

        // Here's the callback:
        settings.ajaxDoneBeforeItemsInPage.call(this);


        if (content != "") {

          if (isNext) {

            $paginatorListContainer.append("<div class='list-items-page' data-page='" + page + "'>" + content + "</div>");

            loadingNext = false;

            $next.attr("data-page", page + 1);


          } else {

            $paginatorListContainer.prepend("<div class='list-items-page' data-page='" + page + "'>" + content + "</div>");

            var firstPageHeight = $("div.list-items-page:first").height();

            window.scrollTo(0, $(window).scrollTop() + firstPageHeight); // adjust scroll


            if (page > 1) {

              loadingPrev = false;
              $prev.attr("data-page", page - 1);
            }
          }


          //  changeLocation(page);
        }


        // Here's the callback:
        settings.ajaxDoneAfterItemsInPage.call(this);

      });
    }


    function changeLocation(page, itemId) {


      var newLocation = "";

      var currentPage = window.location.href;

      //if there isn't the param page in the url
      if (currentPage.indexOf(paramPage + "=") < 0) {

        newLocation = currentPage + (currentPage.split('?')[1] ? '&' : '?') + paramPage + "=" + page;

      } else {

        newLocation = currentPage.replace(/(page=).*?((&)(.)*)?$/, '$1' + page + '$2');

      }


      if (typeof itemId !== 'undefined' && itemId != null) {

        newLocation += "#" + itemId;
      }


      history.replaceState(null, null, newLocation);
    }
  };

  // End of closure.

})(jQuery);