import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./ticketDetail.css";
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

const TicketDetail = ({ codeTicket, onClickHandleClose, addBtn }) => {
  const [codeShowing, setCodeShowing] = useState("");
  const [codeSeat, setCodeSeat] = useState("");
  const [bookAt, setBookAt] = useState(new Date());
  const [ticketEffecticeAt, setTicketEffecticeAt] = useState(new Date());
  const [ticketExpiryAt, setTicketExpiryAt] = useState(new Date());
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataShowing, setDataShowing] = useState([]);
  const [dataSeat, setDataSeat] = useState([]);

  const [isValidCodeShowing, setIsValidCodeShowing] = useState(false);
  const [isValidCodeSeat, setIsValidCodeSeat] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChangeHandleBookAt = (text) => {
    setBookAt(text);
  };
  const onChangeHandleTicketEffecticeAt = (text) => {
    setTicketEffecticeAt(text);
  };
  const onChangeHandleTicketExpiryAt = (text) => {
    setTicketExpiryAt(text);
  };
  const handleChangeComboboxStatus = (text) => {
    setStatus(text.target.value);
  };
  const handleChangeComboboxCodeShowing = (text) => {
    setCodeShowing(text.target.value);
  };
  const handleChangeComboboxCodeSeat = (text) => {
    setCodeSeat(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCodeShowing();
  }, [codeShowing]);

  const onHandleFocusCodeShowing = () => {
    if (editCode || edit) {
      if (codeShowing.trim().length <= 0) {
        setIsValidCodeShowing(true);
      } else {
        setIsValidCodeShowing(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeSeat();
  }, [codeSeat]);

  const onHandleFocusCodeSeat = () => {
    if (editCode || edit) {
      if (codeSeat.trim().length <= 0) {
        setIsValidCodeSeat(true);
      } else {
        setIsValidCodeSeat(false);
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

    setCodeSeat("");
    setCodeShowing("");
    setStatus("");
    setBookAt(new Date());
    setTicketEffecticeAt(new Date());
    setTicketExpiryAt(new Date());
  };

  const onClickHandleSave = async () => {
    const ticket = {
      codeShowing: codeShowing,
      codeSeat: codeSeat,
      status: status,
    };
    try {
      console.log(ticket);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/ticket/create`,
          ticket
        );
        if (response.status === 201) {
          setMessage("Lưu thành công");
          setShowAlert(true);
        } else {
          setMessage("Lưu thất bại");
          setShowAlert(true);
        }
      }
      // else if (update) {
      //   const response = await axios.put(
      //     `http://localhost:9000/cineza/api/v1/ticket/put/` + code,
      //     showTime
      //   );
      //   if (response.status === 200) {
      //     console.log("save success");
      //     setMessage("Cập nhật thành công");
      //     setShowAlert(true);
      //   } else {
      //     setMessage("Cập thất bại");
      //     setShowAlert(true);
      //   }
      // }
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

      setCodeShowing("");
      setCodeSeat("");
      setStatus("");
    }
    const getShowTime = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:9000/cineza/api/v1/ticket/get-by-code/${codeTicket}`
        // );
        // if (response.status === 200) {
        //   setCodeShowing(response.data.codeShowing);
        //   setCodeSeat(response.data.codeSeat);
        //   setBookAt(new Date(Date.parse(response.data.bookAt)));
        //   setTicketEffecticeAt(
        //     new Date(Date.parse(response.data.ticketEffecticeAt))
        //   );
        //   setTicketExpiryAt(
        //     new Date(Date.parsere(response.data.ticketExpiryAt))
        //   );
        //   setStatus(response.data.status);
        //   console.log(response.data);
        // } else {
        //   console.log("get ticket fail");
        // }
      } catch (error) {
        console.log("error get ticket: " + error);
      }
    };

    getShowTime();
  }, []);

  //combobox showing
  useEffect(() => {
    const getAllShowing = async () => {
      try {
        const allShowing = await axios.get(
          `http://localhost:9000/cineza/api/v1/show/get-all`
        );
        if (allShowing.status === 200) {
          setDataShowing(allShowing.data);
          console.log(allShowing.data);
        } else {
          console.error("get all Showing error");
        }
      } catch (error) {
        console.error("get all Showing error: " + error);
      }
    };
    getAllShowing();
  }, []);

  //combobox seat
  useEffect(() => {
    const getAllSeat = async () => {
      try {
        const allSeat = await axios.get(
          `http://localhost:9000/cineza/api/v1/seat/get-all`
        );
        if (allSeat.status === 200) {
          setDataSeat(allSeat.data);
          console.log(allSeat.data);
        } else {
          console.error("get all Seat error");
        }
      } catch (error) {
        console.error("get all Seat error: " + error);
      }
    };
    getAllSeat();
  }, []);

  return (
    <div className="ticket-detail-background">
      <div className="ticket-detail-container">
        <div className="ticket-detail-header">
          <div className="ticket-detail-header-edit">
            <div
              className="ticket-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="ticket-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="ticket-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="ticket-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="ticket-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="ticket-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="ticket-detail-name">
            <p></p>
          </div>
        </div>

        <div className="ticket-detail-content">
          <div className="ticket-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}

            <div className="ticket-detail-input">
              <label>Ngày đặt </label>
              <div className="ticket-detail-input-dem"></div>
              <DatePicker
                // locale="vi"
                // dateFormat="dd-MM-yyyy"
                // selected={bookAt}
                readOnly={!edit}
                // onChange={(date) => onChangeHandleBookAt(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="ticket-detail-input">
              <label>Hiệu lực vé</label>
              <div className="ticket-detail-input-dem"></div>
              <DatePicker
                // locale="vi"
                // dateFormat="dd-MM-yyyy"
                // selected={ticketEffecticeAt}
                readOnly={!edit}
                // onChange={(date) => onChangeHandleTicketEffecticeAt(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="ticket-detail-input">
              <label>Hạn vé</label>
              <div className="ticket-detail-input-dem"></div>
              <DatePicker
                // locale="vi"
                // dateFormat="dd-MM-yyyy"
                // selected={ticketExpiryAt}
                readOnly={!edit}
                // onChange={(date) => onChangeHandleTicketExpiryAt(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>
          </div>
          <div className="ticket-detail-content-right">
            <div className="ticket-input">
              <label>Mã suất chiếu</label>
              <div className="ticket-input-dem"></div>
              <div className="input-ticket-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    mã suất chiếu
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeShowing}
                    label="mã suất chiếu"
                    onChange={handleChangeComboboxCodeShowing}
                    onFocus={onHandleFocusCodeShowing}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataShowing.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.code}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidCodeShowing && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="ticket-input">
              <label>Mã ghế</label>
              <div className="ticket-input-dem"></div>
              <div className="input-ticket-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">mã ghế</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeSeat}
                    label="mã ghế"
                    onChange={handleChangeComboboxCodeSeat}
                    onFocus={onHandleFocusCodeSeat}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataSeat.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.code}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidCodeSeat && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="ticket-detail-input">
              <label>Trạng thái</label>
              <div className="ticket-detail-input-dem"></div>
              <div className="input-ticket-detail-container">
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

export default TicketDetail;
