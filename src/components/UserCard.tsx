import type { User } from "../types/user";

export default function UserCard({ user }: { user: User }) {
    return (
        <div>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
        </div>
    );
}