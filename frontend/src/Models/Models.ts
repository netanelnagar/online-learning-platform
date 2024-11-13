export interface IPlayCard {
    image: any;
    imageName: string;
    watch: boolean;
    outTheGame: boolean;
}


export interface IUser {
    username: string;
    email?: string;
    blocked?: boolean;
    _id?: string;
    password?: string;
    role: "admin" | "user";
    memoryGame: {
        bestTime: number;
        updated?: string;
    };
    salt?: string;
    imageName?: string;
    token?: string;
}

export interface IUsers {
    username: string;
    email?: string;
    blocked?: boolean;
    _id: string;
    role: "admin" | "user";
    memoryGame: {
        bestTime: number;
        updated?: string;
    };
    imageName?: string;
}