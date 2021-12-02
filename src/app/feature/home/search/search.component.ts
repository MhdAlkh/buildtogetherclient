import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/core/service/search.service';
import { Post } from 'src/app/shared/models/post.model';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchString: string;
  projects: Project[];
  posts: Post[];

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  async ngOnInit(): Promise<void> {
    this.searchString = this.route.snapshot.paramMap.get('string');
    this.projects = await this.searchService.searchProjects(this.searchString);
    this.posts = await this.searchService.searchPosts(this.searchString);
  }

}
