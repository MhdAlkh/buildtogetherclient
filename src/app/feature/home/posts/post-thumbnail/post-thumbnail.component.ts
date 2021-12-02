import {Component, Inject, Input, OnInit} from '@angular/core';
import {Post} from "../../../../shared/models/post.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../core/service/post.service";





@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.scss']
})
export class PostThumbnailComponent implements OnInit {

  @Input() post: Post | null = null;
  @Input() userPost: boolean = false;

  public callToAction: string = 'Edit Post';

  public modifyingPost: boolean = false;

  public postModificationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostService) {

  }

  ngOnInit(): void {

    this.postModificationForm = this.formBuilder.group({
      title: [this.post.title, [Validators.required]],
      description: [this.post.body, [Validators.required]]
    })
  }


  public editPost(): void {
    this.modifyingPost = !this.modifyingPost;

    if (this.modifyingPost) {
      this.callToAction = 'Validate Modifications'
    } else {
      this.callToAction = 'Edit Post'

      this.postService.editPost(String(this.post.id), this.postModificationForm.value.title, this.postModificationForm.value.description).subscribe(
        result => {
          console.log(result)

          this.postService.initializeAllPosts()
        }, error => {
          console.log(error)
        }
      )
    }
  }


  public deletePost(): void {
    this.postService.deletePost(String(this.post.id)).subscribe(result => {
      console.log(result);
      this.postService.initializeAllPosts();
    }, error => {
      console.log(error)
      }

    )
  }



}


