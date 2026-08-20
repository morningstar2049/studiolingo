import RevealOnScroll from "../RevealOnScroll";
import TeamGrid from "./TeamGrid";

function TeamBanner() {
  return (
    <div className="flex flex-col mt-3 sm:mt-12">
      <div className="max-w-6xl px-5 mx-auto mb-12 text-center">
        <RevealOnScroll
          revealClass="team-line"
          className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-lingo-green"
        />
        <RevealOnScroll revealClass="team-rise" delay={220}>
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold text-lingo-black sm:text-4xl"
          >
            ჩვენი <span className="text-lingo-green">გუნდი</span>
          </h1>
          <p className="max-w-xl mx-auto mt-3 text-[15px] text-[#6b7280] sm:text-base">
            გაიცანი ხალხი, ვინც შენს ინგლისურ ენას პრაქტიკული და თანამედროვე
            მიდგომით ავითარებს.
          </p>
        </RevealOnScroll>
      </div>
      <TeamGrid />
    </div>
  );
}

export default TeamBanner;
