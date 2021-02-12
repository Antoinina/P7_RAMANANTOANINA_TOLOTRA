import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/articles.service';
import { Article } from '../models/Article.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  /*{
    _id: '1',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/1.jpg?v=1588688635',
    name: 'Jean R.',
    job: 'Assistant Directeur', 
    publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    likes: 15,
    comments: 4,
    userComments: []
},
{
    _id: '2',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/2.jpg?v=1588688688',
    name: 'Lucia M.',
    job: 'Stagiaire RH', 
    publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 6,
    comments: 2,
    userComments: []
},
{
    _id: '3',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/3.jpg?v=1588688750',
    name: 'Sonia B.',
    job: 'Community Manager', 
    publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    likes: 18,
    comments: 4,
    userComments: []
},
{
    _id: '4',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/concept-2.jpg?v=1588628194',
    name: 'Stephane P.',
    job: 'Infographiste', 
    publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    likes: 2,
    comments: 1,
    userComments: []
}*/

  /*articles: Article[];
  articleSub: Subscription;
  errorMsg: string;*/

  articles = null;


  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    /*this.articleSub = this.article.articles$
      .subscribe(
        (articles) => {
          this.articles = articles;
        },
        (error) => {
          this.errorMsg = JSON.stringify(error);
        }
      );
      this.article.getAll();*/

      this.articleService.getAll()
        .pipe(first())
        .subscribe(articles => this.articles = articles);
  }

  deleteArticle(id: string) {
    const article = this.articles.find(x => x.id === id);
    article.isDeleting = true;
    this.articleService.delete(id)
        .pipe(first())
        .subscribe(() => this.articles = this.articles.filter(x => x.id !== id));
}

  /*deleteArticle() {
    this.article.deleteArticle(this.article.id)
      .then(
        (response: { message : string}) => {
          console.log(response.message);
          this.router.navigate(['/articles']);
        }
      )
      .catch(
        (error) => {
          this.errorMsg = error.message;
          console.error(error);
        }
      );
  }*/

}
