<?php
/**
 * Plugin Name: ssws Blocks - Gutenberg Blocks Collection
 * Plugin URI: https://atomicblocks.com
 * Description: A beautiful collection of handy Gutenberg blocks to help you get started with the new WordPress editor.
 * Author: atomicblocks
 * Author URI: http://arraythemes.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ATOMIC BLOCKS
 */

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Initialize the blocks
 */
function atomic_blocks_loader() {
	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';
}
add_action( 'plugins_loaded', 'atomic_blocks_loader' );


/**
 * Load the plugin textdomain
 */
function atomic_blocks_init() {
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'atomic_blocks_init' );


// /**
//  * Add a check for our plugin before redirecting
//  */
// function atomic_blocks_activate() {
// 	add_option( 'atomic_blocks_do_activation_redirect', true );
// }
// register_activation_hook( __FILE__, 'atomic_blocks_activate' );


/**
 * Add image sizes
 */
function atomic_blocks_image_sizes() {
	// Post Grid Block.
	add_image_size( 'ab-block-post-grid-landscape', 600, 400, true );
	add_image_size( 'ab-block-post-grid-square', 600, 600, true );
}
add_action( 'after_setup_theme', 'atomic_blocks_image_sizes' );
