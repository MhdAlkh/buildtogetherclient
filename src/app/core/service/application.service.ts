import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'src/app/shared/models/application';
import { ROOT_URL } from 'src/assets/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept' : 'application/json'})};

  constructor(private http: HttpClient) { }

  public addApplication(id: number, comment: string): Promise<Application> {
    return this.http.post<Application>(ROOT_URL + `/api/applications`, {"position_id": id, "comment": comment } , this.HTTP_OPTIONS).toPromise();
  }

  public getProjectApplications(id: number): Promise<Application[]> {
    return this.http.get<Application[]>(ROOT_URL + `/api/projectApplications/${id}`, this.HTTP_OPTIONS).toPromise();
  }

  public updateApplication(id: number, application: Application): Promise<Application> {
    return this.http.patch<Application>(ROOT_URL + `/api/applications/${id}`, application, this.HTTP_OPTIONS).toPromise();
  }

}
