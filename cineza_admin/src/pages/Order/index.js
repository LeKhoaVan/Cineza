import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import OrderDetail from "../OrderDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import axios from "axios";
import "./order.css";
import { formatDateHandle } from "../../components/util";

const titleColumn = [
  {
    title: "Mã khách hàng",
    data: "codeUser",
  },
  {
    title: "Tên khách hàng",
    data: "fullName",
  },
  {
    title: "Địa chỉ mail",
    data: "numberPhone",
  },
  {
    title: "Ngày thanh toán",
    data: "datePay",
  },
  {
    title: "Tổng tiền",
    data: "priceTotal",
  },
  {
    title: "Mô tả",
    data: "description",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const data = [{ code: "order01", description: "abcxyz", status: "Hoạt động" }];

const Order = () => {
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

  // const onClickHandleBtnAdd = () => {
  //   setOpenModelAdd(true);
  //   console.log(openModelAdd);
  // };

  const getData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:9000/cineza/api/v1/order/get-all"
      );
      if (result.status == 200) {
        const dataResult = result.data.map((item) => {
          return {
            ...item,
            datePay: `${formatDateHandle(item.datePay)} ${new Date(item.datePay).getHours()}:${new Date(item.datePay).getMinutes()}`,
          };
        });
        setContext(dataResult);
      }
    } catch (error) {
      console.log("error get api all price header " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [openModalDetail]);

  return (
    <div className="rap-container">
      <div className="rap-container-content">
        <div
          style={{
            width: "100%",
            height: "15%",
            display: "flex",
            flexDirection: "row",
            // paddingRight: "10px",
            alignItems: "center",
            boxShadow: "2px 5px 5px #575353",
          }}
        >
          <h3 style={{ paddingLeft: 10 }}>Danh sách hóa đơn</h3>
          {/* <img
            src={iconAdd}
            alt="btn-add"
            className="rap-btn-add"
            onClick={onClickHandleBtnAdd}
          /> */}
        </div>
        <div
          style={{
            marginLeft: "-20px",
            paddingRight: "8%",
            width: "100%",
            height: 5,
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div>

        <div
          style={{
            width: "100%",
            height: "82%",
            boxShadow: "2px 5px 5px #575353",
          }}
        >
          <div className="table-all-rap">
            <Table
              column={titleColumn}
              data={context}
              onRowClick={onHandleSelect}
            />
            {openModalDetail && (
              <OrderDetail
                codeOrder={code}
                onClickHandleClose={onClickHandleCloseP}
              />
            )}
            {/* {openModelAdd && (
            <RapDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
          )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
