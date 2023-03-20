export class Section {

  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(item) {
    this._renderer(item);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
