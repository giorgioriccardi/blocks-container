<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package SSWS Blocks Container
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function ssws_blocks_block_assets() {

	// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison -- Could be true or 'true'.
	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	// Load the compiled styles.
	wp_register_style(
		'ssws-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.build.css' )
	);
}
add_action( 'init', 'ssws_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function ssws_blocks_editor_assets() {

	// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison -- Could be true or 'true'.
	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	// Load the compiled blocks into the editor.
	wp_enqueue_script(
		'ssws-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.build.js' ),
		false
	);

	// Load the compiled styles into the editor.
	// wp_enqueue_style(
	// 	'ssws-blocks-block-editor-css',
	// 	plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
	// 	array( 'wp-edit-blocks' ),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.build.css' )
	// );

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


/**
 * Enqueue assets for frontend
 *
 * @since 1.0.0
 */
function ssws_blocks_frontend_assets() {
	// Load the dismissible notice js.
	wp_enqueue_script(
		'ssws-blocks-dismiss-js',
		plugins_url( '/dist/assets/js/dismiss.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/dismiss.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ssws_blocks_frontend_assets' );

add_filter( 'block_categories', 'ssws_blocks_add_custom_block_category' );
/**
 * Adds the SSWS Blocks block category.
 *
 * @param array $categories Existing block categories.
 *
 * @return array Updated block categories.
 */
function ssws_blocks_add_custom_block_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'ssws-blocks',
				'title' => __( 'SSWS Blocks', 'ssws-blocks' ),
			),
		)
	);
}
