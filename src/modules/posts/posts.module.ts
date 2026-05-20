import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    SequelizeModule.forFeature([Post]),
    AuthModule, 
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}