import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../service/auth.service";
import {TokenStorageService} from "../service/token-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenStorageService.getToken() !== null) {
      return true;
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }


  }



}
