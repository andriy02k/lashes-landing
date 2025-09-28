import Image from "next/image";
import Link from "next/link";
import { PayButton } from "../PayButton/PayButton";
import { BlurryCircle } from "@/shared/components/BlurryCircle/BlurryCircle";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white font-sans overflow-hidden">
      {/* Бліки */}
      <BlurryCircle
        size={500}
        color="#f4e4e5"
        blur={180}
        style={{ top: "-150px", left: "-150px" }}
      />
      <BlurryCircle
        size={500}
        color="#f4e4e5"
        blur={180}
        style={{ bottom: "700px", left: "-150px" }}
      />
      <BlurryCircle
        size={500}
        color="#c69e71"
        blur={180}
        style={{ bottom: "1500px", right: "-50px" }}
      />
      <BlurryCircle
        size={400}
        color="#c69e71"
        blur={160}
        style={{ bottom: "-120px", right: "-100px" }}
      />

      {/* Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <Image
            src="/logo/logo-gold-horizontal.png"
            width={400}
            height={160}
            alt="Alona Polonets"
            className="mx-auto mb-6"
          />
          <h1 className="text-gold-gradient text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Онлайн-посібник базового курсу з нарощування вій
          </h1>
          <p className="text-lg md:text-xl text-background mb-8">
            Від переможниці чемпіонату у категорії «Експерт» та викладача з
            понад 5-річним досвідом.
          </p>
          <Link
            href="#payment"
            className="inline-block bg-secondary text-black text-xl px-8 py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            Придбати курс
          </Link>
        </div>
      </section>

      {/* Про автора */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center bg-white/5 backdrop-blur-md rounded-3xl p-10 shadow-lg">
          <Image
            src="https://mapi7.com/assets/images/blog/idei-dlya-foto-v-pole/idei-dlya-foto-v-pole-3.jpg"
            alt="Author"
            width={500}
            height={500}
            className="rounded-3xl object-cover shadow-2xl"
          />
          <div>
            <h2 className="text-gold-gradient text-3xl md:text-4xl font-bold mb-6">
              Привіт, я Альона!
            </h2>
            <p className="mb-4 text-background0">
              Майстер, викладач та переможниця чемпіонату у категорії «Експерт».
              Я знаю, як це — губитися після курсів, боятися клієнтів та
              сумніватися в собі.
            </p>
            <p className="mb-8 text-background">
              Саме тому я створила цей онлайн-посібник — щоб дати впевненість і
              правильну базу.
            </p>
            <Link
              href="#payment"
              className="inline-block bg-secondary text-background text-lg px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
            >
              Отримати доступ
            </Link>
          </div>
        </div>
      </section>

      {/* Про курс */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center bg-white/5 backdrop-blur-md rounded-3xl p-12 shadow-lg">
          <h2 className="text-gold-gradient text-3xl md:text-4xl font-bold mb-6">
            Що дасть цей курс?
          </h2>
          <p className="text-xl mb-14 max-w-2xl mx-auto text-background">
            Це не просто конспект — це структурована база знань онлайн, яка
            економить роки пошуків і дає фундамент для впевненого старту.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Чітка теорія та пояснення без складних термінів",
              "Алгоритми, які допомагають не губитися на практиці",
              "Матеріал, що відповідає критеріям чемпіонатів",
            ].map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-[2px] bg-gradient-to-r from-gold via-white to-gold"
              >
                <div className="rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-8">
                  <p className="text-background">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center bg-white/5 backdrop-blur-lg rounded-3xl p-12 shadow-lg">
          <h2 className="text-gold-gradient text-3xl md:text-4xl font-bold mb-10">
            Цей посібник підійде для:
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "✨ Майстрів-початківців, які хочуть почати впевнено",
              "✨ Тих, хто планує пройти курси, але ще сумнівається",
              "✨ Майстрів, які готуються викладати",
            ].map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-[2px] bg-gradient-to-r from-gold via-white to-gold shadow-lg"
              >
                <div className="rounded-2xl bg-gradient-to-b from-foreground to-foreground/90 p-8">
                  <p className="text-gray-200">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Оплата */}
      <section id="payment" className="relative py-32 px-6">
        <div className="relative max-w-3xl mx-auto text-center">
          {/* Градієнтний бордер через псевдоелемент */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold via-white to-gold -z-10"></div>

          {/* Внутрішній блок */}
          <div className="relative rounded-3xl bg-white/5 backdrop-blur-md p-12 shadow-xl">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold via-white to-gold">
              Готова почати?
            </h2>
            <p className="mb-10 text-lg text-background">
              Забери доступ до онлайн-посібника вже сьогодні і отримай
              впевненість у своїй професії.
            </p>
            <PayButton />
          </div>
        </div>

        <Image
          src="/logo/logo-gold-horizontal.png"
          width={400}
          height={160}
          alt="Alona Polonets"
          className="mx-auto my-6"
        />
      </section>
    </div>
  );
}
