import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import Alert from "../../components/Alert";
import "./showDetail.css";

import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import axios from "axios";

const dataStatus = [
  { id: "ACTIVE", value: "ACTIVE" },
  { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
  { id: "DESTROY", value: "DESTROY" },
];

const ShowDetail = ({ codeShowBy, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [screenAt, setScreenAt] = useState("");
  const [codeMovie, setCodeMovie] = useState("");
  const [codeShowTime, setCodeShowTime] = useState("");
  const [codeRap, setCodeRap] = useState("");
  const [codeRoom, setCodeRoom] = useState("");
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidScreenAt, setIsValidScreenAt] = useState(false);
  const [isValidCodeMovie, setIsValidCodeMovie] = useState(false);
  const [isValidCodeShowTime, setIsValidCodeShowTime] = useState(false);
  const [isValidCodeRap, setIsValidCodeRap] = useState(false);
  const [isValidCodeRoom, setIsValidCodeRoom] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxCodeMovie = (event) => {
    setCodeMovie(event.target.value);
  };
  const handleChangeComboboxCodeShowTime = (event) => {
    setCodeShowTime(event.target.value);
  };
  const handleChangeComboboxCodeRap = (event) => {
    setCodeRap(event.target.value);
  };
  const handleChangeComboboxCodeRoom = (event) => {
    setCodeRoom(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleScreenAt = (text) => {
    setScreenAt(text);
    console.log(text);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code == undefined || code.length <= 0) {
        setIsValidCode(true);
      } else {
        setIsValidCode(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeMovie();
  }, [codeMovie]);

  const onHandleFocusCodeMovie = () => {
    if (editCode || edit) {
      if (codeMovie == undefined || codeMovie.length <= 0) {
        setIsValidCodeMovie(true);
      } else {
        setIsValidCodeMovie(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeShowTime();
  }, [codeShowTime]);

  const onHandleFocusCodeShowTime = () => {
    if (editCode || edit) {
      if (codeShowTime == undefined || codeShowTime.length <= 0) {
        setIsValidCodeShowTime(true);
      } else {
        setIsValidCodeShowTime(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeRap();
  }, [codeRap]);

  const onHandleFocusCodeRap = () => {
    if (editCode || edit) {
      if (codeRap == undefined || codeRap.length <= 0) {
        setIsValidCodeRap(true);
      } else {
        setIsValidCodeRap(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeRoom();
  }, [codeRoom]);

  const onHandleFocusCodeRoom = () => {
    if (editCode || edit) {
      if (codeRoom == undefined || codeRoom.length <= 0) {
        setIsValidCodeRoom(true);
      } else {
        setIsValidCodeRoom(false);
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

  // useEffect(() => {
  //   if (addBtn) {
  //     setEditCode(true);
  //     setEdit(true);
  //     setCreateNew(true);
  //   }
  //   const getRap = async () => {
  //     const result = await axios.get(
  //       `http://localhost:9000/cineza/api/v1/rap/get-by-code/${codeRapBy}`
  //     );
  //     if (result.status === 200) {
  //       setCode(result.data.code);
  //       setName(result.data.name);
  //       setNumberRap(result.data.numberRap);
  //       setOpenTime(result.data.openTime);
  //       setCloseTime(result.data.closeTime);
  //       setStatus(result.data.status);

  //       setCountryId(result.data.countryAddress);
  //       setCityId(result.data.cityAddress);
  //       setDistrictId(result.data.districtAddress);
  //       setWardId(result.data.wardAddress);
  //     }
  //   };
  //   getRap();
  // }, []);

  //combobox movie
  // useEffect(() => {
  //   const getAllMovie = async () => {
  //     try {
  //       const allCountry = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/value/get-level?level=QUOCGIA`
  //       );
  //       if (allCountry.status === 200) {
  //         setCountry(allCountry.data);
  //       } else {
  //         console.error("get all country error");
  //       }
  //     } catch (error) {
  //       console.error("get all country error: " + error);
  //     }
  //   };
  //   getAllMovie();
  // }, []);

  //combobox show time
  // useEffect(() => {
  //   const getAllShowTime = async () => {
  //     try {
  //       const allCity = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/value/get-level?level=TINH/TP`
  //       );
  //       if (allCity.status === 200) {
  //         setCity(allCity.data);
  //       } else {
  //         console.error("get all city error");
  //       }
  //     } catch (error) {
  //       console.error("get all country error: " + error);
  //     }
  //   };
  //   getAllShowTime();
  // }, []);

  //combobox rap
  // useEffect(() => {
  //   const getAllRap = async () => {
  //     try {
  //       const allDistrict = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/value/get-level?level=HUYEN/QUAN`
  //       );
  //       if (allDistrict.status === 200) {
  //         setDistrict(allDistrict.data);
  //       } else {
  //         console.error("get all country error");
  //       }
  //     } catch (error) {
  //       console.error("get all country error: " + error);
  //     }
  //   };
  //   getAllRap();
  // }, []);

  //combobox room
  // useEffect(() => {
  //   const getAllRoom = async () => {
  //     try {
  //       const allWard = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/value/get-level?level=XA/PHUONG`
  //       );
  //       if (allWard.status === 200) {
  //         setWard(allWard.data);
  //       } else {
  //         console.error("get all country error");
  //       }
  //     } catch (error) {
  //       console.error("get all country error: " + error);
  //     }
  //   };
  //   getAllRoom();
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
    setStatus("");
    setScreenAt("");
    setCodeMovie("");
    setCodeShowTime("");
    setCodeRap("");
    setCodeRoom("");
  };

  // const onClickHandleSave = async () => {
  //   const rap = {
  //     code: code,
  //     screenAt: screenAt,
  //     status: status,
  //     codeMovie: codeMovie,
  //     codeShowTime: codeShowTime,
  //     codeRap: codeRap,
  //     codeRoom: codeRoom,
  //   };
  //   onHandleFocusCode();
  //   onHandleFocusCodeMovie();
  //   onHandleFocusCodeRap();
  //   onHandleFocusCodeRoom();
  //   onHandleFocusCodeShowTime();
  //   onHandleFocusStatus();
  //   if (
  //     !isValidCode &
  //     !isValidCodeMovie &
  //     !isValidCodeRap &
  //     !isValidStatus &
  //     !isValidCodeRoom &
  //     !isValidCodeShowTime
  //   ) {
  //     try {
  //       console.log(rap);
  //       if (editCode) {
  //         const response = await axios.post(
  //           `http://localhost:9000/cineza/api/v1/rap/create`,
  //           rap
  //         );
  //         if (response.status === 201) {
  //           setMessage("Lưu thành công");
  //           setShowAlert(true);
  //         } else {
  //           setMessage("Lưu thất bại");
  //           setShowAlert(true);
  //         }
  //       } else if (update) {
  //         const response = await axios.put(
  //           `http://localhost:9000/cineza/api/v1/rap/put/` + code,
  //           rap
  //         );
  //         if (response.status === 200) {
  //           console.log("save success");
  //           setMessage("Cập nhật thành công");
  //           setShowAlert(true);
  //         } else {
  //           setMessage("Cập thất bại");
  //           setShowAlert(true);
  //         }
  //       }
  //     } catch (error) {
  //       console.log("save address fail: " + error);
  //       setMessage("Lưu thất bại");
  //       setShowAlert(true);
  //     }
  //   } else {
  //     console.log("lưu sai");
  //     setMessage("Vui lòng nhập đầy đủ");
  //     setShowAlert(true);
  //   }
  // };

  return (
    <div className="show-detail-background">
      <div className="show-detail-container">
        <div className="show-detail-header">
          <div className="show-detail-header-edit">
            <div
              className="show-detail-header-edit-save"
              // onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="show-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="show-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="show-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="show-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="show-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="show-detail-header-name">
            <span>{code} </span>
          </div>
        </div>

        <div className="show-detail-content">
          <div className="show-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="show-detail-input">
              <label>Mã xuất chiếu</label>
              <div className="show-detail-input-dem"></div>

              <div className="input-show-detail-container">
                <input
                  className="input-show-detail"
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

            <div className="show-detail-input">
              <label>Thời gian chiếu</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <TimePicker
                  format="hh:mm:ss a"
                  openClockOnFocus={false}
                  // value={screenAt}
                  onChange={(text) => onChangeHandleScreenAt(text)}
                />
              </div>
            </div>

            <div className="show-detail-input">
              <label>Trạng thái</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={status}
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

          <div className="show-detail-content-right">
            <div className="show-detail-input">
              <label>Mã phim</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">mã phim</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={codeMovie}
                    label="mã phim"
                    onChange={handleChangeComboboxCodeMovie}
                    onFocus={onHandleFocusCodeMovie}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {/* {dataMovie.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
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

            <div className="show-detail-input">
              <label>Mã lịch chiếu</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    mã lịch chiếu
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={codeShowTime}
                    label="mã lịch chiếu"
                    onChange={handleChangeComboboxCodeShowTime}
                    onFocus={onHandleFocusCodeShowTime}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {/* {dataShowTime.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })} */}
                  </Select>
                </FormControl>
                {isValidCodeShowTime && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="show-detail-input">
              <label>Mã rạp</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">mã rạp</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={codeRap}
                    label="mã rạp"
                    onChange={handleChangeComboboxCodeRap}
                    onFocus={onHandleFocusCodeRap}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {/* {dataRap.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })} */}
                  </Select>
                </FormControl>
                {isValidCodeRap && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="show-detail-input">
              <label>Mã phòng</label>
              <div className="show-detail-input-dem"></div>
              <div className="input-show-detail-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">mã phòng</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={status}
                    label="mã phòng"
                    onChange={handleChangeComboboxCodeRoom}
                    onFocus={onHandleFocusCodeRoom}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {/* {dataRoom.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })} */}
                  </Select>
                </FormControl>
                {isValidCodeRoom && (
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

export default ShowDetail;