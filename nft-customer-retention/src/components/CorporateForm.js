import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { Button, styled, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CloudCircleOutlined as UploadIcon } from "@mui/icons-material";

// @mui
import { styled, Box, CircularProgress } from "@mui/material";

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

const schema = Yup.object()
  .shape({
    file: Yup.mixed().required("File is required"),
  })
  .required();

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
  const defaultValues = {
    file: null,
  };

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
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitting(false);
        console.log("Submitted");
      }, 2000);
    } catch (error) {
      console.log("error");
      reset();
    }
  };

  return (
    <div style={{ p: 16 }}>
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
          {" "}
          Submit Data{" "}
        </SubmitButton>
      </form>
    </div>
  );
}

export default CorporateForm;
