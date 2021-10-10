import { ActiveLink } from "../LinkActive";
import { SingInButton } from "../SingInButton";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.HeaderContainer}>
      <div className={styles.HeaderContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SingInButton />
      </div>
    </header>
  );
}
