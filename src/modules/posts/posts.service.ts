import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
  ) {}

  
  async findAll() {

    return this.postModel.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
  }

  
  async findOne(id: string) {
    const post = await this.postModel.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(userId: number, content: string) {
    return this.postModel.create({ content, authorId: userId });
  }

  async update(id: string, userId: number, content: string) {
    const post = await this.postModel.findByPk(id);
    
    if (!post) throw new NotFoundException('Post not found');
    
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own post');
    }

    return post.update({ content });
  }

  async remove(id: string, userId: number) {
    const post = await this.postModel.findByPk(id);
    
    if (!post) throw new NotFoundException('Post not found');
    
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own post');
    }

    await post.destroy();
    return { message: 'Post deleted successfully' };
  }
}