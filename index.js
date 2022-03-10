import InputSearch from './components/input-search.js';
import CustomForm from './components/form-dadata.js';

const root = document.getElementById('root');

function createForm() {
  root.innerHTML = `
    <div class="container">
      <form is="form-dadata" class="form"/>
    </div>
  `;
}

createForm();
