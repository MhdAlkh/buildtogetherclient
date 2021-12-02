import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostsComponent} from "./posts/posts.component";
import {PublicProjectsComponent} from "./public-projects/public-projects.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {CreateProjectComponent} from "./public-projects/create-project/create-project.component";
import { ProjectViewComponent } from './project-view/project-view.component';
import {CreatePostComponent} from "./posts/create-post/create-post.component";
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "posts",
        component: PostsComponent,
      },
      {
        path: "create-post",
        component: CreatePostComponent,
      },
      {
        path: "public-projects",
        component: PublicProjectsComponent,
      },
      {
        path: "create-project",
        component: CreateProjectComponent,
      },
      {
        path: "edit-project/:id",
        component: CreateProjectComponent,
      },
      {
        path: "user-profile",
        component: UserProfileComponent,
      },
      {
        path: "project-view/:id",
        component: ProjectViewComponent,
      },
      {
        path: "search/:string",
        component: SearchComponent,
      },]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
