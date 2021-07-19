import { TaskStatus } from "../tasks.model";

export class UpdateDTO {
  public title: string;
  public description: string;
  public status: TaskStatus
}