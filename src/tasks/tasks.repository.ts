import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { FilterTasksDTO } from "./dto/filter-tasks.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks.model";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTasks(filter: FilterTasksDTO): Promise<Task[]> {
    const { status, search } = filter;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    await this.save(task);

    return task;
  }

  public async deleteTask(id: string): Promise<string> {
    const foundTask = await this.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(`Cannot found task with id ${id}`);
    }

    await this.delete(id);

    return JSON.stringify({
      message: "Task has been deleted!"
    });
  }
}