"use client";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/joy/Button";
import LingoButton from "@/components/Button";
import { useState } from "react";

const submittedAnswers: string[] = [];

function LevelTest({ levelTest }: TLevelTest) {
  console.log(submittedAnswers);
  const [value, setValue] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleNextQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submittedAnswers.push(value);
    setValue("");
    setQuestionNumber((prev) => {
      if (prev === levelTest.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  return (
    <form onSubmit={handleNextQuestion}>
      <FormControl sx={{ gap: 3, width: "100%" }} variant="standard">
        <FormLabel sx={{ fontSize: "20px", color: "#000" }}>
          {levelTest[questionNumber].question}
        </FormLabel>
        <RadioGroup name="levelTest" value={value} onChange={handleRadioChange}>
          <List
            sx={{
              minWidth: 240,
              "--List-gap": "0.5rem",
              "--ListItem-paddingY": "1rem",
              "--ListItem-radius": "8px",
              "--ListItemDecorator-size": "32px",
            }}
          >
            {levelTest[questionNumber].choices.map((item) => (
              <ListItem variant="outlined" key={item} sx={{ boxShadow: "sm" }}>
                <Radio
                  overlay
                  value={item}
                  label={item}
                  sx={{
                    flexGrow: 1,
                    color: "#2f9e4d",
                    "& .MuiRadio-radio": {
                      color: "#2f9e4d",
                    },
                    "& .MuiRadio-label": {
                      color: "#293142",
                    },
                  }}
                  color="success"
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: () => ({
                        ...(checked && {
                          inset: -1,
                          border: "1px solid #2f9e4d",
                        }),
                      }),
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </RadioGroup>
        <Button
          disabled={!value}
          type="submit"
          variant="soft"
          className="bg-lingo-green hover:bg-[#2f904d]"
          color="success"
          sx={{
            color: "#FFF",
          }}
        >
          {questionNumber === levelTest.length - 1 ? "Finish Test" : "Next"}
        </Button>
      </FormControl>
    </form>
  );
}

export default LevelTest;
