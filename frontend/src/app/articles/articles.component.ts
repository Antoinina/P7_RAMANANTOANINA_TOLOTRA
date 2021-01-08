import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  templateArticles = [
    {
        _id: '1',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/1.jpg?v=1588688635',
        name: 'Jean R.',
        job: 'Assistant Directeur', 
        publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
        publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        likes: 18,
        comments: 4,
        userComments: []
    },
    {
        _id: '4',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2430/8823/files/concept-2.jpg?v=1588628194',
        name: 'Stephane P.',
        job: 'Infographiste', 
        publication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        likes: 2,
        comments: 1,
        userComments: []
    }
];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
