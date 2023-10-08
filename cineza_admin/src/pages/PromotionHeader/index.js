import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

import "./promotionHeader.css";
const columns = [
    {
        title: 'Code',
        data: "code",
        // sortable: true
    },
    {
        title: 'Ngày bắt đầu',
        data: "startDay"
    },
    {
        title: "Ngày kết thúc",
        data: "endDay"
    },
    {
        title: 'Trạng thái',
        data: "promotionStatus",
    },
    {
        title: 'Mô tả',
        data: "description",
    },
];
const PromotionHeader = () => {
    const [context, setContext] = useState([]);
    const onHandleSelect = (row) => {
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get("http://localhost:9000/cineza/api/v1/promotion-header/get-all");
                if (result.status == 200) {
                    setContext(result.data);
                }
            } catch (error) {
                console.log("error get api all user " + error)
            }
        };

        getData();
    }, [])

    return (
        <div className="promotion-container">
            <h3>Chương trình khuyến mãi</h3>
            <div className="table-all-promotion">
                <Table column={columns} data={context} onRowClick={onHandleSelect} />
            </div>
        </div>
    )
}

export default PromotionHeader