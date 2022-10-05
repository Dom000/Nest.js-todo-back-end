import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { AuthModule } from './modules/Auth/auth.module';
import { AuthService } from './modules/Auth/auth.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), TodosModule],
  providers: [PrismaService,AuthService],

})
export class AppModule {}
