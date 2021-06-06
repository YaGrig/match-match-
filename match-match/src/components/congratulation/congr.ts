import './congr.scss';
import { BaseComponent } from '../base-component';
import { router } from '../../router';

export class Alert extends BaseComponent {
  constructor() {
    super('div', ['congr']);
    const alerts = document.createElement('div');
    const buttonAlerts = document.createElement('button');
    buttonAlerts.innerText = 'Okay';
    buttonAlerts.classList.add('buttonOkay');
    alerts.classList.add('alert');
    this.element.append(alerts);
    alerts.append(buttonAlerts);
    const appElement = document.getElementById('app');
    appElement?.append(this.element);
    buttonAlerts.addEventListener('click', () => {
      const alert = document.querySelector('.congr');
      alert?.remove();
      router.navigate('/score');
    });
  }

  alertScore(score:number):void {
    const alert = this.element.getElementsByClassName('alert')[0];
    const newAlert = document.createElement('p');
    newAlert.innerText = `Congratulations! You successfully found all matches. Your score: ${score}`;
    alert.appendChild(newAlert);
  }
}
