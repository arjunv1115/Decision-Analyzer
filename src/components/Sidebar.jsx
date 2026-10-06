import { BarChart3, Brain, ClipboardList, Home, LogOut, Plus, User, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Decisions",
      path: "/decisions",
      icon: ClipboardList,
    },
    {
      name: "Add Decision",
      path: "/decisions/new",
      icon: Plus,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}/>
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-2 text-white">
                <Brain size={22} />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">
                  Decision AI
                </h1>

                <p className="text-xs text-slate-400">
                  History Analyzer
                </p>
              </div>
            </div>

            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
                  <Icon size={19} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-3 rounded-xl bg-slate-50 p-3">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name}
              </p>

              <p className="truncate text-xs text-slate-400">
                {user?.email}
              </p>
            </div>

            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;