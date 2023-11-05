import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ShowDetail from "../ShowDetail";
import { formatDateHandle, formatTimeHandle } from "../../components/util";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconFind from "../../assets/imageButtons/iconFind.png";
import "./show.css";
import axios from "axios";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Giờ chiếu",
    data: "showStart",
  },
  {
    title: "Ngày chiếu",
    data: "showDate",
  },
  {
    title: "Tên phim",
    data: "nameMovie",
  },
  {
    title: "Tên rạp",
    data: "nameRap",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
const data = [
  {
    code: "showTime1",
    screenAt: "Vincom Gò Vấp",
    showDate: "5-9-2023",
    nameMovie: "Kẻ hủy diệt",
    nameRap: "Vincom Gò Vấp",
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
    setCode(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/show";
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:9000/cineza/api/v1/show/get-all"
        );
        if (result.status == 200) {
          const dataResult = result.data.map((item) => {
            const inputDateTime = new Date(item.showDate);
            const day = inputDateTime.getDate();
            const month = inputDateTime.getMonth() + 1;
            const year = inputDateTime.getFullYear();
            const formattedDateTime = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

            const inputTime = new Date(item.showStart);
            const hour = inputTime.getHours();
            const minute = inputTime.getMinutes();
            const minuteResult = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;

            return {
              ...item,
              showDate: formattedDateTime,
              showStart: minuteResult
            };
          });
          setContext(dataResult);
          // console.log(result.data);
        }
      } catch (error) {
        console.log("error get api all show " + error);
      }
    };

    getData();
  }, []);
  return (
    <div className="show-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        <h3>Suất chiếu phim</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="show-btn-add"
          onClick={onClickHandleBtnAdd}
        />
        <div className="showing-find-container">
          <input
            id="find"
            className="showing-input-find"
          // onChange={onChangeHandleFind}
          />
          <img
            className="showing-button-img"
            src={iconFind}
            alt="tìm kiếm"
            htmlFor="find"
          />
        </div>
      </div>
      <div className="table-all-show">
        <Table column={columns} data={context} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <ShowDetail
            codeShow={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <ShowDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
        )}
      </div>
    </div>
  );
};

export default ShowTime;
