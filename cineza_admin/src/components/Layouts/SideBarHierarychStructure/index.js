import iconAddress from "../../../assets/imageButtons/iconAddress.png";
import ButtonSidebar from "../../ButtonSidebar";
import iconUser from "../../../assets/imageButtons/iconUser.png"
import iconProduct from "../../..//assets/imageButtons/iconProduct.png";
import iconBack from "../../../assets/imageButtons/iconBack.png";
import iconPromotion from "../../../assets/imageButtons/iconPromotion.png";
import { Link } from "react-router-dom";
import "./sidebarHierarychStructure.css";

const SidebarHierarchyStructure = () => {
    const titleButton = [
        { text: "Vị trí địa lý", image: iconAddress, href: "/vtdl" },
        { text: "Người sử dụng", image: iconUser, href: "/users" },
        { text: "Sản phẩm", image: iconProduct, href: "#" },
        { text: "Khuyến mãi", image: iconPromotion, href: "/promotions" }
    ]
    return (
        <div className="sidebar-hierarchy-structure">
            <div className="sidebar-btn-back">
                <Link to={"/home"}>
                    <img src={iconBack} className="img-btn-sidebar" />
                </Link>
            </div>
            {titleButton.map((ct, index) => {
                return <ButtonSidebar key={index} text={ct.text} image={ct.image} href={ct.href} />
            })}
        </div>
    )
}
export default SidebarHierarchyStructure;