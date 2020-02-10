export class User {
    id: number;
    name: string;
    password: string;
    accessLevel: number;
    immediatlyApprovation: boolean;

    constructor(name: string, password: string, accessLevel: number, immediatlyApprovation: boolean, id?: number) {
        this.name = name;
        this.password = password;
        this.accessLevel = accessLevel;
        this.immediatlyApprovation = immediatlyApprovation;        
        this.id = id;
    }
}
