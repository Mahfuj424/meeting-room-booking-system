import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const WhyChooseUs2 = () => {
  const steps = [
    {
      title: "Secure Payments",
      description:
        "All transactions are securely processed, protecting your personal and financial information at every step.",
    },
    {
      title: "24/7 Support",
      description:
        "Need help? Our customer support team is available around the clock to assist you with any questions or issues you may encounter.",
    },
    {
      title: "Luxurious Amenities",
      description:
        "Indulge in premium amenities, including complimentary Wi-Fi, room service, and modern facilities to enhance your stay."
    }
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
            sx={{ p: 3,}}
          >
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              onClick={handleReset}
              sx={{ mt: 1, mr: 1, }}
            >
              See Again
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default WhyChooseUs2;
