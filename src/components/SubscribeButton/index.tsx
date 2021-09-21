import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripejs";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  async function handlerSubscribe() {
    if (!session) {
      signIn("github");
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
