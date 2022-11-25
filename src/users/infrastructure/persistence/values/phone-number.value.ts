import { Column } from 'typeorm';

export class PhoneNumberValue {
  @Column('varchar', { name: 'number', length: 9, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PhoneNumberValue {
    return new PhoneNumberValue(value);
  }
}