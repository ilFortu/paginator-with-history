/** @preserve
 *
 * Never ending scroll with history
 *
 Version: 0.0.4
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

    //default settings
    var defaults = {

      paramPage: 'page',
      offsetCallPage: 200,
      //selector that identify the container of the items for the ajax call
      selectorContainer: null,
      blockPageHtmlElement: 'div',


      ajaxDoneBeforeItemsInPage: function () {
      },
      ajaxDoneAfterItemsInPage: function () {
      }
    };

    var settings = $.extend({}, defaults, options);


    var $prev = this.find(".jph-prev");
    var $next = this.find(".jph-next");


    //execute the plugin if there is at least one link to prev or next content...
    if ($prev.length > 0 || $next.length > 0) {


      var $paginatorListContainer = this.find(".jph-list-container");
      var ajaxUrl = this.data("jph-ajax-url");
      // ajaxUrl = ajaxUrl + (ajaxUrl.split('?')[1] ? '&' : '?') + settings.paramPage + "=";


      var listItemsPage = "jph-list-items-page";
      var listItemsPageClass = "." + listItemsPage;
      var item = ".jph-item";

      var currentPage = this.find(listItemsPageClass).data("page");


      var loadingNext = false;
      var loadingPrev = false;


      //if exists the previous link
      if ($prev.length > 0 && $prev.attr("data-page") > 0) {

        loadingPrev = true;
        //console.log("PREV");


        //  window.scrollTo(0, 200);

        ajaxCall($prev.attr("data-page"), false);
      }


      //click item link
      //var linkItem = ".jph-item-link";
      //this.on("click", linkItem, function (evt) {
      //  //evt.preventDefault();
      //
      //  changeLocation($(this).parents(listItemsPageClass).attr("data-page"), $(this).parents(item).attr("id"));
      //
      //});


      $(window).scroll(function () {


        // console.log("scrolling");

        // handle scroll events to update content
        var scrollPos = $(window).scrollTop();

        //console.log(scrollPos + $(window).height());


        //next page..
        if ($next.length > 0 && !loadingNext && $next.position().top - settings.offsetCallPage < scrollPos + $(window).height()) {

          loadingNext = true;
          console.log("NEXT");

          ajaxCall($next.attr("data-page"), true);
        }


        //prev page
        if ($prev.length > 0 && !loadingPrev && scrollPos - $prev.position().top < settings.offsetCallPage) {

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

      //at start simulate scroll
      $(window).trigger("scroll");


      function ajaxCall(page, isNext) {

        page = parseInt(page);


        $.ajax({
          url: setUrlwithPagination(ajaxUrl, page),
          context: document.body
        }).done(function (content) {

          // Here's the callback:
          settings.ajaxDoneBeforeItemsInPage.call(this);


          var html = content;
          var removeLink = false;

          if (content != null && content != "") {

            if (settings.selectorContainer != null) {

              html = $(content).find(settings.selectorContainer).html();
            }

            if (typeof html !== 'undefined' && html != "") {


              var newPageBlock = "<" + settings.blockPageHtmlElement + " class='" + listItemsPage + "' data-page='" + page + "'>" + html + "</" + settings.blockPageHtmlElement + ">";

              if (isNext) {

                $paginatorListContainer.append(newPageBlock);

                loadingNext = false;

                $next.attr("data-page", page + 1);


              } else {
                //isPrev

                //var scrollTop = document.documentElement.scrollTop;
                //
                //console.log(document.documentElement.scrollTop);
                //console.log(window.pageYOffset);
                //console.log(document.documentElement.clientTop);

                $paginatorListContainer.prepend(newPageBlock);


                var scrollTop = window.pageYOffset;

                var scrollTo = $paginatorListContainer.find(listItemsPageClass + "[data-page='" + currentPage + "']").position().top;

                if (scrollTop != 0) {

                  var heightPrevPage = $paginatorListContainer.find(listItemsPageClass + "[data-page='" + page + "']").height();
                  scrollTo = window.pageYOffset + heightPrevPage;
                }


                // adjust scroll to the current page
                window.scrollTo(0, scrollTo);


                console.log(scrollTo);


                if (page > 1) {

                  loadingPrev = false;
                  $prev.attr("data-page", page - 1);

                } else {

                  removeLink = true;
                }
              }
            } else {

              removeLink = true;
            }

            //  changeLocation(page);
          } else {

            removeLink = true;
          }

          if (removeLink) {
            if (isNext) {


              $next.remove();

            } else {

              $prev.remove();
            }
          }


          // Here's the callback:
          settings.ajaxDoneAfterItemsInPage.call(this);

        });
      }


      function changeLocation(page, itemId) {


        var newLocation = setUrlwithPagination(window.location.href, page);

        if (typeof itemId !== 'undefined' && itemId != null) {

          newLocation += "#" + itemId;
        }


        history.replaceState(null, null, newLocation);
      }


      function setUrlwithPagination(url, page) {


        //if there isn't the param page in the url
        if (url.indexOf(settings.paramPage + "=") < 0) {

          return url + (url.split('?')[1] ? '&' : '?') + settings.paramPage + "=" + page;

        }

        //else {

        var regex = new RegExp("(" + settings.paramPage + "=).*?((&)(.)*)?$");

        return url.replace(regex, '$1' + page + '$2');

        //}

      }

    }
  };

  // End of closure.
})(jQuery);