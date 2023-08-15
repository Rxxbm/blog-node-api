export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    typeUser: number;
    createdAt: Date;
    updateAt: Date;
}