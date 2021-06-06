import { Subscriber, Unsubscribe } from './models';

export class Router {
  private state: string = document.location.pathname;

  private subscribers: Subscriber[] = [];

  constructor() {
    window.addEventListener('popstate', () => {
      this.notify(document.location.pathname);
    });
  }

  public navigate(path: string): void {
    if (this.state !== path) {
      window.history.pushState(null, '', path);
      this.notify(path);
    }
  }

  public subscribe(subscriber: Subscriber): Unsubscribe {
    subscriber(this.state);
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  }

  public getState(): string {
    return this.state;
  }

  private notify(path: string): void {
    if (path !== this.state) {
      this.state = path;
      this.subscribers.forEach((subscriber) => subscriber(this.state));
    }
  }
}
