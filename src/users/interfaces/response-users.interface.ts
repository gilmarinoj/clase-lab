import { UsersReturn } from "./users-return.interface";

export interface ResponseAllUsers{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: UsersReturn[];
}