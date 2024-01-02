import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  deleteAccount(email: string): Promise<Result<boolean>>;
  editUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  profile(email: string): Promise<Result<IUserDTO>>;
}
