import Link from "next/link";
import { BiTimeFive, BiWallet } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import RevealOnScroll from "@/components/RevealOnScroll";

export type VacanciesListItemProps = {
  position: string;
  time: string;
  location: string;
  salary: string;
  route: string;
  // Per-card overrides for the two right-hand meta labels (e.g. the academy
  // internship uses "პერიოდი" / "გადასახადი" instead of the job defaults).
  timeLabel?: string;
  salaryLabel?: string;
};

function VacanciesListItem({
  position,
  location,
  time,
  salary,
  route,
  timeLabel = "განაკვეთი",
  salaryLabel = "ანაზღაურება",
}: VacanciesListItemProps) {
  const meta = [
    { Icon: IoLocationOutline, label: "ლოკაცია", value: location },
    { Icon: BiTimeFive, label: timeLabel, value: time },
    { Icon: BiWallet, label: salaryLabel, value: salary },
  ];

  return (
    <RevealOnScroll className="w-full max-w-2xl">
      <div className="w-full overflow-hidden bg-[#fff] border border-[#eceef2] rounded-[20px] shadow-[0_16px_38px_-20px_rgba(41,49,66,0.28)]">
        <div
          className="h-[5px]"
          style={{ background: "linear-gradient(90deg,#3bb85e,#1e7d3a)" }}
        />
      <div
        className="p-6 sm:p-7"
        style={{ fontFeatureSettings: "'case' on" }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold sm:text-xl text-lingo-black">
            {position}
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lingo-green/10 px-3 py-1 text-[11px] font-bold text-lingo-green shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-lingo-green" />
            ღია ვაკანსია
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-5">
          {meta.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="px-2 py-3 text-center bg-[#f6f8f7] rounded-xl"
            >
              <Icon className="mx-auto text-lg text-lingo-green" />
              <div className="mt-1 text-[10px] text-[#8a929d]">{label}</div>
              <div className="text-[13px] font-bold leading-tight text-lingo-black">
                {value}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/career/${route}`}
          className="flex items-center justify-center w-full gap-2 py-3 mt-6 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.01]"
        >
          გაიგე მეტი და შემოგვიერთდი →
        </Link>
      </div>
      </div>
    </RevealOnScroll>
  );
}

export default VacanciesListItem;
