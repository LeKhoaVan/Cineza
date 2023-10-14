import React from "react";
import "./room.css";
import Table from "../../components/Table";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { formatDateHandle } from "../../components/util";

const titleColumn = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên phòng",
    data: "name",
  },
  {
    title: "MÃ rap",
    data: "codeRap",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const Room = () => {
  const [room, setRoom] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [codeRoom, setCodeRoom] = useState("");

  const location = useLocation();
  const codeRapURI = new URLSearchParams(location.search).get("code");

  // const handleRowClick = (row) => {
  //   console.log(row);
  //   setCodeRoom(row);
  //   setOpenModalDetail(!openModalDetail);
  // };

  // const onClickHandleCloseP = async () => {
  //   window.location.href = "/cineza/admin/rap/code?code=" + room[0].codeRap;
  //   setOpenModalDetail(false);
  // };

  // useEffect(() => {
  //   const getRooms = async () => {
  //     try {
  //       const result = await axios.get(
  //         `http://localhost:9000/cineza/api/v1/room/get-all/${codeRapURI}`
  //       );
  //       if (result.status === 200) {
  //         setRoom(result.data);
  //         console.log(result.data);
  //       }
  //     } catch (error) {
  //       console.error("error get all room by rap: " + error);
  //     }
  //   };
  //   getRooms();
  // }, []);

  return (
    <div className="room-container">
      <div className="room-content">
        <h3>Chương trình chi tiết</h3>
        <div className="table-all-room">
          <Table column={titleColumn} data={[]}  />
        </div>
      </div>
      {/* {openModalDetail && (onRowClick={handleRowClick}
        <PromotionDetail
          onClickHandleClose={onClickHandleCloseP}
          codeRoom={codeRoom}
        />
      )} */}
    </div>
  );
};

export default Room;
