import "./vtdlLevel.css";
import Table from "../../components/Table";
import VTDLDetail from "../VTDLDetail";
import iconBack from "../../assets/imageButtons/iconBack.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const titleColumn = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên",
    data: "fullName",
  },
  {
    title: "Cấp hành chính",
    data: "level",
  },
  {
    title: "Trực thuộc",
    data: "fullNameParent",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
  {
    title: "Loại",
    data: "value",
  },
];

const VTDLLevel = () => {
  const [address, setAddress] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [codeAddress, setCodeAddress] = useState("");

  const location = useLocation();
  const levelAddress = new URLSearchParams(location.search).get("level");

  const onClickHandleBack = () => {
    window.location.href = "http://localhost:3000/cineza/admin/vtdl";
  };

  const handleRowClick = (row) => {
    console.log(row);
    setCodeAddress(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/vtdl/level?level=" + address[0].level;
    setOpenModalDetail(false);
  };

  useEffect(() => {
    const getAddressByType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/value/get-level?level=` +
            levelAddress
        );
        setAddress(response.data);
      } catch (error) {
        console.error("error get address by type in VTDLLevel: " + error);
      }
    };
    getAddressByType();
  }, []);

  return (
    <div className="address-level-container">
      <div className="address-level-content">
        <img
          src={iconBack}
          className="vtdllevl-btn-back"
          onClick={onClickHandleBack}
        />
        <h3>Vị trí địa lý</h3>
        <div style={{ height: "10px" }}></div>
        <div
          style={{
            marginLeft: "-40px",
            paddingRight: "8%",
            width: "100%",
            height: "10px",
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div>
        <div className="table-all-address">
          <Table
            column={titleColumn}
            data={address}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      {openModalDetail && (
        <VTDLDetail
          codeAddressBy={codeAddress}
          onClickHandleClose={onClickHandleCloseP}
          to={address[0].level}
        />
      )}
    </div>
  );
};

export default VTDLLevel;
