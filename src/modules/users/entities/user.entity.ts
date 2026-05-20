import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Post } from '../../posts/entities/post.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ allowNull: false })
  declare name: string;

  @Column({ unique: true, allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;

  @HasMany(() => Post)
  declare posts: Post[];
}