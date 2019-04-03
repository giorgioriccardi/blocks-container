const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
	SelectControl,
    ToggleControl,
} = wp.components;
const {
	PanelColorSettings,
} = wp.editor;

export default function ButtonSettings( props ) {
    const {
        buttonBackgroundColor,
        onChangeButtonColor = () => {},
        buttonTextColor,
        onChangeButtonTextColor = () => {},
        buttonSize,
        onChangeButtonSize = () => {},
        buttonShape,
        onChangeButtonShape = () => {},
        buttonTarget,
        onChangeButtonTarget = () => {},
    } = props;

    // Button size values
    const buttonSizeOptions = [
        { value: 'ssws-button-size-small', label: __( 'Small', 'ssws-blocks-container' ) },
        { value: 'ssws-button-size-medium', label: __( 'Medium', 'ssws-blocks-container' ) },
        { value: 'ssws-button-size-large', label: __( 'Large', 'ssws-blocks-container' ) },
        { value: 'ssws-button-size-extralarge', label: __( 'Extra Large', 'ssws-blocks-container' ) },
    ];

    // Button shape
    const buttonShapeOptions = [
        { value: 'ssws-button-shape-square', label: __( 'Square', 'ssws-blocks-container' ) },
        { value: 'ssws-button-shape-rounded', label: __( 'Rounded Square', 'ssws-blocks-container' ) },
        { value: 'ssws-button-shape-circular', label: __( 'Circular', 'ssws-blocks-container' ) },
    ];

    return (
        <Fragment>
            <ToggleControl
                label={ __( 'Open link in new window', 'ssws-blocks-container' ) }
                checked={ buttonTarget }
                onChange={ onChangeButtonTarget }
            />

            <SelectControl
                selected={ buttonSize }
                label={ __( 'Button Size', 'ssws-blocks-container' ) }
                value={ buttonSize }
                options={ buttonSizeOptions.map( ({ value, label }) => ( {
                    value: value,
                    label: label,
                } ) ) }
                onChange={ onChangeButtonSize }
            />

            <SelectControl
                label={ __( 'Button Shape', 'ssws-blocks-container' ) }
                value={ buttonShape }
                options={ buttonShapeOptions.map( ({ value, label }) => ( {
                    value: value,
                    label: label,
                } ) ) }
                onChange={ onChangeButtonShape }
            />

            <PanelColorSettings
                title={ __( 'Button Color', 'ssws-blocks-container' ) }
                initialOpen={ false }
                colorSettings={ [ {
                    value: buttonBackgroundColor,
                    onChange: onChangeButtonColor,
                    label: __( 'Button Color', 'ssws-blocks-container' ),
                } ] }
            >
            </PanelColorSettings>

            <PanelColorSettings
                title={ __( 'Button Text Color', 'ssws-blocks-container' ) }
                initialOpen={ false }
                colorSettings={ [ {
                    value: buttonTextColor,
                    onChange: onChangeButtonTextColor,
                    label: __( 'Button Text Color', 'ssws-blocks-container' ),
                } ] }
            >
            </PanelColorSettings>
        </Fragment>
    );
}