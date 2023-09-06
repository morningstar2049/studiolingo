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
} from "@mui/material";

function StudentRegistrationForm() {
  return (
    <>
      <form className="p-10 flex flex-col gap-5">
        <TextField
          color="success"
          variant="outlined"
          label="სახელი, გვარი"
          sx={{
            "&:focus": {
              borderColor: "green",
              outlineColor: "green",
            },
          }}
        />
        <TextField variant="outlined" label="ასაკი" />
        <div>
          <p>რომელი ენის/ენების სწავლა გსურთ?</p>
          <FormControlLabel control={<Checkbox />} label="ინგლისური" />
          <FormControlLabel control={<Checkbox />} label="გერმანული" />
          <FormControlLabel control={<Checkbox />} label="ჩინური" />
          <FormControlLabel control={<Checkbox />} label="რუსული" />
        </div>
        <TextField variant="outlined" label="მიზანი" />
        <div>
          <InputLabel id="demo-simple-select-label">
            გაკვეთილებზე მოსწავლეთა სასურველი რაოდენობა
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div>
          <FormLabel id="demo-radio-buttons-group-label">
            რომელი ტიპის გაკვეთილები გსურთ?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="ზოგადი"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="სასაუბრო"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="ბიზნესი ინგლისური"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="ბიზნეს რუსული"
            />
          </RadioGroup>
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">
            დონე, რომელსაც უკვე ფლობთ
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={10}>ნულიდან ვიწყებ</MenuItem>
            <MenuItem value={20}>საწყისი (A1-A2)</MenuItem>
            <MenuItem value={30}>საშუალო (B1-B2)</MenuItem>
            <MenuItem value={40}>მაღალი (C1-C2)</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">
            კვირაში რამდენი გაკვეთილი გსურთ?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={10}>2 გაკვეთილი</MenuItem>
            <MenuItem value={20}>3 გაკვეთილი</MenuItem>
          </Select>
        </div>
        <div>
          <p>ჩვენთან გაკვეთილები მიმდინარეობს ონლაინ რეჟიმში</p>
          <FormControlLabel control={<Checkbox />} label="ონლაინ" />
        </div>
        <div>
          <TextField variant="outlined" label="ტელეფონის ნომერი" />
        </div>
        <TextField variant="outlined" label="ელფოსტა" />
        <div>
          <InputLabel id="demo-simple-select-label">
            საიდან შეიტყვეთ ჩვენ შესახებ?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            //   label="დონე"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Facebook</MenuItem>
            <MenuItem value={20}>Instagram</MenuItem>
            <MenuItem value={30}>LinkedIn</MenuItem>
            <MenuItem value={40}>TikTok</MenuItem>
            <MenuItem value={50}>სხვამ მირჩია</MenuItem>
          </Select>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default StudentRegistrationForm;
