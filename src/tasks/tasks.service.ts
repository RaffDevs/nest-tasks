import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { UpdateDTO } from './dto/update-task.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = this.getTaskById(id);
    task.status = status;

    return task;

  }

  public async deleteTask(id: string): Promise<string> {
    this.tasks = this.tasks.filter(task => task.id !== id);

    return JSON.stringify({
      status: "success",
      message: "Task has been deleted!"
    });
  }
}
