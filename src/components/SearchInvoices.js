import React, { useEffect, useMemo, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import "./SearchInvoices.css";
import data from "../DataMock.json";
import dataFilterBy from "../DataMockFilterBy.json";
import dataFilterOperator from "../DataMockFilterOperator.json";
import dataCompany from "../DataMockCompany.json";
import Pagination from "./Pagination";

function SearchInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [listOperator, setListOperator] = useState([]);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState([{ by: "", operator: "", value:"" }]);
  const [byValues, setByValues] = useState(dataFilterBy[0].value)
  // const [operatorValues, setOperatorValues] = useState("");
  const [Values, setValues] = useState("");
  const [dataType, setDataType] = useState("");
  const [Operator, setOperator] = useState("");
  // const [formValuesValue, setValues] = useState("");
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setInvoices(data);
  }, []);

  const handleChangeBy = (i, event) => {

    setByValues(event.target.value);
    let dataTypeBy = dataFilterBy.filter(data => data.value === event.target.value) 
    let listDropdownOperator = dataFilterOperator.filter((item) => item.DataType === dataTypeBy[0].Type)
    const newFormValues = [...formValues];
    newFormValues[i][event.target.name] = event.target.value;
    console.log(i);
    setFormValues(newFormValues);
    const newListOperater = [...listOperator];
    newListOperater[i] = listDropdownOperator;
    console.log(newListOperater[i]);
    setFormValues(newFormValues);
    setListOperator(newListOperater[i]);
    console.log(listOperator);
    // if(listDropdownOperator.length === 1) {
    //   handleChangeOperator(listDropdownOperator[0].Operator);
    // }
  };

  const handleChangeOperator = (i, event) => {
    let dataTypeBy = dataFilterBy.filter(data => data.value === byValues);
    console.log(dataTypeBy[0].Type);
    let dataOperator = dataFilterOperator.filter((item) => item.Operator === event.target.value && item.DataType === dataTypeBy[0].Type)
    // setOperatorValues(event.target.value);
    console.log(dataOperator);
    // setDataType(dataOperator[0].DataType);
    // setOperator(dataOperator[0].Operator);
    const newFormValues = [...formValues];
    newFormValues[i][event.target.name] = event.target.value;
    setFormValues(newFormValues);
    const DataType = [...dataType];
    DataType[i] = dataOperator[0].DataType;
    setDataType(DataType[i]);
    const NewOperator = [...Operator];
    NewOperator[i] = dataOperator[0].Operator;
    setOperator(NewOperator[i]);
    // setFormValue(dataOperator[0].DataType);
  };


  const handleChangeValue = (i, event) => {
    setValues(event.target.value)
    const newFormValuesFilter = [...formValues];
    newFormValuesFilter[i][event.target.name] = event.target.value;
    setFormValues(newFormValuesFilter);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { by: "", operator: "", value:"" }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    if (i !== 0) {
      newFormValues.splice(i, 1);
      setFormValues(newFormValues);
    } else if (i === 0 && newFormValues.length === 1) {
      setFormValues([{ by: "", operator: "", value:"" }]);
    } else if (i === 0 && newFormValues.length > 1) {
      newFormValues.shift();
      setFormValues(newFormValues);
    }
  };

  const showData = () => {
    alert(JSON.stringify(formValues));
  };

  const invoicesData = useMemo(() => {
    let computedInvoices = invoices;

    if (search){
      computedInvoices = computedInvoices.filter(
        comment => 
        comment.OrderNo.toLowerCase().includes(search.toLowerCase()) || 
        comment.Organisation.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedInvoices.length);

    return computedInvoices.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [invoices, currentPage, search]);
  
  return (
    <div>
      <Navbar className="navbar" style={{ marginBottom: 20 }}>
        <p className="text">invoice v</p>
        <div className="col-md-2" style={{ marginLeft: "77%" }}>
          <input
            className="form-control"
            type="search"
            placeholder="search..."
            id="valueInput"
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="glyphicon glyphicon-search"></span>
        </div>
      </Navbar>
      <div className="container-radio-arrow">
        <div className="container-radio">
          <input
            className="radio1"
            type="radio"
            value="Invoices"
            name="Invoices"
            defaultChecked={true}
          />
          <label className="name-radio1">Invoices</label>
          <input
            className="radio2"
            type="radio"
            value="Unpublished Invoices"
            name="Invoices"
          />
          <label className="name-radio2">Unpublished Invoices</label>
        </div>
        <Button
          className="button-arrow"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <span className="icon-arrow">
            <i
              className={
                open === false ? "fas fa-angle-down" : "fas fa-angle-up"
              }
            ></i>
          </span>
        </Button>
      </div>
      <Collapse in={open}>
        <div className="filter-container">
          {formValues.map((element, index) => (
            <div
              className="form-inline"
               key={index}
            >
              <div className="filter-by">
                <label id="by">Filter By:</label>
                <select
                  id="by"
                  name="by"
                  className="filter-by-select"
                  value={element.by}
                  onChange={(e) => handleChangeBy(index, e)}
                >
                  {dataFilterBy.map((item) => (
                    <option key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-operator">
                <label id="operator">Filter Operator:</label>
                <select
                  id="operator"
                  name="operator"
                  className="filter-operator-select"
                  value={element.operator}
                  onChange={(e) => handleChangeOperator(index, e)}
                >
                  {listOperator.map((element, index) => (
                    <option key={index}>
                      {element.Operator}
                    </option>
                  ))}
                </select>
              </div>
              {dataType === "Hierarchy" ? (
                <div className="filter-value">
                  <label id="value">Filter Value:</label>
                  <select
                    id="value"
                    name="value"
                    className="filter-value-select"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  >
                    {dataCompany.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.Operator}
                      </option>
                    ))}
                  </select>
                </div>
              ) : dataType === "Date" ? (
                Operator === "between" ? (
                  <div className="filter-value">
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value"
                      value={element.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    ></input>
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value"
                      value={element.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    ></input>
                  </div>
                ) : (
                  <div className="filter-value">
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value"
                      value={element.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    ></input>
                  </div>
                )
              ) : dataType === "Number" ? (
                <div className="filter-value">
                  <label id="date">Filter Value:</label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    min="1"
                    step="0.01"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  ></input>
                </div>
              ) : dataType === "Text" ? (
                <div className="filter-value">
                  <label id="text">Filter Value:</label>
                  <input
                    type="text"
                    id="value"
                    name="value"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  ></input>
                </div>
              ) : (
                <div className="filter-value">
                  <label id="value">Filter Value:</label>
                  <select
                    id="value"
                    name="value"
                    className="filter-value-select"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  >
                    {dataCompany.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.Operator}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => removeFormFields(index)}
            >
              x
            </button>
            </div>
          ))}
          <button
          type="button"
          className="btn btn-primary"
          onClick={addFormFields}
        >
          Add More
        </button>
          <Button className="submit-filter" type="submit" onClick={showData}>
            Search
          </Button>
        </div>
      </Collapse>

      <Table>
        <thead>
          <tr>
            <th>
              <input id="mac" type="checkbox" />
            </th>
            <th>stt</th>
            <th>invoiceNo</th>
            <th>OrderNo</th>
            <th>Date</th>
            <th>Organisation</th>
            <th>Net</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoicesData.map((item, index) => (
            <tr key={index}>
              <td>
                <input id="mac" type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{item.invoiceNo}</td>
              <td>{item.OrderNo}</td>
              <td>{item.Date}</td>
              <td>{item.Organisation}</td>
              <td>{item.Net}</td>
              <td>{item.Tax}</td>
              <td>{item.Total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Pagination
          total={totalItems}
          itemPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Navbar className="button-group col-sm-2">
        <Button className="approve">approve</Button>
        <Button className="unapproved">unapproved</Button>
      </Navbar>
    </div>
  );
}

export default SearchInvoices;
