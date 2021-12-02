import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  GET_INFORMATION_CURRENT_USER,
  LOGIN_POST_URL,
  LOGOUT_POST_URL,
  SIGNUP_POST_URL
} from "../../../assets/routes.constants";
import {AuthInterceptor} from "../helper/auth.interceptor";
import {TokenStorageService} from "./token-storage.service";
import {TokenResponseModel} from "../../shared/models/token-response.model";
import {Router} from "@angular/router";




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};



  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private ngZone: NgZone, private router: Router) {

    this.tokenStorageService.currentToken$.subscribe(token => {
      if (token !== null) {
        ngZone.run(() => {
          this.router.navigate(['home'])
        })
      } else {
        ngZone.run(() => {
          this.router.navigate([''])
        })
      }
    })


  }


  public signIn(email: string, password: string): Observable<any> {

    const httpRequest = {email: email, password: password}

    return new Observable(observer => {
      this.http.post<TokenResponseModel>(LOGIN_POST_URL, httpRequest, this.HTTP_OPTIONS).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.token)
          observer.next(data.token)
        },
        error => {
          observer.error(error)
        })
    })
  }

  public signUp(email: string, password: string): Observable<any> {

    const httpRequest = {email: email, password: password}

    return new Observable(observer => {
      this.http.post<TokenResponseModel>(SIGNUP_POST_URL, httpRequest, this.HTTP_OPTIONS).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.token)
          observer.next(data.token)
        },
        error => {
          observer.error(error)
        })
    })
  }

  public signOut() {

    return this.http.post(LOGOUT_POST_URL, '', this.HTTP_OPTIONS).subscribe(
      data => {
        this.tokenStorageService.signOut()
      },
      error => {
        console.log(error)
      })
  }
}



