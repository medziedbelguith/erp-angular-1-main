import { Injectable } from '@angular/core';
import { ToastNotificationService } from '../toast-notification.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const TOKEN_KEY = 'auth-token';
const USER_PSEUDO_KEY = 'auth-pseudo';
const USER_KEY = 'auth-user';
const USER_ROLE = 'auth-role';
const ROLE_SUPER_ADMIN = '14sqqs78za879899899';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private toastNotificationService:ToastNotificationService) {
    this.getUserFromLocalStorage()
    this.getTokenFromLocalStorage()
  }

  signOut(): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    //window.sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_ROLE);
  }

  token = ""

  public saveToken(token: string, user): void {
    this.token = token
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    this.toastNotificationService.showSuccessSmall("Bienvenue "+user.nom+" !!")
  }

  public getToken(): string | null {
    return  this.token;
  }

  public getTokenFromLocalStorage(){
    this.token = localStorage.getItem(TOKEN_KEY)
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleSuperAdmin(): void {
    localStorage.removeItem(USER_ROLE);
    localStorage.setItem(USER_ROLE, ROLE_SUPER_ADMIN);
  }

  public isRoleSuperAdmin(): boolean | null{
    return localStorage.getItem(USER_ROLE) == ROLE_SUPER_ADMIN;
  }

  public getUser(): any {
    return this.userObject;
  }
  
  userObject = {}

  public getUserFromLocalStorage(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      this.userObject = JSON.parse(user);
      console.log(this.userObject)
    }else{
      this.userObject = {};
      console.log(this.userObject)
    }
  }

  getHeader(){
    let headers = new HttpHeaders()

    headers = headers.set('Authorization',  `Bearer ${this.token}`)

  
    var header = {
      headers: headers
    }

    return header
  }

 
}