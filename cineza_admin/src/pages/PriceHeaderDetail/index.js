import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import TableInPage from "../../components/TableInPage";
import "./priceHeaderDetail.css";
import PriceDetail from "../PriceDetail";
import {
  formatDateHandle,
  formatFromObjectToDate,
} from "../../components/util/index";

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
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];


const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Giá",
    data: "value",
  },
  {
    title: "Bảng giá header",
    data: "nameHeader",
  },
  {
    title: "Loại ghế",
    data: "typeSeat",
  },
];

const PriceHeaderDetail = ({ codePriceHeader, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startDayShow, setStartDayShow] = useState("");
  const [endDayShow, setEndDayShow] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);

  const [prices, setPrices] = useState([]);
  const [codePrice, setCodePrice] = useState("");
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  //handle rooms
  const handleRowClick = (row) => {
    // console.log(row);
    setCodePrice(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/rap";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };
  ////////////////////////////////////////////////////

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleStartDate = (text) => {
    setStartDay(text);
    setStartDayShow(text);
    console.log(startDay);
  };
  const onChangeHandleEndDate = (text) => {
    setEndDay(text);
    setEndDayShow(text);
  };

  const handleChangeDescription = (text) => {
    setDescription(text.target.value);
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

  useEffect(() => {
    onHandleFocusDescription();
  }, [description]);

  const onHandleFocusDescription = () => {
    if (editCode || edit) {
      if (description.trim().length <= 0) {
        setIsValidDescription(true);
      } else {
        setIsValidDescription(false);
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
    setDescription("");
    setStatus("");
    setStartDayShow(new Date());
    setEndDayShow(new Date());
    setStartDay(new Date());
    setEndDay(new Date());
  };

  const onClickHandleSave = async () => {
    const priceHeader = {
      code: code,
      startDay: startDayShow,
      endDay: endDayShow,
      description: description,
      status: status,
    };
    try {
      console.log(priceHeader);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/price-header/create`,
          priceHeader
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
          `http://localhost:9000/cineza/api/v1/price-header/put/` + code,
          priceHeader
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
      console.log("save price header fail: " + error);
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
      setDescription("");
      setStatus("");
      setStartDayShow(new Date());
      setEndDayShow(new Date());
      setStartDay(new Date());
      setEndDay(new Date());
    }
    const getPriceHeader = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/price-header/get-code/${codePriceHeader}`
        );
        if (response.status === 200) {
          setCode(response.data.code);
          setStartDay(response.data.startDay);
          setEndDay(response.data.endDay);
          setStartDayShow(new Date(Date.parse(response.data.startDay)));
          setEndDayShow(new Date(Date.parse(response.data.endDay)));
          setStatus(response.data.status);
          setDescription(response.data.description);
          console.log(new Date(Date.parse(response.data.startDay)));
        } else {
          console.log("get price header fail");
        }
      } catch (error) {
        console.log("error get price header: " + error);
      }
    };

    getPriceHeader();
  }, []);

  //get price by code price header
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/price/get-all-by-header/${codePriceHeader}`
        );
        if (result.status == 200) {
          setPrices(result.data);
        }
      } catch (error) {
        console.log("error get api all price " + error);
      }
    };

    getData();
  }, []);

  return (
    <div className="price-header-detail-background">
      <div className="price-header-detail-container">
        <div className="price-header-detail-header">
          <div className="price-header-detail-header-edit">
            <div
              className="price-header-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="price-header-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <Link
              className="price-header-detail-header-edit-detail"
              //to={"/promotion/code?code=" + code}
              to={"/price/code?code=" + code}
            >
              <img className="icon-detail" src={iconDetail} alt="update" />
              <p>Bảng giá</p>
            </Link>
            <div
              className="price-header-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="price-header-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="price-header-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="price-header-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="price-header-detail-name">
            <p>
              {code}: Từ ngày {formatDateHandle(startDayShow)} Đến ngày{" "}
              {formatDateHandle(endDayShow)}{" "}
            </p>
          </div>
        </div>

        <div className="price-header-detail-content">
          <div className="price-header-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="price-header-detail-input">
              <label>Code</label>
              <div className="price-header-detail-input-dem"></div>

              <div className="input-price-header-detail-container">
                <input
                  className="input-price-header-detail"
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
            <div className="price-header-detail-input">
              <label>Ngày bắt đầu</label>
              <div className="price-header-detail-input-dem"></div>
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

            <div className="price-header-detail-input">
              <label>Ngày Kết thúc</label>
              <div className="price-header-detail-input-dem"></div>

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
          </div>
          <div className="price-header-detail-content-right">
            <div className="price-header-detail-input">
              <label>Mô tả bảng giá</label>
              <div className="price-header-detail-input-dem"></div>
              <div className="input-price-header-detail-container">
                <textarea
                  className="input-price-header-detail"
                  value={description}
                  readOnly={!edit}
                  style={
                    edit
                      ? { height: "70px" }
                      : { height: "70px", background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => handleChangeDescription(text)}
                  onFocus={onHandleFocusDescription}
                />
                {isValidDescription && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="price-header-detail-input">
              <label>Trạng thái</label>
              <div className="price-header-detail-input-dem"></div>
              <div className="input-price-header-detail-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
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
          </div>
        </div>
        <div className="price-detail-container-page">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <h2>Danh sách bảng giá</h2>
            <img
              src={iconAdd}
              alt="btn-add"
              className="room-btn-add"
              onClick={onClickHandleBtnAdd}
            />
          </div>
          <div className="price-detail-table-page">
            <Table column={columns} data={prices} onRowClick={handleRowClick} />
            {/*  */}
          </div>
          {openModalDetail && (
            <PriceDetail
              onClickHandleClose={onClickHandleCloseP}
              codePrice={codePrice}
            />
          )}
          {openModelAdd && (
            <PriceDetail
              addBtn={true}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceHeaderDetail;
