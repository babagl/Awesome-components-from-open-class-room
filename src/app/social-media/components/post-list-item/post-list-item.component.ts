import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../../model/post.model";
import {CommonModule, DatePipe, TitleCasePipe} from "@angular/common";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {CommentComponent} from "../../../shared/components/comment/comment.component";
import {ShortenPipes} from "../../../shared/pipes/shorten.pipes";
import {UsernamePipe} from "../../../shared/pipes/username.pipe";
import {TimeAgoPipe} from "../../../shared/pipes/timeAgo.pipe";
import {HighlightDirective} from "../../../shared/directives/highlight.directive";

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatCardImage,
    FormsModule,
    MatCardActions,
    CommentComponent,
    CommonModule,
    ShortenPipes,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{comment: string,postId: number}>();

  tempsUser: {firstName: string, lastName: string} = {firstName: "will", lastName: "Alexander"};

  onNewComment(comment: string) {
    this.postCommented.emit({comment: comment, postId: this.post.id})
  }
}
