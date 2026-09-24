export type User = {
    id: number;
    name: string;
    no_hp: number | string;
    avatar?: string;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};
