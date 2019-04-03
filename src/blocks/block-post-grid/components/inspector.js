/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const {
	Component,
} = wp.element;

// Import block components
const {
  InspectorControls,
} = wp.editor;

// Import Inspector components
const {
	PanelBody,
	QueryControls,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes,
			categoriesList,
			setAttributes,
			latestPosts
        } = this.props;

		const {
			order,
			orderBy,
		} = attributes;

		// Thumbnail options
		const imageCropOptions = [
			{ value: 'landscape', label: __( 'Landscape', 'atomic-blocks' ) },
			{ value: 'square', label: __( 'Square', 'atomic-blocks' ) },
        ];

        // Post type options
		const postTypeOptions = [
			{ value: 'post', label: __( 'Post', 'atomic-blocks' ) },
			{ value: 'page', label: __( 'Page', 'atomic-blocks' ) },
		];

		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'atomic-blocks' ) },
			{ value: 'header', label: __( 'header', 'atomic-blocks' ) },
			{ value: 'section', label: __( 'section', 'atomic-blocks' ) },
			{ value: 'article', label: __( 'article', 'atomic-blocks' ) },
			{ value: 'main', label: __( 'main', 'atomic-blocks' ) },
			{ value: 'aside', label: __( 'aside', 'atomic-blocks' ) },
			{ value: 'footer', label: __( 'footer', 'atomic-blocks' ) },
        ];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h2', label: __( 'H2', 'atomic-blocks' ) },
			{ value: 'h3', label: __( 'H3', 'atomic-blocks' ) },
			{ value: 'h4', label: __( 'H4', 'atomic-blocks' ) },
			{ value: 'h5', label: __( 'H5', 'atomic-blocks' ) },
			{ value: 'h6', label: __( 'H6', 'atomic-blocks' ) },
        ];

        // Check for posts
        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

        // Check the post type
		const isPost = attributes.postType === 'post';

		return (
            <InspectorControls>
                <PanelBody
                    title={ __( 'Post and Page Grid Settings', 'atomic-blocks' ) }
                    className={ isPost ? null : 'atomic-blocks-hide-query' }
                >
                    <SelectControl
                        label={ __( 'Content Type', 'atomic-blocks' ) }
                        options={ postTypeOptions }
                        value={ attributes.postType }
                        onChange={ ( value ) => this.props.setAttributes( { postType: value } ) }
                    />
                    <QueryControls
                        { ...{ order, orderBy } }
                        numberOfItems={ attributes.postsToShow }
                        categoriesList={ categoriesList }
                        selectedCategoryId={ attributes.categories }
                        onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                        onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                        onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
                        onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                    />
                    <RangeControl
                        label={ __( 'Number of items to offset', 'atomic-blocks' ) }
                        value={ attributes.offset }
                        onChange={ ( value ) => setAttributes( { offset: value } ) }
                        min={ 0 }
                        max={ 20 }
                    />
                    { attributes.postLayout === 'grid' &&
                        <RangeControl
                            label={ __( 'Columns', 'atomic-blocks' ) }
                            value={ attributes.columns }
                            onChange={ ( value ) => setAttributes( { columns: value } ) }
                            min={ 2 }
                            max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
                        />
                    }
                </PanelBody>
                <PanelBody
                    title={ __( 'Post and Page Grid Content', 'atomic-blocks' ) }
                    initialOpen={ false }
                >
					<ToggleControl
						label={ __( 'Display Section Title', 'atomic-blocks' ) }
						checked={ attributes.displaySectionTitle }
						onChange={ () => this.props.setAttributes( { displaySectionTitle: ! attributes.displaySectionTitle } ) }
					/>
					{ attributes.displaySectionTitle &&
						<TextControl
							label={ __( 'Section Title', 'atomic-blocks' ) }
							type="text"
							value={ attributes.sectionTitle }
							onChange={ ( value ) => this.props.setAttributes( { sectionTitle: value } ) }
						/>
					}
                    <ToggleControl
                        label={ __( 'Display Featured Image', 'atomic-blocks' ) }
                        checked={ attributes.displayPostImage }
						onChange={ () => this.props.setAttributes( { displayPostImage: ! attributes.displayPostImage } ) }
                    />
                    { attributes.displayPostImage &&
                        <SelectControl
                            label={ __( 'Featured Image Style', 'atomic-blocks' ) }
                            options={ imageCropOptions }
                            value={ attributes.imageCrop }
                            onChange={ ( value ) => this.props.setAttributes( { imageCrop: value } ) }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Title', 'atomic-blocks' ) }
                        checked={ attributes.displayPostTitle }
						onChange={ () => this.props.setAttributes( { displayPostTitle: ! attributes.displayPostTitle } ) }
                    />
                    { isPost &&
                        <ToggleControl
                            label={ __( 'Display Author', 'atomic-blocks' ) }
                            checked={ attributes.displayPostAuthor }
							onChange={ () => this.props.setAttributes( { displayPostAuthor: ! attributes.displayPostAuthor } ) }
                        />
                    }
                    { isPost &&
                        <ToggleControl
                            label={ __( 'Display Date', 'atomic-blocks' ) }
                            checked={ attributes.displayPostDate }
							onChange={ () => this.props.setAttributes( { displayPostDate: ! attributes.displayPostDate } ) }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Excerpt', 'atomic-blocks' ) }
                        checked={ attributes.displayPostExcerpt }
						onChange={ () => this.props.setAttributes( { displayPostExcerpt: ! attributes.displayPostExcerpt } ) }
                    />
                    { attributes.displayPostExcerpt &&
                        <RangeControl
                            label={ __( 'Excerpt Length', 'atomic-blocks' ) }
                            value={ attributes.excerptLength }
                            onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
                            min={ 0 }
                            max={ 150 }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Continue Reading Link', 'atomic-blocks' ) }
                        checked={ attributes.displayPostLink }
						onChange={ () => this.props.setAttributes( { displayPostLink: ! attributes.displayPostLink } ) }
                    />
                    { attributes.displayPostLink &&
                        <TextControl
                            label={ __( 'Customize Continue Reading Text', 'atomic-blocks' ) }
                            type="text"
                            value={ attributes.readMoreText }
                            onChange={ ( value ) => this.props.setAttributes( { readMoreText: value } ) }
                        />
                    }
                </PanelBody>
				<PanelBody
                    title={ __( 'Post and Page Grid Markup', 'atomic-blocks' ) }
					initialOpen={ false }
					className="ab-block-post-grid-markup-settings"
                >
					<SelectControl
						label={ __( 'Post Grid Section Tag', 'atomic-blocks' ) }
						options={ sectionTags }
						value={ attributes.sectionTag }
						onChange={ ( value ) => this.props.setAttributes( { sectionTag: value } ) }
						help={ __( 'Change the post grid section tag to match your content hierarchy.', 'atomic-blocks' ) }
					/>
					{ attributes.sectionTitle &&
						<SelectControl
							label={ __( 'Section Title Heading Tag', 'atomic-blocks' ) }
							options={ sectionTitleTags }
							value={ attributes.sectionTitleTag }
							onChange={ ( value ) => this.props.setAttributes( { sectionTitleTag: value } ) }
							help={ __( 'Change the post/page section title tag to match your content hierarchy.', 'atomic-blocks' ) }
						/>
                    }
					{ attributes.displayPostTitle &&
                        <SelectControl
                            label={ __( 'Post Title Heading Tag', 'atomic-blocks' ) }
                            options={ sectionTitleTags }
                            value={ attributes.postTitleTag }
							onChange={ ( value ) => this.props.setAttributes( { postTitleTag: value } ) }
							help={ __( 'Change the post/page title tag to match your content hierarchy.', 'atomic-blocks' ) }
                        />
					}
				</PanelBody>
            </InspectorControls>
		);
	}
}
