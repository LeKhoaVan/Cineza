import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import Alert from "../../components/Alert";
import "./priceDetail.css";
import { formatDateHandle } from "../../components/util/index";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// const dataStatus = [
//   { id: "ACTIVE", value: "ACTIVE" },
//   { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
//   { id: "DESTROY", value: "DESTROY" },
// ];
const dataType = [
  { id: "COMUNITY", value: "COMUNITY" },
  { id: "VIP", value: "VIP" },
];

const PriceDetail = ({ codePrice, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [codeMovie, setCodeMovie] = useState("");
  const [codePriceHeader, setCodePriceHeader] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidType, setIsValidType] = useState(false);
  const [isValidValue, setIsValidValue] = useState(false);
  const [isValidCodeMovie, setIsValidCodeMovie] = useState(false);
  const [isValidCodePriceHEader, setIsValidCodePriceHeader] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleValue = (text) => {
    setValue(text.target.value);
  };
  const handleChangeComboboxType = (text) => {
    setType(text.target.value);
  };
  const handleChangeComboboxCodeMovie = (text) => {
    setCodeMovie(text.target.value);
  };
  const handleChangeComboboxCodePriceHeader = (text) => {
    setCodePriceHeader(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code.trim().length <= 0) {
        setIsValidCode(true);
      } else {
        setIsValidCode(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusValue();
  }, [value]);

  const onHandleFocusValue = () => {
    if (editCode || edit) {
      if (value.trim().length <= 0) {
        setIsValidValue(true);
      } else {
        setIsValidValue(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusType();
  }, [type]);

  const onHandleFocusType = () => {
    if (editCode || edit) {
      if (type.trim().length <= 0) {
        setIsValidType(true);
      } else {
        setIsValidType(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeMovie();
  }, [codeMovie]);

  const onHandleFocusCodeMovie = () => {
    if (editCode || edit) {
      if (codeMovie.trim().length <= 0) {
        setIsValidCodeMovie(true);
      } else {
        setIsValidCodeMovie(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodePriceHeader();
  }, [codePriceHeader]);

  const onHandleFocusCodePriceHeader = () => {
    if (editCode || edit) {
      if (codePriceHeader.trim().length <= 0) {
        setIsValidCodePriceHeader(true);
      } else {
        setIsValidCodePriceHeader(false);
      }
    }
  };

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

    setCode("");
    setValue("");
    setType("");
    setCodeMovie("");
    setCodePriceHeader("");
  };

  // const onClickHandleSave = async () => {
  //   const promotionHeader = {
  //     code: code,
  //     startDay: startDayShow,
  //     endDay: endDayShow,
  //     description: description,
  //     promotionStatus: status,
  //   };
  //   try {
  //     console.log(promotionHeader);
  //     if (editCode) {
  //       const response = await axios.post(
  //         `http://localhost:9000/cineza/api/v1/promotion-header/create`,
  //         promotionHeader
  //       );
  //       if (response.status === 201) {
  //         setMessage("Lưu thành công");
  //         setShowAlert(true);
  //       } else {
  //         setMessage("Lưu thất bại");
  //         setShowAlert(true);
  //       }
  //     } else if (update) {
  //       // const response = await axios.put(
  //       //     `http://localhost:9000/cineza/api/v1/value/user/put/` + codeUser,
  //       //     user
  //       // );
  //       // if (response.status === 200) {
  //       //     console.log("save success");
  //       //     setMessage("Cập nhật thành công");
  //       //     setShowAlert(true);
  //       // } else {
  //       //     setMessage("Cập thất bại");
  //       //     setShowAlert(true);
  //       // }
  //     }
  //   } catch (error) {
  //     console.log("save address fail: " + error);
  //     setMessage("Lưu thất bại");
  //     setShowAlert(true);
  //   }
  // };

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/promotion-header/get-code/${codePromotion}`
  //       );
  //       if (response.status === 200) {
  //         setCode(response.data.code);
  //         setStartDay(response.data.startDay);
  //         setEndDay(response.data.endDay);
  //         setStartDayShow(new Date(Date.parse(response.data.startDay)));
  //         setEndDayShow(new Date(Date.parse(response.data.endDay)));
  //         setStatus(response.data.promotionStatus);
  //         setDescription(response.data.description);
  //         console.log(new Date(Date.parse(response.data.startDay)));
  //       } else {
  //         console.log("get user fail");
  //       }
  //     } catch (error) {
  //       console.log("error get user: " + error);
  //     }
  //   };

  //   getUser();
  // }, []);

  return (
    <div className="price-detail-background">
      <div className="price-detail-container">
        <div className="price-detail-header">
          <div className="price-detail-header-edit">
            <div
              className="price-detail-header-edit-save"
              // onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="price-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <Link
              className="price-detail-header-edit-detail"
              //to={"/promotion/code?code=" + code}
              to={"price/code"}
            >
              <img className="icon-detail" src={iconDetail} alt="update" />
              <p>Bảng giá</p>
            </Link>
            <div
              className="price-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="price-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="price-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="price-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="price-detail-name">
            <p>{code}--</p>
          </div>
        </div>

        <div className="price-detail-content">
          <div className="price-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="price-detail-input">
              <label>Code</label>
              <div className="price-detail-input-dem"></div>

              <div className="input-price-detail-container">
                <input
                  className="input-price-detail"
                  // value={code}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleCode(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="price-detail-input">
              <label>Giá</label>
              <div className="price-detail-input-dem"></div>

              <div className="input-price-detail-container">
                <input
                  className="input-price-detail"
                  // value={code}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleValue(text)}
                  onFocus={onHandleFocusValue}
                />
                {isValidValue && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
          <div className="price-detail-content-right">
            <div className="price-detail-input">
              <label>Loại</label>
              <div className="price-detail-input-dem"></div>
              <div className="input-price-detail-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Loại</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={type}
                    label="loại"
                    onChange={handleChangeComboboxType}
                    onFocus={onHandleFocusType}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataType.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidType && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="price-detail-input">
              <label>Mã phim</label>
              <div className="price-detail-input-dem"></div>
              <div className="input-price-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Mã phim</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={codeRap}
                    label="mã phim"
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={handleChangeComboboxCodeMovie}
                    onFocus={onHandleFocusCodeMovie}
                  >
                    {/* {dataRap.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.code}
                        </MenuItem>
                      );
                    })} */}
                  </Select>
                </FormControl>
                {isValidCodeMovie && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="price-detail-input">
              <label>Mã bảng giá header</label>
              <div className="price-detail-input-dem"></div>
              <div className="input-price-detail-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Mã bảng giá header
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={status}
                    label="Mã bảng giá header"
                    onChange={handleChangeComboboxCodePriceHeader}
                    onFocus={onHandleFocusCodePriceHeader}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {/* {dataStatus.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })} */}
                  </Select>
                </FormControl>
                {isValidCodePriceHEader && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetail;
