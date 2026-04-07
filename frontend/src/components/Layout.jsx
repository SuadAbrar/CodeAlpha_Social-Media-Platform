import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_10%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_20%),linear-gradient(135deg,#f8fafc,#eef2ff)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
