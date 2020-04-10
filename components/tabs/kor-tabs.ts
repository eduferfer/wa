import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('kor-tabs')
export class korTabs extends LitElement {
  @property({ type: String, reflect: true }) orientation = 'horizontal';

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100%;
          height: fit-content;
        }
        :host([slot='header']) {
          margin-top: -16px;
        }
        :host(:not([orientation='vertical'])) {
          border-bottom: 1px solid rgba(var(--neutral-1), 0.1);
        }
        /* vertical */
        :host([orientation='vertical']) {
          flex-direction: column;
        }
      `,
    ];
  }

  render() {
    return html`
      <slot @slotchange="${() => this.handleOrientation()}"></slot>
    `;
  }

  handleOrientation() {
    (<any>this.childNodes).forEach((el) => {
      el.orientation = this.orientation;
    });
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
