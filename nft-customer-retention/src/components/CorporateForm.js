import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CloudCircleOutlined as UploadIcon } from "@mui/icons-material";
import { styled, Box, CircularProgress, Dialog, Typography } from "@mui/material";
import Confetti from "react-confetti";


const UploadBox = styled(Box)(({ theme }) => ({
  border: `0.15rem dashed ${theme.palette.grey[400]}`,
  borderRadius: "9px",
  padding: theme.spacing(5, 3),
}));

const BrowseButton = styled("input")(({ theme }) => ({
  padding: theme.spacing(0.75, 2.5),
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const Error = styled("p")({
  fontSize: "12px",
  height: "12px",
  color: "red",
});

const SubmitButton = styled(LoadingButton)({
  padding: "10px",
  borderRadius: "16px",
  width: "100%",
});

function CorporateForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false)
  const defaultValues = {
    file: null,
  };

  const FIELDS = ["Customer_ID", 	"Gender", "Age", "Married",	"Dependents",	"Education",	"Self_Employed",	"Total_Income",	"Start_Year",	"Amount_Invested",	"Credit_History",	"Region",	"Likely_to_retain"];

  const SUPPORTED_FORMATS = [
    ".csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const downloadFile = () => {
    var blob = new Blob([FIELDS], {type: 'application/vnd.ms-excel'});
 var downloadUrl = URL.createObjectURL(blob);
 var a = document.createElement("a");
 a.style.display = "none"
 a.href = downloadUrl;
 a.download = "data.csv";
 document.body.appendChild(a);
 a.click();
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const schema = Yup.object()
    .shape({
      file: Yup.mixed().test(
        "fileType",
        "File is Required",
        (value) =>
          SUPPORTED_FORMATS.includes(value) ||
          (value !== null && value.length > 0)
      ),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitted },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    try {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setOpen(!open)
        console.log("Submitted");
      }, 2000);
    } catch (error) {
      console.log("error");
      reset();
    }
  };

  return (
    <div style={{ p: 16, borderRadius: 8 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UploadBox sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadIcon />
            <BrowseButton
              {...register("file")}
              name="file"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Box>
          <Error>{errors.file?.message}</Error>
        </UploadBox>

        <SubmitButton
          type="submit"
          variant="outlined"
          loadingIndicator={
            <CircularProgress
              sx={{ color: "#000", height: "100%", width: "100%" }}
              size={16}
            />
          }
          loading={isSubmitting}
        >
          Submit Details
        </SubmitButton>
        <SubmitButton variant="outlined" onClick={downloadFile} sx={{mt: 2}}>
          Download Format
        </SubmitButton>
      </form>
      {open && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{p: 16}}>
        <Typography variant="h3" color='green'>SUCCESS</Typography>
        </Box>
      </Dialog>
    </div>
  );
}

export default CorporateForm;
