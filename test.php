<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Jquery Paginator with history</title>
</head>
<body>


<?php


$pageCurrent = $_GET["page"];
$pagePrev = $pageCurrent - 1;
$pageNext = $pageCurrent + 1;




?>



<h1>Test</h1>


<div class="container">


  <div class="listing-container paginator-history" data-paginator-url="partials/content.html" data-base-url="test.html">

    <a href="#" class="paginator prev" data-page="<?= $pagePrev ?>">previous page</a>


    <div class="listing-content paginator-list-container">


      <div class="list-items-page" data-page="<?= $pageCurrent ?>">
        <div id="item-1" class="item">

          <h3>Titolo di prova 1</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-2" class="item">

          <h3> Titolo di prova 2</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-3" class="item">

          <h3> Titolo di prova 3</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-4" class="item">

          <h3> Titolo di prova 4</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-5" class="item">

          <h3> Titolo di prova 5</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-6" class="item">

          <h3> Titolo di prova 6</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-7" class="item">

          <h3> Titolo di prova 7</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-8" class="item">

          <h3> Titolo di prova 8</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-9" class="item">

          <h3> Titolo di prova 9</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-10" class="item">

          <h3> Titolo di prova 10</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>

        <div id="item-11" class="item">

          <h3> Titolo di prova 11</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-12" class="item">

          <h3> Titolo di prova 12</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-13" class="item">

          <h3> Titolo di prova 13</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


        <div id="item-14" class="item">

          <h3> Titolo di prova 14</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>
        <div id="item-15" class="item">

          <h3> Titolo di prova 15</h3>


          <div class="text">

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            </p>


          </div>

          <a class="paginator-item-link" href="http://google.it">link</a>


        </div>


      </div>
    </div>

    <a href="test.html?page=2" class="paginator next" data-page="<?= $pageNext ?>">next page</a>

  </div>

</div>


<script src="docroot/js/jquery">/**/</script>
<script src="docroot/js/jquery.paginator.history.js">/**/</script>
<script src="docroot/js/main.js">/**/</script>
</body>
</html>