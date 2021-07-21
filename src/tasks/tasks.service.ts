import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { FilterTasksDTO } from './dto/filter-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository
  ) {}

  public async getAllTasks(filter: FilterTasksDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filter);
  }

  // public getTasksByFilter(filterDTO: FilterTasksDTO): Task[] {
  //   const { search, status } = filterDTO;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
    
  //   if (search) {
  //     tasks = tasks.filter(task => {
        
  //       if (
  //       task.title.includes(search) || 
  //       task.description.includes(search)
  //       ) {
  //         return true;
  //       }
        
  //       return false;
        
  //     });
  //   }

  //   return tasks;
  // }

  public async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(`Cannot found task with id ${id}`);
    }

    return foundTask;
  }

  public createTask(taskToSave: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(taskToSave);
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  public async deleteTask(id: string): Promise<string> {
    return this.taskRepository.deleteTask(id);
  }
} 
