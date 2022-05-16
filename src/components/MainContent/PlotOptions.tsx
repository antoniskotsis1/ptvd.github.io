import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { ColorUtils, country_list, indicators } from "../../utils";
import { Generator } from "../../utils/generator";
import { DropDown } from "../DropDown/DropDown";
import styles from "./MainContent.module.scss";

export const PlotOptions: React.FunctionComponent<PlotOptionsProps> = (
  props
) => {
  const { selectedData, setData, triggerPopUp, isCorrelationPlot: isScatter } = props;
  const [countSelections, setCountSelections] = useState([
    { id: 0, country: "Country", indic: "Metric" },
  ]);

  const setSelectedColor = (id: number) => {
    const existsInPlot = selectedData.filter((data: any) => data.id === id);
    return existsInPlot.length ? "bg-warning" : "";
  };
  const renderDropDowns = (
    selectedCountry: string,
    selectedIndicator: string,
    id: number
  ) => (
    <>
      <DropDown
        title={selectedCountry}
        items={country_list}
        setSelectedValue={(name) => {
          setCountSelections(
            countSelections.map((userSelection) => {
              if (userSelection.id === id) {
                return { ...userSelection, country: name };
              } else {
                return { ...userSelection };
              }
            })
          );
        }}
      />

      <DropDown
        title={selectedIndicator}
        items={indicators}
        setSelectedValue={(name) => {
          setCountSelections(
            countSelections.map((sel) => {
              if (sel.id === id) {
                return { ...sel, indic: name };
              } else {
                return { ...sel };
              }
            })
          );
        }}
      />
    </>
  );

  const isEdit = (
    id: number,
    selectedCountry: string,
    selectedIndic: string
  ) => {
    
    const datasToBeEdited = selectedData.filter((data: any) => data.id === id);
    if (datasToBeEdited.length) {
      const neos = selectedData.map((dt: any) => {
        if (dt.label === datasToBeEdited[0].label) {
          return {
            ...dt,
            label: `${selectedCountry} ${selectedIndic}`,
            data: Generator.generateIndicators(),
          };
        } else {
          return dt;
        }
      });

      setData(neos);
      return true;
    }

    return false;
  };

  const checkIfDataExists = (c: string, i: string) => {
    if (selectedData.length !== 0) {
      selectedData.filter((data: any) => {
        if (data.label === `${c} ${i}`) {
          triggerPopUp({ show: true, message: `${c}, ${i} already selected.` });
        } else if (c === "Country" || i === "Metric") {
          triggerPopUp({ show: true, message: "No default values" });
        }
      });
    }else{
        if (c === "Country" || i === "Metric") {
        triggerPopUp({show:true, message:"You have selected the default values."})}
    }

    return selectedData.length !== 0
      ? selectedData.some(
          (data: any) =>
            data.label === `${c} ${i}` || c === "Country" || i === "Metric"
        )
      : c === "Country" || i === "Metric";
  };

  const addDataToPlot = useCallback(
    (id: number, c: string, i: string) => {
      if (!checkIfDataExists(c, i)) {
        if (isEdit(id, c, i)) {
          return;
        }
        const chartColor = ColorUtils.getrandomColor();
        setData([
          ...selectedData,
          {
            id: id,
            label: `${c} ${i}`,
            data: Generator.generateIndicators(),
            backgroundColor: chartColor,
            borderColor: chartColor,
          },
        ]);
      }
    },
    [selectedData]
  );

  const deleteDatasFromPlot = useCallback(
    (id: number, country: string, indic: string) => {
      if (countSelections.length === 1) {
        const newSelection = { id: 0, country: "Country", indic: "Metric" };
        setData([]);
        setCountSelections([newSelection]);
      } else {
        setData(selectedData.filter((data: any) => data.id !== id));
        setCountSelections(
          countSelections.filter((selection) => selection.id !== id)
        );
      }
    },
    [countSelections, selectedData]
  );

  const renderUserSelectionSection = () =>
    countSelections.map((sle: any) => {
      return (
        <div
          className={`d-flex ms-2 mt-2 me-2 ${styles.userOptionItem}${setSelectedColor(sle.id)}`}
          key={sle.id}
        >
          {renderDropDowns(sle.country, sle.indic, sle.id)}
          <div className="d-flex">
            <FontAwesomeIcon
              className="bg-success rounded-circle p-2 me-1"
              role="button"
              onClick={() => addDataToPlot(sle.id, sle.country, sle.indic)}
              icon={faCheck}
            />
            <FontAwesomeIcon
              className="bg-danger rounded-circle p-2 me-1"
              role="button"
              onClick={() =>
                deleteDatasFromPlot(sle.id, sle.country, sle.indic)
              }
              icon={faTimes}
            />
          </div>
        </div>
      );
    });

  return (
    <>
      {renderUserSelectionSection()}
      {isScatter && <div className={`d-flex me-2`}>
        <FontAwesomeIcon
          className={`ms-auto mt-2 p-2 rounded-circle ${styles.addOptionBtn}`}
          icon={faPlus}
          role="button"
          onClick={() =>
            setCountSelections([
              ...countSelections,
              {
                id: countSelections[countSelections.length - 1].id + 1,
                country: "Country",
                indic: "Metric",
              },
            ])
          }
        />
      </div>}
    </>
  );
};

interface PlotOptionsProps {
  selectedData: any;
  setData: (newData: any) => void;
  triggerPopUp: (message: any) => void;
  isCorrelationPlot?: boolean;
}
