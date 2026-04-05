import type { User } from "../types/user";

export function UserList({ users }: { users: User[] }) {
    return (
        <div>
            {users.map((user: any) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}
