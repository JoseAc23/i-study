import { Column } from 'typeorm';

export class NicknameValue {
    @Column('varchar', { name: 'nickname', length: 15, nullable: false })
    value: string;
  
    private constructor(value: string) {
      this.value = value;
    }
  
    public static from(value: string): NicknameValue {
      return new NicknameValue(value);
    }
  }