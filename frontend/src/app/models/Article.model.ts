export class Article {
    id? : any;
    publication? : string;
    likes? : number;
    comments? : number;
    usercomments? : string[];
    date_published? : string;
    userId : number;
    likecountByTheUser?: number;
    commentsCount?: number;
}