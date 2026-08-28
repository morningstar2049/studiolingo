import TeamBanner from "./TeamBanner";
import AboutCompany from "./AboutCompany";

function Team() {
  return (
    <div id="team" className="scroll-m-[160px] sm:scroll-m-[200px]">
      <TeamBanner />
      <AboutCompany />
    </div>
  );
}

export default Team;
