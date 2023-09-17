import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../Button";
function CorporateCoursesAccordion() {
  return (
    <div
      //   style={{ fontFeatureSettings: "'case' on" }}
      className="p-3 sm:p-0 sm:w-[48%]"
    >
      <Accordion className="p-2 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2.5 font-bold w-[250px] text-center">
            კორპორაციული ინგლისური
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <strong className="text-lingo-green">ზოგადი/სასაუბრო</strong>
          <br />
          <br />
          კურსის განმავლობაში ისწავლით ბუნერბრივად საუბარს, უცხოელი პარტნიორების
          თავისუფლად გაგებას, დახვეწილი ენით წერას და გამართულად წაკითხვას.
          <br />
          <br />
          <strong className="text-lingo-green">ბიზნესი</strong>
          <br />
          <br />
          კურსის განმავლობაში გაივლით ინგლისურად არაერთ თემას, როგორებიცაა:
          ფინანსები და ბუღალტერია, მარკეტინგი, ადამიანური რესურსები(HR), ბიზნეს
          სამართალი, ლოჯისტიკა.
          <br />
          <br />
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfeNR6hwsJibqzcgUX_vggOqTqu36G1QUegCWLosX1Vm4g86g/viewform?fbclid=IwAR0mbIZMwE6QNKCUBJfZm_zdme22_mQZs62uhgwgitQPee9O5-JCL-0d99Y"
            target="_blank"
          >
            <Button extraStyles="w-full m-auto">შემოგვიერთდი</Button>
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-2 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2.5 font-bold w-[250px] text-center">
            კორპორაციული რუსული
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <strong className="text-lingo-green">ზოგადი/სასაუბრო</strong>
          <br />
          <br />
          კურსის განმავლობაში ისწავლით ბუნერბრივად საუბარს, უცხოელი პარტნიორების
          თავისუფლად გაგებას, დახვეწილი ენით წერას და გამართულად წაკითხვას.
          <br />
          <br />
          <strong className="text-lingo-green">ბიზნესი</strong>
          <br />
          <br />
          კურსის განმავლობაში რუსულად ისწავლით არაერთ თემას: ორგანიზაციას,
          გაყიდვებს, ბაზარს, კლიენტებთან მომსახურებას, საქმიან შეხვედრებს და
          სხვა.
          <br />
          <br />
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfeNR6hwsJibqzcgUX_vggOqTqu36G1QUegCWLosX1Vm4g86g/viewform?fbclid=IwAR0mbIZMwE6QNKCUBJfZm_zdme22_mQZs62uhgwgitQPee9O5-JCL-0d99Y"
            target="_blank"
          >
            <Button extraStyles="w-full m-auto">შემოგვიერთდი</Button>
          </a>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CorporateCoursesAccordion;
