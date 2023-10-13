import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Company, CreateCompanyProps } from '../company.entity';

export class CreateCompanyDto {
  /**
   * 회사 이름은 30자 이하인 문자열이어야 한다.
   */
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;
  constructor() {}

  /**
   * 인사담당자의 이메일은 60자 이하인 문자열로서 이메일 주소 형식에 적합해야 한다.
   */
  @Expose()
  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  /**
   * 인사담당자의 패스워드는 영문 대소문자와 숫자 또는 특수문자(!, @, #, $, %, ^, &, *, (, ) )로 이뤄진 8자 이상, 30자 이하의 문자열이어야 한다.
   */
  @Expose()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;

  toEntity(): Company {
    const props: CreateCompanyProps = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    return Company.create(props);
  }
}
