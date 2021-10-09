import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripejs";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();
  async function handlerSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }
    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handlerSubscribe}
    >
      Subscribe now
    </button>
  );
}
