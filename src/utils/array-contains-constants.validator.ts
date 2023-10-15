import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ArrayContainsConstants implements ValidatorConstraintInterface {
  private constants: any[];

  validate(
    values: unknown[],
    args?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { constraints: constants } = args;
    this.constants = constants;

    return values.every(this.isConstants);
  }

  private isConstants(value: unknown) {
    return this.constants.includes(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `정해진 양식으로 ${args.property}을 보내주세요.`;
  }
}
