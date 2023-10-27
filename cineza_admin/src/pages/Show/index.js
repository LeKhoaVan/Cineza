import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ShowDetail from "../ShowDetail";
import { formatDateHandle } from "../../components/util";
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
    data: "screenAt",
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
            return {
              ...item,
              showDate: formatDateHandle(item.showDate),
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
          <ShowDetail
            addBtn={true}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTime;
