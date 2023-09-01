
import "./sidebar.css";
import ButtonSidebar from "../../ButtonSidebar/index.js"
import iconRap from "../../../assets/imageButtons/iconRap.png"
import iconVe from "../../../assets/imageButtons/iconTicket.png"
import iconPhim from "../../../assets/imageButtons/iconFilm.png"
import iconOther from "../../../assets/imageButtons/iconPopcorn.png"
import iconThongKe from "../../../assets/imageButtons/iconReport.png"

const Sidebar = () => {

    const context = [
        { text: "Rạp", image: iconRap, href: "/rap" },
        { text: "Vé", image: iconVe, href: "#" },
        { text: "Phim", image: iconPhim, href: "#" },
        { text: "Đồ đi kèm", image: iconOther, href: "#" },
        { text: "Thống kê", image: iconThongKe, href: "#" },
    ]
    return (
        <div className="sidebar-container">
            {context.map((ct, index) => {
                return <ButtonSidebar key={index} text={ct.text} image={ct.image} href={ct.href} />
            })}
        </div>
    )
}

export default Sidebar;