/** @preserve
 *
 * Never ending scroll with history
 *
 Version: 0.0.7
 Author: Antonio Fortunato
 Website: https://github.com/ilFortu/paginator-with-history
 Docs: https://github.com/ilFortu/paginator-with-history
 Repo: https://github.com/ilFortu/paginator-with-history
 Issues: https://github.com/ilFortu/paginator-with-history/issues
 */
// Create closure.
/*
 * First of all:
 * Create a 'scope' which declare our plugin in.
 * This is the best practice!!!!!
 * Each js file should be declared with a 'scope' like below
 */
(function ($) {
  // This function accepts one argument.


  // This is a 'function', simply, but we know that
  // we will create an 'object' using 'new Accordion'
  function Paginator(el, options) {

    var $el = $(el);

    // add all properties to the 'this'.
    // in this way we can access to these properties
    // from all prototype's functions
    this.$el = $el;

    this.$prev = this.$el.find(".jph-prev").length > 0 ? this.$el.find(".jph-prev") : null;
    this.$next = this.$el.find(".jph-next").length > 0 ? this.$el.find(".jph-next") : null;


    //execute the plugin if there is at least one link to prev or next content...
    if (this.$prev != null || this.$next != null) {



      //default settings
      var defaults = {

        paramPage: 'page',
        offsetCallPage: 500,
        offsetAnchor: -200,
        linkItem: '.jph-item-link',
        //selector that identify the container of the items for the ajax call
        selectorContainer: null,
        blockPageHtmlElement: 'div',
        item: '.jph-item',
        disableHistory: false,

        ajaxDoneBeforeItemsInPage: function () {
        },
        ajaxDoneAfterItemsInPage: function () {
        }
      };

      this.settings = $.extend({}, defaults, options);


      //----- SETTINGS -------
      this.$paginatorListContainer = this.$el.find(".jph-list-container");
      this.ajaxUrl = this.$el.data("jph-ajax-url");
      // ajaxUrl = ajaxUrl + (ajaxUrl.split('?')[1] ? '&' : '?') + settings.paramPage + "=";


      this.listItemsPage = "jph-list-items-page";
      this.listItemsPageClass = "." + this.listItemsPage;


      this.currentPage = this.$el.find(this.listItemsPageClass).data("page");

      this.loadingPage = false;


      this.init();
      this.moveEvents();

    }


  }


  Paginator.prototype.init = function () {

    var _this = this;

    if (!this.settings.disableHistory) {

      //------- CALL PREV PAGE AT START -------------
      //if exists the previous link
      if (_this.$prev != null && _this.$prev.attr("data-page") > 0) {

        _this.loadingPage = true;
        //console.log("PREV");
        //  window.scrollTo(0, 200);

        $(window).load(function () {
          _this.ajaxCall(_this.$prev.attr("data-page"), false, true);

        });
      }
      //------- CALL PREV PAGE AT START END -------------


      //------ CLICK ITEM --------
      this.$el.on("click", this.settings.linkItem, function (evt) {
        //evt.preventDefault();

        console.log(this.$el.parents(this.listItemsPageClass).attr("data-page"));

        this.changeLocation(parseInt(this.$el.parents(this.listItemsPageClass).attr("data-page")), this.$el.parents(this.settings.item).attr("id")); //

      });
      //------ CLICK ITEM END --------
    }


  };


  Paginator.prototype.moveEvents = function () {

    var _this = this;

    //----------- MOUSE SCROLL EVENT END -----------------


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
          _this.moveWindow('up');
          break;
        case -1:
          _this.moveWindow('down');
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
                  _this.moveWindow(swipeFunc.touches.direction);
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


  };


  Paginator.prototype.moveWindow = function (direction) {


    //console.log("scrolling");

    if (!this.loadingPage && (!this.settings.disableHistory || (this.settings.disableHistory && direction == 'down'))) {



      // handle scroll events to update content
      var scrollPos = $(window).scrollTop();

      //console.log(scrollPos + $(window).height());

      //console.log(direction);
      //next page..
      if (direction == 'down' && this.$next != null && this.$next.offset().top - this.settings.offsetCallPage < scrollPos + $(window).height()) {

        this.loadingPage = true;
        // console.log("NEXT");

        this.ajaxCall(this.$next.attr("data-page"), true);
      }


      //prev page
      else if (direction == 'up' && this.$prev != null && scrollPos - this.$prev.offset().top < this.settings.offsetCallPage) {


        this.loadingPage = true;

        this.ajaxCall(this.$prev.attr("data-page"), false);


      }


      //change current page in url
      /*   var currentElement = document.elementFromPoint($paginatorListContainer.width() / 2, screen.height / 2);
       changeLocation($(currentElement).parents(listItemsPageClass).data("page"), null);*/

    }
  };


  Paginator.prototype.ajaxCall = function (page, isNext, prevLoadOnStart) {

    var page = parseInt(page);

    var _this = this;

    $.ajax({
      url: _this.setUrlwithPagination(_this.ajaxUrl, page),
      context: document.body
    }).done(function (content) {

      // Here's the callback:
      _this.settings.ajaxDoneBeforeItemsInPage.call(this);


      var html = content;
      var removeLink = false;

      if (content != null && content != "") {

        if (_this.settings.selectorContainer != null) {

          html = $(content).find(_this.settings.selectorContainer).html();
        }

        if (typeof html !== 'undefined' && html != "") {


          var newPageBlock = "<" + _this.settings.blockPageHtmlElement + " class='jph-new-page " + _this.listItemsPage + "' data-page='" + page + "'>" + html + "</" + _this.settings.blockPageHtmlElement + ">";

          if (isNext) {

            _this.$paginatorListContainer.append($(newPageBlock).addClass("jph-appended"));

            page++;

            _this.$next.attr("data-page", page);


          } else {
            //isPrev


            _this.$paginatorListContainer.prepend($(newPageBlock).addClass("jph-prepended"));


            var scrollTo = 0;


            if (prevLoadOnStart) {

              var $currentBlock = _this.$paginatorListContainer.find(_this.listItemsPageClass + "[data-page='" + _this.currentPage + "']");
              var hash = window.location.hash.substring(1);


              if (hash != "" && $currentBlock.find("#" + hash).length > 0) {

                $currentBlock = $currentBlock.find("#" + hash);
              }


              scrollTo = $currentBlock.offset().top + _this.settings.offsetAnchor;


              _this.$paginatorListContainer.removeClass("jph-no-first-page");
            }

            else if (window.pageYOffset != 0) {


              var heightPrevPage = _this.$paginatorListContainer.find(_this.listItemsPageClass + "[data-page='" + page + "']").height();
              scrollTo = window.pageYOffset + heightPrevPage;
            }

            // adjust scroll to the current page
            window.scrollTo(0, scrollTo);
            //   console.log("page scroll ", scrollTo);


            if (page > 1) {


              page--;

              _this.$prev.attr("data-page", page);


            } else {

              removeLink = true;
            }


          }
        } else {

          removeLink = true;
        }

      } else {

        removeLink = true;
      }

      //remove the link from the page
      if (removeLink) {
        if (isNext) {


          _this.$next.remove();
          _this.$next = null;

        } else {

          _this.$prev.remove();
          _this.$prev = null;
        }
      }


      _this.loadingPage = false;

      // Here's the callback:
      _this.settings.ajaxDoneAfterItemsInPage.call(this);

    });
  };


  Paginator.prototype.changeLocation = function (page, itemId) {


    var newLocation = this.setUrlwithPagination(window.location.href, page);

    if (typeof itemId !== 'undefined' && itemId != null) {

      newLocation += "#" + itemId;
    }


    history.replaceState(null, null, newLocation);
  };


  Paginator.prototype.setUrlwithPagination = function (url, page) {


    if (typeof page === 'number' && page % 1 === 0) {

      //if there isn't the param page in the url
      if (url.indexOf(this.settings.paramPage + "=") < 0) {

        return url + (url.split('?')[1] ? '&' : '?') + this.settings.paramPage + "=" + page;

      }

      //else {

      var regex = new RegExp("(" + this.settings.paramPage + "=).*?((&)(.)*)?$");

      return url.replace(regex, '$1' + page + '$2');

      //}

    }

    return url;
  };


  $.fn.paginatorHistory = function (options /* Init configuration given by developer */) {

    return $(this).each(function () {


      var paginatorInstance = new Paginator(this, options);


      $(this).data('paginator-history', paginatorInstance);

    });

  };


  // End of closure.
})(jQuery);