import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column({ allowNull: false })
  declare content: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  declare authorId: number;

  @BelongsTo(() => User)
  declare author: User;
}