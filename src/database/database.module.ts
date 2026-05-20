import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { User } from '../modules/users/entities/user.entity';
import { Post } from '../modules/posts/entities/post.entity';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true, 
    }),
    
    
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        models: [User, Post],
        autoLoadModels: true,
        synchronize: true, 
      }),
    }),
  ],
})
export class DatabaseModule {}