import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


const CustomerVisitChart = ({ data , setPeriod , period}) => {
  
    // const [period, setPeriod] = useState("daily"); // Default to daily

    // useEffect(() => {
    //     if (!messUserId) return; // Don't fetch data if messUserId is missing

    //     fetch(`${BASE_URL}/views?period=${period}&messUserId=${messUserId}`)
    //         .then((res) => res.json())
    //         .then((data) => setData(data))
    //         .catch((err) => console.error("Error fetching views:", err));
    // }, [period, messUserId]);

    return (
        <div className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-bold">Customer Visit Chart</h2>
            <div className="flex gap-2 my-2">
                {["daily", "weekly", "monthly", "yearly"].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1 border rounded ${period === p ? "bg-black text-white" : "bg-gray-200"}`}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="gray" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomerVisitChart;
