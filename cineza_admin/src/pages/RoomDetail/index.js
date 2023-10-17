import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import Alert from "../../components/Alert";
import "./roomDetail.css";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const dataStatus = [
  { id: "ACTIVE", value: "ACTIVE" },
  { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
  { id: "DESTROY", value: "DESTROY" },
];

const RoomDetail = ({ codeRoom, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [codeRap, setCodeRap] = useState("");
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataRap, setDataRap] = useState([]);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleName = (text) => {
    setName(text.target.value);
  };

  const onChangeHandleCodeRap = (text) => {
    setCodeRap(text.target.value);
  };

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
    onHandleFocusName();
  }, [name]);

  const onHandleFocusName = () => {
    if (editCode || edit) {
      if (name == undefined || name.trim().length <= 0) {
        setIsValidName(true);
      } else {
        setIsValidName(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status == undefined || status.length == 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
      }
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
      setCodeRap(codeRap);
      // setCodeRap("rap01");
    }
    const getRoom = async () => {
      const result = await axios.get(
        `http://localhost:9000/cineza/api/v1/room/get-by-code/${codeRoom}`
      );
      if (result.status === 200) {
        setCode(result.data.code);
        setName(result.data.name);
        setCodeRap(result.data.codeRap);
        setStatus(result.data.status);
      }
    };
    getRoom();
  }, []);

  useEffect(() => {
    const getAllRap = async () => {
      try {
        const allRap = await axios.get(
          "http://localhost:9000/cineza/api/v1/rap/get-all"
        );
        if (allRap.status === 200) {
          setDataRap(allRap.data);
        } else {
          console.error("error get rap");
        }
      } catch (error) {
        console.error("error get all rap: " + error);
      }
    };
    getAllRap();
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

    setCode("");
    setName("");
    setStatus("");
    setCodeRap(codeRap);
  };

  const onClickHandleSave = async () => {
    const room = {
      code: code,
      name: name,
      codeRap: codeRap,
      status: status,
    };
    onHandleFocusCode();
    onHandleFocusName();
    onHandleFocusStatus();
    if (!isValidCode & !isValidName & !isValidStatus) {
      try {
        console.log(room);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/room/create`,
            room
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
            `http://localhost:9000/cineza/api/v1/room/put/` + code,
            room
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
        console.log("save room fail: " + error);
        setMessage("Lưu thất bại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Vui lòng nhập đầy đủ");
      setShowAlert(true);
    }
  };

  return (
    <div className="room-detail-background">
      <div className="room-detail-container">
        <div className="room-detail-header">
          <div className="room-detail-header-edit">
            <div
              className="room-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="room-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <Link
              className="room-detail-header-edit-detail"
              to={"/room/code?code=" + code}
            >
              <img className="icon-detail" src={iconDetail} alt="update" />
              <p>Danh sách ghế</p>
            </Link>
            <div
              className="room-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="room-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="room-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="room-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="room-detail-header-name">
            <span>{code} - </span> <span>-{name} </span>
          </div>
        </div>

        <div className="room-detail-content">
          <div className="room-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="room-detail-input">
              <label>Mã phòng</label>
              <div className="room-detail-input-dem"></div>

              <div className="input-room-container">
                <input
                  className="input-room"
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
            <div className="room-detail-input">
              <label>Tên phòng</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
                <input
                  className="input-room"
                  value={name}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleName(text)}
                  onFocus={onHandleFocusName}
                />
                {isValidName && (
                  <p style={{ color: "red" }}>"Không để trống"</p>
                )}
              </div>
            </div>
            <div className="room-detail-input">
              <label>Mã rap</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
                <input
                  className="input-room"
                  value={codeRap}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleCodeRap(text)}
                  // onFocus={onHandleFocusPosition}
                />
              </div>
            </div>

            <div className="room-detail-input">
              <label>Trạng thái</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
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
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={handleChangeComboboxStatus}
                    onFocus={onHandleFocusStatus}
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

          <div className="room-detail-content-right"></div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
