import LogRow from "@/components/LogRow";

type Log = {
  _id: string;
  user_id: string;
  user_name: string;
  method: string;
  endpoint: string;
  status: "success" | "failed";
  detail: string;
  body: string;
  response: string;
};

const logs: Log[] = [
  {
    _id: "1",
    user_id: "u101",
    user_name: "Tushal",
    method: "POST",
    endpoint: "/api/login",
    status: "success",
    detail: "User logged in successfully",
    body: '{"email":"tushal@test.com"}',
    response: '{"token":"abc123"}',
  },
  {
    _id: "2",
    user_id: "u102",
    user_name: "Rahul",
    method: "GET",
    endpoint: "/api/invoices",
    status: "failed",
    detail: "Unauthorized access",
    body: "{}",
    response: '{"message":"Unauthorized"}',
  },
  {
    _id: "3",
    user_id: "u103",
    user_name: "Amit",
    method: "PUT",
    endpoint: "/api/users/update",
    status: "success",
    detail: "User updated profile",
    body: '{"name":"Amit"}',
    response: `{
  "firstName": "Tushal",
  "lastName": "Barvaliya",
  "email": "tushal@test.com",
  "password": "password123",
  "address": "37 Laxminarayan Society",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "phoneNumber": "9876543210",
  "pinCode": "382350",
  "role":"admin"
}`,
  },
];

const LogsPage = () => {
  return (
    <div className="p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">System Logs</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Method</th>
              <th className="p-2">Endpoint</th>
              <th className="p-2">Status</th>
              <th className="p-2">Detail</th>
              <th className="p-2">Body</th>
              <th className="p-2">Response</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <LogRow key={log._id} log={log} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
