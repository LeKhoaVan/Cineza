import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";

import "./promotionHeader.css";
const columns = [
  {
    title: "Code",
    data: "code",
    // sortable: true
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
    data: "promotionStatus",
  },
  {
    title: "Mô tả",
    data: "description",
  },
];
const PromotionHeader = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const onHandleSelect = (row) => {};

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:9000/cineza/api/v1/promotion-header/get-all"
        );
        if (result.status == 200) {
          setContext(result.data);
        }
      } catch (error) {
        console.log("error get api all user " + error);
      }
    };

    getData();
  }, []);

  return (
    <div className="promotion-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        <h3>Chương trình khuyến mãi</h3>
        <img
          src={iconAdd}
          alt="btn-add"
          className="user-btn-add"
          onClick={onClickHandleBtnAdd}
        />
      </div>

      <div className="table-all-promotion">
        <Table column={columns} data={context} onRowClick={onHandleSelect} />
      </div>
    </div>
  );
};

export default PromotionHeader;
