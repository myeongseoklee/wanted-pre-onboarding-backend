import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User, UserSignUpProps } from '../domain/user.entity';

export class CreateUserDto {
  /**
   * 사용자 이름은 2자 이상, 30자 이하인 문자열이어야 한다.
   */
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  /**
   * 사용자 이메일은 60자 이하인 문자열로서 이메일 주소 형식에 적합해야 한다.
   */
  @Expose()
  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  /**
   * 사용자 패스워드는 영문 대소문자와 숫자 또는 특수문자(!, @, #, $, %, ^, &, *, (, ) )로 이뤄진 8자 이상, 30자 이하의 문자열이어야 한다.
   */
  @Expose()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  constructor() {}

  toEntity(): User {
    const props: UserSignUpProps = {
      name: this.name,
      email: this.email,
      password: this.password,
      jobId: this.jobId,
    };

    return User.signUp(props);
  }
}
