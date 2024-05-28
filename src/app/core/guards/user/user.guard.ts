import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)

  if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') == 'user') {
    console.log('g T');
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
