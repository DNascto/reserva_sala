export class User {
    id: string;
    name: string;
    nickname: string;
    cpf: string;
    password: string;
    company: string;
    accessLevel: number;
    immediatlyApprovation: boolean;

    createUser(
        name: string, password: string, accessLevel: number, immediatlyApprovation: boolean,
        company: string, cpf?: string, nickname?: string, id?: string): User {
        const user = new User();
        user.id = id;
        user.name = name;
        user.nickname = nickname;
        user.cpf = cpf;
        user.password = password;
        user.company = company;
        user.accessLevel = accessLevel;
        user.immediatlyApprovation = immediatlyApprovation;
        return user;
    }
}
