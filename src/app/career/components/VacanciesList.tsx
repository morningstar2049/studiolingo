import VacanciesListItem, { VacanciesListItemProps } from "./VacanciesListItem";

export const vacancies: VacanciesListItemProps[] = [
  // {
  //   position: "ინგლისურის მასწავლებელი",
  //   location: "თბილისი",
  //   time: "სრული",
  //   salary: "კონკურენტული",
  //   route: "englishTeacher",
  // },
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

function VacanciesList() {
  return (
    <div className="flex flex-col items-center justify-around gap-10">
      {!!vacancies.length ? (
        vacancies.map((vacancy) => (
          <VacanciesListItem
            key={vacancy.position}
            position={vacancy.position}
            location={vacancy.location}
            time={vacancy.time}
            salary={vacancy.salary}
            route={vacancy.route}
          />
        ))
      ) : (
        <h1 className="text-lingo-green font-bold text-xl text-center h-[calc(100vh-200px)] flex items-center justify-center">
          ამჟამად ყველა ვაკანსია დახურულია
        </h1>
      )}
    </div>
  );
}

export default VacanciesList;
