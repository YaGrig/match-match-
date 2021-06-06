import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { UserService } from '../../services/user-service/user-service';

const SHOW_TIME = 5;
const userService = new UserService();

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
    this.getField();
  }

  clear():void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]):void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }

  async getField():Promise<void> {
    const difficulty = await userService.getUserDiff();
    if (difficulty === 1) {
      this.element.classList.add('cards-field-medium');
    } else if (difficulty === 2) {
      this.element.classList.add('cards-field-hard');
    }
  }
}
