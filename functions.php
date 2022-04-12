<?php

//Adds dynamic title tags to pages

function followandrew_theme_support() {
  add_theme_support('title-tag');
}

add_action('after_setup_theme', 'followandrew_theme_support');


function followandrew_menus() {
  $locations = array(
    'primary' => "Desktop Primary Navbar Top",
    'footer' => 'Footer menu items'
  );

  register_nav_menus($locations);

};

add_action('init', 'followandrew_menus');




function followandrew_register_styles()
{
  wp_enqueue_style('main', get_stylesheet_directory_uri() . '/assets/dist/main.css', array(), '1.0.0', 'all');
};

add_action('wp_enqueue_scripts', "followandrew_register_styles");

function followandrew_register_scripts()
{
  wp_enqueue_script('followandrew-main', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), '3.6.0', true);
  wp_enqueue_script('followandrew-gsapMain', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/gsap.min.js', array(), '3.6.0', true);
  wp_enqueue_script('main', get_template_directory_uri() . '/assets/dist/bundle.js', array(), time(), true);
};

add_action('wp_enqueue_scripts', "followandrew_register_scripts");

