import ReactDOM from 'react-dom';

export class Mounter {
  constructor(key) {
    this.key = key;
    this.element = document.createElement('div');
    this.element.id = key;
  }

  open(content) {
    ReactDOM.render(content, this.element);
  }

  close() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}

export default Mounter;
