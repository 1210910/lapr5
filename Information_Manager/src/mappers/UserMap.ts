import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/user/userEmail";
import { UserPassword } from "../domain/user/userPassword";

import RoleRepo from "../repos/roleRepo";
import { UserRoles } from "../domain/user/UserRoles";

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      phone: user.phone.value,
      nif: user.nif?.value,
      password: "",
      role: user.role
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userOrError = await User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      phone: raw.phone,
      nif: raw.nif,
      password: raw.password,
      role: raw.role,
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      phone: user.phone.value,
      nif: user.nif?.value,
      password: user.password.value,
      role: user.role,
    }
    return a;
  }
}