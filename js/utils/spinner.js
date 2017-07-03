export default class Spinner {
  static show() {
    const div = document.createElement(`div`);
    div.className = `loader`;

    document.body.classList.add(`loader-backdrop`);
    document.body.appendChild(div);
  }

  static hide() {
    if (document.body.children[document.body.children.length - 1].className === `loader`) {
      document.body.classList.remove(`loader-backdrop`);
      document.body.children[document.body.children.length - 1].remove();
    }
  }
}
