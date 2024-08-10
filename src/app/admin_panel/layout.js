import SideBar from "./ui/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-10">
      <SideBar />
      {children}
    </div>
  );
};
export default Layout;
