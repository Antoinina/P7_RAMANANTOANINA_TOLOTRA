import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form.value);
  }

  templateArticleForm = [
    {
      imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/1.jpg?v=1588688635',
      name: 'Jean R.',
      job: 'Assistant Directeur'
    }
  ]

}
