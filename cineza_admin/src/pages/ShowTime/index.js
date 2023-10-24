import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ShowTimeDetail from "../ShowTimeDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./showTime.css";
import axios from "axios";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Ngày chiếu",
    data: "showDate",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
const data = [
  {
    code: "showTime1",
    showDate: "15-05-2023",
    status: "ACTIVE",
  },
];
const ShowTime = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const onHandleSelect = (row) => {
    // console.log(row);
    // setCode(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/show-time";
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const result = await axios.get(
  //         "http://localhost:9000/cineza/api/v1/show-time/get-all"
  //       );
  //       if (result.status == 200) {
  //         setContext(result.data);
  //         // console.log(result.data);
  //       }
  //     } catch (error) {
  //       console.log("error get api all show-time " + error);
  //     }
  //   };

  //   getData();
  // }, []);
  return (
    <div className="show-time-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        <h3>Lịch chiếu phim</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="show-time-btn-add"
          onClick={onClickHandleBtnAdd}
        />
      </div>
      <div className="table-all-show-time">
        <Table column={columns} data={data} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <ShowTimeDetail
            // codeShowTimeBy={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <ShowTimeDetail
            addBtn={true}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTime;
