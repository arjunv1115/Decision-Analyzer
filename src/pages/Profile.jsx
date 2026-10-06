import { Calendar, Mail, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserDecisions, getUsers } from "../utils/storage";

const Profile = () => {
  const { user } = useAuth();
  const storedUser = getUsers().find((item) => item.id === user.id);
  const decisions = getUserDecisions(user.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <p className="mt-2 text-sm text-slate-500">Manage your Decision AI Profile.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>

            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <User size={19} className="text-indigo-600"/>

              <span className="text-sm font-medium text-slate-500">
                Full Name
              </span>
            </div>

            <p className="mt-3 font-semibold text-slate-800">{user.name}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <Mail size={19} className="text-indigo-600"/>

              <span className="text-sm font-medium text-slate-500">
                Email
              </span>
            </div>

            <p className="mt-3 font-semibold text-slate-800">{user.email}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <Calendar size={19} className="text-indigo-600"/>

              <span className="text-sm font-medium text-slate-500">
                Joined
              </span>
            </div>

            <p className="mt-3 font-semibold text-slate-800">{storedUser?.createdAt ? new Date(storedUser.createdAt).toLocaleDateString("en-IN") : "-"}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <User size={19} className="text-indigo-600"/>

              <span className="text-sm font-medium text-slate-500">
                Total Decisions
              </span>
            </div>

            <p className="mt-3 font-semibold text-slate-800">{decisions.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;