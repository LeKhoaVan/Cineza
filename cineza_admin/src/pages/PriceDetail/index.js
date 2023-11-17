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
// const dataType = [
//   { id: "COMUNITY", value: "COMUNITY" },
//   { id: "VIP", value: "VIP" },
// ];

const PriceDetail = ({ headerCode, codePrice, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [codeTypeSeat, setCodeTypeSeat] = useState("");
  const [codeHeader, setCodeHeader] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataTypeSeat, setDataTypeSeat] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidValue, setIsValidValue] = useState(false);
  const [isValidCodeTypeSeat, setIsValidCodeTypeSeat] = useState(false);
  const [isValidCodeHeader, setIsValidCodeHeader] = useState(false);

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
  const handleChangeComboboxCodeTypeSeat = (text) => {
    setCodeTypeSeat(text.target.value);
  };
  // const handleChangeComboboxCodeHeader = (text) => {
  //   setCodeHeader(text.target.value);
  // };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code == undefined || code.trim().length <= 0) {
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
      if (value == undefined || value.length <= 0) {
        setIsValidValue(true);
      } else {
        setIsValidValue(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeTypeSeat();
  }, [codeTypeSeat]);

  const onHandleFocusCodeTypeSeat = () => {
    if (editCode || edit) {
      if (codeTypeSeat == undefined || codeTypeSeat.trim().length <= 0) {
        setIsValidCodeTypeSeat(true);
      } else {
        setIsValidCodeTypeSeat(false);
      }
    }
  };

  // useEffect(() => {
  //   onHandleFocusCodeHeader();
  // }, [codeHeader]);

  // const onHandleFocusCodeHeader = () => {
  //   if (editCode || edit) {
  //     if (codeHeader == undefined || codeHeader.trim().length <= 0) {
  //       setIsValidCodeHeader(true);
  //     } else {
  //       setIsValidCodeHeader(false);
  //     }
  //   }
  // };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
      setCodeHeader(headerCode);
      console.log(codeHeader);
    } else {
      const getPrice = async () => {
        try {
          const response = await axios.get(
            `http://localhost:9000/cineza/api/v1/price/get-by-code/${codePrice}`
          );
          if (response.status === 200) {
            setCode(response.data.code);
            setValue(response.data.value);
            setCodeHeader(response.data.codeHeader);
            setCodeTypeSeat(response.data.codeTypeSeat);
            console.log(response.data.codeHeader);
          } else {
            console.log("get price fail");
          }
        } catch (error) {
          console.log("error get price: " + error);
        }
      };
      getPrice();
    }
  }, []);

  //all type seat
  useEffect(() => {
    const getAllTypeSeat = async () => {
      try {
        const allTypeSeat = await axios.get(
          "http://localhost:9000/cineza/api/v1/type-seat/get-all"
        );
        if (allTypeSeat.status === 200) {
          setDataTypeSeat(allTypeSeat.data);
        } else {
          console.error("error get type seat");
        }
      } catch (error) {
        console.error("error get all type seat: " + error);
      }
    };
    getAllTypeSeat();
  }, []);

  //all price header
  // useEffect(() => {
  //   const getAllPriceHeader = async () => {
  //     try {
  //       const allPriceHeader = await axios.get(
  //         "http://localhost:9000/cineza/api/v1/price-header/get-all"
  //       );
  //       if (allPriceHeader.status === 200) {
  //         setDataHeader(allPriceHeader.data);
  //         // console.log(allPriceHeader.data);
  //       } else {
  //         console.error("error get Price Header");
  //       }
  //     } catch (error) {
  //       console.error("error get all Price Header: " + error);
  //     }
  //   };
  //   getAllPriceHeader();
  // }, []);

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
    setCodeTypeSeat("");
    setCodeHeader(codeHeader);
  };

  const onClickHandleSave = async () => {
    const price = {
      code: code,
      value: value,
      codeHeader: codeHeader,
      codeTypeSeat: codeTypeSeat,
    };
    try {
      console.log(price);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/price/create`,
          price
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
          `http://localhost:9000/cineza/api/v1/price/put/` + code,
          price
        );
        if (response.status === 200) {
          console.log("save success");
          setMessage("Cập nhật thành công");
          setShowAlert(true);
        } else {
          setMessage("Cập nhật thất bại");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.log("save address fail: " + error);
      setMessage("Lưu thất bại");
      setShowAlert(true);
    }
  };

  return (
    <div className="price-detail-background">
      <div className="price-detail-container">
        <div className="price-detail-header">
          <div className="price-detail-header-edit">
            <div
              className="price-detail-header-edit-save"
              onClick={onClickHandleSave}
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
                  value={code}
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
                  value={value}
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
              <label>Loại ghế</label>
              <div className="price-detail-input-dem"></div>
              <div className="input-price-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">
                    Mã loại ghế
                  </InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeTypeSeat}
                    // label="mã loại ghế"
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={handleChangeComboboxCodeTypeSeat}
                    onFocus={onHandleFocusCodeTypeSeat}
                  >
                    {dataTypeSeat.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidCodeTypeSeat && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="price-detail-input">
              <label>Mã bảng giá Header</label>
              <div className="price-detail-input-dem"></div>

              <div className="input-price-detail-container">
                <input
                  className="input-price-detail"
                  value={codeHeader}
                  readOnly={true}
                  style={{ background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleCode(text)}
                  // onFocus={onHandleFocusCode}
                />
              </div>
            </div>

            {/* <div className="price-detail-input">
              <label>Mã bảng giá header</label>
              <div className="price-detail-input-dem"></div>
              <div className="input-price-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                   <InputLabel id="demo-select-small-label">
                    Mã bảng giá header
                  </InputLabel> 
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeHeader}
                    // label="Mã bảng giá header"
                    onChange={handleChangeComboboxCodeHeader}
                    onFocus={onHandleFocusCodeHeader}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataHeader.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.code}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidCodeHeader && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetail;
