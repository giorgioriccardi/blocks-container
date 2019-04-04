<?php
/**
 * Blocks Container Initializer
 *
 * Enqueue JS.
 *
 * @since   1.0.0
 * @package SSWS Blocks Container
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function ssws_blocks_editor_assets() {
	// Load the compiled blocks into the editor.
	wp_enqueue_script(
		'ssws-blocks-block-js',
		plugins_url( '/dist/blocksContainer.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocksContainer.build.js' ),
		false
	);

	// Pass in REST URL.
	wp_localize_script(
		'ssws-blocks-block-js',
		'ssws_globals',
		array(
			'rest_url' => esc_url( rest_url() ),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'ssws_blocks_editor_assets' );