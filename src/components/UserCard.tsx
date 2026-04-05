import type { User } from "../types/user";

type UserCardProps = {
    user: User;
    isActive: boolean;
    onSelect: (id: number) => void;
};

export default function UserCard({ user, isActive, onSelect }: UserCardProps) {
    return (
        <button
            type="button"
            className={`user-card ${isActive ? "user-card--active" : ""}`}
            onClick={() => onSelect(user.id)}
        >
            <div className="user-card__avatar" aria-hidden="true">
                {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="user-card__content">
                <h3>{user.name}</h3>
                <p>{user.age} years old</p>
            </div>
            <span className="user-card__badge">ID #{user.id}</span>
        </button>
    );
}