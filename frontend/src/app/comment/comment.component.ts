import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CommentService } from '../services/comments.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

import { User } from '../models/User.model';
import { Comment } from '../models/Comment.model';
import { I18nPluralPipe } from '@angular/common';
import { Article } from '../models/Article.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm: FormGroup;
  submitted = false;
  loading = false;
  comment: Comment;
  comments = null;
  currentUser;
  account;
  user: User;
  isShown = false;

  @Input() article: Article;

  constructor(private authService: AuthService,
    private commentService: CommentService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.account = this.authService.getAuthentifiedUser();
    this.currentUser = this.authService.getAuthentifiedUser();

    //Init the comment form
    this.commentForm = this.formBuilder.group({
      comments: ['', Validators.required]
    });

      // To show all comments for each article
      this.commentService.getByArticleId(this.article.id)
        .pipe(first())
        .subscribe(comments => this.comments = comments);


  }

  get f() { return this.commentForm.controls; }

  onSubmitComment() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }

    this.loading = true;

    this.commentService.publishComment({...this.commentForm.value, articleId: this.article.id})
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Publication réussie', { keepAfterRouteChange: true });
          this.router.navigate(['/articles'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteComment(id: any) {
    const comment = this.comments.find(x => x.id === id);
    comment.isDeleting = true;
    this.commentService.delete(id)
      .pipe(first())
      .subscribe(() => this.comments = this.comments.filter(x => x.id !== id));
  }

}
