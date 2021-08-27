import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import { useRouter } from "next/router";

function AddVehicle({ closeAddVehicleModal }) {
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState({
    type: "",
    number: "",
  });

  const addVehicle = () => {
    axios
      .post("http://localhost:3001/api/vehicle", vehicleData)
      .then((response) => {
        if (response.data.success) {
          closeAddVehicleModal();
          // setModalIsOpen(false);
          addSuccess();
        } else {
          addFailed();
        }
      })
      .catch((err) => {
        addFailed();
      });
  };

  const addSuccess = () => {
    toast.success("Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const addFailed = () => {
    toast.error("Failed to Add", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const changeHandler = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div id="vehcileDetails">
        <div>
          <div className="pl-lg-4" style={{ marginTop: "20px" }}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-vehicleType"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="selectVehicleType"
                    className="form-control col-sm-9"
                    name="type"
                    onChange={changeHandler}
                  >
                    <option selected>Select from this select menu</option>
                    <option value="Two Wheeler">Two Wheeler</option>
                    <option value="Four Wheeler">Four Wheeler</option>
                  </select>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-number">
                    Vehicle Number
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="123456789"
                    type="number"
                    name="number"
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              id="addNewVehicle"
              className="btn btn-success"
              // onClick={setModalIsOpenToFalse}
              style={{ margin: "10px" }}
              onClick={addVehicle}
            >
              Add
            </Button>
            <Button
              id="cancelVehicleAdd"
              className="btn btn-danger"
              onClick={closeAddVehicleModal}
              style={{ margin: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddVehicle;
