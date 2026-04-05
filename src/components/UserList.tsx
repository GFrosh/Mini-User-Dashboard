import { useEffect, useMemo, useState } from "react";
import type { User } from "../types/user";
import UserCard from "./UserCard";
import { UserDetail } from "./UserDetail";

export function UserList({ users }: { users: User[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [query, setQuery] = useState("");
    const [ageLimit, setAgeLimit] = useState(99);

    const datasetYoungestAge = useMemo(() => {
        if (users.length === 0) {
            return 0;
        }

        return Math.min(...users.map((user) => user.age));
    }, [users]);

    const datasetOldestAge = useMemo(() => {
        if (users.length === 0) {
            return 0;
        }

        return Math.max(...users.map((user) => user.age));
    }, [users]);

    useEffect(() => {
        if (datasetOldestAge > 0) {
            setAgeLimit(datasetOldestAge);
        }
    }, [datasetOldestAge]);

    const filteredUsers = useMemo(
        () => users.filter((user) => {
            const queryMatch = user.name.toLowerCase().includes(query.toLowerCase());
            const ageMatch = user.age <= ageLimit;
            return queryMatch && ageMatch;
        }),
        [users, query, ageLimit]
    );

    const selectedUser = useMemo(() => {
        if (filteredUsers.length === 0) {
            return undefined;
        }

        if (selectedId === null) {
            return filteredUsers[0];
        }

        return filteredUsers.find((user) => user.id === selectedId) ?? filteredUsers[0];
    }, [filteredUsers, selectedId]);

    const averageAge = useMemo(() => {
        if (filteredUsers.length === 0) {
            return 0;
        }

        const total = filteredUsers.reduce((sum, user) => sum + user.age, 0);
        return total / filteredUsers.length;
    }, [filteredUsers]);

    const youngestAge = useMemo(() => {
        if (filteredUsers.length === 0) {
            return 0;
        }

        return Math.min(...filteredUsers.map((user) => user.age));
    }, [filteredUsers]);

    const oldestAge = useMemo(() => {
        if (filteredUsers.length === 0) {
            return 0;
        }

        return Math.max(...filteredUsers.map((user) => user.age));
    }, [filteredUsers]);

    const ageShare = useMemo(() => {
        if (!selectedUser || oldestAge === 0) {
            return 0;
        }

        return (selectedUser.age / oldestAge) * 100;
    }, [selectedUser, oldestAge]);

    const ageBuckets = useMemo(() => {
        const buckets = [
            { label: "Under 20", count: 0 },
            { label: "20 - 29", count: 0 },
            { label: "30 - 39", count: 0 },
            { label: "40+", count: 0 }
        ];

        for (const user of filteredUsers) {
            if (user.age < 20) {
                buckets[0].count += 1;
            } else if (user.age < 30) {
                buckets[1].count += 1;
            } else if (user.age < 40) {
                buckets[2].count += 1;
            } else {
                buckets[3].count += 1;
            }
        }

        return buckets;
    }, [filteredUsers]);

    const maxBucket = useMemo(
        () => Math.max(1, ...ageBuckets.map((bucket) => bucket.count)),
        [ageBuckets]
    );

    const ageTrend = useMemo(
        () => [...filteredUsers].sort((a, b) => a.age - b.age),
        [filteredUsers]
    );

    return (
        <main className="dashboard-shell">
            <section className="dashboard-hero">
                <p className="dashboard-hero__kicker">Practice Project</p>
                <h1>User Snapshot Dashboard</h1>
                <p className="dashboard-hero__subtitle">
                    A polished front-end view for scanning users, checking age distribution,
                    and previewing a selected profile.
                </p>

                <div className="dashboard-controls">
                    <label className="age-filter" htmlFor="age-limit">
                        <span>Age cap: {ageLimit}</span>
                        <input
                            id="age-limit"
                            type="range"
                            min={datasetYoungestAge}
                            max={datasetOldestAge}
                            step={1}
                            value={ageLimit}
                            onChange={(event) => setAgeLimit(Number(event.target.value))}
                        />
                    </label>
                    <p>
                        Showing {filteredUsers.length} of {users.length} users
                    </p>
                </div>
            </section>

            <section className="stats-grid" aria-label="User stats">
                <article className="stat-card">
                    <p>Visible Users</p>
                    <strong>{filteredUsers.length}</strong>
                </article>
                <article className="stat-card">
                    <p>Average Age</p>
                    <strong>{averageAge.toFixed(1)}</strong>
                </article>
                <article className="stat-card">
                    <p>Age Range</p>
                    <strong>
                        {filteredUsers.length === 0 ? "-" : `${youngestAge} - ${oldestAge}`}
                    </strong>
                </article>
            </section>

            <section className="dashboard-layout">
                <aside className="roster-panel">
                    <div className="roster-panel__header">
                        <h2>Roster</h2>
                        <input
                            type="search"
                            placeholder="Search by name"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>

                    <div className="roster-list">
                        {filteredUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                isActive={selectedUser?.id === user.id}
                                onSelect={setSelectedId}
                            />
                        ))}

                        {filteredUsers.length === 0 && (
                            <p className="empty-message">No users match that search.</p>
                        )}
                    </div>
                </aside>

                <UserDetail user={selectedUser} ageShare={ageShare} />
            </section>

            <section className="insights-grid" aria-label="Extra visualizations">
                <article className="viz-card">
                    <header>
                        <h2>Age Buckets</h2>
                        <p>Distribution by group</p>
                    </header>

                    <div className="bucket-list">
                        {ageBuckets.map((bucket) => {
                            const width = (bucket.count / maxBucket) * 100;

                            return (
                                <div className="bucket-row" key={bucket.label}>
                                    <span>{bucket.label}</span>
                                    <div className="bucket-track" aria-hidden="true">
                                        <div className="bucket-fill" style={{ width: `${width}%` }} />
                                    </div>
                                    <strong>{bucket.count}</strong>
                                </div>
                            );
                        })}
                    </div>
                </article>

                <article className="viz-card">
                    <header>
                        <h2>Age Trend Strip</h2>
                        <p>Sorted youngest to oldest</p>
                    </header>

                    <div className="trend-strip" role="img" aria-label="Age trend by user">
                        {ageTrend.map((user) => {
                            const height = oldestAge === 0 ? 20 : (user.age / oldestAge) * 100;

                            return (
                                <div className="trend-point" key={user.id} title={`${user.name}: ${user.age}`}>
                                    <div style={{ height: `${Math.max(20, height)}%` }} />
                                    <small>{user.name}</small>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>
        </main>
    );
}
