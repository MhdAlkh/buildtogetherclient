import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../../core/service/auth.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../core/service/project.service";
import {Project} from "../../models/project.model";
import {UserService} from "../../../core/service/user.service";
import {User} from "../../models/user.model";
import {DomSanitizer} from "@angular/platform-browser";




@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  public userProjects: Project[] | null = null;
  public currentUser: User | null = null;
  searchString: string;

  public userImage;

  public MENU_OPTIONS = [
    {
      menu_name: 'Dashboard',
      icon: 'space_dashboard',
      is_selected: false,
      url: 'dashboard',
    },
    {
      menu_name: 'Posts',
      icon: 'feed',
      is_selected: false,
      url: 'posts',
    },
    {
      menu_name: 'Public Projects',
      icon: 'public',
      is_selected: true,
      url: 'public-projects',
    }
  ]






  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private ngZone: NgZone, private router: Router, private projectService: ProjectService, private userService: UserService) {

    // We take the userProjects from the backend
    this.projectService.userProjects$.subscribe(data => {
      this.userProjects = data;
      if (this.userProjects) {
        this.userProjects = this.userProjects.sort((a, b) => (a.updated_at > b.updated_at) ? 1 : -1).slice(0,3);
      }
    })

    this.userService.currentUser$.subscribe(data => {
      this.currentUser = data
      console.log(this.currentUser)
    })
  }

  async ngOnInit() {

    this.userImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.userService.getImage()));
  }








  public changeMenuPage(index: number): void {
    this.setAllMenuOptionsToFalse()
    this.MENU_OPTIONS[index].is_selected = true;

    this.ngZone.run(() => {
      this.router.navigate(['home', this.MENU_OPTIONS[index].url])
    })
  }



  public addNewProject(): void {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'create-project'])
    })
  }


  public goToUserProfil(): void {
    this.setAllMenuOptionsToFalse();
    this.ngZone.run(() => {
      this.router.navigate(['home', 'user-profile'])
    })
  }




  private setAllMenuOptionsToFalse(): void {
    this.MENU_OPTIONS.forEach(value => value.is_selected = false)
  }

  public disconnect(): void {
    this.authService.signOut();
  }


  search() {
    console.log(this.searchString);
    this.setAllMenuOptionsToFalse();
    this.ngZone.run(() => {
      this.router.navigate(['home', 'search', this.searchString]);
    })
  }


}
