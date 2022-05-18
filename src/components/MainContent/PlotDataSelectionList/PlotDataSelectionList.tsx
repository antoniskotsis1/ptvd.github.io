import {
  faBook,
  faCog,
  faE,
  faEllipsisH,
  faPen,
  faPlay,
  faPlus,
  faTrash,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ColorUtils, country_list, indicators } from "../../../utils";
import { Generator } from "../../../utils/generator";
import { DropDown } from "../../DropDown/DropDown";
import { InfoModal } from "../../Modals";
import styles from "../MainContent.module.scss";

export const PlotDataSelectionList: React.FunctionComponent<
  PlotOptionsProps
> = (props) => {
  const { selectedData, setData, triggerPopUp, isCorrelationPlot } = props;
  const [selectionItem, setSelectionItem] = useState([
    { id: 0, country: "Country", indic: "Metric" },
  ]);
  const [modal, showModal] = useState({ bd: "", show: false });

  // const setSelectedColor = (id: number) => {
  //   const existsInPlot = selectedData.filter((data: any) => data.id === id);
  //   return existsInPlot.length ? "bg-warning" : "";
  // };

  const getPlotIcon = (id: number) => {
    const existsInPlot = selectedData.filter((data: any) => data.id === id);
    return existsInPlot.length ? faPen : faPlay;
  };

  const isEdit = useCallback(
    (id: number, selectedCountry: string, selectedIndic: string) => {
      const datasToBeEdited = selectedData.filter(
        (data: any) => data.id === id
      );
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
    },
    [selectedData, setData]
  );

  const checkIfDataExists = useCallback(
    (c: string, i: string) => {
      if (selectedData.length !== 0) {
        selectedData.forEach((data: any) => {
          if (data.label === `${c} ${i}`) {
            triggerPopUp({
              show: true,
              message: `${c}, ${i} already selected.`,
            });
          } else if (c === "Country" || i === "Metric") {
            triggerPopUp({ show: true, message: "No default values" });
          }
        });
      }
      else {
        if (c === "Country" || i === "Metric") {
          triggerPopUp({
            show: true,
            message: "You have selected the default values.",
          });
        }
      }

      return selectedData.length !== 0
        ? selectedData.some(
            (data: any) =>
              data.label === `${c} ${i}` || c === "Country" || i === "Metric"
          )
        : c === "Country" || i === "Metric";
    },
    [selectedData, triggerPopUp]
  );

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
    [checkIfDataExists, isEdit, selectedData, setData]
  );

  const deleteDatasFromPlot = useCallback(
    (id: number, country: string, indic: string) => {
      if (selectionItem.length === 1) {
        const newSelection = { id: 0, country: "Country", indic: "Metric" };
        setData([]);
        setSelectionItem([newSelection]);
      } else {
        setData(selectedData.filter((data: any) => data.id !== id));
        setSelectionItem(
          selectionItem.filter((selection) => selection.id !== id)
        );
      }
    },
    [selectionItem, selectedData, setData]
  );

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
          setSelectionItem(
            selectionItem.map((userSelection) => {
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
          setSelectionItem(
            selectionItem.map((sel) => {
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

  const renderUserSelectionSection = () =>
    selectionItem.map((sle: any) => {
      return (
        <div
          className={`d-flex ms-2 mt-2 me-2 ${styles.userOptionItem}`}
          key={sle.id}
        >
          {renderDropDowns(sle.country, sle.indic, sle.id)}
          
          <div className="d-flex">
            <FontAwesomeIcon
              className={`${styles.moreOptions} p-2 me-1`}
              role="button"
              onClick={() => addDataToPlot(sle.id, sle.country, sle.indic)}
              icon={getPlotIcon(sle.id)}
            />

            {renderOptions(sle)}
          </div>
        </div>
    );
    });

  const renderOptions = (sle: any) => (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="bottom"
      overlay={
        <Popover id="popover-basic">
          {renderLongDescriptionButton(sle)}
          {renderDeleteButton(sle)}
        </Popover>
      }
    >
      <div role={"button"} className={styles.moreOptions}>
        <FontAwesomeIcon icon={faUserCog} />
      </div>
    </OverlayTrigger>
  );

  const renderLongDescriptionButton = (sle: any) => (
    <div
      className={`${styles.moreOptionsItem} ${
        sle.indic === "Metric" ? "pe-none text-muted" : ""
      }`}
      role="button"
      onClick={() =>
        showModal({
          bd: `This is a long description about ${sle.indic}`,
          show: true,
        })
      }
    >
      <FontAwesomeIcon icon={faBook} />
      <span className="ms-2">Description</span>
    </div>
  );

  const renderDeleteButton = (sle: any) => (
    <div
      className={`${styles.moreOptionsItem} ${styles.delete}`}
      role="button"
      onClick={() => deleteDatasFromPlot(sle.id, sle.country, sle.indic)}
    >
      <FontAwesomeIcon icon={faTrash} />
      <span className="ms-2">Delete</span>
    </div>
  );

  return (
    <>
      {renderUserSelectionSection()}

      <InfoModal
        handleClose={() => showModal({ bd: "", show: false })}
        modalBody={modal.bd}
        showModal={modal.show}
        modalTitle={"Title"}
      />
      {isCorrelationPlot && (
        <div className={`d-flex me-2`}>
          <FontAwesomeIcon
            className={`ms-auto mt-2 p-2 rounded-circle ${styles.addOptionBtn}`}
            icon={faPlus}
            role="button"
            onClick={() =>
              setSelectionItem([
                ...selectionItem,
                {
                  id: selectionItem[selectionItem.length - 1].id + 1,
                  country: "Country",
                  indic: "Metric",
                },
              ])
            }
          />
        </div>
      )}
    </>
  );
};

interface PlotOptionsProps {
  selectedData: any;
  setData: (newData: any) => void;
  triggerPopUp: (message: any) => void;
  isCorrelationPlot?: boolean;
}
