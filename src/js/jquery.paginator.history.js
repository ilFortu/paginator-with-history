/** @preserve
 * Created by antoniofortunato on 02/02/16.
 *
 * Never ending scroll with history
 *
 Version: 0.0.3
 Author: Antonio Fortunato
 Website: https://github.com/ilFortu/paginator-with-history
 Docs: https://github.com/ilFortu/paginator-with-history
 Repo: https://github.com/ilFortu/paginator-with-history
 Issues: https://github.com/ilFortu/paginator-with-history/issues
 */
// Create closure.

(function ($) {

  // Plugin definition.
  $.fn.paginatorHistory = function (options) {

    //default settings: todo....
    var defaults = {

      paramPage: 'page',
      //selector that identify the container of the items for the ajax call
      selectorContainer: null,


      ajaxDoneBeforeItemsInPage: function () {
      },
      ajaxDoneAfterItemsInPage: function () {
      }
    };

    var settings = $.extend({}, defaults, options);


    var $paginatorListContainer = this.find(".jph-list-container");
    var url = this.data("jph-url") + "?" + settings.paramPage + "=";

    var $next = this.find(".jph-next");
    var $prev = this.find(".jph-prev");
    var listItemsPage = "jph-list-items-page";
    var listItemsPageClass = "." + listItemsPage;
    var item = ".jph-item";
    var linkItem = ".jph-item-link";
    var currentPage = this.find(listItemsPageClass).data("page");


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

      changeLocation($(this).parents(listItemsPageClass).attr("data-page"), $(this).parents(item).attr("id"));

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


      $(listItemsPageClass).each(function () {


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


        var html = content;


        if (content != null && content != "") {

          if (settings.selectorContainer != null) {

            html = $(content).find(settings.selectorContainer).html();
          }

          if (typeof html !== 'undefined') {


            var newPageBlock = "<div class='" + listItemsPage + "' data-page='" + page + "'>" + html + "</div>";

            if (isNext) {

              $paginatorListContainer.append(newPageBlock);

              loadingNext = false;

              $next.attr("data-page", page + 1);


            } else {

              $paginatorListContainer.prepend(newPageBlock);

              var firstPageHeight = $("div" + listItemsPageClass + ":first").height();

              window.scrollTo(0, $(window).scrollTop() + firstPageHeight); // adjust scroll


              if (page > 1) {

                loadingPrev = false;
                $prev.attr("data-page", page - 1);
              }
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
      if (currentPage.indexOf(settings.paramPage + "=") < 0) {

        newLocation = currentPage + (currentPage.split('?')[1] ? '&' : '?') + settings.paramPage + "=" + page;

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