import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CoursesAccordion() {
  return (
    <div
      style={{ fontFeatureSettings: "'case' on" }}
      className="p-3 sm:p-0 sm:w-[48%]"
    >
      <Accordion className="p-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            ინგლისური
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            გერმანული
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            რუსული
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>This is not disabled</p>
        </AccordionDetails>
      </Accordion>
      <Accordion className="p-3">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <p className="text-[#fff] rounded-md bg-lingo-green p-2 font-bold w-[120px] text-center">
            ჩინური
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>This is not disabled</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
