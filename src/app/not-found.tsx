import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-primary">
      <h1 className="text-9xl text-background font-semibold">404</h1>
      <p className="text-3xl text-background font-medium">
        Такої сторінки не існує
      </p>
      <Link
        href="/"
        className="group relative flex items-center gap-2 text-xl text-background font-medium"
      >
        <ArrowLeft className="mb-0.5" />
        <span>На головну</span>
        <span className="absolute bottom-0 left-7 h-[2px] w-0 bg-background transition-all duration-300 group-hover:w-[calc(100%-1.75rem)]"></span>
      </Link>
    </main>
  );
}
