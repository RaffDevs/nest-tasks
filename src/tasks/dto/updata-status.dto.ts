import { TaskStatus } from "../tasks.model";
import { IsEnum, isEnum } from 'class-validator'

export class UpdateStatusTaskDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus
}
