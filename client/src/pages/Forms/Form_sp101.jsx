import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form_sp101.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFormSP101Data from "../../Context/ContextFormSP101Data";
import SP_101 from './SP_101';
import { submitFormSP101 } from "../../services/Apis";


const Form_sp101 = () => {
  // Define state for items and input values
  const [budgetHead, setBudgetHead] = useState(null);
  const [sanctionedBudget, setSanctionedBudget] = useState(null);
  const [approxCost, setApproxCost] = useState();
  const [items, setItems] = useState([]);
  const [itemDescription, setItemDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited
  const [category, setCategory] = useState();
  const [budgetaryApprovalEnclosed, setBudgetaryApprovalEnclosed] = useState()
  const [readyForInstallation, setReadyForInstallation] = useState()
  const [goodForResearchPurpose, setGoodForResearchPurpose] = useState()
  const [GEM, setGEM] = useState()
  const [gemarDetails, setGemarDetails] = useState()
  const [ptsId, setPtsId] = useState()
  const [modeOfEnquiry, setModeOfEnquiry] = useState()
  const [nameOfSupplier, setNameOfSupplier] = useState()
  const [numberOfQuotation, setNumberOfQuotation] = useState()
  const [quotationNumber, setQuotationNumber] = useState()
  const [modeOfPayment, setModeOfPayment] = useState()
  const [deliveryPeriod, setDeliveryPeriod] = useState();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const { formData, setFormData } = useContext(ContextFormSP101Data);

  //function for handling downloading pdf form
  const handleDownloadPDF = (e) => {
    e.preventDefault();

    //error handling 
    if (budgetHead === null || sanctionedBudget === null) {
      toast.error("All fields are required."); return;
    }
    setFormData({
      budgetHead, sanctionedBudget, approxCost, items, category,
      budgetaryApprovalEnclosed,
      readyForInstallation,
      goodForResearchPurpose,
      GEM,gemarDetails,ptsId,
      modeOfEnquiry,
      nameOfSupplier,
      numberOfQuotation,
      quotationNumber,
      modeOfPayment,
      deliveryPeriod
    });
  }

  useEffect(() => {
    if (formData) {
      SP_101({ formData });
    }
  }, [formData]);

  //function for handling submit click
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    if (budgetHead === null || sanctionedBudget === null) {
      toast.error("All fields are required.");
      setButtonDisabled(false);
      return;
    }
    else {
      try {
        const userName = JSON.parse(localStorage.getItem("userInfo")).name;
        const userId = JSON.parse(localStorage.getItem("userInfo")).id;
        const formCategory = "SP101";
        const inputData = {
          userName,
          userId,
          formCategory,
          budgetHead,
          sanctionedBudget,
          approxCost, items, category,
          budgetaryApprovalEnclosed,
          readyForInstallation,
          goodForResearchPurpose,
          GEM,
          modeOfEnquiry,
          nameOfSupplier,
          numberOfQuotation,
          quotationNumber,
          modeOfPayment,
          deliveryPeriod
        }

        const response = await submitFormSP101(inputData);

        if (response.status === 200) {
          toast.success(response.data.message);

          // setBudgetHead("");
          // setSanctionedBudget("");
          // setApproxCost("");
          // setItems("");
          // setCategory("");
          // setBudgetaryApprovalEnclosed("");
          // setReadyForInstallation("");
          // setGoodForResearchPurpose("");
          // setGEM("");
          // setModeOfEnquiry("");
          // setNameOfSupplier("");
          // setNumberOfQuotation("");
          // setQuotationNumber("");
          // setModeOfPayment("");
          // setDeliveryPeriod("");

        } else {
          toast.error(response.response.data.err);
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      } finally {
        setButtonDisabled(false); // Reset button state here
      }
    }

  }


  // Function to handle adding new item
  const addItem = () => {
    const newItem = {
      itemDescription: itemDescription,
      quantity: quantity,
      price: price,
    };
    if (!itemDescription || !quantity || !price) {
      toast.error("All fields are required.");
      return;
    }
    setItems([...items, newItem]); // Append new item to items array
    // Reset input values
    setItemDescription("");
    setQuantity("");
    setPrice("");
  };

  // Function to handle editing an item
  const editItem = (index) => {
    // Set input values to values of item being edited
    setItemDescription(items[index].itemDescription);
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
    if (!itemDescription || !quantity || !price) {
      toast.error("All fields are required.");
      return;
    }
    const updatedItems = [...items];
    updatedItems[editingIndex] = {
      itemDescription: itemDescription,
      quantity: quantity,
      price: price,
    };
    setItems(updatedItems);
    // Reset input values and editingIndex
    setItemDescription("");
    setQuantity(0);
    setPrice(0);
    setEditingIndex(null);
  };
  return (
    <div>
      <div className="container-formsp101 mt-24">
        <div className="wizard" id="myWizard">
          <section>
            <h4 className="page-title text-center">
              Indent For Purchases Below Rs.25000
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
                        value={budgetHead}
                        onChange={(e) => setBudgetHead(e.target.value)}
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
                        value={sanctionedBudget}
                        onChange={(e) => setSanctionedBudget(e.target.value)}
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
                          placeholder="itemDescription"
                          value={itemDescription}
                          onChange={(e) => setItemDescription(e.target.value)}
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
                      className="btn add-button ml-11 mt-10"
                      onClick={editingIndex !== null ? updateItem : addItem}
                    >
                      {editingIndex !== null ? "Update Item" : "Add Item"}
                    </button>

                    <ul className="">
                      {items.map((item, index) => (
                        <li key={index}>
                          <div className="bg-red ml-4 mt-4 ">
                            <div className="col-sm-4 shadow mt-2">
                              itemDescription: {item.itemDescription}
                            </div>
                            <div className="col-sm-2 mt-2 ml-2 shadow">
                              Quantity: {item.quantity}
                            </div>
                            <div className="col-sm-2 mt-2 shadow">
                              Price: {item.price}
                            </div>
                          </div>
                          {/* Buttons for modifying and deleting items */}
                          <button
                            className="btn add-button bg-cyan-500 hover:bg-cyan-600 ml-8"
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
                        value={approxCost}
                        onChange={(e) => setApproxCost(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  {/* <div className="col-sm-6">
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
                  </div> */}

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="">
                        Category:
                      </label>
                      <select className="form-control input-sm" id="category"
                        onChange={(event) => setCategory(event.target.value)}

                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="LTA">LTA</option>
                        <option value="Consumable">Consumable</option>
                        <option value="Non-Consumable">Npn-Consumable</option>
                      </select>
                    </div>
                  </div>

                  {/* / end col */}
                  <div className="">
                    <div className="my-2 mx-4">
                      Budgetary Approval Enclosed
                      <select
                        className="form-control mt-2 input-sm"
                        id="email-type"
                        onChange={(event) => setBudgetaryApprovalEnclosed(event.target.value)}
                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <div className="my-2 mx-4">
                      Certified that the space is ready for installation of the
                      equipment in Deptt/Centre/Unit on its arrival:-
                      <select
                        className="form-control mt-2 input-sm"
                        id="email-type"
                        onChange={(event) => setReadyForInstallation(event.target.value)}
                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
                  </div>

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
                        onChange={(event) => setGoodForResearchPurpose(event.target.value)}
                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  {/* / end col */}

                  {/* Gem purchase */}
                  <div className="">
                    <div className="my-2 mx-4">
                      GeM Purchase:
                      <select
                        className="form-control mt-2 input-sm"
                        id="email-type"
                        onChange={(event) => setGEM(event.target.value)}
                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>

                      </select>
                    </div>
                  </div>
                  {/* <div className="mx-4 my-2 mt-2 flex">
                    <div className="mode-of-enquiry">Mode of Enquiry :</div>
                    <input className="input-sm form-control " type="text" />
                  </div> */}

                  {
                    (GEM=="No")?
                    <>
                    <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--last">
                        GeMAR Details<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__last"
                        value={gemarDetails}
                        onChange={(e) => setGemarDetails(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="name--last">
                        PTS ID<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="name__last"
                        value={ptsId}
                        onChange={(e) => setPtsId(e.target.value)}
                      />
                    </div>
                  </div>
                    </> 
                    :
                    <></>
                  }

                  <div className="">
                    <div className="my-2 mx-4">
                      Mode of Enquiry:
                      <select
                        className="form-control mt-2 input-sm"
                        id="email-type"
                        onChange={(event) => setModeOfEnquiry(event.target.value)}
                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Telephone">Telephone</option>
                        <option value="Spot Visit">Spot Visit</option>
                        <option value="Vendor's Website">Vendor's Website</option>
                        <option value="E-mail">E-mail</option>
                        <option value="GeM">GeM</option>

                      </select>
                    </div>
                  </div>

                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="quotation ">
                      Number of quotations received :
                    </div>
                    <input
                      onChange={(e) => setNumberOfQuotation(e.target.value)}
                      className="input-sm form-control " type="text" />
                  </div>
                  <div className="mx-4 my-2 mt-2 flex">
                    <div className="quotation ">Name of the supplier :</div>
                    <input className="input-sm form-control "
                      type="text"
                      onChange={(e) => setNameOfSupplier(e.target.value)}
                    />
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
                        onChange={(e) => setQuotationNumber(e.target.value)}
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




                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label modeOfPayment" htmlFor="">
                        Recommended Mode of Payment:
                      </label>
                      <select className="form-control input-sm" id="category"
                        onChange={(event) => setModeOfPayment(event.target.value)}

                      >
                        <option value="" disabled selected>-- Select --</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>

                      </select>
                    </div>
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
                  {/* <div className="col-sm-6">
                    {/* ================= address ================= */}

                  {/* / end col */}

                  {/* / end col */}
                  {/* dob */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="dob">
                        Delivery Period
                      </label>
                      <input
                        type="text"
                        className="js-single-daterange form-control input-sm"
                        onChange={(e) => setDeliveryPeriod(e.target.value)}
                        id="dob"
                      />
                    </div>
                  </div>
                  {/* / end col */}
                  {/* <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="gender">
                        Gender
                      </label>
                      <select className="form-control input-sm" id="gender">
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                    </div>
                  </div> */}
                  {/* / end col */}
                </div>
              </section>
              <section className="text-right">
                <button
                  type="button"
                  className="bg-blue-500 text-white btn-sm hover:bg-blue-700 next"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  className="bg-green-500 text-white btn-sm hover:bg-green-700 ml-4 next"
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
                >
                  Submit
                </button>
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
