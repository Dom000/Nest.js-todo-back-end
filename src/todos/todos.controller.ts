import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
// import { PrismaService } from 'src/modules/prisma/prisma.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) { }

  @Post("create")
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    return this.todosService.create(createTodoDto);
  }

  @Get("all")
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req:Request) {
    
    console.log(req.user, "todos controller");
    return req.user;
  }

  @Get('getone_todo:id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch('update_todo/:id')
  update(@Param('id') todoId: string, @Body() updateTodoDto: UpdateTodoDto) {

     console.log(updateTodoDto,"updateTodoDto");

    return this.todosService.update(+todoId, updateTodoDto);
  }

  @Delete('delete_todo/:id')
  remove(@Param('id') todoId: string) {
    return  this.todosService.remove(+todoId);
  }
}
