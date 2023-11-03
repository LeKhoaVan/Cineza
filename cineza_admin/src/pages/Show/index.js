import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ShowDetail from "../ShowDetail";
import { formatDateHandle, formatTimeHandle } from "../../components/util";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
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
            // Đặt múi giờ châu Á (UTC+7)
            const timeZoneOffset = 7 * 60; // UTC offset in minutes
            const asiaTime = new Date(inputDateTime.getTime() + timeZoneOffset * 60000);
            // Định dạng ngày theo "DD-MM-YYYY"
            const day = asiaTime.getDate();
            const month = asiaTime.getMonth() + 1;
            const year = asiaTime.getFullYear();
            const formattedDateTime = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

            const inputTime = new Date(item.showStart);

            const asstime = new Date(inputTime.getTime() + timeZoneOffset * 60000)
            const hour = asstime.getUTCHours();
            const minute = asstime.getUTCMinutes();
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
        <h3>Xuất chiếu phim</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="show-btn-add"
          onClick={onClickHandleBtnAdd}
        />
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
