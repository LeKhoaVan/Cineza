import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./promotionDetail.css";
import { formatDateHandle } from "../../components/util/index";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const dataStatus = [
  { id: "ACTIVE", value: "ACTIVE" },
  { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
  { id: "DESTROY", value: "DESTROY" },
];

const dataTypePromotion = [
  { id: "DISCOUNT", value: "DISCOUNT" },
  { id: "PROMOTION", value: "PROMOTION" },
  { id: "FREEBIES", value: "FREEBIES" },
];

const PromotionDetail = ({ codePromotion, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startDayShow, setStartDayShow] = useState("");
  const [endDayShow, setEndDayShow] = useState("");
  const [codeHeader, setCodeHeader] = useState("");
  const [status, setStatus] = useState("");
  const [typePromotion, settypePromotion] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidCodeHeader, setIsValidCodeHeader] = useState(false);
  const [isValidTypePromotion, setIsValidTypePromotion] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [dataPromotionHeader, setDataPromotioHeader] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleStartDate = (text) => {
    setStartDay(text);
    setStartDayShow(text);
  };
  const onChangeHandleEndDate = (text) => {
    setEndDay(text);
    setEndDayShow(text);
  };
  const handleChangeComboboxHeader = (text) => {
    setCodeHeader(text.target.value);
  };
  const handleChangeComboboxTypePromotion = (text) => {
    settypePromotion(text.target.value);
  };
  const handleChangeComboboxStatus = (text) => {
    setStatus(text.target.value);
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
    onHandleFocusCodeHeader();
  }, [codeHeader]);

  const onHandleFocusCodeHeader = () => {
    if (editCode || edit) {
      if (codeHeader.length <= 0) {
        setIsValidCodeHeader(true);
      } else {
        setIsValidCodeHeader(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusTypePromotion();
  }, [typePromotion]);

  const onHandleFocusTypePromotion = () => {
    if (editCode || edit) {
      if (typePromotion.length <= 0) {
        setIsValidTypePromotion(true);
      } else {
        setIsValidTypePromotion(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status.length <= 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
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
    setCodeHeader("");
    settypePromotion("");
    setStatus("");
  };

  const onClickHandleSave = async () => {
    const promotionLine = {
      code: code,
      startDay: startDayShow,
      endDay: endDayShow,
      promotionLineStatus: status,
      typePromotion: typePromotion,
      promotionHeaderCode: codeHeader,
    };
    try {
      console.log(promotionLine);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/promotion-line/create`,
          promotionLine
        );
        if (response.status === 201) {
          setMessage("Lưu thành công");
          setShowAlert(true);
        } else {
          setMessage("Lưu thất bại");
          setShowAlert(true);
        }
      } else if (update) {
        // const response = await axios.put(
        //     `http://localhost:9000/cineza/api/v1/value/user/put/` + codeUser,
        //     user
        // );
        // if (response.status === 200) {
        //     console.log("save success");
        //     setMessage("Cập nhật thành công");
        //     setShowAlert(true);
        // } else {
        //     setMessage("Cập thất bại");
        //     setShowAlert(true);
        // }
      }
    } catch (error) {
      console.log("save address fail: " + error);
      setMessage("Lưu thất bại");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/promotion-line/get-by-code/` +
            codePromotion
        );
        if (response.status === 200) {
          setCode(response.data.code);
          setStartDay(response.data.startDay);
          setEndDay(response.data.endDay);
          setStartDayShow(new Date(response.data.startDay));
          setEndDayShow(new Date(response.data.endDay));
          setCodeHeader(response.data.promotionHeaderCode);
          setStatus(response.data.promotionLineStatus);
          settypePromotion(response.data.typePromotion);
        } else {
          console.log("get user fail");
        }
      } catch (error) {
        console.log("error get user: " + error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getAllPromotionHeader = async () => {
      try {
        const allPromotionHeader = await axios.get(
          "http://localhost:9000/cineza/api/v1/promotion-header/get-all"
        );
        if (allPromotionHeader.status === 200) {
          setDataPromotioHeader(allPromotionHeader.data);
        } else {
          console.error("error get promotion header");
        }
      } catch (error) {
        console.error("error get all promotion header: " + error);
      }
    };
    getAllPromotionHeader();
  }, []);

  return (
    <div className="promotion-detail-background">
      <div className="promotion-detail-container">
        <div className="promotion-detail-header">
          <div className="promotion-detail-header-edit">
            <div
              className="promotion-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="promotion-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="promotion-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="promotion-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="promotion-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="promotion-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="promotion-detail-header-name">
            <p>
              {code}: Từ ngày {formatDateHandle(startDay)} Đến ngày{" "}
              {formatDateHandle(endDay)}{" "}
            </p>
          </div>
        </div>

        <div className="promotion-detail-content">
          <div className="promotion-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="promotion-detail-input">
              <label>Mã chi tiết</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
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
            <div className="promotion-detail-input">
              <label>Ngày bắt đầu</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={dateOfBirth} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                onChange={(text) => onChangeHandleDate(text)} /> */}
              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={startDayShow}
                readOnly={!edit}
                onChange={(date) => onChangeHandleStartDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="promotion-detail-input">
              <label>Ngày Kết thúc</label>
              <div className="promotion-detail-input-dem"></div>

              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={endDayShow}
                readOnly={!edit}
                onChange={(date) => onChangeHandleEndDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>
            <div className="promotion-detail-input">
              <label>Thuộc chương trình</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Thuộc chương trình
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeHeader}
                    label="Thuộc chương trình"
                    onChange={handleChangeComboboxHeader}
                    onFocus={onHandleFocusCodeHeader}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataPromotionHeader.map((st, index) => {
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
            </div>
          </div>
          <div className="promotion-detail-content-right">
            <div className="promotion-detail-input">
              <label>Loại hình</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Loại hình khuyến mãi
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={typePromotion}
                    label="Loại hình khuyến mãi"
                    onChange={handleChangeComboboxTypePromotion}
                    onFocus={onHandleFocusTypePromotion}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataTypePromotion.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidTypePromotion && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="promotion-detail-input">
              <label>Trạng thái</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="Status"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetail;
