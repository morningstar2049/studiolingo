import VacanciesListItem, { VacanciesListItemProps } from "./VacanciesListItem";
import { getVacancyCards } from "@/sanity/queries";

// Fallback list, used only while Sanity has no vacancies (or can't be reached).
// Vacancies are normally managed in the Studio (type "ვაკანსია").
export const legacyVacancies: VacanciesListItemProps[] = [
  {
    position: "ინგლისურის მასწავლებელი",
    location: "თბილისი",
    time: "(არა)სრული",
    salary: "მაღალი",
    route: "englishTeacher",
  },
  {
    position: "მასწავლებელთა აკადემია",
    location: "თბილისი",
    time: "3 თვე",
    timeLabel: "პერიოდი",
    salary: "უფასო",
    salaryLabel: "გადასახადი",
    badge: "გახსნილია",
    route: "academyInternship",
  },
  // {
  //   position: "გერმანულის მასწავლებელი",
  //   location: "თბილისი",
  //   time: "ნახევარი",
  //   salary: "კონკურენტული",
  //   route: "germanTeacher",
  // },
  // {
  //   position: "კონტენტ კრეატორი",
  //   location: "თბილისი",
  //   time: "სრული",
  //   salary: "კონკურენტული",
  //   route: "contentCreator",
  // },
  // {
  //   position: "ადმინისტრატორი",
  //   location: "თბილისი",
  //   time: "ნახევარი",
  //   salary: "კონკურენტული",
  //   route: "administrator",
  // },
  // {
  //   position: "რეპორტიორი",
  //   location: "თბილისი",
  //   time: "კვირაში 3-6 სთ",
  //   salary: "კონკურენტული",
  //   route: "reporter",
  // },
];

// Open vacancies for the list and the sitemap: from Sanity once it manages
// any vacancy (even if none are open), otherwise the hard-coded fallback.
export async function getOpenVacancyList(): Promise<VacanciesListItemProps[]> {
  const sanity = await getVacancyCards();
  if (!sanity || sanity.total === 0) return legacyVacancies;
  return sanity.cards.map((c) => ({
    position: c.title,
    route: c.slug,
    location: c.location,
    time: c.time,
    salary: c.listSalary ?? "",
    timeLabel: c.timeLabel ?? undefined,
    salaryLabel: c.salaryLabel ?? undefined,
    badge: c.listBadge ?? undefined,
  }));
}

async function VacanciesList() {
  const vacancies = await getOpenVacancyList();
  return (
    <div className="flex flex-col items-center justify-around gap-10">
      {!!vacancies.length ? (
        vacancies.map((vacancy) => (
          <VacanciesListItem key={vacancy.position} {...vacancy} />
        ))
      ) : (
        <p className="text-lingo-green font-bold text-xl text-center h-[calc(100vh-200px)] flex items-center justify-center">
          ამჟამად ყველა ვაკანსია დახურულია
        </p>
      )}
    </div>
  );
}

export default VacanciesList;
