import { UserType } from 'src/users/domain/aggregates/user/user-type.enum';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity('users')
@TableInheritance({ column: 'type', })
export class UserAccountEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column({ name: 'type', type: 'enum', enum: UserType, default: UserType.USER })
  readonly type: UserType;
}