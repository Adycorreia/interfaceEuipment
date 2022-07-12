import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';


import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }
  getRole(): Observable<string | string[]> {
    throw new Error('Method not implemented.');
  }
/*
  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
            console.log(token.getValue());
            var decoded = jwt_decode(token.getValue()); 
            console.log(decoded['groups']);
            console.log(decoded.sub);
          return token.isValid() ? decoded['groups'] : 'view';
        }),
      );
  }*/
}