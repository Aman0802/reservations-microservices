import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from './users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
