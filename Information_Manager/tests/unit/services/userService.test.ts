import { expect } from "chai";
import { anyOfClass, anything, instance, mock, when } from "ts-mockito";

import { User } from "../../../src/domain/user/user";
import { IUserDTO } from "../../../src/dto/IUserDTO";
import IUserService from "../../../src/services/IServices/IUserService";
import IUserRepo from "../../../src/services/IRepos/IUserRepo";
import UserService from "../../../src/services/userService";
import { Result } from "../../../src/core/logic/Result";

describe("User Service", () => {

  it("should create a user", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(null);
    when(userRepo.save(anything())).thenResolve(user);

    const result = await userService.SignUp(userDTO);
    expect(result.isSuccess).to.equal(true);
  });

  it("should not create a user with an existing email", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(user);

    const result = await userService.SignUp(userDTO);
    expect(result.isSuccess).to.equal(false);
  });

  it("should edit a user", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const userDto = {
      firstName: "Johnny",
      lastName: "Doey",
      email: "jd@isep.ipp.pt",
      phone: 918765432,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(user);
    when(userRepo.save(anything())).thenResolve(user);

    const user2 = await userService.editUser(userDto);
    expect(user2.isSuccess).to.equal(true);
  });

  it("should not edit a user that does not exist", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    when(userRepo.findByEmail(userDTO.email)).thenResolve(null);

    const user2 = await userService.editUser(userDTO);
    expect(user2.isFailure).to.equal(true);
  });

  it("should return a user profile", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(user);

    const result = await userService.profile(userDTO.email);
    expect(result.isSuccess).to.equal(true);
  });

  it("should not return a user profile that does not exist", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      email: "jd@isep.ipp.pt"
    };

    when(userRepo.findByEmail(userDTO.email)).thenResolve(null);

    const result = await userService.profile(userDTO.email);
    expect(result.isFailure).to.equal(true);
  });

  it("should delete a user account", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(user);

    const result = await userService.deleteAccount(userDTO.email);
    expect(result.isSuccess).to.equal(true);
  });

  it("should not delete a user account that does not exist", async () => {
    const userRepo: IUserRepo = mock<IUserRepo>();
    const userService: IUserService = new UserService(instance(userRepo));

    const userDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "jd@isep.ipp.pt",
      phone: 912345678,
      password: "JohnDoe123@",
      role: "Admin"
    } as IUserDTO;

    const user = (await User.create(userDTO)).getValue();

    when(userRepo.findByEmail(userDTO.email)).thenResolve(null);

    const result = await userService.deleteAccount(userDTO.email);
    expect(result.isFailure).to.equal(true);
  });
});