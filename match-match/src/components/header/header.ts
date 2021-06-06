import './header.scss';
import { BaseComponent } from '../base-component';
import { router } from '../../router';
import { Form } from '../registration-form/form';
import { UserService } from '../../services/user-service/user-service';

const userService = new UserService();
const form = new Form();

export class Header extends BaseComponent {
  public check = false;

  public fileInput = document.querySelector('.imgLoader');

  constructor() {
    super('header', ['header']);
    const logo = document.createElement('div');
    logo.classList.add('logo');
    const logoText = document.createElement('p');
    logoText.classList.add('logo__text');
    logo.appendChild(logoText);
    this.element.appendChild(logo);
    const nav = document.createElement('nav');
    nav.classList.add('nav');
    const linkAbout = document.createElement('div');
    linkAbout.classList.add('nav__link');
    linkAbout.setAttribute('data-route', '/about');
    linkAbout.innerText = 'About Game';
    const spanAbout = document.createElement('span');
    spanAbout.classList.add('nav__icon_info');
    linkAbout.appendChild(spanAbout);
    const linkScore = document.createElement('div');
    linkScore.classList.add('nav__link');
    linkScore.setAttribute('data-route', '/score');
    linkScore.innerText = 'Best Score';
    const spanScore = document.createElement('span');
    spanScore.classList.add('nav__icon_scores');
    linkScore.appendChild(spanScore);
    const linkSetting = document.createElement('div');
    linkSetting.classList.add('nav__link');
    linkSetting.setAttribute('data-route', '/setting');
    linkSetting.innerText = 'Game Settings';
    const spanSet = document.createElement('span');
    spanSet.classList.add('nav__icon_settings');
    linkSetting.appendChild(spanSet);
    const button = document.createElement('button');
    nav.appendChild(linkAbout);
    nav.appendChild(linkScore);
    nav.appendChild(linkSetting);
    this.element.appendChild(nav);
    button.classList.add('btn', 'register-btn');
    if (this.check) {
      button.innerText = 'New Game';
    } else {
      button.innerText = 'register new player';
    }
    const image = document.createElement('div');
    image.classList.add('image-container');
    this.element.append(button);
    this.element.append(image);
    this.handleNavigation();
  }

  private handleNavigation(): void {
    this.element.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLDListElement;
      const selectedRoute = (eventTarget).getAttribute(
        'data-route',
      );
      if (eventTarget.classList.contains('register-btn')) {
        document.body.classList.add('body');
        this.element.append(new Form().element);
        userService.getTopPlayers();
      }
      if (eventTarget.classList.contains('game-btn')) {
        router.navigate('/game');
        this.check = true;
        this.changeButton();
      }
      if (eventTarget.classList.contains('stopGame-btn')) {
        this.changeButton();
      }
      if (eventTarget.classList.contains('submit')) {
        if (form.formSubmit()) {
          document.body.classList.remove('body');
          this.changeButton();
        }
      }
      if (eventTarget.classList.contains('cancel')) {
        document.body.classList.remove('body');
        form.deleteSubmit();
      }
      if (selectedRoute) {
        this.check = false;
        router.navigate(selectedRoute);
      }
    });
  }

  private changeButton(): void {
    const buttonReg = document.querySelector('.btn');
    if (buttonReg && this.check) {
      buttonReg?.classList.remove('game-btn');
      buttonReg?.classList.add('stopGame-btn');
      buttonReg.innerHTML = 'Stop Game';
    } else if (buttonReg && !this.check) {
      buttonReg?.classList.remove('register-btn');
      buttonReg?.classList.add('game-btn');
      buttonReg.innerHTML = 'New Game';
    }
  }
}
