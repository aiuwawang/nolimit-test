import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { User } from './modules/users/entities/user.entity';
import { Post } from './modules/posts/entities/post.entity';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}