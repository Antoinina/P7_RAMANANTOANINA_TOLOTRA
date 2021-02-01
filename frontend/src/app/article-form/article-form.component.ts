import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from '../models/Article.model';
import { ArticleService } from '../services/articles.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  article: Article = {
    publication: '',
    likes: 0,
    comments: 0,
    date_published : Date()
  };

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form.value);
  }

  saveArticle(): void{
    const data = {
      publication: this.article.publication,
      likes: this.article.likes,
      comments: this.article.comments,
      date_published: this.article.date_published
    };

    this.articleService.createArticle(data)
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  templateArticleForm = [
    {
      imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/1.jpg?v=1588688635',
      name: 'Jean R.',
      job: 'Assistant Directeur'
    }
  ]

}
