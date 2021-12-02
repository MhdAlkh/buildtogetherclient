import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Interest } from 'src/app/shared/models/interest.model';
import {FormControl, Validators} from '@angular/forms';
import { InterestService } from 'src/app/core/service/interest.service';
import { PostService } from 'src/app/core/service/post.service';
import { Post } from 'src/app/shared/models/post.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  interests: Interest[] = [];
  newInterest: Interest;
  longText = `Experienced Frontend engineer with interest in data science, have more than four years of working in web projects.`;
  isEdit : boolean =false;
  isEditImage : boolean =false;
  user: User;
  lastPost: Post;
  image;

  async add(event: MatChipInputEvent): Promise<void> {
    const value = (event.value || '').trim();

    // Add our interest
    if (value) {
      this.newInterest= {id: this.interests.length + 1 , tag: value};
      this.interests.push(await this.interestService.addUserInterest(this.user.id, this.newInterest));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  async remove(interest: Interest):  Promise<void> {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
    await this.interestService.removeUserInterest(this.user.id, interest.id);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private sanitizer: DomSanitizer, private userService: UserService, private interestService: InterestService, private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    this.user=await this.userService.getUser();
    this.interests=await this.interestService.getUserInterests(this.user.id);
    this.lastPost=await this.postService.getlastPost();
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.userService.getImage()));
  }

  async onSubmit(): Promise<void> {
    this.isEdit= false;
    this.user=await this.userService.updateUser(this.user.id, this.user)
  }

  async onSubmitFile(form: FormData): Promise<void> {    
    this.isEditImage= false;
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.userService.uploadImage(form)));
  }

}
