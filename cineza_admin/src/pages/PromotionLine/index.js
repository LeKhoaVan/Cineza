import "./promotionLine.css";
import Table from "../../components/Table";
import PromotionDetail from "../PromotionDetail";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { formatDateHandle } from "../../components/util";


const titleColumn = [
    {
        title: "Code",
        data: "code"
    },
    {
        title: "Ngày bắt đầu",
        data: "startDay"
    },
    {
        title: "Ngày kết thúc",
        data: "endDay"
    },
    {
        title: "Thuộc chương trình",
        data: "promotionHeaderCode"
    },
    {
        title: "Trạng thái",
        data: "promotionLineStatus"
    },
    {
        title: "Loại",
        data: "typePromotion"
    }
];

const PromotionLine = () => {
    const [promotion, setPromotion] = useState([]);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [codePromotion, setCodePromotion] = useState("");

    const location = useLocation();
    const codePromotionURI = new URLSearchParams(location.search).get("code");

    const handleRowClick = (row) => {
        console.log(row)
        setCodePromotion(row)
        setOpenModalDetail(!openModalDetail);
    }

    const onClickHandleCloseP = async () => {
        window.location.href = "/cineza/admin/promotion/code?code=" + promotion[0].promotionHeaderCode;
        setOpenModalDetail(false);
    }

    useEffect(() => {
        const getAllPromotionLine = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/cineza/api/v1/promotion-line//get-all-by-header/${codePromotionURI}`);
                if (response.status === 200) {
                    const dataResult = response.data.map(item => {
                        return {
                            ...item,
                            startDay: formatDateHandle(item.startDay),
                            endDay: formatDateHandle(item.endDay)
                        }
                    })
                    setPromotion(dataResult);
                }
            } catch (error) {
                console.error("error get all promotion line by header: " + error);
            }
        }
        getAllPromotionLine();
    }, []);

    return (
        <div className="promotion-line-container">
            <div className="promotion-line-content">
                <h3>Chương trình chi tiết</h3>
                <div className="table-all-promotion-line">
                    <Table column={titleColumn} data={promotion} onRowClick={handleRowClick} />
                </div>
            </div>
            {openModalDetail && <PromotionDetail onClickHandleClose={onClickHandleCloseP} codePromotion={codePromotion} />}
        </div>
    )
}

export default PromotionLine;