import { AiOutlineArrowRight } from "react-icons/ai";
import RevealOnScroll from "../RevealOnScroll";
import { platforms } from "./contentData";

export default function PlatformGrid() {
  return (
    <section className="max-w-6xl px-5 mx-auto mt-16 sm:mt-20">
      <RevealOnScroll revealClass="blog-rise" className="mb-8 text-center">
        <h2
          style={{ fontFeatureSettings: "'case' on" }}
          className="text-2xl font-bold sm:text-3xl text-lingo-black"
        >
          გამოგვყევი <span className="text-lingo-green">ყველგან</span>
        </h2>
        <p className="max-w-xl mx-auto mt-3 text-[15px] text-[#6b7280]">
          სადაც არ უნდა იყო, ჩვენი ინგლისური კონტენტი შენთანაა — აირჩიე
          პლატფორმა და შემოგვიერთდი.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {platforms.map((p, i) => (
          <RevealOnScroll key={p.name} revealClass="review-rise" delay={i * 90}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col h-full p-5 overflow-hidden transition-all duration-300 group rounded-3xl bg-[#fff] border border-[#eceef2] shadow-[0_14px_34px_-18px_rgba(41,49,66,0.28)] hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-20px_rgba(41,49,66,0.36)]"
            >
              <span
                className="inline-flex items-center justify-center mb-4 text-2xl text-[#fff] transition-transform duration-300 w-14 h-14 rounded-2xl shrink-0 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
              >
                {p.icon}
              </span>
              <div className="text-lg font-bold text-lingo-black">{p.name}</div>
              <div className="text-[13px] font-semibold text-lingo-green">
                {p.handle}
              </div>
              <p className="mt-2 text-[13px] leading-snug text-[#6b7280] flex-1">
                {p.blurb}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-lingo-black transition-colors group-hover:text-lingo-green">
                გამოგვყევი
                <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
