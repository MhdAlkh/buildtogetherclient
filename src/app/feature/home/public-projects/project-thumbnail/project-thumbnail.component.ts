import {Component, Input, OnInit, NgZone} from '@angular/core';
import {Project} from "../../../../shared/models/project.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.scss']
})
export class ProjectThumbnailComponent implements OnInit {

  @Input() project: Project | null
  @Input() callToAction: string = 'Discover'
  @Input() amount: number | null

  constructor(private ngZone: NgZone, private router: Router) {

  }

  ngOnInit(): void {


  }

  public goToProject(): void {
    this.ngZone.run(() => {
      this.router.navigate(['home', 'project-view', this.project.id ])
    })
  }

}
