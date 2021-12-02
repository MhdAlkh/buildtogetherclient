import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../core/service/user.service";
import {PostService} from "../../../../core/service/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private ngZone: NgZone, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private postService: PostService) {
    this.postForm = this.formBuilder.group({
      post_title: ["", [Validators.required]],
      post_content: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {}

  public createPost(): void {

    this.postService.createNewPost(this.postForm.value.post_title, this.postForm.value.post_content).subscribe(async data => {

      await this.postService.initializeAllPosts()

      this.ngZone.run(() => {
        this.router.navigate(['home', 'posts'])
      })
    })

  }
}
