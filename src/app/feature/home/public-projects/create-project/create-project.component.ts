import { Component, NgZone, OnInit } from '@angular/core';
import {PROJECT_CATEGORY, PTYPE} from "../../../../shared/models/project.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/service/user.service";
import {ProjectService} from "../../../../core/service/project.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  // createNewProject(name: string, summary: string, ownerId: number, pType: PTYPE, category: PROJECT_CATEGORY, totalFund: number)

  public isCreationOfProject: boolean = true;

  public editProjectId: number | null = null;
  public hackatonIsChoosen: boolean = false;

  public P_TYPES: string[] = ['longTerm', 'hackathon'];
  public PROJECT_CATEGORIES: string[] = ['technology', 'marketing','education','finance','business'];

  public projectForm: FormGroup;

  private userId: number | null;

  public error_message: string = ''

  public statusCreation: boolean = false;  // False for the creation of a project, True for the valid page

  constructor(private ngZone: NgZone, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private projectService: ProjectService) {
    this.projectForm = this.formBuilder.group({
      project_name: ["", [Validators.required]],
      project_summary: ["", [Validators.required, Validators.min(50)]],
      project_hackathon_start_date: [""],
      project_hackathon_end_date: [""],
      project_type: ["", [Validators.required]],
      project_category: ["", [Validators.required]],
      project_totalfund: ["", [Validators.required]],
    });


  }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this.editProjectId = +this.route.snapshot.paramMap.get('id');
      this.isCreationOfProject = false;

      this.projectService.getProject(String(this.editProjectId)).then(project => {
        console.log(project.ptype)
        this.projectForm.controls.project_name.setValue(project.name)
        this.projectForm.controls.project_summary.setValue(project.summary)
        this.fetchProjectType(project.ptype)
        this.fetchProjectCategory(project.category)
        this.projectForm.controls.project_totalfund.setValue(+project.totalFund)
      })
    }

    this.userService.currentUser$.subscribe(data => {
      if (data) {
        this.userId = data.id
      }
    })
  }



  public fetchProjectType(event: any): void {
    this.projectForm.controls.project_type.setValue(event);


    this.hackatonIsChoosen = event === 'hackathon';

    console.log(this.hackatonIsChoosen)
  }

  public fetchProjectCategory(event: any): void {
    this.projectForm.controls.project_category.setValue(event);


  }

  public createProject(): void {
    console.log(this.projectForm.value)


    this.projectService.createNewProject(this.projectForm.value.project_name, this.projectForm.value.project_summary, this.userId, this.projectForm.value.project_type, this.projectForm.value.project_category, this.projectForm.value.project_totalfund).subscribe(async data => {
      this.statusCreation = true;

      await this.projectService.initializeAllProjects()


      this.ngZone.run(() => {
        this.router.navigate(['home', 'public-projects'])
      })


    }, error => {
      this.error_message = "Problem, try later"
    })
  }

  public modifyProject(): void {

  }

}
