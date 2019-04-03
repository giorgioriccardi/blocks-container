/**
 * Inspector Controls
 */

// Import Inspector settings
import Padding from './../../../../utils/inspector/padding';

// Import block dependencies and components
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;

const {
	InspectorControls,
	FontSizePicker,
	withFontSizes,
	withColors,
	ContrastChecker,
	PanelColorSettings,
	ColorPalette,
} = wp.editor;

const {
	withFallbackStyles,
	PanelBody,
	PanelRow,
	SelectControl,
	BaseControl,
	RangeControl,
} = wp.components;

// Apply fallback styles
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Create an Inspector Controls wrapper Component
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				borderStyle,
				borderColor,
				borderWidth,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
			},
			isSelected,
			setAttributes,
			fallbackFontSize,
			fontSize,
			setFontSize,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
		} = this.props;

		// Border styles
		const borderStyles = [
			{ value: 'ab-list-border-none', label: __( 'None' ) },
			{ value: 'ab-list-border-solid', label: __( 'Solid' ) },
			{ value: 'ab-list-border-dotted', label: __( 'Dotted' ) },
			{ value: 'ab-list-border-dashed', label: __( 'Dashed' ) },
		];

		const onChangeBorderColor = value => setAttributes( { borderColor: value } );

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Settings', 'atomic-blocks' ) }>
				<FontSizePicker
					fallbackFontSize={ fallbackFontSize }
					value={ fontSize.size }
					onChange={ setFontSize }
				/>
				<SelectControl
					label={ __( 'List Border Style', 'atomic-blocks' ) }
					value={ borderStyle }
					options={ borderStyles.map( ({ value, label }) => ( {
						value: value,
						label: label,
					} ) ) }
					onChange={ ( value ) => { this.props.setAttributes( { borderStyle: value } ) } }
				/>
				{ ( borderStyle != 'ab-list-border-none' ) && (
					<RangeControl
						label={ __( 'List Border Width', 'atomic-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) => this.props.setAttributes( { borderWidth: value } ) }
						min={ 1 }
						max={ 5 }
						step={ 1 }
					/>
				) }
				{ ( borderStyle != 'ab-list-border-none' ) && (
					<PanelRow>
						<BaseControl
							label={ __( 'List Border Color', 'atomic-blocks' ) }
						>
							<ColorPalette
								initialOpen={ false }
								value={ borderColor }
								onChange={ onChangeBorderColor }
							>
							</ColorPalette>
						</BaseControl>
					</PanelRow>
				) }
			</PanelBody>
			<PanelBody
				title={ __( 'Padding Settings', 'atomic-blocks' ) }
				initialOpen={ false }
			>
				<Padding
					// Top padding
					paddingEnableTop={ true }
					paddingTop={ paddingTop }
					paddingTopMin="0"
					paddingTopMax="100"
					onChangePaddingTop={ paddingTop => setAttributes( { paddingTop } ) }
					// Right padding
					paddingEnableRight={ true }
					paddingRight={ paddingRight }
					paddingRightMin="0"
					paddingRightMax="100"
					onChangePaddingRight={ paddingRight => setAttributes( { paddingRight } ) }
					// Bottom padding
					paddingEnableBottom={ true }
					paddingBottom={ paddingBottom }
					paddingBottomMin="0"
					paddingBottomMax="100"
					onChangePaddingBottom={ paddingBottom => setAttributes( { paddingBottom } ) }
					// Left padding
					paddingEnableLeft={ true }
					paddingLeft={ paddingLeft }
					paddingLeftMin="0"
					paddingLeftMax="100"
					onChangePaddingLeft={ paddingLeft => setAttributes( { paddingLeft } ) }
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color Settings', 'atomic-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor.color,
						onChange: setBackgroundColor,
						label: __( 'Background Color', 'atomic-blocks' ),
					},
					{
						value: textColor.color,
						onChange: setTextColor,
						label: __( 'Text Color', 'atomic-blocks' ),
					},
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: textColor.color,
						backgroundColor: backgroundColor.color,
						fallbackTextColor,
						fallbackBackgroundColor,
					} }
					fontSize={ fontSize.size }
				/>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}

export default compose( [
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Inspector );