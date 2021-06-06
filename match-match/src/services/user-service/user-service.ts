import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user-repository';
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

const userRepository = new UserRepository();
const currentUserArray: Array<User> = [];

export class UserService {
  public currentUser: User | null = null;

  async create(
    firstname = '',
    lastname = '',
    email = '',
    id = uuidv4() as unknown as number,
    diff = 0,
    card = 0,
  ): Promise<User> {
    const user = await userRepository.create(
      firstname,
      lastname,
      email,
      id,
      diff,
      card,
    );
    this.currentUser = user;
    currentUserArray[0] = this.currentUser;
    return this.currentUser;
  }

  async getTopPlayers(): Promise<Array<UserData>> {
    const result = await userRepository.GetAllPlayers();
    return result;
  }

  updateUserScore(
    score: number,
    userId: number = Object.values(currentUserArray[0])[1],
  ): void {
    const result = userRepository.updateUserScore(score, userId);
    return result;
  }

  async updateUserDiff(
    diff: number,
    userId: number = Object.values(currentUserArray[0])[1],
  ):Promise<void> {
    await userRepository.updateUserDiff(diff, userId);
  }

  async getUserDiff(
    userId: number = Object.values(currentUserArray[0])[1],
  ): Promise<number> {
    const result = await userRepository.getUserDiff(String(userId));
    return result;
  }

  async updateUserCards(
    card: number,
    userId: number = Object.values(currentUserArray[0])[1],
  ): Promise<void> {
    await userRepository.updateUserCards(card, userId);
  }

  async getUserCards(
    userId: number = Object.values(currentUserArray[0])[1],
  ): Promise<number> {
    const result = await userRepository.getUserCards(String(userId));
    return result;
  }
}
