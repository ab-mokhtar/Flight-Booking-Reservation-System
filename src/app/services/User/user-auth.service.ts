import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  
  constructor() {}

  public setRoles(roles: []) {
    console.log(roles)
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('jwtToken');
  }
  public setId(id: string) {
    localStorage.setItem('id', id);
  }

  public getId(): string {
    // @ts-ignore
    return localStorage.getItem('id');
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken()&& this.getId();
  }
}
