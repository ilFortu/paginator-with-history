/**
 * Created by antoniofortunato on 02/02/16.
 */



$(document).ready(function () {


  $(".jph-history").paginatorHistory({


    selectorContainer: "#test-container",
   // disableHistory: true,


    ajaxDoneAfterItemsInPage: function () {




      //  alert("ad");
    }


  });


});