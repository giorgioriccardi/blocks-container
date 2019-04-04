<?php
/**
 * Plugin Name: SSWS Blocks Container
 * Plugin URI: https://ssws.ca
 * Description: Gutenberg blocks container to help you create useful and reusable front-end templates with the new WordPress editor.
 * Author: Giorgio Riccardi
 * Author URI: http://seatoskywebsolutions.ca
 * Version: 1.2.1
 * Text Domain: ssws-blocks-container
 * License: GPL version 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * @package SSWS BLOCKS CONTAINER
 */

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize the block
 */
function ssws_blocks_container_loader() {
	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';
}
add_action( 'plugins_loaded', 'ssws_blocks_container_loader' );