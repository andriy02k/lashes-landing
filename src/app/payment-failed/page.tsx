import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-6">
      <XCircle className="h-16 w-16 text-red-600 mb-4" />
      <h1 className="text-3xl font-semibold text-foreground">
        Оплата не пройшла
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Спробуйте ще раз, щоб отримати доступ до курсу.
      </p>

      <Link
        href="/#payment"
        className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 text-white font-medium hover:bg-red-700 transition-colors"
      >
        Спробувати ще раз
      </Link>
    </main>
  );
}
