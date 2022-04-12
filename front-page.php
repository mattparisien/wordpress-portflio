<?php
get_header()
?>


<?php
if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    the_content();
  }
}
?>

<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>
<section class="h-64"></section>



<?php
get_footer()
?>