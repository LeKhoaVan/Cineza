import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import RapDetail from "../RapDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./rap.css";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên",
    data: "cinemaName",
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
    data: "cinemaStatus",
  },
];
const data = [
  {
    code: "rap1",
    cinemaName: "Vincom Gò Vấp",
    openTime: "8:00",
    closeTime: "23:00",
    cinemaStatus: "ACTIVE",
  },
];
const Rap = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const onHandleSelect = (row) => {
    console.log(row);
    setCode(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/rap";
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const result = await axios.get(
  //           "http://localhost:9000/cineza/api/v1/value/user/get-all"
  //         );
  //         if (result.status == 200) {
  //           const dataSetup = result.data.map((item) => {
  //             return {
  //               ...item,
  //               dateOfBirth: formatDateHandle(item.dateOfBirth),
  //             };
  //           });
  //           setContext(dataSetup);
  //         }
  //       } catch (error) {
  //         console.log("error get api all user " + error);
  //       }
  //     };

  //     getData();
  //   }, []);
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
        {/* <DataTable
                    columns={columns}
                    data={context != null ? (context.length != 0 ? context : "") : ""}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    // selectableRows
                    onRowClicked={(row) => onHandleSelect(row)}
                    actions
                /> */}
        <Table column={columns} data={data} onRowClick={onHandleSelect} />
        {openModalDetail && (
          <RapDetail
            codeUserBy={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
        {openModelAdd && (
          <RapDetail
            addBtn={true}
            codeUserBy={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default Rap;
