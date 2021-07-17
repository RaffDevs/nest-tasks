import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createTask(taskToSave: CreateTaskDTO): Task {
    const { title, description } = taskToSave;
    
    let task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.DONE
    }

    this.tasks.push(task);

    return task;
  }
}
