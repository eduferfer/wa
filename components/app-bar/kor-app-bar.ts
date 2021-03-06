import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators';
import { sharedStyles } from '../../shared-styles';

/**
 * @prop {String} label -	If set, defines the text label shown on the left side (if mobile is unset).
 * @prop {String} logo - If set, defines the logo shown on the left side.
 * @prop {Boolean} mobile - If set, toggles the mobile variation.
 *
 * @slot - The central content area. Used for hosting components such as Tabs.
 * @slot functions - Displayed on the right side (if mobile is unset). Used for hosting components such as Icon and Avatar.
 * @slot left - Displayed on the left side (if mobile is set to true). Used for hosting components such as Icon.
 * @slot right - Displayed on the right side (if mobile is set to true). Used for hosting components such as Icon.
 *
 * @fires logo-clicked - Fired when clicking on the logo.
 */

export class korAppBar extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) logo: string | undefined;
  @property({ type: Boolean, reflect: true }) mobile: boolean | undefined;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          z-index: 3;
          height: 56px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: rgb(var(--base-0));
          box-shadow: var(--shadow-1);
          transition: var(--transition-1);
        }
        .logo {
          height: 24px;
          margin-right: 32px;
        }
        .label {
          font: var(--header-1);
          color: var(--text-1);
          max-width: 320px;
          margin-right: 32px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :host([mobile]) .label {
          flex: 1;
          max-width: unset;
          margin: 0 16px;
          text-align: center;
        }
        /* slots */
        slot {
          display: flex;
          align-items: center;
        }
        slot:not([name]) {
          flex: 1;
        }
        slot[name='functions']::slotted(*) {
          margin-left: 12px;
        }
        ::slotted(kor-tabs) {
          border-bottom: unset;
        }
        slot[name='right'],
        slot[name='left'] {
          min-width: 24px;
        }
        slot[name='right'] {
          margin-left: auto;
        }
      `,
    ];
  }

  render() {
    return html`
      ${!this.mobile
        ? html`
            ${this.logo
            ? html`
                  <img
                    class="logo"
                    src="${this.logo}"
                    @click="${() => this.handleLogoClick()}"
                  />
                `
            : ''}
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot></slot>
            <slot name="functions"></slot>
          `
        : html`
            <slot name="left"></slot>
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot name="right"></slot>
          `}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  handleLogoClick() {
    this.dispatchEvent(new Event('logo-clicked'));
  }
}

if (!window.customElements.get('kor-app-bar')) {
  window.customElements.define('kor-app-bar', korAppBar);
}
