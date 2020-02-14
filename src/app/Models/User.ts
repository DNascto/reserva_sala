export class User {
    id: number;
    name: string;
    password: string;
    accessLevel: number;
    immediatlyApprovation: boolean;
    cpf: number;
    nickname: string;

    constructor(name: string, password: string, accessLevel: number, immediatlyApprovation: boolean, id?: number,
        cpf?: number, nickname?: string) {
        this.name = name;
        this.password = password;
        this.accessLevel = accessLevel;
        this.immediatlyApprovation = immediatlyApprovation;        
        this.id = id;
        this.cpf = cpf;
        this.nickname = nickname;
    }
}
