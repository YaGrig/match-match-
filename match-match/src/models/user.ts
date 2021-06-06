import { v4 } from 'uuid';

export class User {
  firstname:string;

  lastname:string;

  email:string;

  score?:number = 0;

  id?:string = v4();

  diff = 0;

  card = 0;

  constructor(firstname:string, lastname:string, email:string, id?:number, score?:number, diff = 0, card = 0) {
    this.firstname = firstname,
    this.lastname = lastname,
    this.email = email,
    this.score = score,
    this.id = id,
    this.diff = diff,
    this.card = card;
  }
}
