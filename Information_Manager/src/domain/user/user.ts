import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { Guard } from "../../core/logic/Guard";
import { IUserDTO } from "../../dto/IUserDTO";
import { UserRoles } from "./UserRoles";
import { UserPhoneNumber } from "./userPhoneNumber";
import { UserNIF } from "./userNIF";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  phone: UserPhoneNumber;
  nif: UserNIF;
  password: UserPassword;
  role: UserRoles;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id)
  }

  get firstName(): string {
    return this.props.firstName
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get phone(): UserPhoneNumber {
    return this.props.phone;
  }

  get nif(): UserNIF {
    return this.props.nif;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get role(): UserRoles {
    return this.props.role;
  }

  set firstName(value: string) {
    this.props.firstName = value;
  }
  set lastName(value: string) {
    this.props.lastName = value;
  }

  set phone(value: UserPhoneNumber) {
    this.props.phone = value;
  }

  set nif(value: UserNIF) {
    this.props.nif = value;
  }

  set role(value: UserRoles) {
    this.props.role = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static async create(props: IUserDTO, id?: UniqueEntityID): Promise<Result<User>> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.phone, argumentName: 'phone' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.role, argumentName: 'role' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } else {
      try {
        const user = new User({
          firstName: props.firstName,
          lastName: props.lastName,
          email: UserEmail.create(props.email),
          phone: UserPhoneNumber.create(props.phone),
          nif: props.nif ? UserNIF.create(props.nif) : UserNIF.create(null),
          password: await UserPassword.create(props.password),
          role: UserRoles[props.role] ?? props.role as UserRoles
        }, id);

        return Result.ok<User>(user);
      } catch (err) {
        return Result.fail<User>(err.message);
      }
    }
  }

  public static edit(props: IUserDTO | any, user: User): Result<User> {
    try {

      user.firstName = props.firstName ?? user.firstName;
      user.lastName = props.lastName ?? user.lastName;

      if (props.phone !== undefined && props.phone !== null) {
        user.phone = UserPhoneNumber.create(props.phone);
      }

      if (props.nif !== undefined && props.nif !== null) {
        user.nif = UserNIF.create(props.nif);
      }

      return Result.ok<User>(user);
    } catch (err) {
      return Result.fail<User>(err.message);
    }
  }

}