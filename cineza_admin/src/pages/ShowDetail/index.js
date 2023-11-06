import React from "react";
import moment from "moment";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconRoom from "../../assets/imageButtons/iconRoom.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import Alert from "../../components/Alert";
import TableInPage from "../../components/TableInPage";
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
import { formatDateHandle, formatTimeHandle } from "../../components/util";

const dataStatus = [
  { id: "ACTIVE", value: "ACTIVE" },
  { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
  { id: "DESTROY", value: "DESTROY" },
];

const column = [
  { title: "Tên người dùng", data: "fullName" },
  { title: "Phim", data: "movieName" },
  { title: "Ngày chiếu", data: "showDate" },
  { title: "Giờ chiếu", data: "showStart" },
  { title: "Rap", data: "rapName" },
  { title: "Phòng", data: "roomName" },
  { title: "Ghế", data: "codeSeat" },
  { title: "Ngày đặt vé", data: "bookAt" },
  { title: "Trạng thái", data: "status" }
]


const ShowDetail = ({ codeShow, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [showStart, setShowStart] = useState("");
  const [codeMovie, setCodeMovie] = useState("");
  const [codeRap, setCodeRap] = useState("");
  const [codeRoom, setCodeRoom] = useState("");
  const [showDate, setShowDate] = useState("")
  const [status, setStatus] = useState("");
  const [dataTicket, setDataTicket] = useState([]);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataMovie, setDataMovie] = useState([]);
  const [dataRap, setDataRap] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dates, setDates] = useState([]);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidShowStart, setIsValidShowStart] = useState(false);
  const [isValidCodeMovie, setIsValidCodeMovie] = useState(false);
  const [isValidCodeRap, setIsValidCodeRap] = useState(false);
  const [isValidShowDate, setIsValidShowDate] = useState(false);
  const [isValidCodeRoom, setIsValidCodeRoom] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showRoom, setShowRoom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleOnClickBack = () => {
    setShowRoom(false);
  }

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxCodeMovie = (event) => {
    setCodeMovie(event.target.value);
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
  const onChangeHandleShowStart = (text) => {
    setShowStart(text);
    // console.log(text);
  };

  const handleChangeComboboxShowDate = (text) => {
    setShowDate(text.target.value)
  }

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
    if (codeMovie != "") {
      const getDate = async () => {
        const resutlDate = await axios.get(`http://localhost:9000/cineza/api/v1/movie/${codeMovie}`);
        if (resutlDate.status === 200) {
          const startDate = moment(resutlDate.data.startDate);
          const endDate = moment(resutlDate.data.endDate);

          const daysInRange = [];

          let currentDate = startDate.clone();
          while (currentDate.isSameOrBefore(endDate, "day")) {
            daysInRange.push(currentDate.format("DD-MM-YYYY"));
            currentDate.add(1, "days");
          }
          setDates(daysInRange)
        } else {
          console.log("error get date by movie")
        }
      };
      getDate();
    }
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

  useEffect(() => {
    onHandleFocusShowDate();
  }, [showDate]);

  const onHandleFocusShowDate = () => {
    if (editCode || edit) {
      if (showDate == undefined || showDate.length == 0) {
        setIsValidShowDate(true);
      } else {
        setIsValidShowDate(false);
      }
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
    } else {
      const getShow = async () => {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/show/get-by-code/${codeShow}`
        );
        if (result.status === 200) {
          setCode(result.data.code);
          setShowStart(new Date(result.data.showStart));

          setStatus(result.data.status);

          const inputDateTime = new Date(result.data.showDate);
          // Đặt múi giờ châu Á (UTC+7)
          const timeZoneOffset = 7 * 60; // UTC offset in minutes
          const asiaTime = new Date(inputDateTime.getTime() + timeZoneOffset * 60000);
          // Định dạng ngày theo "DD-MM-YYYY"
          const day = asiaTime.getDate();
          const month = asiaTime.getMonth() + 1;
          const year = asiaTime.getFullYear();
          const formattedDateTime = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
          setShowDate(formattedDateTime);

          setCodeMovie(result.data.codeMovie);
          setCodeRap(result.data.codeRap);
          setCodeRoom(result.data.codeRoom);
        }
      };
      getShow();
    }
  }, []);

  useEffect(() => {
    const getAllTicket = async () => {
      const allTicket = await axios.get(`http://localhost:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`);
      if (allTicket.status === 200) {
        const resultTickets = allTicket.data.map((t) => {
          return { ...t, showDate: formatDateHandle(t.showDate), showStart: formatTimeHandle(t.showStart), bookAt: formatDateHandle(t.bookAt) }
        })
        setDataTicket(resultTickets);
      } else {
        console.error("get all ticket in showing");
      }
    };
    getAllTicket();
  }, [codeShow])

  //combobox movie
  useEffect(() => {
    const getAllMovie = async () => {
      try {
        const allMovie = await axios.get(
          `http://localhost:9000/cineza/api/v1/movie/get-all`
        );
        if (allMovie.status === 200) {
          setDataMovie(allMovie.data);
        } else {
          console.error("get all movie error");
        }
      } catch (error) {
        console.error("get all movie error: " + error);
      }
    };
    getAllMovie();
  }, []);



  //combobox rap
  useEffect(() => {
    const getAllRap = async () => {
      try {
        const allRap = await axios.get(
          `http://localhost:9000/cineza/api/v1/rap/get-all`
        );
        if (allRap.status === 200) {
          setDataRap(allRap.data);
          setDataRoom([]);
        } else {
          console.error("get all Rap error");
        }
      } catch (error) {
        console.error("get all Rap error: " + error);
      }
    };
    getAllRap();
  }, []);

  //combobox room
  useEffect(() => {
    const getAllRoom = async () => {
      try {
        if (codeRap != "") {
          const allRoom = await axios.get(
            `http://localhost:9000/cineza/api/v1/room/get-all-by-code/${codeRap}`
          );
          if (allRoom.status === 200) {
            setDataRoom(allRoom.data);
          } else {
            console.error("get all Room error");
          }
        }
      } catch (error) {
        console.error("get all Room error: " + error);
      }
    };
    getAllRoom();
  }, [codeRap]);

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
    setShowStart("");
    setCodeMovie("");
    setCodeRap("");
    setShowDate("")
    setDates([])
    setCodeRoom("");
  };

  const onClickHandleSave = async () => {
    const show = {
      code: code,
      showStart: showStart,
      status: status,
      codeMovie: codeMovie,
      showDate: moment(showDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      codeRap: codeRap,
      codeRoom: codeRoom,
    };
    onHandleFocusCode();
    onHandleFocusCodeMovie();
    onHandleFocusCodeRap();
    onHandleFocusCodeRoom();
    onHandleFocusStatus();
    if (
      !isValidCode &
      !isValidCodeMovie &
      !isValidCodeRap &
      !isValidStatus &
      !isValidCodeRoom
    ) {
      try {
        console.log(show);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/show/create`,
            show
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
            `http://localhost:9000/cineza/api/v1/show/put/` + code,
            show
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
        console.log("save fail: " + error);
        setMessage("Lưu thất bại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Vui lòng nhập đầy đủ");
      setShowAlert(true);
    }
  };

  const onClickHandleShowRoom = () => {
    setShowRoom(true);
  }

  // Tạo một mảng 2D để đại diện cho sơ đồ ghế
  const seats = Array(5).fill().map(() => Array(8).fill('available'));


  return (
    <div className="show-detail-background">
      {showRoom == true ?
        (
          <div className="show-room-container">
            <div className="show-room-diagram">
              <img src={iconBack} onClick={handleOnClickBack} className="show-room-iconBack" alt="icon-back" />
              <h3>Sơ đồ ghế</h3>
              <div className="seat-map">
                {seats.map((row, rowIndex) => (
                  <div key={rowIndex} className="seat-row">
                    {row.map((seat, seatIndex) => (
                      <div key={seatIndex} className={`seat ${seat}`}>A11</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="show-room-detail">
              <h3>Thông tin phòng</h3>
            </div>
          </div>
        )
        :
        (
          <div className="show-detail-container">
            <div className="show-detail-header">
              <div className="show-detail-header-edit">
                <div
                  className="show-detail-header-edit-save"
                  onClick={onClickHandleSave}
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
                  className="show-detail-header-edit-show-room"
                  onClick={onClickHandleShowRoom}
                >
                  <img className="icon-update" src={iconRoom} alt="update" />
                  <p>Phòng chiếu</p>
                </div>
                <div
                  className="show-detail-header-close">
                  <img className="iconClose" onClick={onClickHandleClose} src={iconClose} alt="close" />
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

                <div className="show-detail-input">
                  <label>Thời gian chiếu</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <TimePicker
                      format="hh:mm a"
                      openClockOnFocus={false}

                      value={showStart}
                      onChange={(text) => onChangeHandleShowStart(text)}
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
                        value={codeMovie}
                        label="mã phim"
                        onChange={handleChangeComboboxCodeMovie}
                        onFocus={onHandleFocusCodeMovie}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {dataMovie.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.movieName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidCodeMovie && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Ngày chiếu</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <FormControl
                      sx={{ width: "52%", marginRight: "80px" }}
                      size="small"
                    >
                      <InputLabel id="demo-select-small-label">
                        Ngày chiếu
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={showDate}
                        label="Ngày chiếu"

                        onChange={handleChangeComboboxShowDate}
                        onFocus={onHandleFocusShowDate}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {dates.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st}>
                              {st}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidShowDate && (
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
                        value={codeRap}
                        label="mã rạp"
                        onChange={handleChangeComboboxCodeRap}
                        onFocus={onHandleFocusCodeRap}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {dataRap.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.code}
                            </MenuItem>
                          );
                        })}
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
                        value={codeRoom}
                        label="mã phòng"
                        onChange={handleChangeComboboxCodeRoom}
                        onFocus={onHandleFocusCodeRoom}
                        readOnly={!edit}
                        style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                      >
                        {dataRoom.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.code}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidCodeRoom && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h3>Danh sách vé</h3>
            <div className="show-detail-table-content">
              <TableInPage data={dataTicket} column={column} />
            </div>
          </div>
        )}

    </div>
  );
};

export default ShowDetail;
