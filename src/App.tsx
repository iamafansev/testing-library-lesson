import { useEffect } from "react";

import {useFetchUsers} from "@/hooks/useFetchUsers";

import styles from "./App.module.css";

export default function App() {
  const [fetchUsers, {data, state, fetchMoreUsers}] = useFetchUsers();

  useEffect(() => {
    fetchUsers({quantity: 20});
  }, []);

  return (
    <main className={styles.main}>
      <h1>Users</h1>
    </main>
  );
}
