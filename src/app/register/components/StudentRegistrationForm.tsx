"use client";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function StudentRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (submitted) {
      reset({ "entry.1065046570": "" });
    }
  }, [submitted, reset]);

  return (
    <>
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
      />
      <form
        target="hidden_iframe"
        // action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdAE-KxRzPqPnvcLi0jxc2YzYHe5mfF0klphICNoiT0wDnfSQ/formResponse"
        className="flex flex-col gap-5 p-10"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdAE-KxRzPqPnvcLi0jxc2YzYHe5mfF0klphICNoiT0wDnfSQ/formResponse"
        method="post"
        onSubmit={(e) => {
          console.log(e, "submitted");
          setSubmitted(true);
        }}
      >
        <TextField
          color="success"
          variant="outlined"
          label="სახელი, გვარი"
          {...register("entry.2005620554")}
        />
        <TextField
          variant="outlined"
          label="ასაკი"
          {...register("entry.1611228309")}
        />
        <div>
          <p>რომელი ენის/ენების სწავლა გსურთ?</p>
          <FormControlLabel
            control={
              <Checkbox value="ინგლისური" {...register("entry.1065046570")} />
            }
            label="ინგლისური"
          />
          <FormControlLabel
            control={
              <Checkbox value="გერმანული" {...register("entry.1065046570")} />
            }
            label="გერმანული"
          />
          <FormControlLabel
            control={
              <Checkbox value="ჩინური" {...register("entry.1065046570")} />
            }
            label="ჩინური"
          />
          <FormControlLabel
            control={
              <Checkbox value="რუსული" {...register("entry.1065046570")} />
            }
            label="რუსული"
          />
        </div>
        <TextField
          variant="outlined"
          label="მიზანი"
          {...register("entry.839337160")}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            გაკვეთილებზე მოსწავლეთა სასურველი რაოდენობა
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            {...register("entry.2130961897")}
            // onChange={handleChange}
          >
            <MenuItem value={"ინდივიდუალური (მხოლოდ 1 მოსწავლე)"}>
              ინდივიდუალური
            </MenuItem>
            <MenuItem value={"ჯგუფური (2 ან 3 მოსწავლე)"}>
              ჯგუფური(2 ან 3 მოსწავლე)
            </MenuItem>
          </Select>
        </FormControl>
        <div>
          <FormLabel id="demo-radio-buttons-group-label">
            რომელი ტიპის გაკვეთილები გსურთ?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            {...register("entry.1166974658")}
          >
            <FormControlLabel
              value="ზოგადი (მოიცავს ოთხივე კომპონენტს: საუბარს, მოსმენას, წაკითხვას, წერას)"
              control={<Radio />}
              label="ზოგადი"
            />
            <FormControlLabel
              value="სასაუბრო ინგლისური/რუსული (მოიცავს საუბარს, მოსმენას, წაკითხვას; არ შედის წერითი დავალებები)"
              control={<Radio />}
              label="სასაუბრო"
            />
            <FormControlLabel
              value="ბიზნეს ინგლისური (უნდა ფლობდეთ ინგლისურის B1 დონეს)"
              control={<Radio />}
              label="ბიზნესი ინგლისური"
            />
            <FormControlLabel
              value="ბიზნეს რუსული (უნდა ფლობდეთ რუსულის A2 დონეს)"
              control={<Radio />}
              label="ბიზნეს რუსული"
            />
          </RadioGroup>
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            დონე, რომელსაც უკვე ფლობთ
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("entry.858477092")}
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={"ნულიდან ვიწყებ"}>ნულიდან ვიწყებ</MenuItem>
            <MenuItem value={"საწყისი (A1-A2)"}>საწყისი (A1-A2)</MenuItem>
            <MenuItem value={"საშუალო (B1-B2)"}>საშუალო (B1-B2)</MenuItem>
            <MenuItem value={"მაღალი (C1-C2)"}>მაღალი (C1-C2)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            კვირაში რამდენი გაკვეთილი გსურთ?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("entry.1096271263")}
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={"2 გაკვეთილი"}>2 გაკვეთილი</MenuItem>
            <MenuItem value={"3 გაკვეთილი"}>3 გაკვეთილი</MenuItem>
          </Select>
        </FormControl>
        <div>
          <p>ჩვენთან გაკვეთილები მიმდინარეობს ონლაინ რეჟიმში</p>
          <FormControlLabel
            control={
              <Checkbox value="ონლაინ" {...register("entry.1859775582")} />
            }
            label="ონლაინ"
          />
        </div>

        <TextField
          variant="outlined"
          label="ტელეფონის ნომერი"
          {...register("entry.1469338775")}
        />

        <TextField
          variant="outlined"
          label="ელფოსტა"
          {...register("entry.1297167939")}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            საიდან შეიტყვეთ ჩვენ შესახებ?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("entry.200136865")}
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={"Facebook"}>Facebook</MenuItem>
            <MenuItem value={"Instagram"}>Instagram</MenuItem>
            <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
            <MenuItem value={"Tiktok"}>TikTok</MenuItem>
            <MenuItem value={"სხვამ მირჩია"}>სხვამ მირჩია</MenuItem>
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                // value="ყურადღებით გავეცანი სტუდიის ყველა წესს, გაკვეთილების საფასურს და ვეთანხმები"
                value={
                  "ყურადღებით გავეცანი სტუდიის ყველა წესს, გაკვეთილების საფასურს და ვეთანხმები"
                }
                {...register("entry.161711356")}
              />
            }
            label="ყურადღებით გავეცანი სტუდიის ყველა წესს და ვეთანხმები"
          />
        </div>
        {/* <input type="hidden" name="hud" value="true" />
        <input
          type="hidden"
          name="dlut"
          value={`${Math.random() * 100000000}`}
        /> */}
        <button type="submit" className="bg-lingo-green">
          Submit
        </button>
      </form>
    </>
  );
}

export default StudentRegistrationForm;
