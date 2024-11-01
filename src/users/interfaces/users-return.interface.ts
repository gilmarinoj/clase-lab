import { UserGender } from "src/common/enums/gender.enum";
import { UserRole } from "src/common/enums/roles.enum";

export class UsersReturn{
    id: number;
    name: string;
    age: number;
    photo: string;
    email: string
    role: string;
    gender: string;
    isActive: boolean;
}