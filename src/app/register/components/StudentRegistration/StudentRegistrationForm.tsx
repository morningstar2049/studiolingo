"use client";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useRegisterStudent from "../../hooks/useRegisterStudent";

function StudentRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const registerStudent = useRegisterStudent();

  function onSubmit(data: any) {
    console.log("onSubmit");
    if (Object.keys(errors).length) {
      console.log(errors);
    } else {
      registerStudent(data).then(console.log);
      reset();
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        className="flex flex-col w-full gap-5 p-10 md-max:lg:w-[70%] lg:w-[50%]"
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
            control={<Checkbox value={true} {...register("engBox")} />}
            label="ინგლისური"
          />
          <FormControlLabel
            control={<Checkbox value={true} {...register("gerBox")} />}
            label="გერმანული"
          />
          <FormControlLabel
            control={<Checkbox value={true} {...register("chinaBox")} />}
            label="ჩინური"
          />
          <FormControlLabel
            control={<Checkbox value={true} {...register("rusBox")} />}
            label="რუსული"
          />
        </div>
        <TextField
          variant="outlined"
          label="მიზანი"
          {...register("objective", { required: "This field is required" })}
        />
        <FormControl fullWidth className="flex flex-col gap-2">
          <p>გაკვეთილებზე მოსწავლეთა სასურველი რაოდენობა</p>
          {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
          <Select
            {...register("studentAmount", {
              required: "This field is required",
            })}
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
          <p>რომელი ტიპის გაკვეთილები გსურთ?</p>
          <RadioGroup
            {...register("type", { required: "This field is required" })}
          >
            <FormControlLabel
              value="ზოგადი"
              control={<Radio />}
              label="ზოგადი"
            />
            <FormControlLabel
              value="სასაუბრო"
              control={<Radio />}
              label="სასაუბრო"
            />
            <FormControlLabel
              value="ბიზნეს"
              control={<Radio />}
              label="ბიზნესი ინგლისური"
            />
            <FormControlLabel
              value="ბიზნეს რუსული"
              control={<Radio />}
              label="ბიზნეს რუსული"
            />
          </RadioGroup>
        </div>
        <FormControl fullWidth className="flex flex-col gap-2">
          <p>თქვენი დონე</p>
          <Select
            {...register("level", { required: "This field is required" })}
          >
            <MenuItem value={"ნულიდან ვიწყებ"}>ნულიდან ვიწყებ</MenuItem>
            <MenuItem value={"საწყისი (A1-A2)"}>საწყისი (A1-A2)</MenuItem>
            <MenuItem value={"საშუალო (B1-B2)"}>საშუალო (B1-B2)</MenuItem>
            <MenuItem value={"მაღალი (C1-C2)"}>მაღალი (C1-C2)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="flex flex-col gap-2">
          <p>კვირაში გაკვეთილების ოდენობა</p>
          <Select {...register("lesson_freq")}>
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
          {...register("phone_number", { required: "This field is required" })}
        />

        <TextField variant="outlined" label="ელფოსტა" {...register("email")} />
        <FormControl fullWidth className="flex flex-col gap-2">
          <p>საიდან შეიტყვეთ ჩვენ შესახებ?</p>
          <Select {...register("source")}>
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
                // sx={{ fontFamily: "'FiraGO', sans-serif" }}
                value={
                  "ყურადღებით გავეცანი სტუდიის ყველა წესს, გაკვეთილების საფასურს და ვეთანხმები"
                }
                {...register("rules", { required: "This field is required" })}
              />
            }
            label="ყურადღებით გავეცანი სტუდიის ყველა წესს და ვეთანხმები"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="self-center w-1/4 bg-lingo-green"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default StudentRegistrationForm;
