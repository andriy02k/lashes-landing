export function PayButton() {
  return (
    <a
      href="https://secure.wayforpay.com/button/b65cfd1b6fbc0"
      className="inline-block w-[256px] h-[54px] rounded-[14px] bg-[#0488cd] shadow-md text-center no-underline transition-opacity duration-200 hover:opacity-80"
      style={{
        boxShadow: "3px 2px 8px rgba(71,66,66,0.22)",
        padding: "16px",
      }}
    >
      <span className="font-bold text-[14px] leading-[18px] align-middle text-white font-[Verdana,Arial,sans-serif]">
        Оплатити
      </span>
    </a>
  );
}
