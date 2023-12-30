import { User } from "../../../src/domain/user/user";
import { IUserDTO } from "../../../src/dto/IUserDTO";
import { expect } from "chai";

describe("User test", () => {
  it("should create a valid user", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isSuccess).to.be.true;
  });

  it("shouldn't create a user when first name is null", () => {
    const userDto = {
      firstName: null,
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when last name is null", () => {
    const userDto = {
      firstName: "First",
      lastName: null,
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when email is null", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: null,
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("Email is required");
  });

  it("shouldn't create a user when email is not from isep", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@gmail.com",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("Email with the wrong format (must be '@isep.ipp.pt')");
  });

  it("shouldn't create a user when phone is null", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: null,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when phone is not valid", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 123456789,
      nif: 248902121,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("Phone number property has to be in the portuguese format (9 digits)");
  });

  it("should create a user when nif is null", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: null,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when nif is not valid", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 123456789,
      role: "admin",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
    expect(userOrError.error).to.equal("NIF property has to be in the portuguese format (9 digits)");
  });

  it("shouldn't create a user when role is null", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: null,
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when role is not valid", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "student",
      password: "Admin12345@"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when password is null", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: null
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

  it("shouldn't create a user when password is not valid", () => {
    const userDto = {
      firstName: "First",
      lastName: "Last",
      email: "admin@isep.ipp.pt",
      phone: 912345678,
      nif: 248902121,
      role: "admin",
      password: "admin123"
    } as IUserDTO;

    const userOrError = User.create(userDto);
    expect(userOrError.isFailure).to.be.true;
  });

});
