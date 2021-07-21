import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { FilterTasksDTO } from './dto/filter-tasks.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksByFilter(filterDTO: FilterTasksDTO): Task[] {
    const { search, status } = filterDTO;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    
    if (search) {
      tasks = tasks.filter(task => {
        
        if (
        task.title.includes(search) || 
        task.description.includes(search)
        ) {
          return true;
        }
        
        return false;
        
      });
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException('Cant found this task!');
    }

    return foundTask;
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
