import React, { useEffect, useMemo, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
// import MultiSelect from  'react-multiple-select-dropdown-lite'
// import  'react-multiple-select-dropdown-lite/dist/index.css'
import Select from 'react-select';
import "./SearchInvoices.css";
import data from "../DataMock.json";
import dataFilterBy from "../DataMockFilterBy.json";
import dataFilterOperator from "../DataMockFilterOperator.json";
import dataCompany from "../DataMockCompany.json";
import dataFilterOther from "../DataMockFilterOther.json";
import Pagination from "./Pagination";

function SearchInvoices() {
  const [selectedValueOther, setSelectedValueOther] = useState("");

  const  options  = dataFilterOther

  const [invoices, setInvoices] = useState([]);
  // const [listOperator, setListOperator] = useState([{}]);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState([
    { by: "", operator: "", value: "", value1: "", valueOther: [], listOperator: [], dataType: "", Operator: ""},
  ]);
  const [byValues, setByValues] = useState("");
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setInvoices(data);
  }, []);

  const uniqueIds = [];

  const uniqueFilters = formValues.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.by);

    if (!isDuplicate) {
      uniqueIds.push(element.by);

      return true;
    }
    formValues.splice(formValues.indexOf(element), 1);
    return false;
  });


  const handleChangeBy = (i, event) => {
    setByValues(event.target.value);
    let dataTypeBy = dataFilterBy.filter(
      (data) => data.value === event.target.value
    );
    let listDropdownOperator = dataFilterOperator.filter(
      (item) => item.DataType === dataTypeBy[0].Type
    );
    const newFormValues = [...formValues];
    newFormValues[i][event.target.name] = event.target.value;
    newFormValues[i][event.target.dataset.space] = listDropdownOperator;
    setFormValues(newFormValues);
  };

  const handleChangeOperator = (i, event) => {
    let dataTypeBy = dataFilterBy.filter((data) => data.value === byValues);
    
    let dataOperator = dataFilterOperator.filter(
      (item) =>
        item.Operator === event.target.value &&
        item.DataType === dataTypeBy[0].Type
    );
    if(dataOperator[0] !== undefined){
      const newFormValues = [...formValues];
      newFormValues[i][event.target.name] = event.target.value;
      newFormValues[i][event.target.dataset.txt] = dataOperator[0].DataType;
      newFormValues[i][event.target.dataset.space] = dataOperator[0].Operator;
      setFormValues(newFormValues);
    }
  };

  const handleChangeValue = (i, event) => {
    const newFormValuesFilter = [...formValues];
    newFormValuesFilter[i][event.target.name] = event.target.value;
    setFormValues(newFormValuesFilter);
  };

  const handleChangeValue1 = (i, event) => {
    const newFormValuesFilter = [...formValues];
    newFormValuesFilter[i][event.target.name] = event.target.value;
    setFormValues(newFormValuesFilter);
  };

  const  handleChangeValueOther  =  (i, data)  => {
    setSelectedValueOther(data);
    const newFormValuesFilter = [...formValues];
    newFormValuesFilter[i][data[0].name] = data;
    setFormValues(newFormValuesFilter);
  }

  const addFormFields = () => {
    if (formValues.length === 10) {
    } else {
      setFormValues([
        ...formValues,
        { by: "", operator: "", value: "", value1: "", valueOther: [],listOperator: [], dataType: "", Operator: "" },
      ]);
    }
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    if (i !== 0) {
      newFormValues.splice(i, 1);
      setFormValues(newFormValues);
    } else if (i === 0 && newFormValues.length === 1) {
      setFormValues([
        { by: "", operator: "", value: "", value1: "", valueOther: [], listOperator: [], dataType: "", Operator: "" },
      ]);
    } else if (i === 0 && newFormValues.length > 1) {
      newFormValues.shift();
      setFormValues(newFormValues);
    }
  };

  const showData = () => {
    // const valueOther = selectedValueOther.split(",");
    let dataFilted = [];
    const datafilter = uniqueFilters.map((itemFilter) => itemFilter);
    if(datafilter[0].by !== ''){
      data.map((itemX) => {

        datafilter.map((i) => {
          const date = new Date(itemX.Date);
          const date1 = new Date(i.value);
          const date2 = new Date(i.value1);
          if (i.by === "Company") {
            if (itemX.Organisation === i.value) {
              if(dataFilted.indexOf(itemX) < 0){
                dataFilted.push(itemX);
              }
            }
          } else {
            if (i.by === "Date") {
              if (
                i.operator === "between" &&
                date > date1 && date < date2
              ) {
                if(dataFilted.indexOf(itemX) < 0){
                  dataFilted.push(itemX);
                }
              } else {
                if (i.operator === "on or after" && itemX.Date <= i.value) {
                  if(dataFilted.indexOf(itemX) < 0){
                    dataFilted.push(itemX);
                  }
                } else {
                  if (i.operator === "on or before" && itemX.Date >= i.value) {
                    if(dataFilted.indexOf(itemX) < 0){
                      dataFilted.push(itemX);
                    }
                  }
                }
              }
            } else {
              if (i.by === "Amount") {
                if (i.operator === "is" && itemX.Total === i.value) {
                  if(dataFilted.indexOf(itemX) < 0){
                    dataFilted.push(itemX);
                  }
                } else {
                  if (i.operator === "more than" && itemX.Total > i.value) {
                    if(dataFilted.indexOf(itemX) < 0){
                      dataFilted.push(itemX);
                    }
                  } else {
                    if (i.operator === "less than" && itemX.Total < i.value) {
                      if(dataFilted.indexOf(itemX) < 0){
                        dataFilted.push(itemX);
                      }
                    }
                  }
                }
              } else {
                if (i.by === "invoice No") {
                  if (i.operator === "is" && itemX.invoiceNo === i.value) {
                    if(dataFilted.indexOf(itemX) < 0){
                      dataFilted.push(itemX);
                    }
                  } else {
                    if (
                      i.operator === "contains" &&
                      itemX.invoiceNo.includes(i.value)
                    ) {
                      if(dataFilted.indexOf(itemX) < 0){
                        dataFilted.push(itemX);
                      }
                    }
                  }
                } else {
                  if (i.by === "Order No") {
                    if (i.operator === "is" && itemX.orderNo === i.value) {
                      if(dataFilted.indexOf(itemX) < 0){
                        dataFilted.push(itemX);
                      }
                    } else {
                      if (
                        i.operator === "contains" &&
                        itemX.invoiceNo.includes(i.value)
                      ) {
                        if(dataFilted.indexOf(itemX) < 0){
                          dataFilted.push(itemX);
                        }
                      }
                    }
                  } else {
                    if (i.by === "Other"){
                      if(i.operator === "includes"){
                        i.valueOther.map(item => {
                          if(itemX.Invoice_Type.includes(item.value) && item.type === "Invoice_Type"){
                            if(dataFilted.indexOf(itemX) < 0){
                              dataFilted.push(itemX);
                            }
                          }else {
                            if(itemX.IsCleared === item.data && item.type === "IsCleared"){
                              if(dataFilted.indexOf(itemX) < 0){
                                dataFilted.push(itemX);
                              }
                            }else {
                              if(itemX.IsExported === item.data && item.type === "IsExported"){
                                if(dataFilted.indexOf(itemX) < 0){
                                  dataFilted.push(itemX);
                                }
                              }else {
                                if(itemX.IsQuery === item.data && item.type === "IsQuery"){
                                  if(dataFilted.indexOf(itemX) < 0){
                                    dataFilted.push(itemX);
                                  }
                                }else {
                                  if(itemX.Status === item.data && item.type === "Status"){
                                    if(dataFilted.indexOf(itemX) < 0){
                                      dataFilted.push(itemX);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        })                       
                      }
                    }
                  }
                }
              }
            }
          }
        });
      });
      console.log(dataFilted);
      setInvoices(dataFilted);
      setTotalItems(dataFilted.length);
      setCurrentPage(1);
    }else {
      setInvoices(data);
    }
  };

  const invoicesData = useMemo(() => {
    let Invoices = invoices;

    if (search) {
      Invoices = Invoices.filter(
        (comment) =>
          comment.OrderNo.toLowerCase().includes(search.toLowerCase()) ||
          comment.Organisation.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(Invoices.length);

    return Invoices.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [invoices, currentPage, search]);

  return (
    <div>
      <Navbar className="navbar" style={{ marginBottom: 20 }}>
        <p className="text">invoice v</p>
        <div className="col-md-2" style={{ left: "77%" }}>
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
          {uniqueFilters.slice(0, 10).map((element, index) => (
            <div className="form-inline" key={index}>
              <div className="filter-by">
                <label id="by">Filter By:</label>
                <select
                  id="by"
                  name="by"
                  data-space="listOperator"
                  className="filter-by-select"
                  value={element.by}
                  onChange={(e) => handleChangeBy(index, e)}
                >
                  <option value={""}> select your filter by</option>
                  {dataFilterBy.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="filter-operator">
                <label id="operator">Filter Operator:</label>
                <select
                  id="operator"
                  name="operator"
                  data-space="Operator"
                  data-txt="dataType"
                  className="filter-operator-select"
                  value={element.operator}
                  onChange={(e) => handleChangeOperator(index, e)}
                >
                  <option value={""}> select your filter operator</option>
                  {element.listOperator.map((element, index) => (
                    <option key={index}>{element.Operator}</option>
                  ))}
                </select>
              </div>
              {element.dataType === "Hierarchy" ? (
                <div className="filter-value">
                  <label id="value">Filter Value:</label>
                  <select
                    id="value"
                    name="value"
                    className="filter-value-select"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  >
                    <option value={""}> select your filter value</option>
                    {dataCompany.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : element.dataType === "Date" ? (
                element.Operator === "between" ? (
                  <div className="filter-value">
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value"
                      className="filter-value-input"
                      value={element.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    ></input>
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value1"
                      className="filter-value-input"
                      value={element.value1}
                      onChange={(e) => handleChangeValue1(index, e)}
                    ></input>
                  </div>
                ) : (
                  <div className="filter-value">
                    <label id="date">Filter Value:</label>
                    <input
                      type="date"
                      id="value"
                      name="value"
                      className="filter-value-input"
                      value={element.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    ></input>
                  </div>
                )
              ) : element.dataType === "Number" ? (
                <div className="filter-value">
                  <label id="date">Filter Value:</label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    min="1"
                    step="0.01"
                    className="filter-value-input"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  ></input>
                </div>
              ) : element.dataType === "Text" ? (
                <div className="filter-value">
                  <label id="text">Filter Value:</label>
                  <input
                    type="text"
                    id="value"
                    name="value"
                    className="filter-value-input"
                    value={element.value}
                    onChange={(e) => handleChangeValue(index, e)}
                  ></input>
                </div>
              ) : element.dataType === "List" ? (
                <div className="filter-value">
                  <div className="preview-values">
                    <label id="text">Filter Value:</label>
                  </div>
                  <div className="filter-value-other-select">
                    <Select
                      className="basic-multi-select"
                      value={selectedValueOther}
                      name="valueOther"
                      defaultValue={options[0]}
                      onChange={(e) => handleChangeValueOther(index, e)}
                      isMulti
                      options={options}
                    />
                  </div>
                </div>
              ) : (
                <div className="filter-value"></div>
              )}
              <a className="remove" onClick={() => removeFormFields(index)}>
                <span className="glyphicon glyphicon-remove"></span>
              </a>
            </div>
          ))}
          <a className="add-more" onClick={addFormFields}>
            <span className="glyphicon glyphicon-plus">More</span>
          </a>
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
            <th>Invoice_Type</th>
            <th>IsCleared</th>
            <th>IsExported</th>
            <th>IsQuery</th>
            <th>Status</th>
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
              <td>{item.Invoice_Type}</td>
              <td>{item.IsCleared ? <i class="glyphicon glyphicon-ok"></i> : <i class="glyphicon glyphicon-remove"></i>}</td>
              <td>{item.IsExported ? <i class="glyphicon glyphicon-ok"></i> : <i class="glyphicon glyphicon-remove"></i>}</td>
              <td>{item.IsQuery ? <i class="glyphicon glyphicon-ok"></i> : <i class="glyphicon glyphicon-remove"></i>}</td>
              <td>{item.Status}</td>
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
        <Button className="approve">Approve</Button>
        <Button className="unapproved">Unapproved</Button>
      </Navbar>
    </div>
  );
}

export default SearchInvoices;
