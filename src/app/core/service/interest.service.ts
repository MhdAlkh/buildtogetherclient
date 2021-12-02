import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Interest } from 'src/app/shared/models/interest.model';
import { ROOT_URL } from 'src/assets/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  public HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept' : 'application/json'})};

  constructor(private http: HttpClient) { }

  public getUserInterests(id: number): Promise<Interest[]> {
    return this.http.get<Interest[]>(ROOT_URL + `/api/users/${id}/interests`, this.HTTP_OPTIONS).toPromise();
  }

  public addUserInterest(id: number, newInterest: Interest): Promise<Interest> {
    return this.http.post<Interest>(ROOT_URL + `/api/users/${id}/interests`, newInterest, this.HTTP_OPTIONS).toPromise();
  }

  public removeUserInterest(id: number, interestId: number): Promise<void> {
    return this.http.delete<void>(ROOT_URL + `/api/users/${id}/interests/${interestId}`, this.HTTP_OPTIONS).toPromise();
  }
}
