import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';

export const ApiFile = (options?: ApiPropertyOptions): PropertyDecorator => (
  target: Object,
  propertyKey: string | symbol,
) => {
  ApiProperty({
    ...options,
    ...{
      type: 'file',
      properties: {
        [propertyKey]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey);
};
