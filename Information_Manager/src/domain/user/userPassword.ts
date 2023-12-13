import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from "bcrypt-nodejs";
import argon2 from "argon2";

interface UserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {

  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props);
  }

  /*  /!**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   *!/

  public async comparePassword (plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    return this.props.hashed;
  }
  
  private hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }

  public getHashedValue (): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }*/

  public async verifyPassword(plainTextPassword: string): Promise<boolean> {
    return await argon2.verify(this.props.value, plainTextPassword);
  }

  public static meetCriteria(value: string): boolean {
    const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?|\-=\\\/]).{10,}$/gm);
    return regExp.test(value);
  }

  public static create(value: string): UserPassword {
    const propsResult = Guard.againstNullOrUndefined(value, "password");

    if (!propsResult.succeeded) {
      throw new Error(propsResult.message);
    } else {
      if (!this.meetCriteria(value)) {
        throw new Error("Password doesnt meet criteria [1 uppercase, 1 lowercase, 1 digit , 1 symbol and 10 chars min.].");
      }

      const hashedPassword = argon2.hash(value);

      return (new UserPassword({ value: hashedPassword }));
    }
  }
}