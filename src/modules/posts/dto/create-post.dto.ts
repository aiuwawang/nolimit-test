import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Content tidak boleh kosong' })
  @IsString()
  content!: string;
}