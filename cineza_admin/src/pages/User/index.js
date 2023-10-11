import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "../../components/Table";
import UserDetail from "../UserDetail";
import { formatDateHandle } from "../../components/util/index";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./user.css";

const columns = [
  // dùng để sử dụng DataTable
  // {
  //     title: 'Code',
  //     selector: row => row.code,
  //     // sortable: true
  // },
  {
    title: "Code",
    data: "code",
    // sortable: true
  },
  {
    title: "Tên",
    data: "fullName",
  },
  {
    title: "Số điện thoại",
    data: "numberPhone",
  },
  {
    title: "Level",
    data: "level",
  },
  {
    title: "Ngày sinh",
    data: "dateOfBirth",
  },
  {
    title: "Status",
    data: "status",
  },
];

const User = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [codeUser, setCodeUser] = useState("");

  const onHandleSelect = (row) => {
    console.log(row);
    setCodeUser(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/users";
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:9000/cineza/api/v1/value/user/get-all"
        );
        if (result.status == 200) {
          const dataSetup = result.data.map((item) => {
            return {
              ...item,
              dateOfBirth: formatDateHandle(item.dateOfBirth),
            };
          });
          setContext(dataSetup);
        }
      } catch (error) {
        console.log("error get api all user " + error);
      }
    };

    getData();
  }, []);

  return (
    <div className="user-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        <h3>Người dùng</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="user-btn-add"
          onClick={onClickHandleBtnAdd}
        />
      </div>
      <div className="table-all-user">
        {/* <DataTable
                    columns={columns}
                    data={context != null ? (context.length != 0 ? context : "") : ""}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    // selectableRows
                    onRowClicked={(row) => onHandleSelect(row)}
                    actions
                /> */}
        <Table column={columns} data={context} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <UserDetail
            codeUserBy={codeUser}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <UserDetail
            addBtn={true}
            codeUserBy={codeUser}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default User;
