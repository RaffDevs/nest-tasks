import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get('')
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post('')
  async createTask(@Body() taskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(taskDTO);
  }

}
