import { Injectable, mixin, CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function FileToBodyInterceptor(fieldName: string, localOptions?: MulterOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor() {
      this.fileInterceptor = new (FileInterceptor(fieldName, localOptions))();
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
      await this.fileInterceptor.intercept(context, next);

      const ctx = context.switchToHttp();
      const req = ctx.getRequest();

      if (req.body && req.file?.fieldname) {
        const { fieldname } = req.file;
        if (!req.body[fieldname]) {
          req.body[fieldname] = req.file;
        }
      }

      return next.handle();
    }
  }

  return mixin(Interceptor);
}
