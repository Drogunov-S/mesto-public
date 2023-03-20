export class Section {

  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(item) {
    return this._renderer(item);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
