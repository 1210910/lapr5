import { User } from "../../../src/domain/user/user";
import { IUserDTO } from "../../../src/dto/IUserDTO";
import { expect } from "chai";

describe("User test", () => {
  it("should create a valid user", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isSuccess).to.be.true;
  });

  it("shouldn't create a user when first name is null", async () => {
    const userDto = {
      firstName: null,
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when last name is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: null,
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when email is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: null,
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when email is not from isep", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@gmail.com",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("Email with the wrong format (must be '@isep.ipp.pt')");
  });

  it("shouldn't create a user when phone is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: null,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when phone is not valid", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 123456789,
      nif: 248902121,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("Phone number property has to be in the portuguese format (9 digits)");
  });

  it("should create a user when nif is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: null,
      role: "ADMIN",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isSuccess).to.be.true;
  });

  it("shouldn't create a user when role is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: null,
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when password is null", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: null
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when password is not valid", async () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "ADMIN",
      password: "admin123"
    } as IUserDTO;

    const userOrError = await User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

});
