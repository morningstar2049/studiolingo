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
    "კურსის ფორმატი": string;
  };
  setSelectedItems: Dispatch<
    SetStateAction<CourseRadioInputProps["selectedItems"]>
  >;
};

export default function CourseRadioInput({
  choices,
  selectedItems,
  setSelectedItems,
  title,
}: CourseRadioInputProps) {
  // const [choice, setChoice] = useState(
  //   title === "გაკვეთილის სიხშირე" ? "კვირაში 2-ჯერ" : ""
  // );
  // Three or more options don't fit in one row on phones: stack them
  // vertically there, keep the single row from the sm breakpoint up.
  const stackOnMobile = title !== "კურსის ტიპი" && choices.length >= 3;
  const courseTypeWidthClass =
    title === "კურსის ტიპი" && choices.length === 4
      ? "flex flex-wrap h-[85px] w-[80%] sm:h-fit"
      : "w-fit";
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <p>{title} :</p>
      <RadioGroup
        className={`sm:w-fit ${courseTypeWidthClass}`}
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="choice"
        value={selectedItems[title as keyof typeof selectedItems]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const val = event.target.value;

          if (title === "კურსის ფორმატი" && val === "ოფისში") {
            setSelectedItems((prev) => ({
              ...prev,
              "გაკვეთილის ტიპი": "ჯგუფური",
            }));
          }
          if (title === "კურსის ფორმატი" && val === "ონლაინ") {
            setSelectedItems((prev) => ({
              ...prev,
              "გაკვეთილის ტიპი": "",
            }));
          }
          setSelectedItems((prev) => ({ ...prev, [title]: val }));
        }}
        sx={{
          ...(stackOnMobile && {
            flexDirection: { xs: "column", sm: "row" },
            // stacked: every option spans the group so labels line up left;
            // the horizontal gap becomes a vertical one
            alignItems: { xs: "stretch", sm: "center" },
            "& .MuiRadio-root": { width: { xs: "100%", sm: "auto" } },
            "& .MuiRadio-root + .MuiRadio-root": {
              marginInlineStart: { xs: 0, sm: "var(--RadioGroup-gap)" },
              marginBlockStart: { xs: "var(--RadioGroup-gap)", sm: 0 },
            },
          }),
          minHeight: 48,
          padding: "4px",
          borderRadius: "12px",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-actionRadius": "8px",
        }}
      >
        {choices.map((item) => (
          <Radio
            key={item}
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              fontFamily: "var(--font-firago), sans-serif",
              px: 2,
              py: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              color: () =>
                selectedItems[title as keyof typeof selectedItems] === item
                  ? "white"
                  : "black",
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
