import type { User } from "../types/user";

export async function fetchUsers(): Promise<User[]> {
    return [
        { id: 1, name: "Gideon", age: 20 },
        { id: 2, name: "Arya", age: 19 },
        { id: 3, name: "Noah", age: 27 },
        { id: 4, name: "Camila", age: 24 },
        { id: 5, name: "Ravi", age: 31 },
        { id: 6, name: "Mina", age: 22 },
        { id: 7, name: "Jordan", age: 29 },
        { id: 8, name: "Aisha", age: 35 },
        { id: 9, name: "Soren", age: 41 },
        { id: 10, name: "Lucia", age: 26 },
        { id: 11, name: "Ethan", age: 33 },
        { id: 12, name: "Priya", age: 38 },
        { id: 13, name: "Mateo", age: 44 },
        { id: 14, name: "Zara", age: 21 },
        { id: 15, name: "Ibrahim", age: 30 },
        { id: 16, name: "Nia", age: 28 },
        { id: 17, name: "Leo", age: 23 },
        { id: 18, name: "Hana", age: 36 }
    ];
}
