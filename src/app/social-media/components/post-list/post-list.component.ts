import {Component, OnInit} from '@angular/core';
import {PostListItemComponent} from "../post-list-item/post-list-item.component";
import {map, Observable} from "rxjs";
import {Post} from "../../model/post.model";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostListItemComponent,
    AsyncPipe
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{

  post$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute, private postService: PostsService) {
  }

  ngOnInit(): void {
    this.post$ = this.route.data.pipe(map(d=> d['posts']))
    console.log( this.post$)
  }


  onPostCommented(postCommented: { comment: string; postId: number }) {
    this.postService.addNewComment(postCommented);
  }
}
