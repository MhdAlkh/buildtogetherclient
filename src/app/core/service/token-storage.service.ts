import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public currentToken: string | null = null
  public currentToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  constructor() {
    this.currentToken = this.getToken();
    this.currentToken$.next(this.currentToken);
    console.log(this.currentToken)
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.currentToken = null;
    this.currentToken$.next(this.currentToken);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    this.currentToken = token;
    this.currentToken$.next(this.currentToken);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
