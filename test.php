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


  <div class="listing-container paginator-history" data-paginator-url="partials/content.php" data-base-url="test.php">

    <?php //if ($pagePrev > 0) { ?>

    <a href="test.php?page=<?= $pagePrev ?>" class="paginator prev" data-page="<?= $pagePrev ?>">previous page</a>

    <? //} ?>

    <div class="listing-content paginator-list-container">


      <div class="list-items-page" data-page="<?= $pageCurrent ?>">


        <?php
        for ($i = 0; $i < 9; $i++) {
          ?>


          <div id="item-<?= $pageCurrent ?>-<?= $i ?>" class="item">

            <h3>Titolo di prova <?= $pageCurrent ?>-<?= $i ?></h3>


            <div class="text">

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              </p>
            </div>

            <a class="paginator-item-link" href="http://google.com">link</a>
          </div>
        <?php
        }
        ?>
      </div>
    </div>

    <a href="test.php?page=<?= $pageNext ?>" class="paginator next" data-page="<?= $pageNext ?>">next page</a>
  </div>

</div>
<script src="docroot/js/jquery">/**/</script>
<script src="docroot/js/jquery.paginator.history.js">/**/</script>
<script src="docroot/js/main.js">/**/</script>
</body>
</html>