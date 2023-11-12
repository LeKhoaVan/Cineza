import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "../../components/Table";
import "./viTriDiaLy.css";
import VTDLDetail from "../VTDLDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";

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
    data: "code",
  },
  {
    title: "Tên",
    data: "fullName",
  },
  {
    title: "Cấp hành chính",
    data: "level",
  },
  {
    title: "Trực thuộc",
    data: "parentId",
  },
  {
    title: "Status",
    data: "status",
  },
];

const dataColumn = [
  {
    code: "vtdl01",
    fullName: "Quốc gia",
    level: "QUOCGIA",
    parentId: null,
    status: "Hoạt động",
  },
  {
    code: "vtdl02",
    fullName: "Tỉnh/Thành phố",
    level: "TINH/TP",
    parentId: "vtdl01",
    status: "Hoạt động",
  },
  {
    code: "vtdl03",
    fullName: "Huyện/Quận",
    level: "HUYEN/QUAN",
    parentId: "vtdl02",
    status: "Hoạt động",
  },
  {
    code: "vtdl04",
    fullName: "Xa/Phuong",
    level: "XA/PHUONG",
    parentId: "vtdl03",
    status: "Hoạt động",
  },
];
const VTDL = () => {
  //get data
  const [levelOfAddress, setLevelOfAddress] = useState("");
  const [context, setContext] = useState("");
  const [openModalAdd, setOpenModelAdd] = useState(false);
  const onClickHandleRow = () => {};
  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "http://localhost:3000/cineza/admin/vtdl";
    setOpenModelAdd(false);
  };
  return (
    <div className="page_vtdl_container">
      <div className="page_vtdl_content">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h3>Vị trí địa lý</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="user-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>
        <Table
          column={columns}
          data={dataColumn}
          onRowClick={onClickHandleRow}
          toLink={"/vtdl/level?level="}
        />
      </div>
      {openModalAdd && (
        <VTDLDetail onClickHandleClose={onClickHandleCloseP} addBtn={true} />
      )}
    </div>
  );
};

export default VTDL;
