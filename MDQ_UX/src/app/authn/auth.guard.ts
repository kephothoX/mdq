import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
 return  Boolean(window.sessionStorage.getItem('isAuthenticated')); 
};
