import React from "react";
import VacanciesListItem, { VacanciesListItemProps } from "./VacanciesListItem";

const vacancies: VacanciesListItemProps[] = [
  {
    position: "ინგლისურის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
  },
  {
    position: "გერმანულის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
  },
  {
    position: "ჩინურის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
  },
  {
    position: "რუსულის მასწავლებელი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
  },
  {
    position: "კონტენტ კრეატორი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
  },
  {
    position: "ადმინისტრატორი",
    location: "თბილისი",
    time: "ნახევარი",
    salary: "კონკურენტული",
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
        />
      ))}
    </div>
  );
}

export default VacanciesList;
