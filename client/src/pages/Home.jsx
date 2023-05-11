import Topbar from "../components/TopBar";
import Sidebar from "../components/SideBar";
import Feed from "../components/Feed";
import Rightbar from "../components/RightBar";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
