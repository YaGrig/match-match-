import './game.scss';
import { BaseComponent } from '../base-component';
import { CardsField } from '../cards-field/cards-field';
import { Card } from '../card/card';
import { delay } from '../../shared';
import { ImageCategoryModel } from '../../models/image-category-models';
import { Timer } from '../timer/timer';
import { Alert } from '../congratulation/congr';
import { UserService } from '../../services/user-service/user-service';

const userService = new UserService();
const FLIP_DELAY = 3000;
const timer = new Timer();
// export let rightChoise = true;

export class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private correctChoise = 0;

  private nonCorrectChoise = 0;

  private scoreNumber = 0;

  private count = 0;

  private activeCard?: Card;

  public checkGame = 'true';

  private isAnimation = false;

  constructor() {
    super('div', ['game']);
    if (this.checkGame === 'true') {
      this.cardsField = new CardsField();
      this.element.appendChild(timer.element);
      this.element.appendChild(this.cardsField.element);
      Game.loadImages().then((images) => this.startGame(images));
    }
  }

  private static async loadImages(): Promise<string[]> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cards = await userService.getUserCards();
    const cat = categories[cards];
    return cat.images.map((name) => `${cat.category}/${name}`);
  }

  async startGame(images: string[]):Promise<void> {
    const difficulty = await userService.getUserDiff();
    let imagesDifficulty = 4;
    if (difficulty === 0) {
      imagesDifficulty = 8;
    } else if (difficulty === 1) {
      imagesDifficulty = 18;
    } else {
      imagesDifficulty = 32;
    }
    this.cardsField.clear();
    const imagesFiltred = images.splice(0, imagesDifficulty);
    const cards = imagesFiltred
      .concat(imagesFiltred)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);

    timer.getTime();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      // rightChoise = true;
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.nonCorrectChoise += 1;
      this.count += 1;
      this.getScore();
      this.activeCard.element.classList.add('wrong');
      card.element.classList.add('wrong');
    } else {
      this.correctChoise += 1;
      this.count += 1;
      this.getScore();
      if (this.correctChoise === 4) {
        this.gameEnd();
      }
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  getScore():number {
    this.scoreNumber = (this.count - this.nonCorrectChoise) * 100 - timer.getTime() * 10;
    if (this.scoreNumber < 0) {
      return 0;
    }
    return this.scoreNumber;
  }

  gameEnd():void {
    const alert = new Alert();
    alert.alertScore(this.getScore());
    userService.updateUserScore(this.getScore());
  }
}
