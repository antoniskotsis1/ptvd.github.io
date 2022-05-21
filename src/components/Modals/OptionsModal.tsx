import { Button, Checkbox, Divider, Slider, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import styles from "../NavigationBar/NavigationBar.module.scss";
import { Modal } from "react-bootstrap";

export const OptionsModal: React.FunctionComponent<OptionsModalProps> = (
  props
) => {
  const { showModal, handleClose, setRange, setAggregate } = props;
  const [aggregateSelected, setAggregateSelected] = useState(false);
  const [yearsRange, setYearsRange] = useState<number[]>([1960, 2010]);
  const [aggregateBy, setAggregateBy] = useState<number>(0);
  const modalTitle = "Additional plotting options";
  const minYearsDistance = 1;

  const renderYearsRangeSelection = () => {
    return (
      <div>
        Select a range of Years
        <div className="ms-3 text-align-center">
          From: {yearsRange[0]} To: {yearsRange[1]}
        </div>
      </div>
    );
  };

  const handleOnChange = useCallback((e: any) => {
    setAggregateSelected(e.target.checked);
  }, []);
  const renderAggragattedResultsSelection = () => {
    return (
      <div className="mt-3">
        <Checkbox checked={aggregateSelected} onChange={handleOnChange} />
        Aggragate results
        <div className="ms-2">
          {aggregateSelected && (
            <TextField
              id="standard-number"
              label="Years to aggregate by "
              value={aggregateBy}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => setAggregateBy(+e.target.value)}
            />
          )}
        </div>
      </div>
    );
  };

  const rangeSlider = () => {
    return (
      <div className="ms-3 mb-3 d-flex">
        <Slider
          min={1960}
          max={2010}
          value={yearsRange}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>
    );
  };

  const handleSave = () => {
    setRange(yearsRange);
    if (!aggregateSelected) {
      setAggregateBy(0);
      setAggregate(0);
    } else {
      setAggregate(aggregateBy);
    }
    handleClose();
  };

  const renderFooterButtons = () => (
    <div className="d-flex ms-auto">
      <Button onClick={handleClose}>Close</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setYearsRange([
        Math.min(newValue[0], yearsRange[1] - minYearsDistance),
        yearsRange[1],
      ]);
    } else {
      setYearsRange([
        yearsRange[0],
        Math.max(newValue[1], yearsRange[0] + minYearsDistance),
      ]);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={styles.productName}>MDS</span>
          <span className="ms-2">{modalTitle} </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderYearsRangeSelection()}
        {rangeSlider()}
        <Divider />
        {renderAggragattedResultsSelection()}
      </Modal.Body>
      <Modal.Footer>{renderFooterButtons()}</Modal.Footer>
    </Modal>
  );
};

interface OptionsModalProps {
  setRange: (range: number[]) => void;
  setAggregate: (aggregate: number) => void;
  showModal: boolean;
  handleClose: () => void;
}
