import { About } from './components/about/about';
import { Best } from './components/best/best';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Settings } from './components/settings/setting';
import { router } from './router';

const header = new Header();

const routerConfig: Map<string, () => HTMLElement> = new Map([
  ['/', () => new About().element],
  ['/about', () => new About().element],
  [
    '/game',
    () => new Game().element,
  ],
  [
    '/score',
    () => new Best().element,
  ],
  [
    '/setting',
    () => new Settings().element,
  ],
]);

export class App {
  private readonly pageOutlet: HTMLDivElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.pageOutlet = document.createElement('div');
    if (this.rootElement) {
      this.rootElement.appendChild(header.element);
    }
    this.rootElement.appendChild(this.pageOutlet);
  }

  start(): void {
    router.subscribe((path) => {
      const componentFactory = routerConfig.get(path);
      if (componentFactory) {
        const component = componentFactory();
        this.pageOutlet.innerHTML = '';
        this.pageOutlet.append(component);
      }
    });
  }
}
