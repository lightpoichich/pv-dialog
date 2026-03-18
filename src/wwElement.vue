<template>
  <div class="pv-dialog">
    <PvDialog
      v-model:visible="dialogVisible"
      :modal="props.content?.modal ?? true"
      :header="props.content?.header || 'Dialog'"
      :closable="props.content?.closable ?? true"
      :closeOnEscape="props.content?.closeOnEscape ?? true"
      :draggable="props.content?.draggable ?? false"
      :maximizable="props.content?.maximizable ?? false"
      :position="props.content?.position || 'center'"
      :dismissableMask="props.content?.modal ?? true"
      :blockScroll="props.content?.modal ?? true"
      :appendTo="appendTarget"
      unstyled
      :pt="passthrough"
    >
      <wwLayout path="contentLayout" />
    </PvDialog>
  </div>
</template>

<script>
import { computed, watch, ref, onMounted } from 'vue';
import { installPrimeVue } from '../shared/install-primevue.js';
import Dialog from 'primevue/dialog';

export default {
  components: { PvDialog: Dialog },
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    wwElementState: { type: Object, default: () => ({}) },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    installPrimeVue();

    // Internal variable — dialog open state
    const { value: internalIsOpen, setValue: setInternalIsOpen } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'isOpen',
        type: 'boolean',
        defaultValue: false,
      });

    // Computed v-model for PrimeVue Dialog
    const dialogVisible = computed({
      get() {
        return internalIsOpen.value;
      },
      set(val) {
        if (val !== internalIsOpen.value) {
          setInternalIsOpen(val);
          emit('trigger-event', {
            name: val ? 'open' : 'close',
            event: {},
          });
        }
      },
    });

    // Sync isOpen property to internal variable
    watch(
      () => props.content?.isOpen,
      (val) => {
        const newVal = !!val;
        if (newVal !== internalIsOpen.value) {
          setInternalIsOpen(newVal);
          emit('trigger-event', {
            name: newVal ? 'open' : 'close',
            event: {},
          });
        }
      },
      { immediate: true }
    );

    // appendTo target — PrimeVue needs a DOM element
    const appendTarget = ref(null);
    onMounted(() => {
      appendTarget.value = wwLib.getFrontDocument().body;
    });

    // In editor mode, keep the dialog visible for editing
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState?.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // PassThrough classes for unstyled PrimeVue Dialog
    const passthrough = {
      root: { class: 'pv-dialog__root' },
      header: { class: 'pv-dialog__header' },
      title: { class: 'pv-dialog__title' },
      headerActions: { class: 'pv-dialog__header-actions' },
      pcCloseButton: {
        root: { class: 'pv-dialog__close-btn' },
      },
      pcMaximizeButton: {
        root: { class: 'pv-dialog__maximize-btn' },
      },
      content: { class: 'pv-dialog__content' },
      mask: { class: 'pv-dialog__mask' },
    };

    return {
      props,
      dialogVisible,
      appendTarget,
      passthrough,
      isEditing,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../shared/styles/base';
@import '../shared/styles/tokens';

.pv-dialog {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
/* Unscoped styles — PrimeVue Dialog is teleported outside the component root */

.pv-dialog__mask {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: pvDialogFadeIn 150ms ease-out;

  /* Position variants */
  &[data-p-dialog-mask-center='true'] {
    align-items: center;
    justify-content: center;
  }
}

.pv-dialog__root {
  display: flex;
  flex-direction: column;
  background: var(--pv-surface, #ffffff);
  border: 1px solid var(--pv-border, #e2e8f0);
  border-radius: var(--pv-radius, 8px);
  box-shadow: var(--pv-shadow-lg, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1));
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  animation: pvDialogScaleIn 150ms ease-out;
  pointer-events: auto;
}

.pv-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--pv-border, #e2e8f0);
  flex-shrink: 0;
}

.pv-dialog__title {
  font-family: var(--pv-font, Inter, system-ui, sans-serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--pv-text, #0f172a);
  line-height: 1.4;
}

.pv-dialog__header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
}

.pv-dialog__close-btn,
.pv-dialog__maximize-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--pv-radius, 8px);
  background: transparent;
  color: var(--pv-text-muted, #94a3b8);
  cursor: pointer;
  transition: background-color var(--pv-transition, 150ms),
              color var(--pv-transition, 150ms);

  &:hover {
    background: var(--pv-primary-light, #dbeafe);
    color: var(--pv-text, #0f172a);
  }

  &:focus-visible {
    outline: 2px solid var(--pv-primary, #3B82F6);
    outline-offset: 2px;
  }
}

.pv-dialog__content {
  padding: 20px;
  overflow-y: auto;
  flex: 1 1 auto;
  font-family: var(--pv-font, Inter, system-ui, sans-serif);
  font-size: var(--pv-font-size, 14px);
  color: var(--pv-text, #0f172a);
}

/* Animations */
@keyframes pvDialogFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pvDialogScaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
