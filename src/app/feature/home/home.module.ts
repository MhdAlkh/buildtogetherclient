import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { PublicProjectsComponent } from './public-projects/public-projects.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { PostThumbnailComponent } from './posts/post-thumbnail/post-thumbnail.component';
import { ProjectThumbnailComponent } from './public-projects/project-thumbnail/project-thumbnail.component';
import {MatInputModule} from '@angular/material/input';
import { CreateProjectComponent } from './public-projects/create-project/create-project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectApplyComponent } from './project-apply/project-apply.component';
import {MatSelectModule} from '@angular/material/select';
import { OwnerViewComponent } from './project-view/owner-view/owner-view.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SearchComponent } from './search/search.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import { InvestorsDialogComponent } from './project-view/investors-dialog/investors-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    PostsComponent,
    PublicProjectsComponent,
    UserProfileComponent,
    PostThumbnailComponent,
    ProjectThumbnailComponent,
    CreateProjectComponent,
    ProjectViewComponent,
    ProjectApplyComponent,
    OwnerViewComponent,
    CreatePostComponent,
    SearchComponent,
    InvestorsDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule.forRoot(),
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTreeModule
  ]
})
export class HomeModule { }
