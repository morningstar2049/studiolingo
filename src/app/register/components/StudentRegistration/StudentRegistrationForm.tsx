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
import { useForm } from "react-hook-form";

function StudentRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <form
        className="flex flex-col gap-5 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          label="სახელი, გვარი"
          {...register("name", { required: "Name is required" })}
        />
        <TextField
          variant="outlined"
          label="ასაკი"
          {...register("age", { required: "Age is required" })}
        />
        <div>
          <p>რომელი ენის/ენების სწავლა გსურთ?</p>
          <FormControlLabel
            control={<Checkbox value="ინგლისური" {...register("engBox")} />}
            label="ინგლისური"
          />
          <FormControlLabel
            control={<Checkbox value="გერმანული" {...register("gerBox")} />}
            label="გერმანული"
          />
          <FormControlLabel
            control={<Checkbox value="ჩინური" {...register("chinaBox")} />}
            label="ჩინური"
          />
          <FormControlLabel
            control={<Checkbox value="რუსული" {...register("rusBox")} />}
            label="რუსული"
          />
        </div>
        <TextField
          variant="outlined"
          label="მიზანი"
          {...register("objective")}
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
            {...register("studentAmount")}
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
            {...register("type")}
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
            defaultValue={"Choose"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("level")}
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
            {...register("frequency")}
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
              <Checkbox
                value="ონლაინ"
                {...register("online", { required: "This field is required" })}
              />
            }
            label="ონლაინ"
          />
        </div>

        <TextField
          variant="outlined"
          label="ტელეფონის ნომერი"
          {...register("number")}
        />

        <TextField variant="outlined" label="ელფოსტა" {...register("email")} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            საიდან შეიტყვეთ ჩვენ შესახებ?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("source")}
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
                {...register("rules")}
              />
            }
            label="ყურადღებით გავეცანი სტუდიის ყველა წესს და ვეთანხმები"
          />
        </div>

        <Button type="submit" variant="contained" className="bg-lingo-green">
          Submit
        </Button>
      </form>
    </>
  );
}

export default StudentRegistrationForm;
