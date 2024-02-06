export interface UserWithoutId {
    name: string
    email: string
    phone: string
    password: string
}

export interface User extends UserWithoutId {
    id?: string
}