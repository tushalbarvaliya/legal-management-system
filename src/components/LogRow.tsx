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

type LogRowProps = {
  log: Log;
};

const LogRow = ({ log }: LogRowProps) => {
  return (
    <tr className="border-b hover:bg-stone-100">
      <td className="p-2">{log.user_name}</td>
      <td className="p-2">{log.method}</td>
      <td className="p-2">{log.endpoint}</td>
      <td
        className={`p-2 font-semibold capitalize ${
          log.status === "success" ? "text-green-600" : "text-red-600"
        }`}
      >
        {log.status}
      </td>
      <td className="p-2">{log.detail}</td>
      <td className="p-2">{log.body}</td>
      <td className="p-2">{log.response}</td>
    </tr>
  );
};

export default LogRow;
