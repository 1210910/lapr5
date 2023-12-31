import { TaskInfo } from "./TaskInfo";

export interface DeliveryTaskInfo extends TaskInfo {

  destName : string;
  origName : string;
  destPhoneNumber : string;
  origPhoneNumber : string;
  confirmationCode : string;

}
