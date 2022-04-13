<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <?php
  wp_head();
  ?>
</head>

<body>


  <header class="site-header  h-20 w-full fixed top-0 left-0 flex justify-between items-center px-8 bg-transparent transition transform duration-300 ease-out">
    <div class="header-logo text-white color-white">Matthew Parisien</div>
    <nav>
      <?php

      wp_nav_menu(
        array(
          'menu' => 'primary',
          'container' => '',
          'theme_location' => 'primary',
          'items_wrap' => '<ul class="menu-nav flex text-white" id="">%3$s</ul>'
        )
      )
      ?>
    </nav>
  </header>

  <button class="menu-button w-20 h-20 m-10 fixed top-0 right-0 z-50 transition transform duration-500 ease-in-out hover:rotate-180" id="site-burger" data-strength="80">
    <div class="w-full h-full relative flex items-center justify-center z-0">
      <div class="circle absolute top-0 left-0 w-full h-full rounded-full bg-black z-0 scale-0"></div>
      <div class="burger opacity-0 w-5 h-2 z-99 sticky flex flex-col items-center justify-between">
        <span class="block w-full h-px bg-white transition transform duration-300"></span>

        <span class="block w-full h-px bg-white transition transform duration-300"></span>
      </div>
    </div>
  </button>

  <!-- <div class="intro-card fixed top-0 left-0 h-full w-full  text-orange z-50">
    <div class="intro-card_inner relative w-full  h-full flex items-center justify-center">
      <svg class="transition-svg absolute top-0 left-0 fill-cream" viewbox="0 0 1920 1080" preserveAspectRatio="none" width="100%" height="100%">
        <path class="transition-morph" d="M1915.23,1080c-779.43,0-1551.82-3.52-1915.23,0V0H1915.23V1080Z"></path>
      </svg>
      <div class="word text-6xl font-mtl sticky hidden">
        Hello
      </div>
    </div>
  </div> -->

  <div class="site-menu fixed top-0 right-0 flex items-center justify-center w-full  h-full transition transform ease-in-out duration-300 delay-100 hidden">
    <h1>hi!</h1>
    <?php
    wp_nav_menu(
      array(
        'menu' => 'primary',
        'container' => '',
        'theme_location' => 'primary',
        'items_wrap' => '<ul class="menu-nav flex flex-col text-white text-6xl sticky z-50" id="">%3$s</ul>'
      )
    );
    ?>



    <svg id=" menu-svg morph" class="absolute top-0 left-0 z-10" viewbox="0 0 1920 1080" preserveAspectRatio="none" height="100%" width="100%">
      <path class="morph-path" fill="#fcc42a" d="M1915.23,1.56H0V0H1915.23V1.56Z"></path>
    </svg>
  </div>


  <div class="cursor fixed top-0 left-0 w-5 h-5 border-2 border-black rounded-full z-20 pointer-events-none will-change-transform overflow-hidden">
    <div class="cursor_inner w-full h-full relative opacity-0 bg-cream will-change-opacity"></div>
  </div>

  <main class="main-wrapper h-full" data-scroll-container>