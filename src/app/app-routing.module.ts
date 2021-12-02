import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./feature/page-not-found/page-not-found.component";
import {AuthGuard} from "./core/helper/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./feature/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import("./feature/home/home.module").then(m => m.HomeModule),
    // canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
