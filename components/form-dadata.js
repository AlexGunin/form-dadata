import apiService from '../services/api-service.js';
import structure from '../config.js';
import helper from '../services/helper.js';

class CustomForm extends HTMLFormElement {
  inputCompanyName;

  constructor() {
    super();
    this.addEventListener('keyup', this.submitForm);
  }

  async submitForm(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      const { suggestions } = await apiService.getInfo(this.inputCompanyName.value);
      const company = suggestions[0].data;
      console.log(company);
      if (company) this.fillForm(company);
    }
  }

  fillForm(info) {
    structure.forEach(({ name }) => {
      if (name.includes('/')) {
        this.elements[name].value = helper.readDelimObjectProperties(name, info);
        return;
      }
      if (name.includes('.')) {
        this.elements[name].value = helper.readStrObjectProperty(name, info);
        return;
      }
      this.elements[name].value = info[name];
    });
    const typeSpan = document.getElementById('type');
    typeSpan.innerText = `( ${info.type} )`;
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    this.innerHTML = `
      <label class="full">
      Компания или ИП
      <input is="input-search" list="suggestions"  id="company-name" placeholder="Введите название компании"/>
      <datalist id="suggestions"/>
      </label>
      <p>Организация <span id="type"></span></p>`;
    this.innerHTML += structure.map((item) => `<label>${item.label}<input type="${item.type ?? 'text'}" name="${item.name}"/></label>`).join(' ');
    this.inputCompanyName = document.getElementById('company-name');
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  static get observedAttributes() {
    return [/* массив имён атрибутов для отслеживания их изменений */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }

  // у элемента могут быть ещё другие методы и свойства
}

export default customElements.define('form-dadata', CustomForm, { extends: 'form' });
