import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invest } from 'src/app/shared/models/invest';
import { ROOT_URL } from 'src/assets/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class InvestService {
  public HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public invest(user_id: number, project_id: number, amount: number): Promise<void> {
    return this.http.post<void>(ROOT_URL + '/api/investments', { "user_id": user_id, "project_id": project_id, "amount": amount }, this.HTTP_OPTIONS).toPromise();
  }

  public userInvestments(user_id: number): Promise<Invest[]> {
    return this.http.get<Invest[]>(ROOT_URL + `/api/userInvestments/${user_id}`, this.HTTP_OPTIONS).toPromise();
  }

  public getProjectInvestments(id: number): Promise<Invest[]> {
    return this.http.get<Invest[]>(ROOT_URL +  `/api/projectInvestments/${id}`, this.HTTP_OPTIONS).toPromise();
  }

}
