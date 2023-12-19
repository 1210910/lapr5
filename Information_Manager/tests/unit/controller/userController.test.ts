import chai, { expect } from "chai";
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import IUserService from "../../../src/services/IServices/IUserService";
import userController from "../../../src/controllers/userController";
import UserService from "../../../src/services/userService";
import { NextFunction, Request, Response } from "express";
import { Result } from "../../../src/core/logic/Result";
import IUserDTO from "../../../src/dto/IUserDTO";



chai.use(sinonChai);

describe('User Controller', () => {
    let userService: IUserService;
    let userController: UserController;

    beforeEach(function () {
        userService = sinon.createStubInstance(UserService);
        userController = new UserController(userService as any);
    });
});