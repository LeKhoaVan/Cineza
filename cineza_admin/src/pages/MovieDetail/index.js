import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./movieDetail.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
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

const dataLevel = [
    { id: "ADMIN", value: "ADMIN" },
    { id: "USER", value: "USER" },
    { id: "COMUNITY", value: "COMUNITY" },
    { id: "VIP", value: "VIP" },
];

const MovieDetail = ({ codeUserBy, onClickHandleClose, addBtn }) => {

    const [country, setCountry] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState("");
    const [district, setDistrict] = useState([]);
    const [districtId, setDistrictId] = useState("");
    const [ward, setWard] = useState([]);
    const [wardId, setWardId] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };


    return (
        <div className="movie-detail-background">
            <div className="movie-detail-container">
                <div className="movie-detail-header">
                    <div className="movie-detail-header-edit">
                        <div
                            className="movie-detail-header-edit-save"
                        //   onClick={onClickHandleSave}
                        >
                            <img className="icon-save" src={iconSave} alt="update" />
                            <p>Lưu</p>
                        </div>
                        <div
                            className="movie-detail-header-edit-update"
                        //   onClick={onClickHandleEdit}
                        >
                            <img className="icon-update" src={iconPen} alt="update" />
                            <p>Chỉnh sửa</p>
                        </div>
                        <div
                            className="movie-detail-header-edit-new-delete"
                        //   onClick={onClickHandleNew}
                        >
                            <div className="movie-detail-header-edit-new">
                                <img className="iconNew" src={iconCreateNew} alt="create new" />
                                <p>Tạo mới</p>
                            </div>
                            <div className="movie-detail-header-edit-delete">
                                <img className="iconDelete" src={iconDelete} alt="delete" />
                                <p>Xóa</p>
                            </div>
                        </div>
                        <div
                            className="movie-detail-header-close"
                            onClick={onClickHandleClose}
                        >
                            <img className="iconClose" src={iconClose} alt="close" />
                        </div>
                    </div>
                    <div className="movie-detail-header-name">
                        {/* <span>{codeUser} - </span> <span>-{nameUser} </span> */}
                    </div>
                </div>

                <div className="movie-detail-content">
                    <div className="movie-detail-content-left">
                        {/* {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )} */}
                        <div className="movie-detail-input">
                            <label>Mã phim</label>
                            <div className="movie-detail-input-dem"></div>

                            <div className="input-movie-container">
                                <input
                                    className="input-movie"
                                //   value={codeUser}
                                //   readOnly={!editCode}
                                //   style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandleCode(text)}
                                //   onFocus={onHandleFocusCode}
                                />
                                {/* {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )} */}
                            </div>

                            {/* {isValid && (
                <p style={{ color: "red" }}>Mã người dùng không được trống.</p>
              )} */}
                        </div>
                        <div className="movie-detail-input">
                            <label>Tên phim</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <input
                                    className="input-movie"
                                //   value={nameUser}
                                //   readOnly={!edit}
                                //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandleName(text)}
                                //   onFocus={onHandleFocusName}
                                />
                                {/* {isValidName && (
                  <p style={{ color: "red" }}>"Tên tối thiểu 3 ký tự chữ"</p>
                )} */}
                            </div>
                        </div>

                        <div className="movie-detail-input">
                            <label>Thể loại</label>
                            <div className="movie-detail-input-dem"></div>
                            {/* <input className="input-movie" value={levelUser} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleLevel(text)} /> */}
                            <div className="input-movie-container">
                                <FormControl
                                    sx={{ width: "52%", marginRight: "80px" }}
                                    size="small"
                                >
                                    <InputLabel id="demo-select-small-label">Level</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                    // value={levelUser}
                                    // label="Level"
                                    // onChange={handleChangeComboboxLevel}
                                    // onFocus={onHandleFocusLevel}
                                    // readOnly={!edit}
                                    // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                    >
                                        {dataLevel.map((st, index) => {
                                            return (
                                                <MenuItem key={index} value={st.id}>
                                                    {st.value}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                {/* {isValidLevel && (
                  <p style={{ color: "red" }}>Level không bỏ trống</p>
                )} */}
                            </div>
                        </div>
                        <div className="movie-detail-input">
                            <label>Mô tả</label>
                            <div className="movie-detail-input-dem"></div>

                            <div className="input-movie-container">
                                <textarea
                                    style={{ height: "50px" }}
                                    className="input-movie"
                                //   value={numberHome}
                                //   readOnly={!edit}
                                //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandleNumberHome(text)}
                                //   onFocus={onHandleFocusHome}
                                />
                                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
                            </div>
                        </div>

                        <div className="movie-detail-input">
                            <label>Chọn poster</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <div className="movie-detail-poster">
                                    <input
                                        type="file"
                                        accept="image/*" // Chỉ cho phép chọn ảnh
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
                            </div>
                        </div>

                        <div className="movie-detail-input">
                            <label>Poster phim</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <div className="movie-detail-poster">
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt="Ảnh đã chọn"
                                            style={{ maxWidth: '300px' }}
                                        />
                                    )}
                                </div>

                                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
                            </div>
                        </div>

                    </div>
                    <div className="movie-detail-content-right">
                        <div className="movie-detail-input">
                            <label>Tác giả</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <input
                                    className="input-movie"
                                //   value={phoneUser}
                                //   readOnly={!edit}
                                //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandlePhone(text)}
                                //   onFocus={onHandleFocusPhone}
                                />
                                {/* {isValidPhone && (
                  <p style={{ color: "red" }}>Số điện thoại không đúng</p>
                )} */}
                            </div>
                        </div>
                        <div className="movie-detail-input">
                            <label>Diễn viên chính</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <input
                                    className="input-movie"
                                //   value={phoneUser}
                                //   readOnly={!edit}
                                //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandlePhone(text)}
                                //   onFocus={onHandleFocusPhone}
                                />
                                {/* {isValidPhone && (
                  <p style={{ color: "red" }}>Số điện thoại không đúng</p>
                )} */}
                            </div>
                        </div>
                        <div className="movie-detail-input">
                            <label>Ngày phát hành</label>
                            <div className="movie-detail-input-dem"></div>
                            {/* <input className="input-movie" value={dateOfBirth} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                onChange={(text) => onChangeHandleDate(text)} /> */}
                            <DatePicker
                                locale="vi"
                                dateFormat="dd-MM-yyyy"
                                // selected={dateOfBirthShow}
                                // readOnly={!edit}
                                // onChange={(date) => onChangeHandleDate(date)}
                                fixedHeight="60px"
                                portalId="root-portal"
                                className="date-picker"
                            />
                        </div>
                        <div className="movie-detail-input">
                            <label>Trạng thái</label>
                            <div className="movie-detail-input-dem"></div>
                            {/* <input className="input-movie" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
                            <div className="input-movie-container">
                                <FormControl
                                    sx={{ width: "52%", marginRight: "80px" }}
                                    size="small"
                                >
                                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                    // value={status}
                                    // label="Status"
                                    // onChange={handleChangeComboboxStatus}
                                    // onFocus={onHandleFocusStatus}
                                    // readOnly={!edit}
                                    // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
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
                                {/* {isValidStatus && (
                                    <p style={{ color: "red" }}>Không được bỏ trống</p>
                                )} */}
                            </div>
                        </div>
                        <div className="movie-detail-input">
                            <label>Ngôn ngữ phim</label>
                            <div className="movie-detail-input-dem"></div>
                            <div className="input-movie-container">
                                <input
                                    className="input-movie"
                                //   value={typeUser}
                                //   readOnly={true}
                                //   style={{ background: "rgb(196, 196, 196)" }}
                                //   onChange={(text) => onChangeHandleType(text)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
