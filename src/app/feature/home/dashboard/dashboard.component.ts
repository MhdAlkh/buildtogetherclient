import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/service/project.service';
import { UserService } from 'src/app/core/service/user.service';
import { InvestService } from 'src/app/core/service/invest.service';
import { Project } from 'src/app/shared/models/project.model';
import { User } from 'src/app/shared/models/user.model';
import { Invest } from 'src/app/shared/models/invest';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  followedProjects: Project[];
  invesedProjects: Project[] = [];
  userInvestements: Invest[];
  allProjects: Project[];
  sumInvestments: number = 0;
  amountByProject;

  constructor(private userService: UserService, private projectService: ProjectService, private invest: InvestService) {
    this.projectService.allProjects$.subscribe(data => {
      this.allProjects = data;
    });
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser();
    this.followedProjects = await this.projectService.getfollowedProjects(this.user.id);
    this.userInvestements = await this.invest.userInvestments(this.user.id);
    var helper = {};
    this.amountByProject = this.userInvestements.reduce(function (r, o) {
      var key = o.project_id;

      if (!helper[key]) {
        helper[key] = Object.assign({}, { project_id: o.project_id, amount: Number(o.amount) }); // create a copy of o
        r.push(helper[key]);
      } else {
        helper[key].amount += Number(o.amount);
      }

      return r;
    }, []);

    this.amountByProject.forEach(invesment => {
      this.invesedProjects.push(this.allProjects.find(x => x.id == invesment.project_id))
      this.sumInvestments += Number(invesment.amount);
    });

  }

}
