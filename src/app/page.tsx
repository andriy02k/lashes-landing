"use client";

import { Button } from "@/shared/components/Button/Button";
import { PayButton } from "@/widgets/PayButton/PayButton";

export default function Home() {
  return (
    <main>
      <section id="payment">
        <PayButton />
      </section>
      <Button
        onClick={async () => {
          try {
            const response = await fetch("/api/payment-callback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                merchantAccount: "lashes_landing_vercel_app",
                orderReference: "WFP-BTN-11332217-68d43fcb3bb58",
                merchantSignature: "6516cd6cd5f55bdfa6e75a03fc133b88",
                amount: 1,
                currency: "UAH",
                transactionStatus: "Approved",
                reasonCode: 1100,
                email: "your-email@example.com",
              }),
            });

            const data = await response.json();
            console.log("Callback response:", data);
            alert("Check console for response");
          } catch (err) {
            console.error("Error calling callback:", err);
          }
        }}
      >
        Test Callback Button
      </Button>
    </main>
  );
}
