import {Component, NgZone, OnInit} from '@angular/core';
import {PostService} from "../../../core/service/post.service";
import {Post} from "../../../shared/models/post.model";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  allPosts: Post[] | null = null
  userPosts: Post[] | null = null

  constructor(private postService: PostService, private ngZone: NgZone, private router: Router) {
    this.postService.allPosts$.subscribe(posts => {
      this.allPosts = posts;
    })

    this.postService.userPosts$.subscribe(posts => {
      this.userPosts = posts
    })
  }

  ngOnInit(): void {}

  public createNewPost(): void {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'create-post'])
    })
  }

}
