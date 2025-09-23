import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-6">
      <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
      <h1 className="text-3xl font-semibold text-foreground">
        Оплата успішна!
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Перегляньте повідомлення на пошті, там ви знайдете посилання на курс.
      </p>
    </main>
  );
}
