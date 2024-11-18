import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../Button";

const courseData = [
  {
    lang: "ინგლისური",
    general:
      "კურსის განმავლობაში ისწავლით ბუნერბრივად საუბარს, უცხოელი პარტნიორების თავისუფლად გაგებას, დახვეწილი ენით წერას და გამართულად წაკითხვას.",
    business:
      " კურსის განმავლობაში გაივლით ინგლისურად არაერთ თემას, როგორებიცაა:ფინანსები და ბუღალტერია, მარკეტინგი, ადამიანური რესურსები(HR), ბიზნეს სამართალი, ლოჯისტიკა.",
    syllabusUrl:
      "https://docs.google.com/document/d/1FjS25q9cRhJZ14XZ149VGtMMCOT-hLQWaRSEV8j8p4I/edit?fbclid=IwAR2sLPjvhRfhvr07X2dTRw9HiZlLn4tYGl0OHQIZrW8pQx_tiiEP2AIv7fg#heading=h.y286pqovbf7j",
  },
];

function CorporateCoursesAccordion() {
  return (
    <div className="p-3 sm:p-0 sm:w-[48%]">
      {courseData.map((item) => (
        <Accordion key={item.lang} className="p-2 shadow-none" defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <p className="text-[#fff] rounded-md bg-lingo-green p-2.5 font-bold w-[250px] text-center">
              კორპორაციული {item.lang}
            </p>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <strong className="text-lingo-green">ზოგადი/სასაუბრო</strong>
              <p>{item.general}</p>
            </div>

            <div className="flex flex-col gap-3">
              <strong className="text-lingo-green">ბიზნესი</strong>
              <p>{item.business}</p>
              <a
                href={item.syllabusUrl}
                className="underline text-lingo-green"
                target="_blank"
              >
                კურსის სილაბუსი
              </a>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdnC-n4UDzM2mqdtvbK9KxgXK0oTqf6bSMuNkY8YlhMaHpk2Q/viewform"
              target="_blank"
            >
              <Button extraStyles="w-full m-auto">შემოგვიერთდი</Button>
            </a>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default CorporateCoursesAccordion;
