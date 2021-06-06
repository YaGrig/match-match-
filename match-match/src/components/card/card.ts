import './card.scss';
import { BaseComponent } from '../base-component';
import { UserService } from '../../services/user-service/user-service';

const FLIP_CLASS = 'flipped';
const userService = new UserService();

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card-container']);
    const cards = document.createElement('div');
    cards.classList.add('card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card__front');
    cardFront.style.backgroundImage = `url('./images/${image}')`;
    const cardBack = document.createElement('div');
    cardBack.classList.add('card__back');
    this.element.append(cards);
    this.getCards();
    cards.appendChild(cardFront);
    cards.appendChild(cardBack);
  }

  flipToBack():Promise<void> {
    return this.flip(true);
  }

  flipToFront():Promise<void> {
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((res) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => res(), {
        once: true,
      });
    });
  }

  async getCards():Promise<void> {
    const difficulty = await userService.getUserDiff();
    const card = document.querySelectorAll('.card');
    if (difficulty === 1) {
      card?.forEach((element) => element.classList.add('card-medium'));
    } else if (difficulty === 2) {
      card?.forEach((element) => element.classList.add('card-hard'));
    }
  }
}
