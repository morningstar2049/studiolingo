import { Dispatch, SetStateAction, useState } from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import "@/app/globals.css";

type CourseRadioInputProps = {
  choices: string[];
  title: string;
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
  };
  setSelectedItems: Dispatch<
    SetStateAction<{
      "გაკვეთილის ტიპი": string;
      "გაკვეთილის სიხშირე": string;
    }>
  >;
};

export default function CourseRadioInput(props: CourseRadioInputProps) {
  const [choice, setChoice] = useState("");
  const courseTypeWidthClass =
    props.title === "კურსის ტიპი" && props.choices.length === 4
      ? "flex flex-wrap h-[85px] w-[72%] sm:h-fit"
      : "w-fit";
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <p>{props.title} :</p>
      <RadioGroup
        className={`sm:w-fit ${courseTypeWidthClass}`}
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="choice"
        value={choice}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const val = event.target.value;
          setChoice(val);
          props.setSelectedItems((prev) => ({ ...prev, [props.title]: val }));
        }}
        sx={{
          minHeight: 48,
          padding: "4px",
          borderRadius: "12px",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-actionRadius": "8px",
        }}
      >
        {props.choices.map((item) => (
          <Radio
            key={item}
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              fontFamily: "'FiraGO', sans-serif",
              px: 2,
              alignItems: "center",
              color: () => (choice === item ? "white" : "black"),
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: "#2f9e4d",
                    boxShadow: "sm",
                    "&:hover": {
                      bgcolor: "#2f904d",
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
