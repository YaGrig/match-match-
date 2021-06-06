export interface Subscriber {
  (state: string): void;
}

export interface Unsubscribe {
  (): void;
}
