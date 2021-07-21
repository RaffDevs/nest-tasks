import {IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;
}