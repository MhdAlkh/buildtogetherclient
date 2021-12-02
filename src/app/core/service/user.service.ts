import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {BehaviorSubject} from "rxjs";
import {GET_INFORMATION_CURRENT_USER, ROOT_URL} from "../../../assets/routes.constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept' : 'application/json'})};
  public currentUser: User | null = null;
  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient) {
    this.updateLocalCurrentUser()
  }


  private updateLocalCurrentUser() {

    this.http.get<User>(GET_INFORMATION_CURRENT_USER).subscribe(
      data => {
        this.currentUser = data;
        this.currentUser$.next(this.currentUser);
      },
      error => {

      }
    )
  }

  public getUser(): Promise<User> {
      return this.http.get<User>(GET_INFORMATION_CURRENT_USER).toPromise();
  }

  public updateUser(id: number, modifiedUser: User): Promise<User> {
    return this.http.patch<User>(ROOT_URL + `/api/users/${id}`, modifiedUser, this.HTTP_OPTIONS).toPromise();
  }

  public uploadImage(form: FormData): Promise<any> {
    return this.http.post<any>(ROOT_URL + '/api/image-upload', form, { responseType: 'Blob' as 'json' }).toPromise();
  }

  public getImage(): Promise<any> {
    return this.http.get<any>(ROOT_URL + '/api/image-get', { responseType: 'Blob' as 'json' }).toPromise();
  }

  public getOtherUser(id: Number): Promise<User> {
    return this.http.get<User>(ROOT_URL + `/api/users/${id}`, this.HTTP_OPTIONS).toPromise();
  }
}
