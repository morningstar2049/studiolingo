"use client";
import "@/app/globals.css";
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
  Modal,
} from "@mui/material";
import {
  useForm,
  Controller,
  SubmitErrorHandler,
  FieldErrors,
} from "react-hook-form";
import useRegisterStudent from "../../hooks/useRegisterStudent";
import { TStudentRegistrationForm } from "./types";
import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";

function StudentRegistrationForm() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<TStudentRegistrationForm>({
    defaultValues: {
      name: "",
      age: "",
      objective: "",
      type: "",
      level: "",
      lesson_freq: "",
      online: false,
      phone_number: "",
      email: "",
      source: "",
      engBox: false,
      chinaBox: false,
      gerBox: false,
      rusBox: false,
      studentAmount: "",
      acceptRules: false,
    },
  });

  const registerStudent = useRegisterStudent();

  function onSubmit(data: TStudentRegistrationForm) {
    console.log(data);
    registerStudent(data).then(() => {
      setIsOpen(true);
      reset();
    });
  }

  function onError(errors: FieldErrors<TStudentRegistrationForm>) {
    console.log(errors);
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        className="flex flex-col w-full gap-5 p-10 md-max:lg:w-[70%] lg:w-[50%]"
        onSubmit={handleSubmit(onSubmit, onError)}
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
            defaultValue={""}
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
          <Select
            {...register("lesson_freq", { required: "This field is required" })}
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
                value={true}
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
                sx={{ fontFamily: "'FiraGO', sans-serif" }}
                value={true}
                {...register("acceptRules", {
                  required: "This field is required",
                })}
              />
            }
            label="ყურადღებით გავეცანი სტუდიის ყველა წესს და ვეთანხმები"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="self-center w-fit bg-lingo-green"
        >
          რეგისტრაცია
        </Button>
      </form>
      <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>Thank you for registering</p>
      </SuccessModal>
    </div>
  );
}

export default StudentRegistrationForm;
