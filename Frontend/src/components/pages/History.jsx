import React from "react";

const History = () => {
  const historyItems = [
    { id: 1, date: "June 7, 2026", time: "10:45 PM", mood: "Calm", accuracy: "98%", trigger: "Camera Scan" },
    { id: 2, date: "June 6, 2026", time: "06:12 PM", mood: "Focused", accuracy: "95%", trigger: "Camera Scan" },
    { id: 3, date: "June 5, 2026", time: "08:30 AM", mood: "Relaxed", accuracy: "97%", trigger: "Manual Select" }
  ];

  return (
    <div className="pt-20 pb-12 px-6 md:px-12 bg-[#070708] min-h-screen font-sans text-white max-w-4xl mx-auto flex flex-col gap-6 select-none">
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
          Scan History
        </h1>
        <p className="text-neutral-400 text-sm">
          Track your emotional journey and review past detection accuracy.
        </p>
      </div>

      <div className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Date & Time</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Detected Mood</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Accuracy</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-neutral-400">Trigger</th>
              </tr>
            </thead>
            <tbody>
              {historyItems.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-sm font-medium">
                    <span>{item.date}</span>
                    <span className="text-neutral-500 text-xs block mt-0.5">{item.time}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-[#00C896]/10 text-[#00C896] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.mood}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-300">{item.accuracy}</td>
                  <td className="p-4 text-sm text-neutral-400">{item.trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
