import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import inst_1 from "../../assets/inst_1.jpg";
import inst_2 from "../../assets/inst_2.jpg";

import inst_3 from "../../assets/inst_3.jpg";

const steps = [
  {
    label: "Select Chart family and chart type",
    description: `Select between time/trend line, where you can add multiple countries and multiple merics in the same chart,
    and correlation plot to see how two different metrics affect each other in a scatter plot.`,
    icon: inst_1,
  },
  {
    label: "Additional plotting options",
    description:
      "By clicking on the cog icon you can see the additional options that our API provides. These are the selection of a time range and the aggreation of the results by k years",
    icon: inst_2,
  },
  {
    label: "Select the data you want",
    description: `After you' ve made your choice, you can select from the sidebar that will appear to get the data that you need. By clicking the plus icon you can add more data and by hovering
    to the left side of the app the selection section appears again. Enjoy our app!!`,
    icon: inst_3,
  },
];

export const InstructionsModal: React.FunctionComponent<
  InstructionsModalProps
> = (props) => {
  const { showModal, handleClose } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Modal calssName="d-flex" show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> Welcome to MDS's plotting solution</Modal.Title>
      </Modal.Header>
      <Box
        sx={{
          maxWidth: 400,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
          {steps[activeStep].description}
        </Box>
        <img src={steps[activeStep]?.icon} alt="InstructionImages" />
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <FontAwesomeIcon icon={faCaretLeft} />
              ) : (
                <FontAwesomeIcon icon={faCaretRight} />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <FontAwesomeIcon icon={faCaretRight} />
              ) : (
                <FontAwesomeIcon icon={faCaretLeft} />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Modal>
  );
};

interface InstructionsModalProps {
  showModal: boolean;
  handleClose: () => void;
}
