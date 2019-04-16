# SSWS Gutenberg Blocks Container

_This is just a prototype for now_
**Do NOT use into production**
Gutenberg blocks container helps you create useful and reusable front-end templates with the new WordPress editor.

# How to use `Blocks Container`

1. Select **SSWS Blocks Container** from the Common blocks list
2. Within the container create your structure/template
3. Save it as re-usable template
4. Right now if you use it in another post/page, unless you want to change it across all the site, you need to convert it into blocks
5. Hopefully in the future I will be able to create indpendent instances of the template each time the re-usable block gets called in a new post/page

### **NPM instructions**

```
$ npm install
$ npm run build
```

### Use this snippet in functions.php of your theme to avoid plugin implementation

```
/**
 * Enqueue custom Gutenberg block scripts.
 */

function ssws_blocks_editor_assets() {
	wp_enqueue_script( 'blocksContainer', get_template_directory_uri() . '/js/blocksContainer.build.js',
	array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' )
	);
}
add_action( 'admin_enqueue_scripts', 'ssws_blocks_editor_assets' );
```

### Todo

- Remove REACT functions and unused portions
- Restore CSS section
- Empower video-background
- ~~Clean-up messy code and comments~~
- Review/Restore css creation
- Refine instructions
- Review `blockAttributes` properties
- Update dependencies
- ~~`es6-promise 3.1.2->4.2.5`~~
- ~~`gulp-autoprefixer 3.1.1->6.0.0`~~
- ~~`gulp-sass 2.3.2->4.0.2`~~
- ~~improve and speed-up dependencies build~~
- ~~`browserSync.reload` stops recursive tasks~~
- ~~Re-organize modules order~~
- ~~Remove previous assets and scripts loaded for removed features~~
- Open WordPress Core Track Ticket
- How to make this re-usable template a single instance once opened in another page/post?
