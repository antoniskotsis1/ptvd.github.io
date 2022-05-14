import React, { useCallback, useState } from "react";
import { DropDown } from "../DropDown/DropDown";
import { ChartDataInterval, ChartType } from "../../types";
import { ColorUtils, country_list, indicators } from "../../utils";
import { BarChart } from "../Charts/BarChart";
import styles from "./MainContent.module.scss";
import { Generator } from "../../utils/generator";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import GOby from "../../assets/GOby.gif";

export const MainContent: React.FunctionComponent = () => {
  const labels = [
    "1960",
    "1961",
    "1962",
    "1963",
    "1964",
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
  ];

  const [data, setData] = useState<ChartDataInterval[]>([]);
  const dataz = {
    labels: labels,
    datasets: data,
  };

  const renderDropDowns = (c: string, i: string, id: number) => (
    <>
      <DropDown
        title={c}
        items={country_list}
        setSelectedValue={(name) => {
          setCountSelections(
            countSelections.map((sel) => {
              if (sel.id === id) {
                return { ...sel, country: name };
              } else {
                return { ...sel };
              }
            })
          );
        }}
      />

      <DropDown
        title={i}
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

  const checkIfDataExists = (c: string, i: string) => {
    // TODO: correct toast message!!!

    return data.length !== 0
      ? data.some(
          (dataObj) =>
            dataObj.label === `${c} ${i}` || c === "Country" || i === "Mertic"
        )
      : c === "Country" || i === "Mertic";
  };
  const [show, setShow] = useState(false);

  const addDataToPlot = useCallback(
    (id: number, c: string, i: string) => {
      if (!isEdit(id, c, i)) {
        if (!checkIfDataExists(c, i)) {
          setData([
            ...data,
            {
              label: `${c} ${i}`,
              data: Generator.generateIndicators(),
              backgroundColor: ColorUtils.getrandomColor(),
            },
          ]);
        } else {
          setShow(true);
        }
      }
    },
    [data]
  );

  const isEdit = (id: number, c: string, i: string) => {
    const mixas = countSelections.filter((sel) => sel.id === id);
    console.log("isEdit+mixas",mixas);
    console.log("isEdit+data",data);

    
    if (data.length && mixas.length) {
      console.log("isEdit?", mixas[0].country !== c || mixas[0].indic !== i);

      setData(
        data.map((dt) => {
          if (dt.label === `${mixas[0].country} ${mixas[0].indic}`) {
            return { ...dt, label: `${c} ${i}`, data: Generator.generateIndicators() };
          } else {
            return dt;
          }
        })
      );
      return true;
    }
    return false;
  };

  const renderToast = () => (
    <Toast
      className="position-absolute top-0 start-50 bg-warning"
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Blaka</strong>
      </Toast.Header>
      <Toast.Body>You have already selected these values!</Toast.Body>
    </Toast>
  );
  const [countSelections, setCountSelections] = useState([
    { id: 0, country: "Country", indic: "Metric" },
  ]);

  const deleteDatasFromPlot = useCallback(
    (id: number, country: string, indic: string) => {
      if (countSelections.length === 1) {
        const newSelection = { id: 0, country: "Country", indic: "Metric" };
        setData([]);
        setCountSelections([newSelection]);
      } else {
        setData(
          data.filter((datawe) => datawe.label !== `${country} ${indic}`)
        );
        setCountSelections(
          countSelections.filter((selection) => selection.id !== id)
        );
      }
    },
    [countSelections, data]
  );

  const renderUserSelectionSection = () =>
    countSelections.map((sle: any) => {
      return (
        <div className="d-flex ms-2 mt-2" key={sle.id}>
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

  const renderUserOptions = () => (
    <>
      {renderUserSelectionSection()}
      <div className="me-auto">
        <FontAwesomeIcon
          className="ms-2"
          icon={faPlus}
          size={"2x"}
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
      </div>
    </>
  );

  return (
    <div className={styles.mainContentContainer}>
      {renderToast()}
      <div className={styles.userOptions}>{renderUserOptions()}</div>
      {dataz.datasets.length ? (
        <BarChart data={dataz} type={ChartType.Bar} />
      ) : (
        <div className="d-flex w-100 h-100 justify-content-center">
          <img src={GOby} />
        </div>
      )}
    </div>
  );
};

export default MainContent;
