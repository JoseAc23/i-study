import { Email } from "src/shared/domain/values/email.value";
import { UserFullName } from "src/shared/domain/values/full-name.value";
import { PhoneNumber } from "src/shared/domain/values/phone-number.value";
import { Nickname } from "src/shared/domain/values/user-nick-name.value";
import { Password } from "src/shared/domain/values/user-password.value";

describe('User', () => {
    let fullname: UserFullName;
    let nickname: Nickname;
    let password: Password;
    let email: Email;
    let phonenumber: PhoneNumber; 
  
    beforeEach(() => {
    fullname= UserFullName.create('Jose','Arenas Conde');
    nickname= Nickname.create('JotaaAc44');
    password= Password.create('lerssssas');
    email= Email.create('ja1478@mymail.com');
    phonenumber= PhoneNumber.create('930938078'); 
    
    });
});