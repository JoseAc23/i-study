import { User } from "./user.entity";

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: number): Promise<boolean>;
  getById(id: number): Promise<User>;
  getByEmail(email: string): Promise<User>;
}