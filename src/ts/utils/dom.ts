export class DOM {
  static createEl(tagName, id, className = '') {
    const element = document.createElement(tagName);
    element.setAttribute('id', id);
    element.classList.add(className);
    return element;
  };

  static createButton(text?: string, clickHandler?: unknown, className?: string) {
    const button = this.createEl('button', '', className);
    if (text) {
      button.textContent = text;
    };
    if (clickHandler) {
      button.addEventListener('click', clickHandler);
    }
    return button;
  }
}
