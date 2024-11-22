import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {Comment} from "../../../core/model/comment.model";
import {MatLine} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger, useAnimation
} from "@angular/animations";
import {TimeAgoPipe} from "../../pipes/timeAgo.pipe";
import {flashAnimation} from "../../animations/flash.animation";
import {slideAndFadeAnimation} from "../../animations/slide-and-fade.animation";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatLine,
    DatePipe,
    MatListSubheaderCssMatStyler,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    TimeAgoPipe,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  animations: [
    trigger('list',[
      transition(':enter',[
        query('@listItem',[
          stagger('50ms',[
            animateChild()
          ])
        ])
      ])

    ]),
    trigger('listItem',[
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1,
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgba(201,157,242)',
        'z-index': 2,
      })),
      transition('default => active',[
        animate('100ms ease-in-out')
      ]),
      transition('active => default',[
        animate('1000ms ease-in-out'),
      ]),
      transition(':enter', [
        query('.comment-text , .comment-date',[style({
          opacity: '0',
        })]),
        useAnimation(slideAndFadeAnimation,{
          params:{
            time:'1004ms',
            startColor: 'rgb(249,179,111)'
          }
        }),
        group([
          useAnimation(flashAnimation, {
            params: {
              time: '250ms',
              flashColor: 'rgba(201,157,242)'
            }
          }),
          query('.comment-text',[
            animate('250ms',style({
            opacity: '1',
          }))
        ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: '1',
            }))
          ])
        ]),
      ])
    ])
  ]
})
export class CommentComponent implements OnInit{
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCntrl!:FormControl
  listItemStateAnimation: 'active' | 'default' = "default";
  // animationState: {[key: number]: 'active' | 'default'} = {};
  animationStates: Record<number, 'active' | 'default'> = {}

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.commentCntrl = this.formBuilder.control('',[Validators.required, Validators.minLength(10)]);
    for (const index in this.comments) {
      this.animationStates[index] = 'default';

    }
  }

  onLeaveComment() {
    if (this.commentCntrl.valid){
      const maxId = Math.max(...this.comments.map(comment=> comment.id))
      this.comments.unshift({
        comment: this.commentCntrl.value,
        id: maxId +1,
        createdDate: new Date().toISOString(),
        userId: 1
      })
      console.log(maxId);
      this.newComment.emit(this.commentCntrl.value);
      this.commentCntrl.reset()
    }
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
