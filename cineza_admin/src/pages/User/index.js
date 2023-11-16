import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "../../components/Table";
import UserDetail from "../UserDetail";
import { formatDateHandle } from "../../components/util/index";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import { useLocation } from "react-router-dom";
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
    title: "Trạng thái",
    data: "status",
  },
];

const User = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [codeUser, setCodeUser] = useState("");

  const location = useLocation();
  const levelUser = new URLSearchParams(location.search).get("level");

  const onHandleSelect = (row) => {
    console.log(row);
    setCodeUser(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/user-level?level=" + context[0].level;
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  const onClickHandleBack = () => {
    window.location.href = "http://localhost:3000/cineza/admin/users";
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:9000/cineza/api/v1/value/user/get-by-level?level=" +
            levelUser
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
      <div className="user-content">
        <img
          src={iconBack}
          className="vtdllevl-btn-back"
          onClick={onClickHandleBack}
        />
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
        <div
          style={{
            marginLeft: "-40px",
            paddingRight: "8%",
            width: "100%",
            height: "10px",
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div>
        <div className="table-all-user">
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
    </div>
  );
};

export default User;
