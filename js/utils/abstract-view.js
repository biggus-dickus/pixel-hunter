export default class AbstractView {
  get template() {
    throw new Error(`Abstract method. Template string must be provided to render the view.`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  render() {
    return AbstractView.createElement(this.template);
  }

  bind() {}

  static createElement(templateString) {
    const template = document.createElement(`template`);
    template.innerHTML = templateString;

    return template.content;
  }
}
