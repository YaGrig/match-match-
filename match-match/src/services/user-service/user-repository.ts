import { User } from '../../models/user';

export interface UserData {
  firstname:string;

  lastname:string;

  email:string;

  score:number;

  id?:string;

  diff:number;

  card:number;
}

export class UserRepository {
  private readonly dbName = 'match-match';

  private readonly storeName = 'users';

  private loggedUser: User | null = null;

  private db?: IDBDatabase;

  public players: Array<string>;

  constructor() {
    this.players = [];
    const openRequest = indexedDB.open(this.dbName);
    openRequest.onsuccess = (event) => {
      this.db = (event.target as IDBRequest).result;
    };
    openRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      if (!db.objectStoreNames.contains(this.storeName)) {
        const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
        store.createIndex('f', 'firstname');
      }
    };
  }

  create(
    firstname = '',
    lastname = '',
    email = '',
    id: number,
    diff = 0,
    card = 0,
  ): Promise<User> {
    return new Promise((res, rej) => {
      const transaction = this.db?.transaction(this.storeName, 'readwrite');
      const user = new User(firstname, lastname, email, id, diff, card);
      const users = transaction?.objectStore(this.storeName);
      if (users) {
        users.add(user).onsuccess = () => {
          res(user);
        };
      } else {
        rej();
      }
    });
  }

  GetAllPlayers(): Promise<Array<UserData>> {
    return new Promise((res) => {
      const transaction = this.db?.transaction(this.storeName, 'readwrite');
      const users = transaction?.objectStore(this.storeName);
      if (users) {
        const request = users.getAll();
        request.onsuccess = () => {
          res(request.result);
        };
      }
    });
  }

  updateUserScore(score: number, userId: number): void {
    const transaction = this.db?.transaction(this.storeName, 'readwrite');
    const users = transaction?.objectStore(this.storeName);
    if (users) {
      const request = users.openCursor();
      request.onsuccess = function result() {
        const cursor = request.result;
        if (cursor) {
          const { key } = cursor;
          if (key === `${userId}`) {
            const { value } = cursor;
            value.score = score;
            const requestLast = cursor.update(value);
            requestLast.onsuccess = () => {};
          }
          cursor.continue();
        }
      };
    }
  }

  updateUserDiff(diff: number, userId: number): void {
    const transaction = this.db?.transaction(this.storeName, 'readwrite');
    const users = transaction?.objectStore(this.storeName);
    if (users) {
      const request = users.openCursor();
      request.onsuccess = function result() {
        const cursor = request.result;
        if (cursor) {
          const { key } = cursor;
          if (key === `${userId}`) {
            const { value } = cursor;
            value.diff = diff;
            const requestLast = cursor.update(value);
            requestLast.onsuccess = () => {};
          }
          cursor.continue();
        }
      };
    }
  }

  updateUserCards(card: number, userId: number): void {
    const transaction = this.db?.transaction(this.storeName, 'readwrite');
    const users = transaction?.objectStore(this.storeName);
    if (users) {
      const request = users.openCursor();
      request.onsuccess = function result() {
        const cursor = request.result;
        if (cursor) {
          const { key } = cursor;
          if (key === `${userId}`) {
            const { value } = cursor;
            value.card = card;
            const requestLast = cursor.update(value);
            requestLast.onsuccess = () => {};
          }
          cursor.continue();
        }
      };
    }
  }

  getUserDiff(userId: string): Promise<number> {
    return new Promise((res) => {
      const transaction = this.db?.transaction(this.storeName, 'readwrite');
      const users = transaction?.objectStore(this.storeName);
      if (users) {
        const request = users.getAll();
        request.onsuccess = () => {
          const allUsers = request.result;
          const user = allUsers.find((userData) => userData.id === userId);
          res(user.diff);
        };
      }
    });
  }

  getUserCards(userId: string): Promise<number> {
    return new Promise((res) => {
      const transaction = this.db?.transaction(this.storeName, 'readwrite');
      const users = transaction?.objectStore(this.storeName);
      if (users) {
        const request = users.getAll();
        request.onsuccess = () => {
          const allUsers = request.result;
          const user = allUsers.find((userData) => userData.id === userId);
          res(user.card);
        };
      }
    });
  }
}
