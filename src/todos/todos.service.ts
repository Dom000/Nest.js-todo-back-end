import { Injectable, UseGuards, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService) { }

  async create(createTodoDto: CreateTodoDto) {

    const todo = await this.prisma.todos.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        completed: createTodoDto.completed,
        userId: createTodoDto.userId,
      },
    });
    return todo;
  }


  async findAll() {
    const todos = await this.prisma.todos.findMany();
    return todos;
  }

  async findOne(todoId: number) {
    const todo = await this.prisma.todos.findUnique({
      where: {
        id: todoId,
      },
    });

    if(!todo || todo.id !== todoId){
      throw new UnauthorizedException('Access to resources denied',);
    }
    return todo;
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto) {

    const updates = await this.prisma.todos.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!updates || updates.id !== todoId) {
      throw new UnauthorizedException('Access to resources denied',);
    }

    const todo =await  this.prisma.todos.update({
      where: {
        id: todoId,
      },
      data: {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        completed: updateTodoDto.completed,

      },
    });
    return { message: 'Todo updated successfully',update:todo };
  }

  async remove(todoId: number) {

    const todos=await  this.prisma.todos.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todos || todos.id !== todoId) {
      throw new UnauthorizedException('Access to resources denied',);
    }

    const deleted =await  this.prisma.todos.delete({
      where: {
        id: todoId,
      },
    });
    return { message: 'Todo deleted successfully' };
  }
}
