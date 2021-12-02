import { Injectable } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GET_ALL_POSTS, GET_USER_POSTS, POST_NEW_POST, ROOT_URL} from "../../../assets/routes.constants";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private HTTP_OPTIONS = {headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json'})};

  public allPosts: Post[] | null = null;
  public allPosts$: BehaviorSubject<Post[] | null> = new BehaviorSubject<Post[] | null>(null)

  public userPosts: Post[] | null = null;
  public userPosts$: BehaviorSubject<Post[] | null> = new BehaviorSubject<Post[] | null>(null)


  constructor(private http: HttpClient) {
    this.initializeAllPosts();

  }


  public initializeAllPosts(): void {
    this.http.get<Post[]>(GET_ALL_POSTS).subscribe(
      data => {
        this.allPosts = data;
        this.allPosts$.next(this.allPosts)
      },
        error => {
        console.log(error)
    })

    this.http.get<Post[]>(GET_USER_POSTS).subscribe(
      data => {
        this.userPosts = data;
        this.userPosts$.next(this.userPosts)
      },
        error => {
        console.log(error)
    })
  }

  public getlastPost(): Promise<Post> {
      return this.http.get<Post>(ROOT_URL + '/api/lastpost').toPromise();
  }


  public createNewPost(title: string, description: string): Observable<Object> {

    let data = {title: title, body: description}
    console.log(data)

    return this.http.post(POST_NEW_POST, data, this.HTTP_OPTIONS)
  }


  public editPost(idPost: string, title: string, description: string ) {
    let data = {title: title, body: description}
    return this.http.put(POST_NEW_POST + '/' + idPost, data, this.HTTP_OPTIONS)
  }

  public deletePost(idPost: string) {
    return this.http.delete(POST_NEW_POST + '/' + idPost)
  }

}
