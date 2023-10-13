import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ArrayContainsConstants implements ValidatorConstraintInterface {
  validate(
    values: unknown[],
    args?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { constraints: constants } = args;

    const isConstants = (value: unknown) => constants.includes(value);

    return values.every(isConstants);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `정해진 양식으로 ${args.property}을 보내주세요.`;
  }
}
