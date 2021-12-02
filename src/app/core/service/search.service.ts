import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { Project } from 'src/app/shared/models/project.model';
import { ROOT_URL } from 'src/assets/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public searchProjects(search: string): Promise<Project[]> {
    return this.http.get<Project[]>(ROOT_URL + `/api/searchProject/${search}`, this.HTTP_OPTIONS).toPromise();
  }

  public searchPosts(search: string): Promise<Post[]> {
    return this.http.get<Post[]>(ROOT_URL + `/api/searchPost/${search}`, this.HTTP_OPTIONS).toPromise();
  }
}
