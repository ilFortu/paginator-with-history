<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Jquery Paginator with history</title>
</head>
<body>


<?php
$pageCurrent = isset($_GET["page"]) ? $_GET["page"] : 1;

$pagePrev = $pageCurrent - 1;
$pageNext = $pageCurrent + 1;

?>

<h1>Test</h1>


<div class="container">


  <div class="jph-history" data-jph-url="partials/content.php">

    <?php //if ($pagePrev > 0) { ?>

    <a href="test.php?page=<?= $pagePrev ?>" class="jph-prev" data-page="<?= $pagePrev ?>">previous page</a>

    <? //} ?>

    <div class="jph-list-container">


      <div class="jph-list-items-page" data-page="<?= $pageCurrent ?>">


        <?php
        for ($i = 0; $i < 9; $i++) {
          ?>


          <div id="item-<?= $pageCurrent ?>-<?= $i ?>" class="jph-item">

            <h3>Titolo di prova <?= $pageCurrent ?>-<?= $i ?></h3>


            <div class="text">

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              </p>
            </div>

            <a class="jph-item-link" href="http://google.com">link</a>
          </div>
        <?php
        }
        ?>
      </div>
    </div>

    <a href="test.php?page=<?= $pageNext ?>" class="jph-next" data-page="<?= $pageNext ?>">next page</a>
  </div>

</div>
<script src="docroot/js/jquery.js">/**/</script>
<script src="docroot/js/jquery.paginator.history.js">/**/</script>
<script src="docroot/js/main.js">/**/</script>
</body>
</html>