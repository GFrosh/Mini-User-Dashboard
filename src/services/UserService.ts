import type { User } from "../types/user";

export async function fetchUsers(): Promise<User[]> {
    return [
        { id: 1, name: "Gideon", age: 20 },
        { id: 2, name: "Arya", age: 19 }
    ];
}
