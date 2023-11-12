import "./order.css";

const titleColumn = [
  {
    title: "Khách hàng",
    data: "fullName",
  },
  {
    title: "Tên phòng",
    data: "name",
  },
  {
    title: "Tên rap",
    data: "nameRap",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const Order = () => {
  return (
    <div className="order-wrapper">
      <div className="order-container"></div>
    </div>
  );
};

export default Order;
