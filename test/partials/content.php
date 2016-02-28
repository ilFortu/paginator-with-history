<?php
$page = $_GET["page"];


for ($i = 0; $i < 9; $i++) {
  ?>


  <div id="item-<?= $page ?>-<?= $i ?>" class="item">

    <h3> Titolo di prova <?= $page ?>-<?= $i ?></h3>


    <div class="text">

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type
      </p>


    </div>

    <a class="jph-item-link" href="http://google.com">link</a>


  </div>



<?php
}
?>