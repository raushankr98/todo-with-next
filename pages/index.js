import Todo from "../components/todo";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Todo />
    </div>
  );
}
