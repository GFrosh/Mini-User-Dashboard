import { useState, useEffect } from 'react';
import { fetchUsers } from './services/UserService';
import { UserList } from './components/UserList';
import type { User } from './types/user';
import './App.css';



function App() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetchUsers().then(setUsers);
	}, []);

	return <UserList users={users} />
}

export default App;
