import './form.scss';
import { BaseComponent } from '../base-component';
import { UserService } from '../../services/user-service/user-service';

const userService = new UserService();

export class Form extends BaseComponent {
  constructor() {
    super('div', ['form']);
    const registerForm = document.createElement('div');
    const innerForm = document.createElement('div');
    const inputs = document.createElement('div');
    const name = document.createElement('p');
    const header = document.createElement('h2');
    header.classList.add('header-form');
    header.innerText = 'Register new player';
    name.innerText = 'Your name';
    const lastName = document.createElement('p');
    lastName.innerText = 'Your Last name';
    const email = document.createElement('p');
    email.innerText = 'email';
    inputs.classList.add('inputs');
    innerForm.classList.add('form-inner');
    registerForm.classList.add('foorm');
    this.element.appendChild(registerForm);
    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'fname');
    inputName.setAttribute('data-title', 'haha');
    inputName.classList.add('input-element');
    inputName.classList.add('input-fname');
    const inputLastName = document.createElement('input');
    inputLastName.setAttribute('type', 'text');
    inputLastName.setAttribute('id', 'lname');
    inputLastName.classList.add('input-element');
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'text');
    inputEmail.setAttribute('id', 'email');
    inputEmail.classList.add('input-element');
    inputs.appendChild(name);
    inputs.appendChild(inputName);
    inputs.appendChild(lastName);
    inputs.appendChild(inputLastName);
    inputs.appendChild(email);
    inputs.appendChild(inputEmail);
    innerForm.appendChild(inputs);
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    registerForm.appendChild(header);
    registerForm.appendChild(innerForm);
    const button = document.createElement('button');
    button.classList.add('submit');
    button.innerText = 'Add User';
    buttons.append(button);
    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('cancel');
    buttonCancel.innerText = 'Cancel';
    buttons.append(buttonCancel);
    registerForm.append(buttons);
  }

  formSubmit():boolean {
    let validated = 'false';
    const fname = document.getElementById('fname') as HTMLInputElement;
    const lname = document.getElementById('lname') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    if (!fname?.value.match('[a-zA-ZA-zА-я0-9]+')) {
      fname.classList.add('input-wrong');
    }
    if (!lname.value.match('[a-zA-ZA-zА-я0-9]+')) {
      lname.classList.add('input-wrong');
    }
    if (!email.value.match('^.+@.+..+$')) {
      email.classList.add('input-wrong');
    }
    if (fname.value.match('[a-zA-ZA-zА-я0-9]+')) {
      fname.classList.add('input-right');
    }
    if (lname.value.match('[a-zA-ZA-zА-я0-9]+')) {
      lname.classList.add('input-right');
    }
    if (email.value.match('^.+@.+..+$')) {
      email.classList.add('input-right');
    }
    if (
      fname.value.match('[a-zA-ZA-zА-я0-9]+')
      && lname.value.match('[a-zA-ZA-zА-я0-9]+')
      && email.value.match('^.+@.+..+$')
    ) {
      userService.create(fname.value, lname.value, email.value);
      validated = 'true';
      if (validated === 'true') {
        this.deleteSubmit();
      }
    }
    return true;
  }

  deleteSubmit():void {
    const form = document.querySelector('.form');
    form?.remove();
  }
}
