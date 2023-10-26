import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import TicketDetail from "../TicketDetail";
import { formatDateHandle } from "../../components/util";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./ticket.css";
import axios from "axios";

const columns = [
  {
    title: "Tên người dùng",
    data: "fullName",
  },
  {
    title: "Phim",
    data: "movieName",
  },
  {
    title: "Ngày chiếu",
    data: "showDate",
  },
  {
    title: "Giờ chiếu",
    data: "screenAt",
  },
  {
    title: "Rap",
    data: "rapName",
  },
  {
    title: "Phòng",
    data: "roomName",
  },
  {
    title: "Ghế",
    data: "position",
  },
  {
    title: "Ngày đặt vé",
    data: "bookAt",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
const Ticket = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const onHandleSelect = (row) => {
    // console.log(row);
    setCode(row);
    setOpenModalDetail(!openModalDetail);
    console.log(row);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/ticket";
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
          "http://localhost:9000/cineza/api/v1/ticket/get-all"
        );
        if (result.status == 200) {
          const dataResult = result.data.map((item) => {
            return {
              ...item,
              showDate: formatDateHandle(item.showDate),
              bookAt: formatDateHandle(item.bookAt),
            };
          });
          setContext(dataResult);
          // console.log(result.data);
        }
      } catch (error) {
        console.log("error get api all ticket " + error);
      }
    };

    getData();
  }, []);
  return (
    <div className="ticket-container">
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
          className="ticket-btn-add"
          onClick={onClickHandleBtnAdd}
        />
      </div>
      <div className="table-all-ticket">
        <Table column={columns} data={context} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <TicketDetail
            codeTicket={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <TicketDetail
            addBtn={true}
            codeTicket={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default Ticket;
