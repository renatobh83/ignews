import { SingInButton } from "../SingInButton";
import styles from "./Header.module.scss";
export function Header() {
  return (
    <header className={styles.HeaderContainer}>
      <div className={styles.HeaderContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a href="#" className={styles.active}>
            Home
          </a>
          <a href="#">Posts</a>
        </nav>
        <SingInButton />
      </div>
    </header>
  );
}
