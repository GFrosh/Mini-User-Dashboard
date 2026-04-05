import type { User } from "../types/user";

type UserDetailProps = {
	user?: User;
	ageShare: number;
};

export function UserDetail({ user, ageShare }: UserDetailProps) {
	if (!user) {
		return (
			<section className="detail-panel detail-panel--empty">
				<h2>Select a profile</h2>
				<p>Choose a user from the roster to inspect their details.</p>
			</section>
		);
	}

	return (
		<section className="detail-panel" aria-live="polite">
			<div className="detail-panel__top">
				<p className="detail-panel__eyebrow">User spotlight</p>
				<h2>{user.name}</h2>
			</div>

			<dl className="detail-grid">
				<div>
					<dt>User ID</dt>
					<dd>{user.id}</dd>
				</div>
				<div>
					<dt>Current age</dt>
					<dd>{user.age}</dd>
				</div>
				<div>
					<dt>Relative age</dt>
					<dd>{Math.round(ageShare)}%</dd>
				</div>
			</dl>

			<div className="age-meter" role="img" aria-label={`Age share ${Math.round(ageShare)} percent`}>
				<div className="age-meter__fill" style={{ width: `${ageShare}%` }} />
			</div>
		</section>
	);
}
