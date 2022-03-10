import apiService from '../services/api-service.js';
import helper from '../services/helper.js';

class InputSearch extends HTMLInputElement {
  datalist;

  constructor() {
    super();
    this.addEventListener('input', helper.throttle(this.handleInput.bind(this), 2000));
  }

  async handleInput(event) {
    const { suggestions } = await apiService.getInfo(event.target.value);
    const suggestionsName = suggestions.map(({ value }) => value);
    this.datalist.innerHTML = [...new Set(suggestionsName)].map((name) => `<option value='${name}'>${name}</option>`);
    console.log(suggestions);
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)

    this.datalist = document.getElementById('suggestions');
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.value = this.getAttribute('value');
  }
}

export default customElements.define('input-search', InputSearch, { extends: 'input' });
