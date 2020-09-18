/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ModuleContext } from '@graphql-modules/core';
import { AuthContext } from '@/types';
export const isAuthenticated = () => (next) => async (
  root,
  args,
  context: ModuleContext<AuthContext>,
  info
) => {
  if (!context.currentUser) {
    throw new Error('User must be authenticated!');
  }
  return next(root, args, context, info);
};
