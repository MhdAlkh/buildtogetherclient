import {Component, Input, OnInit, NgZone} from '@angular/core';
import {Project} from "../../../models/project.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-project-thumnail',
  templateUrl: './menu-project-thumnail.component.html',
  styleUrls: ['./menu-project-thumnail.component.scss']
})
export class MenuProjectThumnailComponent implements OnInit {

  @Input() project: Project | null = null

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
  }

  public goToProject(): void {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'project-view', this.project.id ])
    })
  }

}
