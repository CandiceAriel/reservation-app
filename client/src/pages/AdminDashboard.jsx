import { useEffect, useState } from "react";
import { getReservations, deleteReservation } from "../api/reservationApi";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await getReservations();
      setReservations(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete reservation.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const totalCount = reservations.length;
  const todayCount = reservations.filter(
    (r) => String(r.reservation_date).slice(0, 10) === today
  ).length;

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Reservations Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Reservations</p>
          <p className="text-3xl font-bold">{totalCount}</p>
        </div>
        <div className="flex-1 rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Today's Reservations</p>
          <p className="text-3xl font-bold">{todayCount}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Guests</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No reservations yet.
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="p-3">{r.customer_name}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{String(r.reservation_date).slice(0, 10)}</td>
                  <td className="p-3">{r.reservation_time}</td>
                  <td className="p-3">{r.guests}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}