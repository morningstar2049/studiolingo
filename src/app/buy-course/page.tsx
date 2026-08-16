/* eslint-disable @next/next/no-img-element */
"use client";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import {
  MenuItem,
  Stack,
  TextField,
  Button as MuiButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import Script from "next/script";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

declare const window: Window &
  typeof globalThis & {
    BOG?: any;
  };

function Page() {
  const { isSignedIn, isLoaded } = useAuth();

  const [courseAudienceVal, setCourseAudienceVal] = useState<
    "ბავშვისთვის" | "მოზარდისთვის" | "ზრდასრულისთვის" | string
  >("");
  const [courseFormatVal, setCourseFormatVal] = useState("");
  const [courseTypeVal, setCourseTypeVal] = useState("");
  const [courseFreqVal, setCourseFreqVal] = useState("");

  const { price } = useCalculatePrice(
    courseAudienceVal === "ბავშვისთვის" ? "englishForKids" : "english",
    {
      "გაკვეთილის ტიპი": courseTypeVal,
      "გაკვეთილის სიხშირე": courseFreqVal,
      "კურსის ფორმატი": courseFormatVal,
    },
  );

  async function handleBogInstallment() {
    window?.BOG.Calculator.open({
      bnpl: true,
      amount: price,
      onClose: () => {
        // Modal close callback
      },
      onRequest: async (selected: {
        amount: string;
        month: number;
        discount_code: string;
      }) => {
        fetch("api/bog/buy-course-installment", {
          method: "POST",
          body: JSON.stringify({
            ...selected,
            product_id: [
              courseAudienceVal,
              courseFormatVal,
              courseTypeVal,
              courseFreqVal,
            ].join("-"),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            window.BOG.Calculator.close();
            window.location.href = data.installmentUrl;
          })
          .catch((err) => {
            window.BOG.Calculator.close();
            alert(err);
          });
        return false;
      },
      onComplete: ({ redirectUrl }: any) => {
        return false;
      },
    });
  }

  const handleAudienceChange = (val: string) => {
    setCourseAudienceVal(val);

    if (val === "ბავშვისთვის") {
      setCourseFormatVal("ოფისში");
      setCourseTypeVal("ჯგუფური");
      setCourseFreqVal("კვირაში 2-ჯერ");
    }
  };

  const handleFormatChange = (val: string) => {
    setCourseFormatVal(val);

    if (val === "ოფისში") {
      setCourseTypeVal("ჯგუფური");
      setCourseFreqVal("კვირაში 2-ჯერ");
    }

    if (val === "ონლაინ" && courseTypeVal === "ჯგუფური") {
      setCourseFreqVal("კვირაში 2-ჯერ");
    }
  };


  const handleTypeChange = (val: string) => {
    setCourseTypeVal(val);

    if (val === "ჯგუფური" && courseFormatVal === "ონლაინ") {
      setCourseFreqVal("კვირაში 2-ჯერ");
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#1DBF73]" />
          <span className="text-lg text-gray-700 font-medium">
            იტვირთება...
          </span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 bg-gray-50">
        <div
          style={{ fontFeatureSettings: "'case' on" }}
          className="w-full max-w-sm rounded-[24px] bg-[#fff] border border-[#eceef2] shadow-[0_24px_54px_-22px_rgba(41,49,66,0.3)] p-8 text-center"
        >
          <div className="flex items-center justify-center mx-auto rounded-2xl w-14 h-14 bg-lingo-green/10 text-lingo-green">
            <LoginIcon sx={{ fontSize: 30 }} />
          </div>
          <h2 className="mt-5 text-lg font-bold leading-snug text-lingo-black">
            გთხოვთ, გაიარეთ ავტორიზაცია კურსის{" "}
            <span className="text-lingo-green">უპროცენტო განვადებით</span>{" "}
            შესაძენად
          </h2>
          <div className="flex flex-col gap-3 mt-7">
            <SignInButton mode="modal" forceRedirectUrl={"/buy-course"}>
              <button className="w-full py-3 font-bold text-[#fff] transition-all rounded-xl bg-lingo-green shadow-lg shadow-lingo-green/25 hover:bg-[#2f904d] hover:scale-[1.01]">
                შესვლა
              </button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl={"/buy-course"}>
              <button className="w-full py-3 font-bold transition-colors border-2 rounded-xl text-lingo-green border-lingo-green hover:bg-lingo-green/5">
                რეგისტრაცია
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold opacity-90 text-center text-lingo-black mb-2">
          განვადება
        </h2>
        <Stack spacing={3}>
          <TextField
            fullWidth
            select
            value={courseAudienceVal}
            onChange={(e) => handleAudienceChange(e.target.value)}
            label="ვისთვის არის კურსი?"
            size="medium"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DBF73" },
                "&:hover fieldset": { borderColor: "#1DBF73" },
                "&.Mui-focused fieldset": { borderColor: "#1DBF73" },
              },
              "& .MuiInputLabel-root": { color: "#293142" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#1DBF73" },
            }}
          >
            <MenuItem value="ბავშვისთვის">ბავშვისთვის (7-12 წელი)</MenuItem>
            <MenuItem value="მოზარდისთვის">მოზარდისთვის (12-16 წელი)</MenuItem>
            <MenuItem value="ზრდასრულისთვის">
              ზრდასრულისთვის (16+ წელი)
            </MenuItem>
          </TextField>
          <TextField
            disabled={courseAudienceVal === "ბავშვისთვის"}
            fullWidth
            select
            value={courseFormatVal}
            onChange={(e) => handleFormatChange(e.target.value)}
            label="კურსის ფორმატი"
            size="medium"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DBF73" },
                "&:hover fieldset": { borderColor: "#1DBF73" },
                "&.Mui-focused fieldset": { borderColor: "#1DBF73" },
              },
              "& .MuiInputLabel-root": { color: "#293142" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#1DBF73" },
            }}
          >
            <MenuItem value="ონლაინ">ონლაინ</MenuItem>
            <MenuItem value="ოფისში">ოფისში</MenuItem>
          </TextField>
          <TextField
            disabled={courseFormatVal === "ოფისში"}
            fullWidth
            select
            value={courseTypeVal}
            onChange={(e) => handleTypeChange(e.target.value)}
            label="გაკვეთილის ტიპი"
            size="medium"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DBF73" },
                "&:hover fieldset": { borderColor: "#1DBF73" },
                "&.Mui-focused fieldset": { borderColor: "#1DBF73" },
              },
              "& .MuiInputLabel-root": { color: "#293142" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#1DBF73" },
            }}
          >
            <MenuItem value="ჯგუფური">ჯგუფური</MenuItem>
            <MenuItem value="ინდივიდუალური">ინდივიდუალური</MenuItem>
          </TextField>
          <TextField
            disabled={
              courseFormatVal === "ოფისში" ||
              (courseFormatVal === "ონლაინ" && courseTypeVal === "ჯგუფური")
            }
            fullWidth
            select
            value={courseFreqVal}
            onChange={(e) => setCourseFreqVal(e.target.value)}
            label="გაკვეთილის სიხშირე"
            size="medium"
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DBF73" },
                "&:hover fieldset": { borderColor: "#1DBF73" },
                "&.Mui-focused fieldset": { borderColor: "#1DBF73" },
              },
              "& .MuiInputLabel-root": { color: "#293142" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#1DBF73" },
            }}
          >
            <MenuItem value="კვირაში 2-ჯერ">კვირაში 2-ჯერ</MenuItem>
            <MenuItem value="კვირაში 3-ჯერ">კვირაში 3-ჯერ</MenuItem>
          </TextField>
        </Stack>
        <MuiButton
          variant="outlined"
          sx={{
            borderColor: "#7136d7",
            borderRadius: "12px",
            textTransform: "none",
            // keep vertical padding consistent across breakpoints to preserve height
            padding: { xs: "10px 16px", sm: "10px 20px" },
            color: "#7136d7",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            minHeight: 56, // ensure consistent minimum height on mobile/desktop
            "&:hover": {
              borderColor: "#7136d7",
              backgroundColor: "#f9f6ff",
            },
          }}
          disabled={!price}
          onClick={handleBogInstallment}
        >
          {/* BOG icon */}
          <Box
            sx={{
              // use the same (sm) size on mobile to avoid the larger mobile height
              width: 44,
              height: 44,
              borderRadius: "10px",
              backgroundColor: "#f4f4f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/bog-logo.svg"
              alt="BOG"
              sx={{
                maxHeight: 42,
                maxWidth: "100%",
                objectFit: "contain",
                filter: !price ? "grayscale(1) opacity(0.5)" : "none",
              }}
            />
          </Box>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: !price ? "GrayText" : "#7136d7", height: 40 }}
          />

          {/* Text */}
          <Typography
            sx={{
              fontSize: "1.2rem", // keep consistent font size to help preserve height
              fontWeight: 500,
              color: !price ? "GrayText" : "#7136d7",
              whiteSpace: "nowrap",
            }}
          >
            ნაწილ-ნაწილ გადახდა
          </Typography>
        </MuiButton>
      </div>
      <Script src="https://webstatic.bog.ge/bog-sdk/bog-sdk.js?version=2&client_id=10002506" />
    </div>
  );
}

export default Page;
