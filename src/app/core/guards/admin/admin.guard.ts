import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router)
  if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') == 'admin') {
    console.log('Guard T');
    return true;
    
  } else {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') == 'user') {
      console.log('Guard TTT');
      _Router.navigate(['/landing-page']);
    } else {
      console.log('Guard F');
      _Router.navigate(['/auth/login']);
    }
    return false;
  }

};

