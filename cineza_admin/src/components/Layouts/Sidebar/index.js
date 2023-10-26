import "./sidebar.css";
import ButtonSidebar from "../../ButtonSidebar/index.js";
import iconRap from "../../../assets/imageButtons/iconRap.png";
import iconVe from "../../../assets/imageButtons/iconTicket.png";
import iconPhim from "../../../assets/imageButtons/iconFilm.png";
import iconOther from "../../../assets/imageButtons/iconPopcorn.png";
import iconThongKe from "../../../assets/imageButtons/iconReport.png";
import iconUser from "../../../assets/imageButtons/iconUser.png";
import iconHierarchyStructure from "../../../assets/imageButtons/hierarchicalStructureIcon.png";
import iconPriceList from "../../../assets/imageButtons/iconPriceList.png";
import iconCalendar from "../../../assets/imageButtons/iconCalendar.png";
import iconShow from "../../../assets/imageButtons/iconShow.png";
const Sidebar = () => {
  const context = [
    {
      text: "Cây phân cấp",
      image: iconHierarchyStructure,
      href: "/hierarchy-structure",
    },
    // { text: "Người sử dụng", image: iconUser, href: "/users" },
    { text: "Rạp", image: iconRap, href: "/rap" },
    { text: "Vé", image: iconVe, href: "/ticket" },
    { text: "Phim", image: iconPhim, href: "/movie" },
    { text: "Đồ đi kèm", image: iconOther, href: "/other-product" },
    { text: "Bảng giá", image: iconPriceList, href: "/price" },
    { text: "Thống kê", image: iconThongKe, href: "#" },
    { text: "Lịch chiếu", image: iconCalendar, href: "/show-time" },
    { text: "Suất chiếu", image: iconShow, href: "/show" },
  ];
  return (
    <div className="sidebar-container">
      {context.map((ct, index) => {
        return (
          <ButtonSidebar
            key={index}
            text={ct.text}
            image={ct.image}
            href={ct.href}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
