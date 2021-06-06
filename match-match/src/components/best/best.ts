import './best.scss';
import { BaseComponent } from '../base-component';
import { router } from '../../router';
import { UserService } from '../../services/user-service/user-service';

const userService = new UserService();

export class Best extends BaseComponent {
  constructor() {
    super('div', ['best']);
    this.getPlayers();
  }

  async getPlayers(): Promise<void> {
    router.navigate('/score');
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('bestPage');
    const header = document.createElement('h2');
    header.classList.add('headerBest');
    header.innerText = 'best players';
    mainDiv.appendChild(header);
    this.element.appendChild(mainDiv);
    const bestPage = this.element.querySelector('.bestPage');
    const array = await userService.getTopPlayers();
    array.sort((a: any, b: any) => {
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    });
    for (let i = 0; i < 10; i++) {
      const player = document.createElement('div');
      player.classList.add('player');
      const playerInfo = document.createElement('div');
      playerInfo.classList.add('playerInfo');
      const playerName = document.createElement('h3');
      const playerEmail = document.createElement('p');
      const playerScore = document.createElement('p');
      playerName.innerText = `${array[i].firstname}`;
      playerEmail.innerText = `${array[i].email}`;
      playerScore.innerText = `Score:  ${array[i].score}`;
      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerEmail);
      player.appendChild(playerInfo);
      player.appendChild(playerScore);
      bestPage?.appendChild(player);
    }
  }
}
