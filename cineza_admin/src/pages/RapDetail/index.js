import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import Alert from "../../components/Alert";
import "./rapDetail.css";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
import axios from "axios";
registerLocale("vi", vi);

const dataStatus = [
  { id: "ACTIVE", value: "ACTIVE" },
  { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
  { id: "DESTROY", value: "DESTROY" },
];

const RapDetail = ({ codeRapBy, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [numberRap, setNumberRap] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [status, setStatus] = useState("");

  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  //time picker
  const [time, setTime] = useState("");
  // const handleTimeChange = (momentObj) => {
  //   setTime(momentObj.format("HH:mm"));
  // };

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxCountry = (event) => {
    setCountryId(event.target.value);
  };
  const handleChangeComboboxCity = (event) => {
    setCityId(event.target.value);
  };
  const handleChangeComboboxDistrict = (event) => {
    setDistrictId(event.target.value);
  };
  const handleChangeComboboxWard = (event) => {
    setWardId(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleName = (text) => {
    setName(text.target.value);
  };

  const onChangeHandleNumberRap = (text) => {
    setNumberRap(text.target.value);
  };
  const onChangeHandleOpenTime = (text) => {
    setOpenTime(text);
    // console.log(text);
  };
  const onChangeHandleCloseTime = (text) => {
    setCloseTime(text);
    // console.log(text);
  };

  useEffect(() => {
    const getRap = async () => {
      const result = await axios.get(
        `http://localhost:9000/cineza/api/v1/rap/get-by-code/${codeRapBy}`
      );
      if (result.status === 200) {
        // const [country, setCountry] = useState([]);
        // const [countryId, setCountryId] = useState("");
        // const [city, setCity] = useState([]);
        // const [cityId, setCityId] = useState("");
        // const [district, setDistrict] = useState([]);
        // const [districtId, setDistrictId] = useState("");
        // const [ward, setWard] = useState([]);
        // const [wardId, setWardId] = useState("");
        setCode(result.data.code);
        setName(result.data.name);
        setNumberRap(result.data.numberRap);
        setOpenTime(result.data.openTime);
        setCloseTime(result.data.closeTime);
        setStatus(result.data.status);

        setCountryId(result.data.countryAddress);
        setCityId(result.data.cityAddress);
        setDistrictId(result.data.districtAddress);
        setWardId(result.data.wardAddress);
      }
    };
    getRap();
  }, []);

  //combobox country
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allCountry = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/get-level?level=QUOCGIA`
        );
        if (allCountry.status === 200) {
          setCountry(allCountry.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox city
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allCity = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/get-level?level=TINH/TP`
        );
        if (allCity.status === 200) {
          setCity(allCity.data);
        } else {
          console.error("get all city error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox district
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allDistrict = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/get-level?level=HUYEN/QUAN`
        );
        if (allDistrict.status === 200) {
          setDistrict(allDistrict.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox ward
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allWard = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/get-level?level=XA/PHUONG`
        );
        if (allWard.status === 200) {
          setWard(allWard.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  const onClickHandleEdit = () => {
    setUpdate(true);
    setCreateNew(false);
    setEdit(true);
    setEditCode(false);
  };

  const onClickHandleNew = () => {
    setUpdate(false);
    setCreateNew(true);
    setEditCode(true);
    setEdit(true);
  };

  return (
    <div className="rap-detail-background">
      <div className="rap-detail-container">
        <div className="rap-detail-header">
          <div className="rap-detail-header-edit">
            <div
              className="rap-detail-header-edit-save"
              // onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="rap-detail-header-edit-update"
              // onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <Link
              className="rap-detail-header-edit-detail"
              to={"/rap/code?code=" + code}
            >
              <img className="icon-detail" src={iconDetail} alt="update" />
              <p>Danh sách phòng</p>
            </Link>
            <div
              className="rap-detail-header-edit-new-delete"
              // onClick={onClickHandleNew}
            >
              <div className="rap-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="rap-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="rap-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="rap-detail-header-name">
            <span>{code} - </span> <span>-{name} </span>
          </div>
        </div>

        <div className="rap-detail-content">
          <div className="rap-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="rap-detail-input">
              <label>Mã rạp</label>
              <div className="rap-detail-input-dem"></div>

              <div className="input-rap-container">
                <input
                  className="input-rap"
                  value={code}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleCode(text)}
                  // onFocus={onHandleFocusCode}
                />
                {/* {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )} */}
              </div>
            </div>
            <div className="rap-detail-input">
              <label>Tên rạp</label>
              <div className="rap-detail-input-dem"></div>
              <div className="input-rap-container">
                <input
                  className="input-rap"
                  value={name}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleName(text)}
                  // onFocus={onHandleFocusName}
                />
                {/* {isValidName && (
                  <p style={{ color: "red" }}>"Không để trống"</p>
                )} */}
              </div>
            </div>
            <div className="rap-detail-input">
              <label>Vị trí</label>
              <div className="rap-detail-input-dem"></div>
              <div className="input-rap-container">
                <input
                  className="input-rap"
                  value={numberRap}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandlePosition(text)}
                  // onFocus={onHandleFocusPosition}
                />
                {/* {isValidPass && (
                  <p style={{ color: "red" }}>"Không để trống"</p>
                )} */}
              </div>
            </div>
            {/* {editCode && (
              
            )} */}
          </div>

          <div className="rap-detail-content-right">
            <div className="rap-detail-input">
              <label>Thời gian mở</label>
              <div className="rap-detail-input-dem"></div>
              <div className="input-rap-container">
                <TimePicker
                  placeholder="Select Time"
                  // value={openTime}
                  use12Hours
                  showSecond={false}
                  focusOnOpen={true}
                  format="hh:mm A"
                  onChange={(e) => setTime(e.format("LT"))}
                />
              </div>
            </div>
            <div className="rap-detail-input">
              <label>Thời gian đóng</label>
              <div className="rap-detail-input-dem"></div>
              <div className="input-rap-container">
                <TimePicker
                  placeholder="Select Time"
                  // value={closeTime}
                  use12Hours
                  showSecond={false}
                  focusOnOpen={true}
                  format="hh:mm A"
                  onChange={(e) => setTime(e.format("LT"))}
                />
              </div>
            </div>
            <div className="rap-detail-input">
              <label>Trạng thái</label>
              <div className="rap-detail-input-dem"></div>
              {/* <input className="input-user" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-rap-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="Status"
                    // onChange={handleChangeComboboxStatus}
                    // onFocus={onHandleFocusStatus}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataStatus.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {/* {isValidStatus && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )} */}
              </div>
            </div>

            <div className="rap-detail-input">
              <div className="rap-detail-input-dem"></div>
              <div className="input-address-rap">
                <FormControl
                  className="input-address-rap-combobox"
                  sx={{ width: "28%", marginRight: "10px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Quốc gia</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={countryId}
                    label="Quốc gia"
                    onChange={handleChangeComboboxCountry}
                    readOnly={!edit}
                    // onFocus={onHandleFocusAddress}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {country?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  className="input-address-rap-combobox"
                  sx={{ width: "28%", marginRight: "10px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Tỉnh/TP</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={cityId}
                    label="Tinh/TP"
                    onChange={handleChangeComboboxCity}
                    // onFocus={onHandleFocusAddress}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {city?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  className="input-address-rap-combobox"
                  sx={{ width: "28%", marginRight: "10px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={districtId}
                    label="Quân./Huyện"
                    onChange={handleChangeComboboxDistrict}
                    // onFocus={onHandleFocusAddress}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {district?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <div style={{ height: "20px" }}></div>
                <FormControl
                  className="input-address-rap-combobox"
                  sx={{ width: "28%", marginRight: "10px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Phường/Xã
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={wardId}
                    label="Phường/Xã"
                    onChange={handleChangeComboboxWard}
                    // onFocus={onHandleFocusAddress}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {ward?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {/* {isValidAddress && (
                  <p style={{ color: "red" }}>{errorAddress}</p>
                )}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapDetail;
