import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTasksDTO } from './dto/filter-tasks.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get('')
  async getAllTasks(@Query() filterDTO: FilterTasksDTO): Promise<Task[]> {
    if (Object.keys(filterDTO).length > 0) {
      return this.taskService.getTasksByFilter(filterDTO);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('')
  async createTask(@Body() taskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(taskDTO);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Promise<Task> {
    return this.taskService.updateTaskStatus (id, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTask(id); 
  }

}
