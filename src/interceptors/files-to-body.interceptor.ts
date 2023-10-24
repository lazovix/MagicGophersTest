import { Injectable, mixin, CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function FilesToBodyInterceptor(
  uploadFields: MulterField[],
  localOptions?: MulterOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileFieldsInterceptor: NestInterceptor;

    constructor() {
      this.fileFieldsInterceptor = new (FileFieldsInterceptor(uploadFields, localOptions))();
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
      await this.fileFieldsInterceptor.intercept(context, next);
      const ctx = context.switchToHttp();
      const req = ctx.getRequest();

      if (req.body && req.files) {
        for (const multerField of uploadFields) {
          if (!req.body[multerField.name] && req.files[multerField.name]) {
            req.body[multerField.name] =
              multerField?.maxCount === 1 ? req.files[multerField.name].at(0) : req.files[multerField.name];
          }
        }
      }

      return next.handle();
    }
  }

  return mixin(Interceptor);
}
