import "./userLevel.css";
import Table from "../../components/Table";
import VTDLDetail from "../VTDLDetail";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const titleColumn = [
    {
        title: "Code",
        data: "code"
    },
    {
        title: "Tên",
        data: "fullName"
    },
    {
        title: "Cấp người dùng",
        data: "level"
    }
];

const dataColumn = [
    {
        code: "ADMIN",
        fullName: "Admin",
        level: "ADMIN"
    },
    {
        code: "VIP",
        fullName: "Khách VIP",
        level: "VIP"
    },
    {
        code: "THUONG",
        fullName: "Khách Thường",
        level: "THUONG "
    },
]

const UserLevel = () => {
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [codeAddress, setCodeAddress] = useState("");

    const handleRowClick = (row) => {
        console.log(row)
        setCodeAddress(row)
        setOpenModalDetail(!openModalDetail);
    }

    // const onClickHandleCloseP = async () => {
    //     window.location.href = "/cineza/admin/vtdl/level?level=" + address[0].level
    //     setOpenModalDetail(false);
    // }

    // useEffect(() => {
    //     const getAddressByType = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:9000/cineza/api/v1/value/get-level?level=` + levelAddress);
    //             setAddress(response.data);
    //         } catch (error) {
    //             console.error("error get address by type in VTDLLevel: " + error);
    //         }
    //     }
    //     getAddressByType();
    // }, []);

    return (
        <div className="address-level-container">
            <div className="address-level-content">
                <h3>Cấp người dùng</h3>
                <div className="table-all-address">
                    <Table column={titleColumn} data={dataColumn} onRowClick={handleRowClick} toLinkUser={"/user-level?level="} />
                </div>
            </div>
        </div>
    )
}

export default UserLevel;