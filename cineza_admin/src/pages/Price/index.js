import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import { formatDateHandle } from "../../components/util";
import PriceDetail from "../PriceDetail";

import { Link, useLocation } from "react-router-dom";

import "./price.css";
const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Loại",
    data: "type",
  },
  {
    title: "Giá",
    data: "value",
  },
  {
    title: "Mã bảng giá header",
    data: "codePriceHeader",
  },
  {
    title: "Mã Phim",
    data: "codeMovie",
  },
];

const data = [
  {
    code: "ph01",
    type: "VIP",
    value: "100000",
    codePriceHeader: "ph01",
    codeMovie: "movie01",
  },
];
const Price = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [code, setCode] = useState("");
  const onHandleSelect = (row) => {
    // setCode(row);
    setOpenModelDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/price/code";
    setOpenModelDetail(false);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const result = await axios.get(
  //         "http://localhost:9000/cineza/api/v1/promotion-header/get-all"
  //       );
  //       if (result.status == 200) {
  //         const dataResult = result.data.map((item) => {
  //           return {
  //             ...item,
  //             startDay: formatDateHandle(item.startDay),
  //             endDay: formatDateHandle(item.endDay),
  //           };
  //         });
  //         setContext(dataResult);
  //       }
  //     } catch (error) {
  //       console.log("error get api all user " + error);
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <div className="price-header-container">
      <div className="price-container">
        <Link to={"/price"}>
          <img src={iconBack} className="img-btn-sidebar" />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h3>Bảng giá</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="price-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-price">
          {/* toPromotion={"/promotion/code?code="}  */}
          <Table column={columns} data={data} onRowClick={onHandleSelect} />
          {openModelDetail && (
            <PriceDetail
              // codePriceHeader={codeHeader}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
          {openModelAdd && (
            <PriceDetail
              addBtn={true}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Price;
