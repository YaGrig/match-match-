import './timer.scss';
import { BaseComponent } from '../base-component';

export class Timer extends BaseComponent {
  private minute = 0;

  private hours = 0;

  private seconds = 0;

  constructor() {
    super('div', ['timer']);
    this.startTimer();
  }

  startTimer():number {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    const a = window.setInterval(() => {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.minute += 1;
        this.seconds = 0;
      }
      if (this.minute === 60) {
        this.hours += 1;
        this.minute = 0;
      }
      const timerNew = `<div class = "timerNew">${this.hours}:${this.minute}:${this.seconds}</div>`;
      if (timer) {
        timer.innerHTML = timerNew;
      }
    }, 1000);
    return a;
  }

  getTime():number {
    const currentTime = this.seconds + this.minute * 60 + this.hours * 360;
    return currentTime;
  }
}
