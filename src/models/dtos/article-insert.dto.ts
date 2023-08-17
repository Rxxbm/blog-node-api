export interface ArticleInsertDTO{
    title: string;
    body: string;
    category: string;
    userID?: number;
}