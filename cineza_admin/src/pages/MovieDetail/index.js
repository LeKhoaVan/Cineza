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
const FormData = require("form-data");
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
// "TIENG VIET", "ANH", "TRUNG QUOC", "NHAT BAN"
const dataLanguage = [
  { id: "TIENG VIET", value: "Tiếng Việt" },

  { id: "ANH", value: "Tiếng Anh" },

  { id: "TRUNG QUOC", value: "Tiếng Trung" },

  { id: "NHAT BAN", value: "Tiếng Nhật" },
];

const MovieDetail = ({ onClickHandleClose, addBtn, movieClick }) => {
  const [dataTypeMovie, setDataTypeMovie] = useState([]);
  const [selectedImage, setSelectedImage] = useState(movieClick?.moviePoster);

  const [code, setCode] = useState(movieClick?.code);
  const [movieName, setMovieName] = useState(movieClick?.movieName);
  const [movieTime, setMovieTime] = useState(movieClick?.movieTime);
  const [movieType, setMovieType] = useState(movieClick?.movieType);
  const [posterMovie, setPosterMovie] = useState(movieClick?.moviePoster);
  const [description, setDescription] = useState(movieClick?.description);
  const [actor, setActor] = useState(movieClick?.actor);
  const [director, setDirector] = useState(movieClick?.director);
  const [startDate, setStartDate] = useState(
    movieClick ? new Date(Date.parse(movieClick.startDate)) : ""
  );
  const [endDate, setEndDate] = useState(
    movieClick ? new Date(Date.parse(movieClick.endDate)) : ""
  );
  const [status, setStatus] = useState(movieClick?.status);
  const [languageMovie, setLanguageMovie] = useState(movieClick?.language);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPosterMovie(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  //   useEffect(() => {
  //     const getTypeMovie = async () => {
  //
  //       const typeMovie = await axios.get(
  //         "http:localhost:9000/cineza/api/v1/movie-type/get-all"
  //       );
  //       if (typeMovie.status == 200) {
  //         setDataTypeMovie(typeMovie.data);
  //       } else {
  //         console.error("error get all type movie");
  //       }
  //     };
  //     getTypeMovie();
  //   }, []);

  useEffect(() => {
    if (addBtn) {
      setUpdate(false);
      setCreateNew(true);
      setEditCode(true);
      setEdit(true);

      setCode("");
      setMovieName("");
      setSelectedImage(null);
      setPosterMovie("");
      setMovieType("");
      setMovieTime("");
      setStartDate(new Date());
      setEndDate(new Date());
      setDescription("");
      setActor("");
      setDirector("");
      setStatus("");
      setLanguageMovie("");
    }
    const getAllTypeMovie = async () => {
      try {
        const allTypeMovie = await axios.get(
          "http://localhost:9000/cineza/api/v1/movie-type/get-all"
        );
        if (allTypeMovie.status === 200) {
          setDataTypeMovie(allTypeMovie.data);
        } else {
          console.error("error get type movie");
        }
      } catch (error) {
        console.error("error get all type movie: " + error);
      }
    };
    getAllTypeMovie();
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
    setMovieName("");
    setSelectedImage(null);
    setPosterMovie("");
    setMovieType("");
    setMovieTime("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDescription("");
    setActor("");
    setDirector("");
    setStatus("");
    setLanguageMovie("");
  };

  const onClickHandleSave = async () => {
    const formData = new FormData();

    formData.append("poster", posterMovie);
    formData.append("code", code);
    formData.append("movieName", movieName);
    formData.append("movieTime", movieTime);
    formData.append("description", description);
    formData.append("director", director);
    formData.append("actor", actor);
    formData.append("language", languageMovie);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("movieType", movieType);
    formData.append("status", status);

    try {
      if (editCode) {
        const newMovie = await axios.post(
          `http://localhost:9000/cineza/api/v1/movie/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (newMovie.status == 201) {
          console.log("save movie success");
          setShowAlert(true);
          setMessage("Lưu phim thành công");
        } else {
          console.log("save movie error");
          setShowAlert(true);
          setMessage("Lỗi lưu phim");
        }
      }
    } catch (error) {
      console.log("error svae movie: " + error);
      setShowAlert(true);
      setMessage("Lỗi lưu phim");
    }
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleDescription = (text) => {
    setDescription(text.target.value);
  };
  const onChangeHandleNameMovie = (text) => {
    setMovieName(text.target.value);
  };
  const onChangeHandleActor = (text) => {
    setActor(text.target.value);
  };
  const onChangeHandleDirector = (text) => {
    setDirector(text.target.value);
  };
  const handleChangeComboboxLevel = (text) => {
    setMovieType(text.target.value);
  };
  const handleChangeComboboxStatus = (text) => {
    setStatus(text.target.value);
  };
  const handleChangeComboboxLanguage = (text) => {
    setLanguageMovie(text.target.value);
  };
  const onChangeHandleMovieTime = (text) => {
    setMovieTime(text.target.value);
  };
  const onChangeHandleStartDate = (text) => {
    setStartDate(text);
  };
  const onChangeHandleEndDate = (text) => {
    setEndDate(text);
  };

  return (
    <div className="movie-detail-background">
      <div className="movie-detail-container">
        <div className="movie-detail-header">
          <div className="movie-detail-header-edit">
            <div
              className="movie-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="movie-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="movie-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
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
            <span>{code} - </span> <span>-{movieName} </span>
          </div>
        </div>

        <div className="movie-detail-content">
          <div className="movie-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="movie-detail-input">
              <label>Mã phim</label>
              <div className="movie-detail-input-dem"></div>

              <div className="input-movie-container">
                <input
                  className="input-movie"
                  value={code}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleCode(text)}
                  // onFocus={onHandleFocusCode}
                />
                {/* {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )} */}
              </div>
            </div>

            <div className="movie-detail-input">
              <label>Tên phim</label>
              <div className="movie-detail-input-dem"></div>
              <div className="input-movie-container">
                <input
                  className="input-movie"
                  value={movieName}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleNameMovie(text)}
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
              <div className="input-movie-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Thể loại</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={movieType}
                    label="Thể loại"
                    onChange={handleChangeComboboxLevel}
                    // onFocus={onHandleFocusLevel}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataTypeMovie?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.name}
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
                  className="input-movie"
                  value={description}
                  readOnly={!edit}
                  style={
                    edit
                      ? { height: "50px" }
                      : { height: "50px", background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => onChangeHandleDescription(text)}
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
                      style={{ maxWidth: "300px" }}
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
                  value={director}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleDirector(text)}
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
                  value={actor}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleActor(text)}
                  //   onFocus={onHandleFocusPhone}
                />
                {/* {isValidPhone && (
                  <p style={{ color: "red" }}>Số điện thoại không đúng</p>
                )} */}
              </div>
            </div>
            <div className="movie-detail-input">
              <label>Thời lượng phim</label>
              <div className="movie-detail-input-dem"></div>
              <div className="input-movie-container">
                <input
                  className="input-movie"
                  value={movieTime}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleMovieTime(text)}
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
              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={startDate}
                readOnly={!edit}
                onChange={(date) => onChangeHandleStartDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="movie-detail-input">
              <label>Ngày kết thúc</label>
              <div className="movie-detail-input-dem"></div>
              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={endDate}
                readOnly={!edit}
                onChange={(date) => onChangeHandleEndDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="movie-detail-input">
              <label>Trạng thái</label>
              <div className="movie-detail-input-dem"></div>
              <div className="input-movie-container">
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
                    // onFocus={onHandleFocusStatus}
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
                {/* {isValidStatus && (
                                    <p style={{ color: "red" }}>Không được bỏ trống</p>
                                )} */}
              </div>
            </div>
            <div className="movie-detail-input">
              <label>Ngôn ngữ phim</label>
              <div className="movie-detail-input-dem"></div>
              <div className="input-movie-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Ngôn ngữ</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={languageMovie}
                    label="Ngôn ngữ"
                    onChange={handleChangeComboboxLanguage}
                    // onFocus={onHandleFocusStatus}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataLanguage.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
