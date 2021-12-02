import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from 'src/app/shared/models/position';
import { ROOT_URL } from 'src/assets/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  public HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept' : 'application/json'})};

  constructor(private http: HttpClient) { }

  public getProjectPositions(id: number): Promise<Position[]> {
    return this.http.get<Position[]>(ROOT_URL + `/api/projectPositions/${id}`, this.HTTP_OPTIONS).toPromise();
  }

  public addPosition(id: number, newPosition: string): Promise<Position> {
    return this.http.post<Position>(ROOT_URL + `/api/positions`, {"title": newPosition, "project_id": id}, this.HTTP_OPTIONS).toPromise();
  }

  public removePosition(id: number): Promise<void> {
    return this.http.delete<void>(ROOT_URL + `/api/positions/${id}`, this.HTTP_OPTIONS).toPromise();
  }

}
