import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./userDetail.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const dataLevel = [
  { id: "ADMIN", value: "ADMIN" },
  { id: "USER", value: "USER" },
  { id: "COMUNITY", value: "COMUNITY" },
  { id: "VIP", value: "VIP" },
];

const UserDetail = ({ codeUserBy, onClickHandleClose, addBtn }) => {
  const [codeUser, setCodeUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfBirthShow, setDateOfBirthShow] = useState(new Date());
  const [typeUser, setTypeUser] = useState("");
  const [idTypeUser, setIdTypeUser] = useState("");
  const [levelUser, setLevelUser] = useState("");
  const [status, setStatus] = useState("");
  const [addressId, setAddressId] = useState("");
  const [numberHome, setNumberHome] = useState("");

  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [isValidLevel, setIsValidLevel] = useState(false);
  const [isValidHome, setIsValidHome] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidBirth, setIsValidBirth] = useState(false);

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

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
  const onChangeHandleNumberHome = (text) => {
    setNumberHome(text.target.value);
  };

  const handleChangeComboboxLevel = (event) => {
    setLevelUser(event.target.value);
  };

  const onChangeHandleCode = (text) => {
    setCodeUser(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [codeUser]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (codeUser.trim().length <= 0) {
        setIsValidCode(true);
      } else {
        setIsValidCode(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusName();
  }, [nameUser]);

  const onHandleFocusName = () => {
    if (editCode || edit) {
      const regex = /^[a-zA-Z]{3,}$/;
      if (!regex.test(nameUser)) {
        setIsValidName(true);
      } else {
        setIsValidName(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusPass();
  }, [password]);

  const onHandleFocusPass = () => {
    if (editCode || edit) {
      if (password.trim().length < 6) {
        setIsValidPass(true);
      } else {
        setIsValidPass(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusLevel();
  }, [levelUser]);

  const onHandleFocusLevel = () => {
    if (editCode || edit) {
      if (levelUser.length == 0) {
        setIsValidLevel(true);
      } else {
        setIsValidLevel(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusHome();
  }, [numberHome]);

  const onHandleFocusHome = () => {
    if (editCode || edit) {
      const regex = /^[a-zA-Z0-9]/;
      if (!regex.test(numberHome)) {
        setIsValidHome(true);
      } else {
        setIsValidHome(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusPhone();
  }, [phoneUser]);

  const onHandleFocusPhone = () => {
    if (editCode || edit) {
      const regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
      if (!regex.test(phoneUser) || phoneUser.trim().length == 0) {
        setIsValidPhone(true);
      } else {
        setIsValidPhone(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status.length == 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusAddress();
  }, [countryId, cityId, wardId, districtId]);

  const onHandleFocusAddress = () => {
    if (editCode || edit) {
      if (countryId.length == 0) {
        setErrorAddress("Không bỏ trống Quốc Gia");
        setIsValidAddress(true);
      } else if (cityId.length == 0) {
        setErrorAddress("Không bỏ trống tỉnh/thành phố");
        setIsValidAddress(true);
      } else if (districtId.length == 0) {
        setErrorAddress("Không bỏ trống quận/huyện");
        setIsValidAddress(true);
      } else if (wardId.length == 0) {
        setErrorAddress("Không bỏ trống phường/xã");
        setIsValidAddress(true);
      } else {
        setIsValidAddress(false);
      }
    }
  };

  const onChangeHandleName = (text) => {
    setNameUser(text.target.value);
  };

  const onChangeHandlePhone = (text) => {
    setPhoneUser(text.target.value);
  };
  const onChangeHandleDate = (text) => {
    setDateOfBirth(text);
    setDateOfBirthShow(text);
    console.log(text);
  };

  const onChangeHandleType = (text) => {
    setTypeUser(text.target.value);
  };
  const onChangeHandlePassword = (text) => {
    setPassword(text.target.value);
  };

  useEffect(() => {
    const getUser = async () => {
      if (addBtn) {
        setEditCode(true);
        setEdit(true);
        setCreateNew(true);
        setTypeUser("Người sử dụng");
      }
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/user/get-code/` +
            codeUserBy
        );
        if (response.status === 200) {
          setCodeUser(response.data.code);
          setNameUser(response.data.fullName);
          setPhoneUser(response.data.numberPhone);
          setDateOfBirthShow(new Date(Date.parse(response.data.dateOfBirth)));
          setDateOfBirth(response.data.dateOfBirth);
          setTypeUser("Người sử dụng");
          setIdTypeUser(response.data.type);
          setLevelUser(response.data.level);
          setStatus(response.data.status);

          // const country = { id: response.data.countryId, fullName: response.data.countryName }
          setCountryId(response.data.countryId);

          // const city = { id: response.data.cityId, fullName: response.data.cityName }
          setCityId(response.data.cityId);

          // const district = { id: response.data.districtId, fullName: response.data.districtName }
          setDistrictId(response.data.districtId);

          // const ward = { id: response.data.wardId, fullName: response.data.wardName }
          setWardId(response.data.wardId);

          setNumberHome(response.data.numberHome);
        } else {
          console.log("get user fail");
        }
      } catch (error) {
        console.log("error get user: " + error);
      }
    };

    getUser();
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

    setCodeUser("");
    setNameUser("");
    setPhoneUser("");
    setAddressId("");
    setDateOfBirth("");
    setLevelUser("");
    setStatus("");
    setCountryId("");
    setCityId("");
    setDistrictId("");
    setWardId("");
    setNumberHome("");
    setTypeUser("Người sử dụng");
  };

  const onClickHandleSave = async () => {
    const user = {
      code: codeUser,
      type: "user",
      numberPhone: phoneUser,
      password: password,
      dateOfBirth: dateOfBirth,
      countryAddress: countryId,
      cityAddress: cityId,
      districtAddress: districtId,
      wardAddress: wardId,
      numberHome: numberHome,
      level: levelUser,
      fullName: nameUser,
      status: status,
    };
    onHandleFocusCode();
    onHandleFocusName();
    onHandleFocusPass();
    onHandleFocusLevel();
    onHandleFocusPhone();
    onHandleFocusHome();
    onHandleFocusStatus();
    onHandleFocusAddress();
    if (
      !isValidCode &
      !isValidName &
      !isValidPass &
      !isValidLevel &
      !isValidHome &
      !isValidPhone &
      !isValidStatus &
      !isValidAddress
    ) {
      try {
        console.log(user);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/value/user/create`,
            user
          );
          if (response.status === 201) {
            setMessage("Lưu thành công");
            setShowAlert(true);
          } else {
            setMessage("Lưu thất bại");
            setShowAlert(true);
          }
        } else if (update) {
          const response = await axios.put(
            `http://localhost:9000/cineza/api/v1/value/user/put/` + codeUser,
            user
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
        console.log("save address fail: " + error);
        setMessage("Lưu thất bại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Vui lòng nhập đầy đủ");
      setShowAlert(true);
    }
  };

  const formatFromDatetoObject = (inputStringDate) => {
    const parsedDate = parse(inputStringDate, "dd-MM-yyyy", new Date());
    const formattedDate = format(
      parsedDate,
      'EEE MMM dd yyyy HH:mm:ss "GMT"X (zz)',
      {
        timeZone: "Asia/Ho_Chi_Minh", // Múi giờ của Việt Nam
      }
    );
    return formattedDate;
  };

  return (
    <div className="user-detail-background">
      <div className="user-detail-container">
        <div className="user-detail-header">
          <div className="user-detail-header-edit">
            <div
              className="user-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="user-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="user-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="user-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="user-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="user-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="user-detail-header-name">
            <span>{codeUser} - </span> <span>-{nameUser} </span>
          </div>
        </div>

        <div className="user-detail-content">
          <div className="user-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="user-detail-input">
              <label>Mã người dùng</label>
              <div className="user-detail-input-dem"></div>

              <div className="input-user-container">
                <input
                  className="input-user"
                  value={codeUser}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleCode(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>

              {/* {isValid && (
                <p style={{ color: "red" }}>Mã người dùng không được trống.</p>
              )} */}
            </div>
            <div className="user-detail-input">
              <label>Tên người dùng</label>
              <div className="user-detail-input-dem"></div>
              <div className="input-user-container">
                <input
                  className="input-user"
                  value={nameUser}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleName(text)}
                  onFocus={onHandleFocusName}
                />
                {isValidName && (
                  <p style={{ color: "red" }}>"Tên tối thiểu 3 ký tự chữ"</p>
                )}
              </div>
            </div>
            {editCode && (
              <div className="user-detail-input">
                <label>Mật khẩu</label>
                <div className="user-detail-input-dem"></div>
                <div className="input-user-container">
                  <input
                    className="input-user"
                    value={password}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={(text) => onChangeHandlePassword(text)}
                    onFocus={onHandleFocusPass}
                  />
                  {isValidPass && (
                    <p style={{ color: "red" }}>"Mật khẩu tối thiểu 6 ký tự"</p>
                  )}
                </div>
              </div>
            )}

            <div className="user-detail-input">
              <label>Level</label>
              <div className="user-detail-input-dem"></div>
              <div className="input-user-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">Level</InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={levelUser}
                    // label="Level"
                    onChange={handleChangeComboboxLevel}
                    onFocus={onHandleFocusLevel}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataLevel.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidLevel && (
                  <p style={{ color: "red" }}>Level không bỏ trống</p>
                )}
              </div>
            </div>
            <div className="user-detail-input">
              <label>Địa chỉ</label>
              <div className="user-detail-input-dem"></div>

              <div className="input-user-container">
                <input
                  className="input-user"
                  placeholder="số nhà, tên đường"
                  value={numberHome}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleNumberHome(text)}
                  onFocus={onHandleFocusHome}
                />
                {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>}
              </div>
            </div>
          </div>
          <div className="user-detail-content-right">
            <div className="user-detail-input">
              <label>Số điện thoại</label>
              <div className="user-detail-input-dem"></div>
              <div className="input-user-container">
                <input
                  className="input-user"
                  placeholder="0987654321"
                  value={phoneUser}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandlePhone(text)}
                  onFocus={onHandleFocusPhone}
                />
                {isValidPhone && (
                  <p style={{ color: "red" }}>Số điện thoại không đúng</p>
                )}
              </div>
            </div>
            <div className="user-detail-input">
              <label>Ngày sinh</label>
              <div className="user-detail-input-dem"></div>
              {/* <input className="input-user" value={dateOfBirth} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                onChange={(text) => onChangeHandleDate(text)} /> */}
              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={dateOfBirthShow}
                readOnly={!edit}
                onChange={(date) => onChangeHandleDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>
            <div className="user-detail-input">
              <label>Trạng thái</label>
              <div className="user-detail-input-dem"></div>
              {/* <input className="input-user" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-user-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    // label="Status"
                    onChange={handleChangeComboboxStatus}
                    onFocus={onHandleFocusStatus}
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
                {isValidStatus && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="user-detail-input">
              <label>Loại</label>
              <div className="user-detail-input-dem"></div>
              <div className="input-user-container">
                <input
                  className="input-user"
                  value={typeUser}
                  readOnly={true}
                  style={{ background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleType(text)}
                />
              </div>
            </div>

            <div className="user-detail-input">
              <div className="user-detail-input-dem"></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div className="input-address-rap">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 5,
                      width: "22%",
                    }}
                  >
                    <label style={{ marginBottom: 5 }}>Quốc gia</label>
                    <FormControl
                      className="input-address-rap-combobox"
                      sx={{ width: "100%", marginRight: "10px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">Quốc gia</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={countryId}
                        // label="Quốc gia"
                        onChange={handleChangeComboboxCountry}
                        readOnly={!edit}
                        onFocus={onHandleFocusAddress}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {country?.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.id}>
                              {st.fullName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 5,
                      width: "22%",
                    }}
                  >
                    <label style={{ marginBottom: 5 }}>Tỉnh/Thành</label>
                    <FormControl
                      className="input-address-rap-combobox"
                      sx={{ width: "100%", marginRight: "10px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">Tỉnh/TP</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={cityId}
                        // label="Tinh/TP"
                        onChange={handleChangeComboboxCity}
                        onFocus={onHandleFocusAddress}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {city?.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.id}>
                              {st.fullName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 5,
                      width: "22%",
                    }}
                  >
                    <label style={{ marginBottom: 5 }}>Quận/Huyện</label>
                    <FormControl
                      className="input-address-rap-combobox"
                      sx={{ width: "100%", marginRight: "10px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">
                    Quận/Huyện
                  </InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={districtId}
                        // label="Quân./Huyện"
                        onChange={handleChangeComboboxDistrict}
                        onFocus={onHandleFocusAddress}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {district?.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.id}>
                              {st.fullName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "22%",
                    }}
                  >
                    <label style={{ marginBottom: 5 }}>Phường/Xã</label>
                    <FormControl
                      className="input-address-rap-combobox"
                      sx={{ width: "100%", marginRight: "10px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">
                    Phường/Xã
                  </InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={wardId}
                        // label="Phường/Xã"
                        onChange={handleChangeComboboxWard}
                        onFocus={onHandleFocusAddress}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {ward?.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.id}>
                              {st.fullName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ height: "20px" }}></div>
                {isValidAddress && (
                  <p style={{ color: "red", width: "40%" }}>{errorAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
