import {Component, OnInit, Input, NgZone} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { InvestService } from 'src/app/core/service/invest.service';
import { PositionService } from 'src/app/core/service/position.service';
import { ProjectService } from 'src/app/core/service/project.service';
import { UserService } from 'src/app/core/service/user.service';
import { Position } from 'src/app/shared/models/position';
import { User } from 'src/app/shared/models/user.model';
import {Project} from "../../../shared/models/project.model";
import { ProjectApplyComponent } from '../project-apply/project-apply.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  project: Project | null;
  name: string;
  text: string;
  goal: string;
  achievedPercent: number;
  openedPositions: Position[];
  Positions: Position[];
  closedPositions: Position[];
  openedPositionsStr: string[];
  closedPositionsStr: string [];
  user: User;
  amount: number;
  achievedFund: number;
  followstr: string;
  followedProjects: Project[];
  image;
  public isUserProject: boolean = false;
  countsOpen={};
  countsClosed={};


  constructor(private userService: UserService, private investService: InvestService, private positionService: PositionService, private projectService: ProjectService, private route: ActivatedRoute, public dialog: MatDialog, private sanitizer: DomSanitizer) { }


  setachievedPercent() {
    this.achievedPercent = Math.round((Number(this.achievedFund) / Number(this.project.totalFund)) * 100);
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser();
    this.project = await this.projectService.getProject(this.route.snapshot.paramMap.get('id'));
    if (this.projectService.isUserProject(+this.route.snapshot.paramMap.get('id'))) {
      this.isUserProject = true;
    }
    this.followedProjects = await this.projectService.getfollowedProjects(this.user.id);
    if (this.followedProjects.map(p => p.id).includes(this.project.id)) {
      this.followstr = "Unfollow";
    }
    else {
      this.followstr = "Follow";
    }
    this.achievedFund = Number(this.project.achievedFund);
    this.name = this.project.name;
    this.text = this.project.summary;
    this.goal = this.project.totalFund + " $";
    this.setachievedPercent();
    this.Positions = await this.positionService.getProjectPositions(this.project.id);
    this.openedPositions = this.Positions.filter(p => p.status == "Open");
    this.openedPositionsStr=[...new Set( this.openedPositions.map(obj => obj.title)) ];
    this.closedPositions = this.Positions.filter(p => p.status == "Closed");
    this.closedPositionsStr = [...new Set(this.closedPositions.map(obj => obj.title))];
    for(const position of this.openedPositions){
      this.countsOpen[position.title] = this.countsOpen[position.title] ? this.countsOpen[position.title] + 1 : 1;
    }
    for(const position of this.closedPositions){
      this.countsClosed[position.title] = this.countsClosed[position.title] ? this.countsClosed[position.title] + 1 : 1;
    }
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await this.projectService.getImage(this.project.id)));
  }


  openDialog() {
    const dialogRef = this.dialog.open(ProjectApplyComponent, { data: {project: this.project}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async invest(): Promise<void> {
    await this.investService.invest(this.user.id, this.project.id, this.amount);
    this.achievedFund = this.achievedFund + Number(this.amount);
    this.setachievedPercent();
  }

  async follow(): Promise<void> {
    if (this.followstr == "Follow") {
      await this.projectService.followProject(this.user.id, this.project.id);
      this.followstr = "Unfollow";
    }
    else {
      await this.projectService.unfollowProject(this.user.id, this.project.id);
      this.followstr = "Follow";
    }
  }

}
