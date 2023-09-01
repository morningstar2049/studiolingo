import React from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Typography from "@mui/joy/Typography";

export default function CourseRadioInput() {
  const [justify, setJustify] = React.useState("flex-start");
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography id="segmented-controls-example" fontWeight="lg" fontSize="sm">
        Justify:
      </Typography>
      <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={justify}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setJustify(event.target.value)
        }
        sx={{
          minHeight: 48,
          padding: "4px",
          borderRadius: "12px",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-actionRadius": "8px",
        }}
      >
        {["flex-start", "center", "flex-end"].map((item) => (
          <Radio
            key={item}
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              alignItems: "center",
              color: () =>
                justify === item
                  ? "white" // Color when selected
                  : "black", // Default color
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
    </Box>
  );
}
