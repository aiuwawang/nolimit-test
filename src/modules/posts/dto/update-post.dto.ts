import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Content tidak boleh kosong' })
  @IsString()
  content!: string;
}