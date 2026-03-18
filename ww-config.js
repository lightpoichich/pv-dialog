export default {
  editor: {
    label: { en: 'PV Dialog' },
    icon: 'border',
    customSettingsPropertiesOrder: [
      'isOpen',
      'header',
      'modal',
      'position',
      'closable',
      'closeOnEscape',
      'draggable',
      'maximizable',
    ],
  },
  triggerEvents: [
    { name: 'open', label: { en: 'On open' }, event: {}, default: true },
    { name: 'close', label: { en: 'On close' }, event: {} },
  ],
  properties: {
    isOpen: {
      label: { en: 'Visible' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to control dialog visibility: true | false',
      },
      /* wwEditor:end */
    },
    header: {
      label: { en: 'Header' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Dialog',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The dialog title text',
      },
      /* wwEditor:end */
    },
    modal: {
      label: { en: 'Modal' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show a backdrop overlay: true | false',
      },
      /* wwEditor:end */
    },
    position: {
      label: { en: 'Position' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'center', label: { en: 'Center' } },
          { value: 'top', label: { en: 'Top' } },
          { value: 'bottom', label: { en: 'Bottom' } },
          { value: 'left', label: { en: 'Left' } },
          { value: 'right', label: { en: 'Right' } },
          { value: 'topleft', label: { en: 'Top left' } },
          { value: 'topright', label: { en: 'Top right' } },
          { value: 'bottomleft', label: { en: 'Bottom left' } },
          { value: 'bottomright', label: { en: 'Bottom right' } },
        ],
      },
      defaultValue: 'center',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Dialog position: center | top | bottom | left | right | topleft | topright | bottomleft | bottomright',
      },
      /* wwEditor:end */
    },
    closable: {
      label: { en: 'Closable' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show the close button in the header: true | false',
      },
      /* wwEditor:end */
    },
    closeOnEscape: {
      label: { en: 'Close on Escape' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to close on Escape key press: true | false',
      },
      /* wwEditor:end */
    },
    draggable: {
      label: { en: 'Draggable' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to enable dragging the dialog: true | false',
      },
      /* wwEditor:end */
    },
    maximizable: {
      label: { en: 'Maximizable' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to allow fullscreen toggle: true | false',
      },
      /* wwEditor:end */
    },
    contentLayout: {
      hidden: true,
      defaultValue: [],
      navigator: {
        group: 'Dialog content',
      },
    },
  },
};
