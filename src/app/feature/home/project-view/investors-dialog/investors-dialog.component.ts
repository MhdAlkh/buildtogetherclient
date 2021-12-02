import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InvestService } from 'src/app/core/service/invest.service';
import { Invest } from 'src/app/shared/models/invest';
import { Project } from 'src/app/shared/models/project.model';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-investors-dialog',
  templateUrl: './investors-dialog.component.html',
  styleUrls: ['./investors-dialog.component.scss']
})
export class InvestorsDialogComponent implements OnInit {

  investments: Invest[];
  project: Project;
  invests: {};
  user: User;
  full_name: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private investService: InvestService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.project = this.data.project;
    this.investments = await this.investService.getProjectInvestments(this.project.id);
    for(const investment of this.investments){
      this.user = await this.userService.getOtherUser(investment.user_id);
      this.full_name = this.user.first_name + this.user.last_name;
      this.invests[this.full_name] = this.invests[this.full_name] ? this.invests[this.full_name] + investment.amount : investment.amount; 
    }
  }


}
