import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsCreditCard()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  cvc: string;
}
