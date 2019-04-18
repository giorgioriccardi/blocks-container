/**
 * BLOCK: SSWS Blocks Container
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './blocks-container/components/inspector';
import Container from './blocks-container/components/container';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element; // Import the element creator function (React abstraction layer)

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
	InnerBlocks
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	withState,
	Toolbar
} = wp.components;

const blockAttributes = {
	containerPaddingTop: {
		type: 'number'
	},
	containerPaddingRight: {
		type: 'number'
	},
	containerPaddingBottom: {
		type: 'number'
	},
	containerPaddingLeft: {
		type: 'number'
	},
	containerMarginTop: {
		type: 'number'
	},
	containerMarginBottom: {
		type: 'number'
	},
	containerWidth: {
		type: 'string'
	},
	containerMaxWidth: {
		type: 'number',
		default: 1600
	},
	containerBackgroundColor: {
		type: 'string'
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img'
	},
	containerImgID: {
		type: 'number'
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	containerDimRatio: {
		type: 'number',
		default: 50
	}
};

class SSWSBlocksContainer extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerBackgroundColor,
				containerImgURL,
				containerImgID,
				containerImgAlt,
				containerDimRatio
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt
			});
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={containerWidth}
					onChange={containerWidth =>
						setAttributes({
							containerWidth
						})
					}
					controls={['center', 'full']}
				/>{' '}
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{...{
					setAttributes,
					...this.props
				}}
			/>,
			// Show the container markup in the editor
			<Container {...this.props}>
				<div className='ssws-container-inside'>
					{' '}
					{containerImgURL && !!containerImgURL.length && (
						<div className='ssws-container-image-wrap'>
							<img
								className={classnames(
									'ssws-container-image',
									dimRatioToClass(containerDimRatio),
									{
										'has-background-dim': containerDimRatio !== 0
									}
								)}
								src={containerImgURL}
								alt={containerImgAlt}
							/>{' '}
						</div>
					)}
					<div
						className='ssws-container-content'
						style={{
							maxWidth: `${containerMaxWidth}px`
						}}
					>
						<InnerBlocks />
					</div>{' '}
				</div>{' '}
			</Container>
		];
	}
}

// Register the block
registerBlockType('ssws-blocks/ssws-container', {
	title: __('SSWS Blocks Container', 'ssws-blocks-container'),
	description: __(
		'Add a blocks container to wrap several blocks in a parent container.',
		'ssws-blocks-container'
	),
	icon: 'smiley',
	category: 'common',
	keywords: [
		__('container', 'ssws-blocks-container'),
		__('section', 'ssws-blocks-container'),
		__('reusable', 'ssws-blocks-container')
	],

	attributes: blockAttributes,

	getEditWrapperProps({ containerWidth }) {
		if (
			'left' === containerWidth ||
			'right' === containerWidth ||
			'full' === containerWidth
		) {
			return {
				'data-align': containerWidth
			};
		}
	},

	// Render the block components
	edit: SSWSBlocksContainer,

	// Save the attributes and markup
	save: function(props) {
		// Setup the attributes
		const {
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerWidth,
			containerMaxWidth,
			containerBackgroundColor,
			containerImgURL,
			containerImgID,
			containerImgAlt,
			containerDimRatio
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Container {...props}>
				<div className='ssws-container-inside'>
					{' '}
					{containerImgURL && !!containerImgURL.length && (
						<div className='ssws-container-image-wrap'>
							<img
								className={classnames(
									'ssws-container-image',
									dimRatioToClass(containerDimRatio),
									{
										'has-background-dim': containerDimRatio !== 0
									}
								)}
								src={containerImgURL}
								alt={containerImgAlt}
							/>{' '}
						</div>
					)}
					<div
						className='ssws-container-content'
						style={{
							maxWidth: `${containerMaxWidth}px`
						}}
					>
						<InnerBlocks.Content />
					</div>{' '}
				</div>{' '}
			</Container>
		);
	}
});

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

function backgroundImageStyles(url) {
	return url
		? {
				backgroundImage: `url(${url})`
		  }
		: undefined;
}
