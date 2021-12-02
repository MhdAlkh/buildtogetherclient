import {Component, OnInit, NgZone} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { InvestService } from 'src/app/core/service/invest.service';
import { PositionService } from 'src/app/core/service/position.service';
import { ProjectService } from 'src/app/core/service/project.service';
import { UserService } from 'src/app/core/service/user.service';
import { Position } from 'src/app/shared/models/position';
import { User } from 'src/app/shared/models/user.model';
import { Application } from 'src/app/shared/models/application';
import {Project} from "../../../../shared/models/project.model";
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ApplicationService } from 'src/app/core/service/application.service';
import { InvestorsDialogComponent } from '../investors-dialog/investors-dialog.component';

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.scss']
})
export class OwnerViewComponent implements OnInit {

  project: Project | null;
  name: string;
  text: string;
  goal: string;
  achievedPercent: number;
  position: Position;
  openedPositions: Position[];
  Positions: Position[];
  newPosition: Position;
  closedPositions: Position[];
  openedPositionsStr: string[];
  closedPositionsStr: string [];
  applications: Application[];
  positionsOfApplications: {};
  user: User;
  amount: number;
  achievedFund: number;
  isEdit : boolean =false;
  isEditImage : boolean =false;
  isEditFund: boolean = false;
  image;
  isEditPosition : boolean = false;
  projectImage;
  objectURL;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private readonly imageType : string = 'data:image/png;base64,'; 

  public isUserProject: boolean = false;

  countsOpen={};
  countsClosed={};


  constructor(private sanitizer: DomSanitizer, private applicationService: ApplicationService, private userService: UserService, private investService: InvestService, private positionService: PositionService, private projectService: ProjectService, private route: ActivatedRoute, public dialog: MatDialog, private ngZone: NgZone, private router: Router) { }

  async add(event: MatChipInputEvent): Promise<void> {
    const value = (event.value || '').trim();

    // Add our position
    if (value) {
      this.Positions.push(await this.positionService.addPosition(this.project.id, value));
      this.openedPositions = this.Positions.filter(p => p.status == "Open");
      this.countsOpen[value] = this.countsOpen[value] ? this.countsOpen[value] + 1 : 1;
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  async remove(position: Position): Promise<void> {
    const index = this.Positions.indexOf(position);

    if (index >= 0) {
      let removed = this.Positions.splice(index, 1);
      this.openedPositions = this.Positions.filter(p => p.status == "Open");
      delete this.countsOpen[removed[0].title]; 
    }
    await this.positionService.removePosition(position.id);
  }


  setachievedPercent() {
    this.achievedPercent = Math.round((Number(this.achievedFund) / Number(this.project.totalFund)) * 100);
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser();
    this.project = await this.projectService.getProject(this.route.snapshot.paramMap.get('id'));
    this.achievedFund = Number(this.project.achievedFund);
    this.name = this.project.name;
    this.text = this.project.summary;
    this.goal = this.project.totalFund + " $";
    this.setachievedPercent();
    this.Positions = await this.positionService.getProjectPositions(this.project.id);
    this.openedPositions = this.Positions.filter(p => p.status == "Open");
    this.openedPositionsStr=[...new Set( this.openedPositions.map(obj => obj.title)) ];
    this.closedPositions = this.Positions.filter(p => p.status == "Closed");
    this.closedPositionsStr=[...new Set( this.closedPositions.map(obj => obj.title)) ];
    this.applications = await this.applicationService.getProjectApplications(this.project.id);
    this.applications = this.applications.filter(p => p.status == "inProcess");
    for(const position of this.openedPositions){
      this.countsOpen[position.title] = this.countsOpen[position.title] ? this.countsOpen[position.title] + 1 : 1;
    }
    for(const position of this.closedPositions){
      this.countsClosed[position.title] = this.countsClosed[position.title] ? this.countsClosed[position.title] + 1 : 1;
    }
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.projectService.getImage(this.project.id)));

    if (this.projectService.isUserProject(+this.route.snapshot.paramMap.get('id'))) {
      this.isUserProject = true;
    }

  }

  openDialog() {
    this.dialog.open(InvestorsDialogComponent, { data: {project: this.project}});
    
  }


  public findProjectTitle(id: number): any {
    for(const position of this.Positions){
      if(id == position.id) return position.title;
    }
  }

  private closePosition(id: number, status: string): void {
    for(const position of this.Positions){
      if(id == position.id){
        position.status = "Closed";
        if(status == "accepted") this.countsClosed[position.title] = this.countsClosed[position.title] ? this.countsClosed[position.title] + 1 : 1;
        if(this.countsOpen[position.title] > 1) this.countsClosed[position.title] - 1;
        else delete this.countsOpen[position.title]; 
      }
    }
  }
  
  public modifyProject(): void {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'edit-project', this.route.snapshot.paramMap.get('id')])
    })
  }

  async acceptApplication(application: Application): Promise<void> {
    application.status = "accepted";
    this.applicationService.updateApplication(application.id, application);
    this.applications = this.applications.filter(p => p.status == "inProcess");
    this.closePosition(application.position_id, application.status);
  }

  async rejectApplication(application: Application): Promise<void> {
    application.status = "rejected";
    this.applicationService.updateApplication(application.id, application);
    this.applications = this.applications.filter(p => p.status == "inProcess");
    this.closePosition(application.position_id, application.status);
  }

  async onSubmit(): Promise<void> {
    this.isEdit= false;
    this.project=await this.projectService.updateProject(this.project.id, this.project)
  }

  async onSubmitFile(form: FormData): Promise<void> {    
    this.isEditImage= false;
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.projectService.uploadImage(form, this.project.id)));
  }

  async onSubmitFund(): Promise<void> {
    this.isEditFund= false;
    this.project=await this.projectService.updateProject(this.project.id, this.project)
  }

  async onSubmitPosition(): Promise<void> {
    this.isEditPosition= false;
  }

}
