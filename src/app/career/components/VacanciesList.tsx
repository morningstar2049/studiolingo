import React from "react";
import VacanciesListItem, { VacanciesListItemProps } from "./VacanciesListItem";

const vacancies: VacanciesListItemProps[] = [
  {
    position: "ინგლისურის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "englishTeacher",
  },
  {
    position: "გერმანულის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "germanTeacher",
  },
  {
    position: "ჩინურის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "chineseTeacher",
  },
  {
    position: "რუსულის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "russianTeacher",
  },
  {
    position: "კონტენტ კრეატორი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "contentCreator",
  },
  {
    position: "ადმინისტრატორი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
    route: "administrator",
  },
];

function VacanciesList() {
  return (
    <div className="flex flex-col items-center justify-around gap-10">
      {vacancies.map((vacancy) => (
        <VacanciesListItem
          key={vacancy.position}
          position={vacancy.position}
          location={vacancy.location}
          time={vacancy.time}
          salary={vacancy.salary}
          route={vacancy.route}
        />
      ))}
    </div>
  );
}

export default VacanciesList;
