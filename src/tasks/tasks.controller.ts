import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTasksDTO } from './dto/filter-tasks.dto';
import { UpdateStatusTaskDTO } from './dto/updata-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get('')
  async getAllTasks(@Query() filterDTO: FilterTasksDTO): Promise<Task[]> {
    return await this.taskService.getAllTasks(filterDTO)
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post('')
  async createTask(@Body() taskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskService.createTask(taskDTO);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateStatusTaskDTO
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;

    return await this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<string> {
    return await this.taskService.deleteTask(id); 
  }

}
