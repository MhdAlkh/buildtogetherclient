import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Project, PROJECT_CATEGORY, PTYPE} from "../../shared/models/project.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  GET_ALL_PROJECTS,
  GET_CURRENT_USER_PROJECTS,
  POST_ADD_NEW_PROJECT,
  PUT_EDIT_PROJECT,
  ROOT_URL
} from "../../../assets/routes.constants";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json'})};

  public allProjects: Project[] | null = null;
  public allProjects$: BehaviorSubject<Project[] | null> = new BehaviorSubject<Project[] | null>(null)

  public userProjects: Project[] | null = null;
  public userProjects$: BehaviorSubject<Project[] | null> = new BehaviorSubject<Project[] | null>(null)


  constructor(private http: HttpClient) {
    this.initializeAllProjects();
  }



  public createNewProject(name: string, summary: string, ownerId: number, pType: string, category: string, totalFund: number): Observable<any> {

    let data = {
      name: name,
      summary: summary,
      owner : String(ownerId),
      ptype: pType,
      category: category,
      totalFund: String(totalFund),
      achievedFund: "0"
    }

    console.log(data)

    return this.http.post(POST_ADD_NEW_PROJECT, data, this.HTTP_OPTIONS)
  }


  public editProject(name: string, summary: string, ownerId: number, pType: string, category: string, totalFund: number, startDate: Date, endDate: Date, projectId: number) {


    let data = {
      name: name,
      summary: summary,
      owner : String(ownerId),
      ptype: pType,
      category: category,
      totalFund: String(totalFund),
      startDate: startDate,
      endDate: endDate,
    }

    console.log(data)

    return this.http.put(PUT_EDIT_PROJECT + String(projectId), data, this.HTTP_OPTIONS)
  }




  public initializeAllProjects() {

    this.http.get<Project[]>(GET_ALL_PROJECTS).subscribe(
      data => {

        this.allProjects = data;
        this.allProjects$.next(this.allProjects);

      }, error => {
        console.log(error);
      }
    )

    this.http.get<Project[]>(GET_CURRENT_USER_PROJECTS).subscribe(
      data => {
        this.userProjects = data;
        this.userProjects$.next(this.userProjects)
      }, error => {
        console.log(error);
      }
    )

  }


  public isUserProject(id: number) {
    return this.userProjects.map<number>(project => project.id).includes(id)
  }

  public getProject(id: string): Promise<Project> {
      return this.http.get<Project>(ROOT_URL + `/api/projects/${id}`).toPromise();
  }

  public updateProject(id: number, modifiedProject: Project): Promise<Project> {
    return this.http.patch<Project>(ROOT_URL + `/api/projects/${id}`, modifiedProject, this.HTTP_OPTIONS).toPromise();
  }

  public getfollowedProjects(id: number): Promise<Project[]> {
    return this.http.get<Project[]>(ROOT_URL + `/api/users/${id}/projects`, this.HTTP_OPTIONS).toPromise();
  }

  public followProject(id: number, projectid: number): Promise<void> {
    return this.http.post<void>(ROOT_URL + `/api/users/${id}/projects`, { "project_id": projectid }, this.HTTP_OPTIONS).toPromise();
  }

  public unfollowProject(id: number, projectid: number): Promise<void> {
    return this.http.delete<void>(ROOT_URL + `/api/users/${id}/projects/${projectid}`, this.HTTP_OPTIONS).toPromise();
  }

  public uploadImage(form: FormData, project: number): Promise<any> {
    return this.http.post<any>(ROOT_URL + `/api/projectimage-upload/${project}`, form, { responseType: 'Blob' as 'json' }).toPromise();
  }

  public getImage(project: number): Promise<any> {
    return this.http.get<any>(ROOT_URL + `/api/projectimage-get/${project}`, { responseType: 'Blob' as 'json' }).toPromise();
  }
}
