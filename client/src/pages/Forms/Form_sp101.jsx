import React, { useState } from "react";
import "./Form_sp101.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Different option sets for dropdown boxes
 */
const option1 = [
  { key: "A", text: "Yes" },
  { key: "B", text: "No" },
];
const option2 = [
  { key: "A", text: "Yes" },
  { key: "B", text: "No" },
  { key: "C", text: "N/A" },
];
const option3 = [
  { key: "A", text: "Telephone" },
  { key: "B", text: "E-mail" },
  { key: "C", text: "Spot Visit" },
  { key: "D", text: `Vendor's Website` },
  { key: "E", text: "GEM" },
];
const option4 = [
  { key: "A", text: "Consumables" },
  { key: "B", text: "LTA" },
  { key: "C", text: "Non-Consumables" },
  { key: "D", text: "Services" },
];

const Form_sp101 = () => {
  // Define state for items and input values
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited

  // Function to handle adding new item
  const addItem = () => {

    const newItem = {
      description: description,
      quantity: quantity,
      price: price,
    };
    if (!description || !quantity || !price) {
        toast.error('All fields are required.');
        return;
    }
    setItems([...items, newItem]); // Append new item to items array
    // Reset input values
    setDescription("");
    setQuantity("");
    setPrice("");
  };

  // Function to handle editing an item
  const editItem = (index) => {
    
    // Set input values to values of item being edited
    setDescription(items[index].description);
    setQuantity(items[index].quantity);
    setPrice(items[index].price);
    setEditingIndex(index);
  };

  // Function to handle deleting an item
  const deleteItem = (index) => {
    // Filter out the item at the given index
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  // Function to handle updating an item
  const updateItem = () => {
    if (!description || !quantity || !price) {
        toast.error('All fields are required.');
        return;
    }
    const updatedItems = [...items];
    updatedItems[editingIndex] = {
      description: description,
      quantity: quantity,
      price: price,
    };
    setItems(updatedItems);
    // Reset input values and editingIndex
    setDescription("");
    setQuantity(0);
    setPrice(0);
    setEditingIndex(null);
  };
  return (
    <div>
      <div className="container-formsp101">
        <div className="wizard" id="myWizard">
          <section>
            <h4 className="page-title text-center">
              Indent for Purchases below Rs.25000
            </h4>
          </section>
          <div className="wizard__progress">
            <ul className="wizard__labels nav nav-tabs">
              <li style={{ width: "25%" }} className="col-xs-12 active">
                {/* <a href="#create-assignment" data-toggle="tab" data-step={1}>
            <i className="fa fa-folder-open wizard__icon" /> Create Assignment
          </a> */}
              </li>
              {/* <li style={{ width: "25%" }} className="col-xs-12 ">
          <a href="#associate-info" data-toggle="tab" data-step={2}>
            <i className="fa fa-user wizard__icon" /> Associate Info
          </a>
        </li>
        <li style={{ width: "25%" }} className="col-xs-12 ">
          <a href="#working-conditions" data-toggle="tab" data-step={3}>
            <i className="fa fa-file-text-o wizard__icon" /> Working Conditions
          </a>
        </li>
        <li style={{ width: "25%" }} className="col-xs-12 " id="lastli">
          <a href="#validate" data-toggle="tab" data-step={4}>
            <i className="fa fa-check wizard__icon" /> Validate
          </a>
        </li> */}
            </ul>
            <div className="progress">
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
                aria-valuenow={1}
                aria-valuemin={1}
                aria-valuemax={5}
                style={{ width: "100%" }}
              >
                {" "}
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade in active" id="create-assignment">
              <section>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--first">
                        {" "}
                        Budget Head<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__first"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--last">
                        Sanctioned Budget<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__last"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  {/* Add and delete new items for purchase  */}
                  <div className="row ">
                    <div className="col-sm-4 ">
                      <div className="">
                        <label
                          className="control-label ml-4 "
                          htmlFor="name--last"
                        >
                          Description<span className="required">*</span>
                        </label>
                        <input
                          className="form-control input-sm add-button-input"
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <label
                        className="control-label ml-4"
                        htmlFor="name--last"
                      >
                        Quantity<span className="required">*</span>
                      </label>
                      <input
                        className="form-control input-sm add-button-input"
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="col-sm-2">
                      <label
                        className="control-label ml-4"
                        htmlFor="name--last"
                      >
                        Price<span className="required">*</span>
                      </label>
                      <input
                        className="form-control input-sm add-button-input"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                      />
                    </div>
                    <button
                      className="btn add-button ml-11 mt-7"
                      onClick={editingIndex !== null ? updateItem : addItem}
                    >
                      {editingIndex !== null ? "Update Item" : "Add Item"}
                    </button>

                    <ul className="">
                      {items.map((item, index) => (
                        <li key={index}>
                          <div className="bg-red ml-4 mt-2 ">
                            <div className="col-sm-4 shadow">
                              Description: {item.description}
                            </div>
                            <div className="col-sm-2 ml-2 shadow">
                              Quantity: {item.quantity}
                            </div>
                            <div className="col-sm-2 shadow">
                              Price: {item.price}
                            </div>
                          </div>
                          {/* Buttons for modifying and deleting items */}
                          <button
                            className="btn add-button bg-cyan-500 hover:bg-cyan-600 "
                            onClick={() => editItem(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn add-button bg-sky-500 "
                            onClick={() => deleteItem(index)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--first">
                        {" "}
                        Approx Cost:<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__first--kana"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--last">
                        Category:
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__last--kana"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="">
                    <div className="my-2 mx-4">
                      If required for Research Purpose then Certificate for
                      claiming concessional GST under notification no. 45/2017 &
                      47/2017: Certified that purchase of above goods for which
                      concessional GST is claimed is required for research
                      purpose only.
                      <select
                        className="form-control mt-2 input-sm"
                        id="email-type"
                      >
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}

                  {/* Gem purchase */}
                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="gem">GEM Purchase :</div>
                    <input className="input-sm form-control " type="text" />
                  </div>

                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="mode-of-enquiry">Mode of Enquiry :</div>
                    <input className="input-sm form-control " type="text" />
                  </div>

                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="quotation ">
                      Number of quotations received :
                    </div>
                    <input className="input-sm form-control " type="text" />
                  </div>
                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="quotation ">Name of the supplier :</div>
                    <input className="input-sm form-control " type="text" />
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="email">
                        Quotation Number
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="email"
                      />
                    </div>
                  </div>
                  {/* / end col */}

                  {/* / end col */}
                  <div className="col-sm-2">
                    <div className="form-group">
                      <label className="control-label" htmlFor="phone">
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control input-sm"
                        id="phone"
                      />
                    </div>
                  </div>
                  {/* / end col */}

                  <div className="mx-4 my-2 mt-22 flex flex-col">
                    <div className="quotation mb-2">
                      Recommended Mode of Payment:
                    </div>
                    <input className="input-sm form-control" type="text" />
                  </div>

                  <div className="text-left">
                    <div className="text-left"></div>
                  </div>

                  {/* {/* <div className="col-sm-3">
              <div className="form-group">
                <label className="control-label" htmlFor="address-type">
                  Address Type{" "}
                </label>
                <select className="form-control input-sm" id="address-type">
                  <option value="">Home</option>
                  <option value="">Administrative</option>
                </select>
              </div>
            </div> */}
                  {/* / end col */}
                  {/* <div className="col-sm-3">
              {/* ================= country ================= */}
                  {/* <div className="form-group">
                <label className="control-label" htmlFor="country">
                  Country
                </label>
                <select className="form-control input-sm" id="country">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Italy</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Japan</option>
                </select>
              </div>
            </div>  

             */}
                  {/* / end col */}
                  <div className="col-sm-6">
                    {/* ================= address ================= */}
                    <div className="form-group">
                      <label className="control-label" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="address"
                      />
                      <button
                        className="help-block btn btn-link btn-sm pull-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#address--manual1"
                        aria-expanded="false"
                        aria-controls="address--manual1"
                      >
                        Can't find your address? Enter manually.
                      </button>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-xs-12">
                    <div
                      className="collapse space-bottom-lg"
                      id="address--manual1"
                    >
                      <div className="row">
                        <div className="col-xs-12">
                          {/* ================= address ================= */}
                          <div className="form-group">
                            <label className="control-label" htmlFor="address">
                              Address
                            </label>
                            <textarea
                              className="form-control input-sm"
                              rows={3}
                              id="address"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        {/* / end col */}
                        <div className="col-sm-4">
                          {/* ================= city ================= */}
                          <div className="form-group">
                            <label
                              className="control-label"
                              htmlFor="info--city"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              id="info--city"
                              placeholder="city"
                            />
                          </div>
                        </div>
                        {/* / end col */}
                        <div className="col-sm-4">
                          {/* ================= county ================= */}
                          <div className="form-group">
                            <label
                              className="control-label"
                              htmlFor="info--country"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              id="info--country"
                              placeholder="country"
                            />
                          </div>
                        </div>
                        {/* / end col */}
                        <div className="col-sm-4">
                          {/* ================= postal ================= */}
                          <div className="form-group">
                            <label
                              className="control-label"
                              htmlFor="postal--code"
                            >
                              Postal Code
                            </label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              id="postal--code"
                              placeholder="Postal Code"
                            />
                          </div>
                        </div>
                        {/* / end col */}
                      </div>
                    </div>
                    {/* / end collapse */}
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        className="js-single-daterange form-control input-sm"
                        id="dob"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="gender">
                        Gender
                      </label>
                      <select className="form-control input-sm" id="gender">
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                </div>
              </section>
              <section className="text-right">
                <button type="button" className="btn btn-primary btn-sm next">
                  Continue
                </button>
              </section>
            </div>
            <div className="tab-pane fade" id="associate-info">
              <section>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label className="control-label" htmlFor="nid-type">
                        National ID Type{" "}
                      </label>
                      <select className="form-control input-sm" id="nid-type">
                        <option value="">Type 1</option>
                        <option value="">Type 2</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-3">
                    {/* ================= country ================= */}
                    <div className="form-group">
                      <label className="control-label" htmlFor="nid-country">
                        National ID Country
                      </label>
                      <select
                        className="form-control input-sm"
                        id="nid-country"
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Italy</option>
                        <option>France</option>
                        <option>Spain</option>
                        <option>Japan</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    {/* ================= address ================= */}
                    <div className="form-group">
                      <label className="control-label" htmlFor="nid">
                        National ID Number
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="nid"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-xs-12" id="enter-id">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label className="control-label" htmlFor="nid-type">
                            National ID Type{" "}
                          </label>
                          <select
                            className="form-control input-sm"
                            id="nid-type"
                          >
                            <option value="">Type 1</option>
                            <option value="">Type 2</option>
                          </select>
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-3">
                        {/* ================= country ================= */}
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="nid-country"
                          >
                            National ID Country
                          </label>
                          <select
                            className="form-control input-sm"
                            id="nid-country"
                          >
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Italy</option>
                            <option>France</option>
                            <option>Spain</option>
                            <option>Japan</option>
                          </select>
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-6">
                        {/* ================= address ================= */}
                        <div className="form-group">
                          <label className="control-label" htmlFor="nid">
                            National ID Number
                          </label>
                          <input
                            type="text"
                            className="form-control input-sm"
                            id="nid"
                          />
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label className="control-label" htmlFor="nid-type">
                            National ID Type{" "}
                          </label>
                          <select
                            className="form-control input-sm"
                            id="nid-type"
                          >
                            <option value="">Type 1</option>
                            <option value="">Type 2</option>
                          </select>
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-3">
                        {/* ================= country ================= */}
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="nid-country"
                          >
                            National ID Country
                          </label>
                          <select
                            className="form-control input-sm"
                            id="nid-country"
                          >
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Italy</option>
                            <option>France</option>
                            <option>Spain</option>
                            <option>Japan</option>
                          </select>
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-6">
                        {/* ================= address ================= */}
                        <div className="form-group">
                          <label className="control-label" htmlFor="nid">
                            National ID Number
                          </label>
                          <input
                            type="text"
                            className="form-control input-sm"
                            id="nid"
                          />
                        </div>
                      </div>
                      {/* / end col */}
                    </div>
                    <hr className="section-divider" />
                  </div>
                  {/* end enter id*/}
                  <div className="col-sm-6">
                    {/* ================= country ================= */}
                    <div className="form-group">
                      <label className="control-label" htmlFor="birth-country">
                        Birth Country
                      </label>
                      <select
                        className="form-control input-sm"
                        id="birth-country"
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Italy</option>
                        <option>France</option>
                        <option>Spain</option>
                        <option>Japan</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="marital-status">
                        Marital Status{" "}
                      </label>
                      <select
                        className="form-control input-sm"
                        id="marital-status"
                      >
                        <option value="">Single</option>
                        <option value="">Married</option>
                        <option value="">Divorced</option>
                        <option value="">Widowed</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                </div>
                {/* / end row */}
              </section>
              <section className="text-right">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  id="submit-id-button"
                >
                  Submit National ID
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm next"
                  disabled=""
                  id="enter-id-button"
                >
                  Continue
                </button>
              </section>
            </div>
            <div className="tab-pane fade" id="working-conditions">
              <section>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="start-date">
                        Start Date
                      </label>
                      <input
                        type="text"
                        className="js-single-daterange form-control input-sm"
                        id="start-date"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="end-date">
                        End Date
                      </label>
                      <input
                        type="text"
                        className="js-single-daterange form-control input-sm"
                        id="end-date"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label" htmlFor="agreed-salary">
                        Agreed Salary
                      </label>
                      <input
                        type="number"
                        className="form-control input-sm"
                        id="agreed-salary"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label" htmlFor="currency">
                        Curency
                      </label>
                      <select className="form-control input-sm" id="currency">
                        <option value="">$</option>
                        <option value="">€</option>
                        <option value="">₤</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label" htmlFor="timescale">
                        Time Scale
                      </label>
                      <select className="form-control input-sm" id="timescale">
                        <option value="">Day</option>
                        <option value="">Week</option>
                        <option value="">Month</option>
                        <option value="">Year</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="control-label" htmlFor="note">
                        Add a Note for Candidate Placement
                      </label>
                      <textarea
                        className="form-control input-sm"
                        id="note"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {/* / end col */}
                </div>
              </section>
              <section className="text-right">
                <button
                  type="button"
                  className="btn btn-primary btn-sm next"
                  id="last"
                >
                  Continue
                </button>
              </section>
            </div>
            <div className="tab-pane fade" id="validate">
              <section>
                <div className="alerts--child alerts--success">
                  <div className="alerts__icon">
                    <i className="fa fa-check" />
                  </div>
                  <div className="alerts__text">
                    <span className="alerts__type">Success: </span>You've
                    created an assignment!
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Form_sp101;
