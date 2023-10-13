import { ValueTransformer } from 'typeorm';

export class JsonTransformer<EntityValueType> implements ValueTransformer {
  to(entityValue: EntityValueType[]): string {
    if (!entityValue) {
      return null;
    }
    console.log('entityValue: ', entityValue);

    return JSON.stringify(entityValue);
  }

  from(databaseValue: string): EntityValueType[] {
    if (!databaseValue) {
      return null;
    }

    return JSON.parse(databaseValue);
  }
}
