import "./vtdlDetail.css"
import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const dataStatus = [
    { id: "ACTIVE", value: "ACTIVE" },
    { id: "TEMPORARY_LOCKED", value: "TEMPORARY LOCKED" },
    { id: "DESTROY", value: "DESTROY" }
]

const VTDLDetail = ({ codeAddressBy, onClickHandleClose }) => {
    const location = useLocation();
    const levelAddressIN = new URLSearchParams(location.search).get("level");

    const [codeAddress, setCodeAddress] = useState("");
    const [nameAddress, setNameAddress] = useState("");
    const [levelAddress, setLevelAddress] = useState("");
    const [idParentAddress, setIdParentAddress] = useState("");
    const [parentAddress, setParentAddress] = useState("");
    const [statusAddress, setStatusAddress] = useState("");
    const [typeAddress, setTypeAddress] = useState("");
    const [idTypeAddress, setIdtypeAddress] = useState("");
    const [edit, setEdit] = useState(false);
    const [editCode, setEditCode] = useState(false);
    const [update, setUpdate] = useState(false);
    const [createNew, setCreateNew] = useState(false);

    const [country, setCountry] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [city, setCity] = useState([]);
    const [cityId, setCityId] = useState("");
    const [district, setDistrict] = useState([]);
    const [districtId, setDistrictId] = useState("");
    const [ward, setWard] = useState([]);
    const [wardId, setWardId] = useState("");

    const [dataComboboxTrucThuoc, setDataComboboxTrucThuoc] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleChangeComboboxStatus = (event) => {
        setStatusAddress(event.target.value)
    };

    const handleChangeComboboxAddress = (event) => {
        setIdParentAddress(event.target.value);
    }
    const onChangeCodeAddress = (event) => {
        setCodeAddress(event.target.value);
    };
    const onChangeNameAddress = (event) => {
        setNameAddress(event.target.value);
    };
    const onChangeLevelAddress = (event) => {
        setLevelAddress(event.target.value);
    };
    const onChangeParentAddress = (event) => {
        setParentAddress(event.target.value);
    };
    const onChangeStatusAddress = (event) => {
        setStatusAddress(event.target.value);
    };
    const onChangeTypeAddress = (event) => {
        setTypeAddress(event.target.value);
    };

    useEffect(() => {
        const getAddressByCode = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/cineza/api/v1/value/address/get-code/` + codeAddressBy);
                if (response.status === 200) {
                    console.log(response.data)
                    setCodeAddress(response.data.code);
                    setNameAddress(response.data.fullName);
                    setLevelAddress(response.data.level);
                    setIdParentAddress(response.data.parentId);
                    setParentAddress(response.data.fullNameParent);
                    setStatusAddress(response.data.status);
                    setIdtypeAddress(response.data.type)
                    setTypeAddress("Vị trí địa lý");
                } else {
                    console.error("error get API: " + response.status);
                }
            } catch (error) {
                console.error("error get address by code in vtdl: " + error);
            }
        }

        getAddressByCode();
    }, []);

    const onClickHandleEdit = () => {
        setUpdate(true);
        setCreateNew(false);
        setEdit(true);
    }

    const onClickHandleNew = () => {
        setUpdate(false);
        setCreateNew(true);
        setEditCode(true);
        setEdit(true);

        setCodeAddress("");
        setNameAddress("");
        setStatusAddress("");
    };

    const onClickHandleSave = async () => {
        const address = {
            code: codeAddress,
            type: idTypeAddress,
            parentId: idParentAddress,
            level: levelAddress,
            fullName: nameAddress,
            status: statusAddress
        };
        console.log("test: " + address.code);
        console.log("test: " + address.type);
        console.log("test: " + address.parentId);
        console.log("test: " + address.fullName);
        console.log("test: " + address.status);
        try {
            if (editCode) {
                const response = await axios.post(`http://localhost:9000/cineza/api/v1/value/address/create`, address);
                if (response.status === 201) {
                    console.log("save success")
                    setMessage("Lưu thành công")
                    setShowAlert(true)
                } else {
                    setMessage("Lưu thất bại")
                    setShowAlert(true)
                }
            } else if (update) {
                const response = await axios.put(`http://localhost:9000/cineza/api/v1/value/address/put/` + codeAddress, address);
                if (response.status === 200) {
                    console.log("save success")
                    setMessage("Cập nhật thành công")
                    setShowAlert(true)
                } else {
                    setMessage("Cập thất bại")
                    setShowAlert(true)
                }
            }
        } catch (error) {
            setMessage("Lưu thất bại")
            setShowAlert(true)
            console.log("save address fail: " + error);
        }
    }

    //combobox country
    useEffect(() => {
        const getAllCountry = async () => {
            try {
                const allCountry = await axios.get(`http://localhost:9000/cineza/api/v1/value/get-level?level=QUOCGIA`);
                if (allCountry.status === 200) {
                    setCountry(allCountry.data)
                } else {
                    console.error("get all country error");
                }
            } catch (error) {
                console.error("get all country error: " + error);
            }
        }
        getAllCountry()
    }, [])

    //combobox city
    useEffect(() => {
        const getAllCountry = async () => {
            try {
                const allCity = await axios.get(`http://localhost:9000/cineza/api/v1/value/get-level?level=TINH/TP`);
                if (allCity.status === 200) {
                    setCity(allCity.data)
                } else {
                    console.error("get all city error");
                }
            } catch (error) {
                console.error("get all country error: " + error);
            }
        }
        getAllCountry()
    }, [])

    //combobox district
    useEffect(() => {
        const getAllCountry = async () => {
            try {
                const allDistrict = await axios.get(`http://localhost:9000/cineza/api/v1/value/get-level?level=HUYEN/QUAN`);
                if (allDistrict.status === 200) {
                    setDistrict(allDistrict.data)
                } else {
                    console.error("get all country error");
                }
            } catch (error) {
                console.error("get all country error: " + error);
            }
        }
        getAllCountry()
    }, []);

    useEffect(() => {
        if (levelAddress === "QUOCGIA") {
            setIdParentAddress("");
            setDataComboboxTrucThuoc([])
        } else if (levelAddress === "TINH/TP") {
            setDataComboboxTrucThuoc(country);
        } else if (levelAddress === "HUYEN/QUAN") {
            setDataComboboxTrucThuoc(city)
        } else if (levelAddress === "XA/PHUONG") {
            setDataComboboxTrucThuoc(district)
        }
    })

    return (
        <div className="address-detail-background">
            <div className="address-detail-container">
                {showAlert && (
                    <Alert message={message} onClose={handleCloseAlert} />
                )}
                <div className="address-detail-header">
                    <div className="address-detail-header-edit">
                        <div className="address-detail-header-edit-save" onClick={onClickHandleSave}>
                            <img className="icon-save" src={iconSave} alt="update" />
                            <p>Lưu</p>
                        </div>
                        <div className="address-detail-header-edit-update" style={update ? { background: "rgb(201, 201, 201)" } : {}}
                            onClick={onClickHandleEdit}>
                            <img className="icon-update" src={iconPen} alt="update" />
                            <p>Chỉnh sửa</p>
                        </div>
                        <div className="address-detail-header-edit-new-delete">
                            <div className="address-detail-header-edit-new" onClick={onClickHandleNew}>
                                <img className="iconNew" src={iconCreateNew} alt="create new" />
                                <p>Tạo mới</p>
                            </div>
                            <div className="address-detail-header-edit-delete">
                                <img className="iconDelete" src={iconDelete} alt="delete" />
                                <p>Xóa</p>
                            </div>
                        </div>
                        <div className="address-detail-header-close">
                            <img className="iconClose" src={iconClose} alt="close" onClick={onClickHandleClose} />
                        </div>
                    </div>
                    <div className="address-detail-header-name">
                        <span>{codeAddress} - </span> <span>- {nameAddress}</span>
                    </div>
                </div>

                <div className="address-detail-content">
                    <div className="address-detail-content-left">
                        <div className="address-detail-input">
                            <label>Mã địa chỉ</label>
                            <div className="address-detail-input-dem"></div>
                            <input className="input-address" readOnly={!editCode} value={codeAddress} style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeCodeAddress(code)} />
                        </div>
                        <div className="address-detail-input">
                            <label>Tên địa chỉ</label>
                            <div className="address-detail-input-dem"></div>
                            <input className="input-address" readOnly={!edit} value={nameAddress} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeNameAddress(code)} />
                        </div>
                        <div className="address-detail-input">
                            <label>Cấp hành chính</label>
                            <div className="address-detail-input-dem"></div>
                            <input className="input-address" readOnly={true} value={levelAddress} style={{ background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeLevelAddress(code)} />
                        </div>
                    </div>
                    <div className="address-detail-content-right">
                        <div className="address-detail-input">
                            <label>Trực thuộc</label>
                            <div className="address-detail-input-dem"></div>
                            {/* <input className="input-address" readOnly={!edit} value={parentAddress} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeParentAddress(code)} /> */}
                            <FormControl sx={{ width: "52%", marginRight: "80px" }} size="small">
                                <InputLabel id="demo-select-small-label">Trực thuộc</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={idParentAddress}
                                    label="Trực thuộc"
                                    onChange={handleChangeComboboxAddress}
                                    readOnly={!edit}
                                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                >
                                    {dataComboboxTrucThuoc?.map((st, index) => {
                                        return (
                                            <MenuItem key={index} value={st.id}>{st.fullName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="address-detail-input">
                            <label>Trạng thái</label>
                            <div className="address-detail-input-dem"></div>
                            {/* <input className="input-address" readOnly={!edit} value={statusAddress} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeStatusAddress(code)} /> */}
                            <FormControl sx={{ width: "52%", marginRight: "80px" }} size="small">
                                <InputLabel id="demo-select-small-label">Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={statusAddress}
                                    label="Status"
                                    onChange={handleChangeComboboxStatus}
                                    readOnly={!edit}
                                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                >
                                    {dataStatus.map((st, index) => {
                                        return (
                                            <MenuItem key={index} value={st.id}>{st.value}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="address-detail-input">
                            <label>Loại</label>
                            <div className="address-detail-input-dem"></div>
                            <input className="input-address" readOnly={true} value={typeAddress} style={{ background: "rgb(196, 196, 196)" }}
                                onChange={(code) => onChangeTypeAddress(code)} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default VTDLDetail;