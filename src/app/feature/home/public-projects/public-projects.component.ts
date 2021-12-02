import {Component, NgZone, OnInit} from '@angular/core';
import {Project} from "../../../shared/models/project.model";
import {ProjectService} from "../../../core/service/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-public-projects',
  templateUrl: './public-projects.component.html',
  styleUrls: ['./public-projects.component.scss']
})
export class PublicProjectsComponent implements OnInit {

  allProjects: Project[] | null = null;
  userProjects: Project[] | null = null

  dispAllProjects: Project[] | null = null;

  filterHackaton = true;
  filterLongTerme = true;


  filterFinanceId = false;
  filterEducationId = false;
  filterBusinessId = false;
  filterMarcketingId = false;
  filterTechnologyId = false;

  constructor(private projectService: ProjectService, private ngZone: NgZone, private router: Router) {
    this.projectService.allProjects$.subscribe(data => {
      this.allProjects = data;
      this.dispAllProjects = data
    });

    this.projectService.userProjects$.subscribe(data => {
      this.userProjects = data;
    })
  }

  ngOnInit(): void {
  }



  public createNewProject() {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'create-project'])
    })
  }





  public filterPost(event: any) {
    this.filterPostByString(event.target.value);
  }

  private filterPostByString(value: string): void {

    if (value.length === 0) {
      this.dispAllProjects = this.allProjects;
    } else {
      this.dispAllProjects = [];

      this.allProjects.forEach(project => {
        const fullString = project.name + ' ' + project.summary;
        if (fullString.toLowerCase().includes(value.toLowerCase())) {
          this.dispAllProjects.push(project);
        }
      });
    }
  }



  public filterHackatonEvent() {
    if (this.filterHackaton) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.ptype === 'hackathon')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }

  public filterLongTermEvent() {
    if (this.filterLongTerme) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.ptype === 'longTerm')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }



  // technology', 'marketing','education','finance','business'
  public filterFinance(): void {
    if (!this.filterFinanceId) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.category === 'finance')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }
  public filterEducation(): void {
    if (!this.filterEducationId) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.category === 'education')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }
  public filterBusiness(): void {
    if (!this.filterBusinessId) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.category === 'business')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }
  public filterMarcketing(): void {
    if (!this.filterMarcketingId) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.category === 'marketing')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }
  public filterTechnology(): void {
    if (!this.filterTechnologyId) {
      this.dispAllProjects = this.dispAllProjects.filter(project => project.category === 'technology')
    } else {
      this.dispAllProjects = this.allProjects
    }
  }


}
