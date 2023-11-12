import "./vtdlDetail.css";
import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const levelAddressCompobox = [
  {
    fullName: "Quốc gia",
    level: "QUOCGIA",
  },
  {
    fullName: "Tỉnh/Thành phố",
    level: "TINH/TP",
  },
  {
    fullName: "Huyện/Quận",
    level: "HUYEN/QUAN",
  },
  {
    fullName: "Xa/Phuong",
    level: "XA/PHUONG",
  },
];

const VTDLDetail = ({ codeAddressBy, onClickHandleClose, addBtn }) => {
  const location = useLocation();
  const levelAddressIN = new URLSearchParams(location.search).get("level");

  const [codeAddress, setCodeAddress] = useState("");
  const [nameAddress, setNameAddress] = useState("");
  const [levelAddress, setLevelAddress] = useState("");
  const [idParentAddress, setIdParentAddress] = useState(null);
  const [parentAddress, setParentAddress] = useState("");
  const [statusAddress, setStatusAddress] = useState("");
  const [typeAddress, setTypeAddress] = useState("");
  const [idTypeAddress, setIdtypeAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [dataComboboxTrucThuoc, setDataComboboxTrucThuoc] = useState([]);

  const [isValidCodeAddress, setIsValidCodeAddress] = useState(false);
  const [isValidNameAddress, setIsValidNameAddress] = useState(false);
  const [isValidParentAddress, setIsValidParentAddress] = useState(false);
  const [isValidStatusAddress, setIsValidStatusAddress] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatusAddress(event.target.value);
  };

  const handleChangeComboboxAddress = (event) => {
    setIdParentAddress(event.target.value);
  };
  const onChangeCodeAddress = (event) => {
    setCodeAddress(event.target.value);
  };
  const onChangeNameAddress = (event) => {
    setNameAddress(event.target.value);
  };
  const onChangeLevelAddress = (event) => {
    setLevelAddress(event.target.value);
  };

  useEffect(() => {
    const getParentByLevel = async () => {
      const result = await axios.get(
        `http://localhost:9000/cineza/api/v1/value/get-level?evel=${levelAddress}`
      );
      if (result.status === 200) {
        setIdParentAddress(result.data.parentId);
      } else {
        console.error("error get parent address by level");
      }
    };
    getParentByLevel();
  }, [levelAddress]);

  const onChangeTypeAddress = (event) => {
    setTypeAddress(event.target.value);
  };

  useEffect(() => {
    onHandleFocusCodeAddress();
  }, [codeAddress]);

  const onHandleFocusCodeAddress = () => {
    if (editCode || edit) {
      if (codeAddress.trim().length <= 0) {
        setIsValidCodeAddress(true);
      } else {
        setIsValidCodeAddress(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusNameAddress();
  }, [nameAddress]);

  const onHandleFocusNameAddress = () => {
    if (editCode || edit) {
      if (nameAddress.trim().length <= 0) {
        setIsValidNameAddress(true);
      } else {
        setIsValidNameAddress(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusParentAddress();
  }, [idParentAddress]);

  const onHandleFocusParentAddress = () => {
    if (editCode || edit) {
      if (levelAddress != "QUOCGIA") {
        if (
          idParentAddress == undefined ||
          idParentAddress.trim().length <= 0
        ) {
          setIsValidParentAddress(true);
        } else {
          setIsValidParentAddress(false);
        }
      } else {
        setIsValidParentAddress(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatusAddress();
  }, [statusAddress]);

  const onHandleFocusStatusAddress = () => {
    if (editCode || edit) {
      if (statusAddress.trim().length <= 0) {
        setIsValidStatusAddress(true);
      } else {
        setIsValidStatusAddress(false);
      }
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
      setTypeAddress("Vị trí địa lý");
      setIdtypeAddress("vtdl");
    }
    const getAddressByCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/address/get-code/` +
            codeAddressBy
        );
        if (response.status === 200) {
          console.log(response.data);
          setCodeAddress(response.data.code);
          setNameAddress(response.data.fullName);
          setLevelAddress(response.data.level);
          setIdParentAddress(response.data.parentId);
          setParentAddress(response.data.fullNameParent);
          setStatusAddress(response.data.status);
          setIdtypeAddress(response.data.type);
          setTypeAddress("Vị trí địa lý");
        } else {
          console.error("error get API: " + response.status);
        }
      } catch (error) {
        console.error("error get address by code in vtdl: " + error);
      }
    };

    getAddressByCode();
  }, []);

  const onClickHandleEdit = () => {
    setUpdate(true);
    setCreateNew(false);
    setEdit(true);
  };

  const onClickHandleNew = () => {
    setUpdate(false);
    setCreateNew(true);
    setEditCode(true);
    setEdit(true);

    setCodeAddress("");
    setNameAddress("");
    setStatusAddress("");
  };

  const onClickHandleSave = async () => {
    if (levelAddress == "QUOCGIA") {
      setIdParentAddress(null);
    }
    const address = {
      code: codeAddress,
      type: idTypeAddress,
      parentId: idParentAddress,
      level: levelAddress,
      fullName: nameAddress,
      status: statusAddress,
    };
    console.log(address);
    try {
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/value/address/create`,
          address
        );
        if (response.status === 201) {
          console.log("save success");
          setMessage("Lưu thành công");
          setShowAlert(true);
        } else {
          setMessage("Lưu thất bại");
          setShowAlert(true);
        }
      } else if (update) {
        const response = await axios.put(
          `http://localhost:9000/cineza/api/v1/value/address/put/` +
            codeAddress,
          address
        );
        if (response.status === 200) {
          console.log("save success");
          setMessage("Cập nhật thành công");
          setShowAlert(true);
        } else {
          setMessage("Cập thất bại");
          setShowAlert(true);
        }
      }
    } catch (error) {
      setMessage("Lưu thất bại");
      setShowAlert(true);
      console.log("save address fail: " + error);
    }
  };

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

  useEffect(() => {
    if (levelAddress === "QUOCGIA") {
      setIdParentAddress(null);
      setDataComboboxTrucThuoc([]);
    } else if (levelAddress === "TINH/TP") {
      setDataComboboxTrucThuoc(country);
    } else if (levelAddress === "HUYEN/QUAN") {
      setDataComboboxTrucThuoc(city);
    } else if (levelAddress === "XA/PHUONG") {
      setDataComboboxTrucThuoc(district);
    }
  });

  return (
    <div className="address-detail-background">
      <div className="address-detail-container">
        {showAlert && <Alert message={message} onClose={handleCloseAlert} />}
        <div className="address-detail-header">
          <div className="address-detail-header-edit">
            <div
              className="address-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="address-detail-header-edit-update"
              style={update ? { background: "rgb(201, 201, 201)" } : {}}
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div className="address-detail-header-edit-new-delete">
              <div
                className="address-detail-header-edit-new"
                onClick={onClickHandleNew}
              >
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="address-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div className="address-detail-header-close">
              <img
                className="iconClose"
                src={iconClose}
                alt="close"
                onClick={onClickHandleClose}
              />
            </div>
          </div>
          <div className="address-detail-header-name">
            <span>{codeAddress} - </span> <span>- {nameAddress}</span>
          </div>
        </div>

        <div className="address-detail-content">
          <div className="address-detail-content-left">
            <div className="address-detail-input">
              <label>Mã địa chỉ</label>
              <div className="address-detail-input-dem"></div>
              <div className="input-address-container">
                <input
                  className="input-address"
                  readOnly={!editCode}
                  value={codeAddress}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(code) => onChangeCodeAddress(code)}
                  onFocus={onHandleFocusCodeAddress}
                />
                {isValidCodeAddress && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="address-detail-input">
              <label>Tên địa chỉ</label>
              <div className="address-detail-input-dem"></div>
              <div className="input-address-container">
                <input
                  className="input-address"
                  readOnly={!edit}
                  value={nameAddress}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(code) => onChangeNameAddress(code)}
                  onFocus={onHandleFocusNameAddress}
                />
                {isValidNameAddress && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="address-detail-input">
              <label>Cáp hành chính</label>
              <div className="address-detail-input-dem"></div>
              <div className="input-address-container">
                <input
                  className="input-address"
                  readOnly={edit}
                  value={levelAddress}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(code) => onChangeNameAddress(code)}
                  onFocus={onHandleFocusNameAddress}
                />
                {isValidNameAddress && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="address-detail-input">
              <label>Cấp hành chính</label>
              <div className="address-detail-input-dem"></div>
              <div className="input-address-container">
                {/* <input
                  className="input-address"
                  readOnly={true}
                  value={levelAddress}
                  style={{ background: "rgb(196, 196, 196)" }}
                  onChange={(code) => onChangeLevelAddress(code)}
                /> */}
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">
                    Cấp hành chính
                  </InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={levelAddress}
                    // label="Cấp hành chính"
                    onChange={(code) => onChangeLevelAddress(code)}
                    // onFocus={onHandleFocusParentAddress}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {levelAddressCompobox?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.level}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="address-detail-content-right">
            <div className="address-detail-input">
              <label>Trực thuộc</label>
              <div className="address-detail-input-dem"></div>
              {/* <input className="input-address" readOnly={!edit} value={parentAddress} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeParentAddress(code)} /> */}
              <div className="input-address-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">
                    Trực thuộc
                  </InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={idParentAddress}
                    // label="Trực thuộc"
                    onChange={handleChangeComboboxAddress}
                    onFocus={onHandleFocusParentAddress}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataComboboxTrucThuoc?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.fullName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidParentAddress && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="address-detail-input">
              <label>Trạng thái</label>
              <div className="address-detail-input-dem"></div>
              {/* <input className="input-address" readOnly={!edit} value={statusAddress} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeStatusAddress(code)} /> */}
              <div className="input-address-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={statusAddress}
                    // label="Status"
                    onChange={handleChangeComboboxStatus}
                    onFocus={onHandleFocusStatusAddress}
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
                {isValidStatusAddress && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="address-detail-input">
              <label>Loại</label>
              <div className="address-detail-input-dem"></div>
              <div className="input-address-container">
                <input
                  className="input-address"
                  readOnly={true}
                  value={typeAddress}
                  style={{ background: "rgb(196, 196, 196)" }}
                  onChange={(code) => onChangeTypeAddress(code)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VTDLDetail;
