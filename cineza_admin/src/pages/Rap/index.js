import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import RapDetail from "../RapDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./rap.css";
import axios from "axios";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên",
    data: "name",
  },
  {
    title: "Thời gian mở ",
    data: "openTime",
  },
  {
    title: "Thời gian đóng",
    data: "closeTime",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
// const data = [
//   {
//     code: "rap1",
//     cinemaName: "Vincom Gò Vấp",
//     openTime: "8:00",
//     closeTime: "23:00",
//     cinemaStatus: "ACTIVE",
//   },
// ];
const Rap = () => {
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
    // window.location.href = "/cineza/admin/rap";
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
          "http://localhost:9000/cineza/api/v1/rap/get-all"
        );
        if (result.status == 200) {
          setContext(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.log("error get api all rap " + error);
      }
    };

    getData();
  }, []);
  return (
    <div className="rap-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        <h3>Rap chiếu phim</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="rap-btn-add"
          onClick={onClickHandleBtnAdd}
        />
      </div>
      <div className="table-all-rap">
        <Table column={columns} data={context} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <RapDetail
            codeRapBy={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <RapDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
        )}
      </div>
    </div>
  );
};

export default Rap;
