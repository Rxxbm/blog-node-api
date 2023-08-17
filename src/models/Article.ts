export interface Article {
    id: number;
    title: string;
    body: string;
    category: string;
    userID: number;
    createdAt: Date;
    updatedAt: Date;
}