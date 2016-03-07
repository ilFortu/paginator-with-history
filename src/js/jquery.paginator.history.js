/** @preserve
 *
 * Never ending scroll with history
 *
 Version: 0.0.6
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
      offsetCallPage: 500,
      //selector that identify the container of the items for the ajax call
      selectorContainer: null,
      blockPageHtmlElement: 'div',


      ajaxDoneBeforeItemsInPage: function () {
      },
      ajaxDoneAfterItemsInPage: function () {
      }
    };

    var settings = $.extend({}, defaults, options);


    var $prev = this.find(".jph-prev").length > 0 ? this.find(".jph-prev") : null;
    var $next = this.find(".jph-next").length > 0 ? this.find(".jph-next") : null;


    //execute the plugin if there is at least one link to prev or next content...
    if ($prev != null || $next != null) {


      //----- SETTINGS -------
      var $paginatorListContainer = this.find(".jph-list-container");
      var ajaxUrl = this.data("jph-ajax-url");
      // ajaxUrl = ajaxUrl + (ajaxUrl.split('?')[1] ? '&' : '?') + settings.paramPage + "=";


      var listItemsPage = "jph-list-items-page";
      var listItemsPageClass = "." + listItemsPage;
      var item = ".jph-item";

      var currentPage = this.find(listItemsPageClass).data("page");


      //var loadingNext = false;
      //var loadingPrev = false;
      var loadingPage = false;

      //----- SETTINGS END -------


      //------- CALL PREV PAGE AT START -------------
      //if exists the previous link
      if ($prev != null && $prev.attr("data-page") > 0) {

        loadingPage = true;
        //console.log("PREV");
        //  window.scrollTo(0, 200);

        ajaxCall($prev.attr("data-page"), false, true);
      }
      //------- CALL PREV PAGE AT START END -------------


      //------ CLICK ITEM --------
      var linkItem = ".jph-item-link";
      this.on("click", linkItem, function (evt) {
        //evt.preventDefault();

        changeLocation($(this).parents(listItemsPageClass).attr("data-page"), $(this).parents(item).attr("id"));

      });
      //------ CLICK ITEM END --------


      (function () {
        var previousScroll = 0;

        $(window).scroll(function () {
          var currentScroll = $(this).scrollTop();
          if (currentScroll > previousScroll) {
            moveWindow('down');
          } else {
            moveWindow('up');
          }
          previousScroll = currentScroll;
        });
      }());


      //----------- MOUSE WHEEL EVENT-----------------
      // IE9, Chrome, Safari, Opera
      window.addEventListener("mousewheel", mouseWheel, false);
      // Firefox
      window.addEventListener("DOMMouseScroll", mouseWheel, false);

      function mouseWheel() {


        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));


        switch (delta) {

          case 1:
            moveWindow('up');
            break;
          case -1:
            moveWindow('down');
            break;
          default:
            break;
        }

      }

      //----------- MOUSE WHEEL EVENT END -----------------

      //----------- KEYBOARD UD AND DOWN EVENT-----------------
      /* document.onkeydown = function (e) {
       switch (e.keyCode) {

       case 38:
       console.log('up');
       break;
       case 40:
       console.log('down');
       break;
       default:
       break;
       }
       };*/
      //----------- KEYBOARD UD AND DOWN EVENT END-----------------


      //----------- TOUCH MOVE EVENT-----------------
      var swipeFunc = {
        touches: {
          "touchstart": {"y": -1},
          "touchmove": {"y": -1},
          "touchend": false,
          "direction": "undetermined"
        },
        touchHandler: function (event) {
          var touch;


          if (typeof event !== 'undefined') {
            //event.preventDefault();


            if (typeof event.touches !== 'undefined') {
              touch = event.touches[0];


              switch (event.type) {
                case 'touchstart':
                case 'touchmove':
                  swipeFunc.touches[event.type].y = touch.pageY;
                  break;

                case 'touchend':
                  swipeFunc.touches[event.type] = true;


                  if (swipeFunc.touches.touchstart.y > -1 && swipeFunc.touches.touchmove.y > -1) {
                    swipeFunc.touches.direction = swipeFunc.touches.touchstart.y < swipeFunc.touches.touchmove.y ? "up" : "down";

                    // DO STUFF HERE
                    moveWindow(swipeFunc.touches.direction);
                  }
                default:
                  break;
              }
            }
          }
        },
        init: function () {
          document.addEventListener('touchstart', swipeFunc.touchHandler, false);
          document.addEventListener('touchmove', swipeFunc.touchHandler, false);
          document.addEventListener('touchend', swipeFunc.touchHandler, false);
        }
      };
      swipeFunc.init();
      //----------- TOUCH MOVE EVENT END-----------------


      // $(window).scroll(function () {
      function moveWindow(direction) {



        // console.log("scrolling");

        // handle scroll events to update content
        var scrollPos = $(window).scrollTop();

        //console.log(scrollPos + $(window).height());


        //next page..
        if (direction == 'down' && $next != null && !loadingPage && $next.position().top - settings.offsetCallPage < scrollPos + $(window).height()) {

          loadingPage = true;
          console.log("NEXT");

          ajaxCall($next.attr("data-page"), true);
        }


        //prev page
        else if (direction == 'up' && $prev != null && !loadingPage && scrollPos - $prev.position().top < settings.offsetCallPage) {


          loadingPage = true;

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
      }

      //     });
      //at start simulate scroll
      //$(window).trigger("scroll");


      function ajaxCall(page, isNext, prevLoadOnStart) {

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

                page++;

                $next.attr("data-page", page);


              } else {
                //isPrev


                $paginatorListContainer.prepend(newPageBlock);


                var scrollTo = 0;


                if (prevLoadOnStart) {

                  var $currentBlock = $paginatorListContainer.find(listItemsPageClass + "[data-page='" + currentPage + "']");
                  var hash = window.location.hash.substring(1);


                  if (hash != "" && $currentBlock.find("#" + hash).length > 0) {

                    $currentBlock = $currentBlock.find("#" + hash);
                  }


                  scrollTo = $currentBlock.position().top;
                }

                else if (window.pageYOffset != 0) {


                  var heightPrevPage = $paginatorListContainer.find(listItemsPageClass + "[data-page='" + page + "']").height();
                  scrollTo = window.pageYOffset + heightPrevPage;
                }

                // adjust scroll to the current page
                window.scrollTo(0, scrollTo);


                if (page > 1) {


                  page--;

                  $prev.attr("data-page", page);


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

          //remove the link from the page
          if (removeLink) {
            if (isNext) {


              $next.remove();
              $next = null;

            } else {

              $prev.remove();
              $prev = null;
            }
          }


          loadingPage = false;

          /*if (!isNext && page > 0) {

            console.log("trigger scroll");

            //    $(window).trigger("scroll");
          }*/

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