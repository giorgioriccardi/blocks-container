/**
 * BLOCK: Atomic Blocks Call-To-Action
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CallToAction from './components/cta';

// Deprecated components
import deprecated from './deprecated/deprecated';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	AlignmentToolbar,
	URLInput,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	Toolbar,
} = wp.components;

const blockAttributes = {
	buttonText: {
		type: 'string',
	},
	buttonUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
	},
	buttonAlignment: {
		type: 'string',
		default: 'center'
	},
	buttonBackgroundColor: {
		type: 'string',
		default: '#3373dc'
	},
	buttonTextColor: {
		type: 'string',
		default: '#ffffff'
	},
	buttonSize: {
		type: 'string',
		default: 'ab-button-size-medium'
	},
	buttonShape: {
		type: 'string',
		default: 'ab-button-shape-rounded'
	},
	buttonTarget: {
		type: 'boolean',
		default: false
	},
	ctaTitle: {
		type: 'array',
		selector: '.ab-cta-title',
		source: 'children',
	},
	titleFontSize: {
		type: 'number',
		default: '32',
	},
	ctaTextFontSize: {
		type: 'number',
	},
	ctaText: {
		type: 'array',
		selector: '.ab-cta-text',
		source: 'children',
	},
	ctaWidth: {
		type: 'string',
	},
	ctaBackgroundColor: {
		type: 'string',
	},
	ctaTextColor: {
		type: 'string',
		default: '#32373c'
	},
	imgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	imgID: {
		type: 'number',
	},
	imgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	dimRatio: {
		type: 'number',
		default: 50,
	},

	// Deprecated
	ctaTitleFontSize: {
		type: 'string',
		default: '32'
	},
};

class ABCTABlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonTarget,
				ctaTitle,
				ctaText,
				ctaTitleFontSize,
				titleFontSize,
				ctaTextFontSize,
				ctaWidth,
				ctaBackgroundColor,
				ctaTextColor,
				imgURL,
				imgID,
				imgAlt,
				dimRatio,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={ ctaWidth }
					onChange={ ctaWidth => setAttributes( { ctaWidth } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
				<AlignmentToolbar
					value={ buttonAlignment }
					onChange={ ( value ) => {
						setAttributes( { buttonAlignment: value } );
					} }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the button markup in the editor
			<CallToAction { ...this.props }>
				{ imgURL && !! imgURL.length && (
					<div className="ab-cta-image-wrap">
						<img
							className={ classnames(
								'ab-cta-image',
								dimRatioToClass( dimRatio ),
								{
									'has-background-dim': dimRatio !== 0,
								}
							) }
							src={ imgURL }
							alt={ imgAlt }
						/>
					</div>
				) }

				<div className="ab-cta-content">
					<RichText
						tagName="h2"
						placeholder={ __( 'Call-To-Action Title', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ ctaTitle }
						className={ classnames(
							'ab-cta-title',
							'ab-font-size-' + titleFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
						onChange={ (value) => setAttributes( { ctaTitle: value } ) }
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Call To Action Text', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ ctaText }
						className={ classnames(
							'ab-cta-text',
							'ab-font-size-' + ctaTextFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
						onChange={ ( value ) => setAttributes( { ctaText: value } ) }
					/>
				</div>
				<div className="ab-cta-button">
					<RichText
						tagName="span"
						placeholder={ __( 'Button text...', 'atomic-blocks' ) }
						value={ buttonText }
						formattingControls={ [] }
						className={ classnames(
							'ab-button',
							buttonShape,
							buttonSize,
						) }
						style={ {
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						} }
						onChange={ (value) => setAttributes( { buttonText: value } ) }
					/>
					{ isSelected && (
						<form
							key="form-link"
							className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
							onSubmit={ event => event.preventDefault() }
							style={ {
								textAlign: buttonAlignment,
							} }
						>
							<Dashicon icon={ 'admin-links' } />
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply', 'atomic-blocks' ) }
								type="submit"
							/>
						</form>
					) }
				</div>
			</CallToAction>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-cta', {
	title: __( 'AB Call To Action', 'atomic-blocks' ),
	description: __( 'Add a call to action section with a title, text, and a button.', 'atomic-blocks' ),
	icon: 'megaphone',
	category: 'atomic-blocks',
	keywords: [
		__( 'call to action', 'atomic-blocks' ),
		__( 'cta', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
	],

	attributes: blockAttributes,

	getEditWrapperProps( { ctaWidth } ) {
		if ( 'left' === ctaWidth || 'right' === ctaWidth || 'full' === ctaWidth ) {
			return { 'data-align': ctaWidth };
		}
	},

	// Render the block components
	edit: ABCTABlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			buttonText,
			buttonUrl,
			buttonAlignment,
			buttonBackgroundColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonTarget,
			ctaTitle,
			ctaText,
			ctaTitleFontSize,
			titleFontSize,
			ctaTextFontSize,
			ctaWidth,
			ctaBackgroundColor,
			ctaTextColor,
			imgURL,
			imgID,
			imgAlt,
			dimRatio,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<CallToAction { ...props }>
				{ imgURL && !! imgURL.length && (
					<div className="ab-cta-image-wrap">
						<img
							className={ classnames(
								'ab-cta-image',
								dimRatioToClass( dimRatio ),
								{
									'has-background-dim': dimRatio !== 0,
								}
							) }
							src={ imgURL }
							alt={ imgAlt }
						/>
					</div>
				) }

				<div className="ab-cta-content">
					{ ctaTitle && (
						<RichText.Content
							tagName="h2"
							className={ classnames(
								'ab-cta-title',
								'ab-font-size-' + titleFontSize,
							) }
							style={ {
								color: ctaTextColor,
							} }
							value={ ctaTitle }
						/>
					) }
					{ ctaText && (
						<RichText.Content
							tagName="div"
							className={ classnames(
								'ab-cta-text',
								'ab-font-size-' + ctaTitleFontSize,
							) }
							style={ {
								color: ctaTextColor,
							} }
							value={ ctaText }
						/>
					) }
				</div>
				{ buttonText && (
					<div className="ab-cta-button">
						<a
							href={ buttonUrl }
							target={ buttonTarget ? '_blank' : '_self' }
							rel="noopener noreferrer"
							className={ classnames(
								'ab-button',
								buttonShape,
								buttonSize,
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							} }
						>
							<RichText.Content
								value={ buttonText }
							/>
						</a>
					</div>
				) }
			</CallToAction>
		);
	},

	deprecated: deprecated,
} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}