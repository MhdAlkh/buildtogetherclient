import { Component, Inject, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Position } from 'src/app/shared/models/position';
import { PositionService } from 'src/app/core/service/position.service';
import { ApplicationService } from 'src/app/core/service/application.service';

@Component({
  selector: 'app-project-apply',
  templateUrl: './project-apply.component.html',
  styleUrls: ['./project-apply.component.scss']
})
export class ProjectApplyComponent implements OnInit {

  selectedValue: string;
  project: Project;
  positions: Position [];
  openedPositions: string [];
  summary: string;
  position: string;
  comment: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private positionService: PositionService, private applicationService: ApplicationService) { }

  async ngOnInit(): Promise<void> {
    this.project= this.data.project ;
    this.positions= await this.positionService.getProjectPositions(this.project.id);
    this.positions= this.positions.filter(p => p.status=="Open");
    this.openedPositions=[...new Set( this.positions.map(obj => obj.title)) ];
  }

  async onSubmit(): Promise<void> {
    console.log(this.position);
    console.log(this.comment);
    const id= this.positions.find(e => e.title==this.position);
    console.log(id);
    await this.applicationService.addApplication(id.id, this.comment);
    
  }


}
