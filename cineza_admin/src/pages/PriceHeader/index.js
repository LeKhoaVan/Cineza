import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import { formatDateHandle } from "../../components/util";
import PriceHeaderDetail from "../PriceHeaderDetail";

import "./priceHeader.css";
const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Ngày bắt đầu",
    data: "startDay",
  },
  {
    title: "Ngày kết thúc",
    data: "endDay",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
  {
    title: "Mô tả",
    data: "description",
  },
];

const data = [
  {
    code: "ph01",
    type: "VIP",
    startDay: "11/11/2023",
    endDay: "12/12/2023",
    status: "ACTIVE",
    description: "Mùa đông",
  },
];
const PriceHeader = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [codeHeader, setCodeHeader] = useState("");
  const onHandleSelect = (row) => {
    setCodeHeader(row);
    setOpenModelDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/price";
    setOpenModelDetail(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:9000/cineza/api/v1/price-header/get-all"
        );
        if (result.status == 200) {
          const dataResult = result.data.map((item) => {
            return {
              ...item,
              startDay: formatDateHandle(item.startDay),
              endDay: formatDateHandle(item.endDay),
            };
          });
          setContext(dataResult);
        }
      } catch (error) {
        console.log("error get api all price header " + error);
      }
    };

    getData();
  }, []);

  return (
    <div className="price-header-container">
      <div className="price-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h3>Bảng giá Header</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="price-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-price-header">
          <Table column={columns} data={context} onRowClick={onHandleSelect} />
          {openModelDetail && (
            <PriceHeaderDetail
              codePriceHeader={codeHeader}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
          {openModelAdd && (
            <PriceHeaderDetail
              addBtn={true}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceHeader;
