import { useEffect, useState } from "react"
import axios from "axios";
import DataTable from 'react-data-table-component';
import Table from "../../components/Table";
import "./viTriDiaLy.css"
import VTDLDetail from "../VTDLDetail";

// const columns = [
//     {
//         name: 'Code',
//         selector: row => row.code,
//         // sortable: true
//     },
//     {
//         name: 'Tên',
//         selector: row => row.fullName,
//     },
//     {
//         name: "Cấp hành chính",
//         selector: row => row.level
//     },
//     {
//         name: 'Trực thuộc',
//         selector: row => row.parentName,
//     },
//     {
//         name: 'Status',
//         selector: row => row.status,
//     },
// ];

const columns = [
    {
        title: "Code",
        data: "code"
    },
    {
        title: "Tên",
        data: "fullName"
    },
    {
        title: "Cấp hành chính",
        data: "level"
    },
    {
        title: "Trực thuộc",
        data: "parentId"
    },
    {
        title: "Status",
        data: "status"
    }
];

const dataColumn = [
    {
        code: "vtdl01",
        fullName: "Quốc gia",
        level: "QUOCGIA",
        parentId: null,
        status: "ACTIVE"
    },
    {
        code: "vtdl02",
        fullName: "Tỉnh/Thành phố",
        level: "TINH/TP",
        parentId: "vtdl01",
        status: "ACTIVE"
    },
    {
        code: "vtdl03",
        fullName: "Huyện/Quận",
        level: "HUYEN/QUAN",
        parentId: "vtdl02",
        status: "ACTIVE"
    },
    {
        code: "vtdl04",
        fullName: "Xa/Phuong",
        level: "XA/PHUONG",
        parentId: "vtdl03",
        status: "ACTIVE"
    }
]
const VTDL = () => {
    //get data
    const [levelOfAddress, setLevelOfAddress] = useState("");
    const [context, setContext] = useState("")
    const onClickHandleRow = () => {

    }
    return (
        <div className="page_vtdl_container">
            <div className="page_vtdl_content">
                <h3>Vị trí địa lý</h3>
                {/* <DataTable
                    columns={columns}
                    data={dataColumn}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    selectableRowsSingle
                    selectableRowsRadio
                    // selectableRows
                    onSelectedRowsChange={console.log("test")}
                /> */}
                <Table column={columns} data={dataColumn} onRowClick={onClickHandleRow} toLink={"/vtdl/level?level="} />
            </div>
        </div>
    )
}

export default VTDL;