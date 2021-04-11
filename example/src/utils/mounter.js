import ReactDOM from 'react-dom';

export class Mounter {
  element = null;
  key = 'div';
  constructor(key) {
    if (key) {
      this.key = key;
    }
  }

  open = (content) => {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.id = this.key;
      document.body.appendChild(this.element);
    }
    ReactDOM.render(content, this.element);
  };

  close = () => {
    ReactDOM.unmountComponentAtNode(this.element);
  };
}

export const drawerMounter = new Mounter('drawer');
export const modalMounter = new Mounter('modal');
