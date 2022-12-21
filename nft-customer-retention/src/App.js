import "./App.css";
import { useState } from "react";
import { Typography, Box, styled } from "@mui/material";
import MainBg from "./images/pexels-leeloo-thefirst-5561923.jpg";
import MainBg1 from "./images/pexels-kampus-production-8353775.jpg";
import MainBg2 from "./images/pexels-mikhail-nilov-7681747.jpg";
import { Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import UserForm from "./components/UserForm";
import CorporateForm from "./components/CorporateForm";

const Page = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  objectFit: "cover",
  backgroundImage: `url(${MainBg1})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CustomBox = styled(Box)(() => ({
  background: "white",
  padding: "36px",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  flexDirection: "column",
  width: "70%",
  minHeight: '400px',
  borderRadius: "16px",
  margin: "24px"
}));

function App() {
  const [value, setValue] = useState("1");

  const handleChange = (e, value) => {
    console.log(e, value);
    setValue(value);
  };
  return (
    <Page>
      <CustomBox>
        <TabContext value={value}>
          <Box mb={3} sx={{width: '100%'}}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab value="1" label="Individual User" />
              <Tab value="2" label="Corporate Data" />
            </Tabs>
          </Box>
          <TabPanel value="1"><UserForm /></TabPanel>
          <TabPanel value="2"><CorporateForm /></TabPanel>
        </TabContext>
      </CustomBox>

      {/* take user type as input and render form according to user type */}
      {/* user form */}
      {/* corporate form */}
      {/* after filling the form take it to results page and show the results rendered by flask api */}
      {/* react redux and routing */}
    </Page>
  );
}

export default App;
