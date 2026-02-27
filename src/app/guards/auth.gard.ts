import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // get current user from local storage for persistence
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    return true; // L'utilisateur est authentifié, autoriser l'accès
  }
  router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
  return false;
};
