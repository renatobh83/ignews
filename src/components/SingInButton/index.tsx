import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, useSession, signOut } from "next-auth/client";

export function SingInButton() {
  const [session] = useSession();
  return session ? (
    <button type="button" className={styles.singInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX
        color="#737380"
        className={styles.closeIcon}
        onClick={() => signOut()}
      />
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sing in whit Github
    </button>
  );
}
