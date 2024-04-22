import {
  Injectable,
  BadRequestException,
  PipeTransform,
  UnprocessableEntityException,
  ValidationPipe, ArgumentMetadata
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(this.handleError(e.message));
      }
      throw e;
    }
  }

  private handleError(errors: any) {
    return errors.map((error: any) => error.constraints);
  }
}

@Injectable()
export class ParseYearPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }

    if (!/^2\d\d\d$/.test(value) || val < 2023) {
      throw new BadRequestException('Year check failed');
    }

    return val;
  }
}

@Injectable()
export class ParseMonthPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }

    if (!/^([1-9]|0[1-9]|1[0-2])$/.test(value)) {
      throw new BadRequestException('Month check failed');
    }

    return val;
  }
}