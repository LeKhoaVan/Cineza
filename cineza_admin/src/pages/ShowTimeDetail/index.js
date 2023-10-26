import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./showTimeDetail.css";
import {
  formatDateHandle,
  formatFromObjectToDate,
} from "../../components/util/index";

import { useEffect, useState } from "react";
import axios from "axios";
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

const ShowTimeDetail = ({ codeShowTime, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [showDate, setShowDate] = useState(new Date());
  // const [showDateShow, setShowDateShow] = useState(new Date());
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleShowDate = (text) => {
    setShowDate(text);
    // setShowDateShow(text);
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
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status.trim().length <= 0) {
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
    setStatus("");
    setShowDate(new Date());
    // setShowDateShow(new Date());
  };

  const onClickHandleSave = async () => {
    const showTime = {
      code: code,
      showDate: showDate,
      status: status,
    };
    try {
      console.log(showTime);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/show-time/create`,
          showTime
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
          `http://localhost:9000/cineza/api/v1/show-time/put/` + code,
          showTime
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
      console.log("save show time fail: " + error);
      setMessage("Lưu thất bại");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);

      setCode("");
      setStatus("");
      setShowDate(new Date());
      // setShowDateShow(new Date());
    }
    const getShowTime = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/show-time/get-by-code/${codeShowTime}`
        );
        if (response.status === 200) {
          setCode(response.data.code);
          setShowDate(new Date(Date.parse(response.data.showDate)));
          // setShowDateShow(new Date(Date.parse(response.data.showDate)));
          setStatus(response.data.status);
        } else {
          console.log("get show timer fail");
        }
      } catch (error) {
        console.log("error get show time: " + error);
      }
    };

    getShowTime();
  }, []);

  return (
    <div className="show-time-detail-background">
      <div className="show-time-detail-container">
        <div className="show-time-detail-header">
          <div className="show-time-detail-header-edit">
            <div
              className="show-time-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="show-time-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="show-time-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="show-time-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="show-time-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="show-time-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="show-time-detail-name">
            <p>{code}</p>
          </div>
        </div>

        <div className="show-time-detail-content">
          <div className="show-time-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="show-time-detail-input">
              <label>Code</label>
              <div className="show-time-detail-input-dem"></div>

              <div className="input-show-time-detail-container">
                <input
                  className="input-show-time-detail"
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
            <div className="show-time-detail-input">
              <label>Ngày chiếu</label>
              <div className="show-time-detail-input-dem"></div>
              <DatePicker
                // locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={showDate}
                readOnly={!edit}
                onChange={(date) => onChangeHandleShowDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="show-time-detail-input">
              <label>Trạng thái</label>
              <div className="show-time-detail-input-dem"></div>
              <div className="input-show-time-detail-container">
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
          <div className="show-time-detail-content-right"></div>
        </div>
      </div>
    </div>
  );
};

export default ShowTimeDetail;
