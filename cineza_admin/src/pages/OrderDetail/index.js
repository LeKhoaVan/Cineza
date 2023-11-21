import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import "./orderDetail.css";
import RoomDetail from "../RoomDetail";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
// import TimePicker from "rc-time-picker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
// import "rc-time-picker/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
import axios from "axios";
registerLocale("vi", vi);

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const titleColumn = [
  {
    title: "Mã hóa đơn",
    data: "codeOder",
  },
  {
    title: "Tên phim",
    data: "movieName",
  },
  {
    title: "Tên rạp",
    data: "rapName",
  },
  {
    title: "Phòng",
    data: "roomName",
  },
  {
    title: "Vị trí ghế",
    data: "position",
  },
  {
    title: "Giá vé",
    data: "value",
  },
  {
    title: "Ngày thanh toán",
    data: "datePay",
  },
];

const OrderDetail = ({ codeOrder, onClickHandleClose }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [codeRoom, setCodeRoom] = useState("");
  const [openModalOrder, setOpenModalOrder] = useState(true);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  //handle order detail
  const handleRowClick = (row) => {
    console.log(row);
    // setCodeRoom(row);
    // setOpenModalDetail(!openModalDetail);
    // setOpenModalOrder(!openModalOrder);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/rap";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
    setOpenModalOrder(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    setOpenModalOrder(!openModalOrder);
  };
  ////////////////////////////////////////////////////

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
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

  //get order detail by code order
  useEffect(() => {
    const getRooms = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/order/get-by-code/${codeOrder}`
        );
        if (result.status === 200) {
          const dataResult = result.data.map((item) => {
            return {
              ...item,
              datePay: formatDateHandle(item.datePay),
            };
          });
          setOrders(dataResult);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="order-detail-background">
      <div className="order-detail-container">
        <div className="order-detail-header">
          <div className="order-detail-header-edit">
            {/* <div
              className="order-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="order-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="order-detail-header-edit-update"
              onClick={onClickHandleNew}
            >
              <img className="iconNew" src={iconCreateNew} alt="create new" />
              <p>Tạo mới</p>
            </div>*/}
            <div className="order-detail-header-name">
              <span>-- {codeOrder} -- </span>
            </div>
            <div
              className="order-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
        </div>

        {/* <div className="order-detail-content">
          <div className="order-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="order-detail-input">
              <label>Code</label>
              <div className="order-detail-input-dem"></div>

              <div className="input-order-container">
                <input
                  className="input-order"
                  // value={code}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleCode(text)}
                  // onFocus={onHandleFocusCode}
                />
              </div>
            </div>
            <div className="order-detail-input">
              <label>Mô tả</label>
              <div className="order-detail-input-dem"></div>
              <div className="input-order-container">
                <input
                  className="input-order"
                  // value={name}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  // onChange={(text) => onChangeHandleName(text)}
                  // onFocus={onHandleFocusName}
                />
              </div>
            </div>

            <div className="order-detail-input">
              <label>Trạng thái</label>
              <div className="order-detail-input-dem"></div>
              <div className="input-order-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
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

          <div className="order-detail-content-right"></div>
        </div> */}
        {/* <div
          style={{
            marginLeft: -20,
            paddingRight: 40,
            width: "100%",
            height: "10px",
            marginTop: 20,
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div> */}
        <div className="order-detail-container-page">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <h2>Danh sách hóa đơn chi tiết</h2>
          </div>
          <div className="order-detail-table-page">
            <Table
              column={titleColumn}
              data={orders}
              onRowClick={handleRowClick}
            />
            {/*  */}
          </div>
          {/* {openModalDetail && (
            <div className="order-detail-background">
              <div className="order-detail-container">
                <div className="order-detail-header">
                  <div className="order-detail-header-edit">
                    <div
                      className="order-detail-header-edit-save"
                      //   onClick={onClickHandleSave}
                    >
                      <img className="icon-save" src={iconSave} alt="update" />
                      <p>Lưu</p>
                    </div>
                    <div
                      className="order-detail-header-edit-update"
                      //   onClick={onClickHandleEdit}
                    >
                      <img className="icon-update" src={iconPen} alt="update" />
                      <p>Chỉnh sửa</p>
                    </div>
                    <div
                      className="order-detail-header-edit-new-delete"
                      //   onClick={onClickHandleNew}
                    >
                      <div className="order-detail-header-edit-new">
                        <img
                          className="iconNew"
                          src={iconCreateNew}
                          alt="create new"
                        />
                        <p>Tạo mới</p>
                      </div>
                      <div className="order-detail-header-edit-delete">
                        <img
                          className="iconDelete"
                          src={iconDelete}
                          alt="delete"
                        />
                        <p>Xóa</p>
                      </div>
                    </div>
                    <div
                      className="order-detail-header-close"
                      onClick={onClickHandleCloseP}
                    >
                      <img className="iconClose" src={iconClose} alt="close" />
                    </div>
                  </div>
                  <div className="order-detail-header-name">
                  </div>
                </div>

                <div className="order-detail-content">
                  <div className="order-detail-content-left">
                    <div className="order-detail-input">
                      <label>Mã hóa đơn</label>
                      <div className="order-detail-input-dem"></div>

                      <div className="input-order-container">
                        <input
                          className="input-order"
                          //   value={codeUser}
                          //   readOnly={!editCode}
                          //   style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                          //   onChange={(text) => onChangeHandleCode(text)}
                          //   onFocus={onHandleFocusCode}
                        />
                      </div>
                    </div>

                    <div className="order-detail-input">
                      <label>Loại</label>
                      <div className="order-detail-input-dem"></div>
                      <div className="input-order-container">
                        <input
                          className="input-order"
                          //   value={nameUser}
                          //   readOnly={!edit}
                          //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                          //   onChange={(text) => onChangeHandleName(text)}
                          //   onFocus={onHandleFocusName}
                        />
                      </div>
                    </div>

                    <div className="order-detail-input">
                      <label>Mã sản phẩm</label>
                      <div className="order-detail-input-dem"></div>
                      <div className="input-order-container">
                        <input
                          className="input-order"
                          //   value={nameUser}
                          //   readOnly={!edit}
                          //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                          //   onChange={(text) => onChangeHandleName(text)}
                          //   onFocus={onHandleFocusName}
                        />
                      </div>
                    </div>

                    <div className="order-detail-input">
                      <label>Giá</label>
                      <div className="order-detail-input-dem"></div>
                      <div className="input-order-container">
                        <input
                          className="input-order"
                          //   value={phoneUser}
                          //   readOnly={!edit}
                          //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                          //   onChange={(text) => onChangeHandlePhone(text)}
                          //   onFocus={onHandleFocusPhone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="order-detail-content-right"></div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
