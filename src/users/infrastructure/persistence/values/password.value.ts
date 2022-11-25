import { Column } from 'typeorm';

export class PasswordValue {
  @Column('varchar', { name: 'password', length: 25, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PasswordValue {
    return new PasswordValue(value);
  }
}