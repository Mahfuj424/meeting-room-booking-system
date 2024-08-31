import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import WhyChooseUs2 from "./WhyChooseUs2";
import SectionHeader from "../../shared/sectionHeader/SectionHeader";

const WhyChooseUs: React.FC = () => {
  const steps = [
    {
      title: "Hassle-Free Roommate Search",
      description:
        "Our platform simplifies finding the perfect roommate by matching you based on preferences, location, and lifestyle. No more endless searches.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Know exactly what you're paying for. We provide clear and upfront costs with no hidden fees, ensuring transparency in every transaction.",
    },
    {
      title: "Verified Listings",
      description:
        "We ensure that all listings are verified for accuracy, giving you peace of mind knowing that what you see is what you get.",
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-20">
      <SectionHeader
        title="Why Choose Our Room"
        description="Experience unparalleled comfort and luxury with our thoughtfully designed rooms, tailored to meet your every need."
      />
      <div className="md:flex gap-7 space-y-12 md:space-y-0 justify-around">
        <div>
          <Box
            sx={{
              maxWidth: 400,
              // color: "#ffff",
              "&.dark": { color: "white" },
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps?.map((step, index) => (
                <Step key={step.title}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                    sx={{ color: "" }} // Inherit color for StepLabel
                  >
                    <div className="dark:text-white">{step.title}</div>
                  </StepLabel>
                  <StepContent sx={{ color: "inherit" }}>
                    <Typography className="dark:text-white">
                      {step.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          mt: 1,
                          mr: 1,
                          bgcolor: "primary.main",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                      <Button
                        className="dark:text-white"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1, color: "" }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper
                className="dark:bg-darkBg dark:text-white"
                square
                elevation={0}
                sx={{ p: 3 }}
              >
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  See Again
                </Button>
              </Paper>
            )}
          </Box>
        </div>
        <div className="border-t-2 pt-5 md:border-none">
          <WhyChooseUs2 />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
