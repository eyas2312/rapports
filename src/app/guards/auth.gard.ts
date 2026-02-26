import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
  return false;
};