import './setting.scss';
import { BaseComponent } from '../base-component';
import { UserService } from '../../services/user-service/user-service';

const userService = new UserService();
export const check = false;

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['settings']);
    const settingsPage = document.createElement('div');
    const difficulty = document.createElement('p');
    difficulty.classList.add('difficulty-header');
    difficulty.innerText = 'Difficulty';
    const cards = document.createElement('p');
    cards.classList.add('difficulty-header');
    cards.innerText = 'Game Cards';
    settingsPage.classList.add('settingsPage');
    const sectorDiff = document.createElement('select');
    sectorDiff.setAttribute('name', '>>?');
    const easyOption = document.createElement('option');
    easyOption.innerText = 'easy';
    easyOption.classList.add('option');
    const mediumOption = document.createElement('option');
    mediumOption.innerText = 'medium';
    mediumOption.classList.add('option');
    const hardOption = document.createElement('option');
    hardOption.innerText = 'hard';
    hardOption.classList.add('option');
    sectorDiff.classList.add('select');
    settingsPage.appendChild(difficulty);
    sectorDiff.appendChild(easyOption);
    sectorDiff.appendChild(mediumOption);
    sectorDiff.appendChild(hardOption);
    settingsPage.appendChild(sectorDiff);
    settingsPage.appendChild(cards);
    const sectorCards = document.createElement('select');
    sectorCards.setAttribute('name', '>>?');
    const random = document.createElement('option');
    random.innerText = 'random';
    random.classList.add('option');
    const nierandom = document.createElement('option');
    nierandom.innerText = 'nature';
    nierandom.classList.add('option');
    sectorCards.classList.add('selectCards');
    sectorCards.appendChild(random);
    sectorCards.appendChild(nierandom);
    settingsPage.appendChild(sectorCards);
    this.element.appendChild(settingsPage);
    this.diffHandler();
    this.CardHandler();
  }

  getDiff(): number {
    const chosenDiff = document.querySelector('.select') as HTMLSelectElement;
    const selectedOption = chosenDiff.selectedIndex;
    return selectedOption;
  }

  changeDiff(): void {
    userService.updateUserDiff(this.getDiff());
  }

  diffHandler(): void {
    const chosenDiff = this.element.querySelector(
      '.select',
    ) as HTMLSelectElement;
    chosenDiff.addEventListener('change', this.changeDiff.bind(this));
  }

  getCards(): number {
    const chosenCard = document.querySelector(
      '.selectCards',
    ) as HTMLSelectElement;
    const selectedOption = chosenCard.selectedIndex;
    console.log(selectedOption);
    return selectedOption;
  }

  changeCards(): void {
    userService.updateUserCards(this.getCards());
  }

  CardHandler(): void {
    const chosenCard = this.element.querySelector(
      '.selectCards',
    ) as HTMLSelectElement;
    chosenCard.addEventListener('change', this.changeCards.bind(this));
  }
}
