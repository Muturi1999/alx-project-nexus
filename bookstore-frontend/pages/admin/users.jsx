"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { Edit, Eye, Trash2, Ban, Plus } from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!auth) router.replace("/login");
  }, [router]);

  // 10 dummy users with mixed roles
  const users = [
    {
      id: 1,
      username: "Justin Bieber",
      email: "justin.bieber@books.com",
      phone: "+254712345678",
      role: "Author",
    },
    {
      id: 2,
      username: "Debby Muturi",
      email: "debby.muturi@books.com",
      phone: "+254798765432",
      role: "Customer",
    },
    {
      id: 3,
      username: "Alex Kamau",
      email: "alex.kamau@books.com",
      phone: "+254701234567",
      role: "Staff",
    },
    {
      id: 4,
      username: "Jacob Alliet",
      email: "jacob.alliet@books.com",
      phone: "+254799223344",
      role: "Admin",
    },
    {
      id: 5,
      username: "Sarah Towwet",
      email: "sarah.towwet@books.com",
      phone: "+254799112233",
      role: "Customer",
    },
    {
      id: 6,
      username: "Morgan Reagan",
      email: "morgan.reagan@books.com",
      phone: "+254722334455",
      role: "Super Admin",
    },
    {
      id: 7,
      username: "Tracy Njoroge",
      email: "tracy.njoroge@books.com",
      phone: "+254733445566",
      role: "Author",
    },
    {
      id: 8,
      username: "Taylor Hugo",
      email: "taylor.hugo@books.com",
      phone: "+254744556677",
      role: "Staff",
    },
    {
      id: 9,
      username: "Brian Otieno",
      email: "brian.otieno@books.com",
      phone: "+254755667788",
      role: "Admin",
    },
    {
      id: 10,
      username: "Cynthia Mwangi",
      email: "cynthia.mwangi@books.com",
      phone: "+254766778899",
      role: "Customer",
    },
  ];

  const filteredUsers =
    roleFilter === "All"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Users</h1>
              <div className="flex items-center gap-3">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="All">All Roles</option>
                  <option value="Customer">Customer</option>
                  <option value="Author">Author</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
                <button
                  onClick={() => alert("Open Create User Form")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Create User
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Username
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-3 text-sm">{user.username}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{user.phone}</td>
                      <td className="px-4 py-3 text-sm">{user.role}</td>
                      <td className="px-4 py-3 text-sm flex justify-center gap-3">
                        <button
                          onClick={() => alert(`Viewing ${user.username}`)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Editing ${user.username}`)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Suspending ${user.username}`)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Suspend"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Deleting ${user.username}`)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
