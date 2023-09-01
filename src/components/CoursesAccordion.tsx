import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CourseDetails from "./CourseDetails";

export default function CoursesAccordion() {
  return (
    <div
      style={{ fontFeatureSettings: "'case' on" }}
      className="p-3 sm:p-0 sm:w-[48%]"
    >
      <Accordion className="p-2 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            ინგლისური
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="english" />
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            გერმანული
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="german" />
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            რუსული
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="russian" />
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3 shadow-none">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#2f9e4d" }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            ჩინური
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="chinese" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
