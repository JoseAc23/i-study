import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { UserUserAccountDto } from '../../dtos/response/user-user-account.dto';
import { GetUserUserAccount } from '../../messages/queries/get-user-user-accounts.query';
import { UserMapper } from '../../mappers/user.mapper';

@QueryHandler(GetUserUserAccount)
export class GetUserUserAccountHandler implements IQueryHandler<GetUserUserAccount> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetUserUserAccount) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      name as firstName,
      lastname as lastName,
      email,
      number as Number,
      nickname as NickName,
      password as Password
    FROM 
      users
    WHERE
      userType = 'free'
    ORDER BY
      lastname, name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const userClients: UserUserAccountDto[] = rows.map(function (row: any) {
      return UserMapper.ormToUserUserAccountDto(row);
    });
    return userClients;
  }
}