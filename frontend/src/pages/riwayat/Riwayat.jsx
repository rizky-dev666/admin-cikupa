import React from "react";

const Riwayat = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log Activity</h2>
      <div className="border-t border-gray-300">
        <div className="flex flex-col justify-between items-start py-4 border-b border-gray-200 last:border-b-0">
          <p className="text-gray-600 text-sm">12:00 AM 12 November 2025</p>
          <p className="text-lg font-medium break-words max-w-full">
            <>
              User{" "}
              <span className="font-semibold">
                227006140@student.unsil.ac.id
              </span>{" "}
              {""}
              <span className="text-green-500">menambahkan</span>{" "}
              <span className="font-semibold">
                data penduduk dengan jumlah 500
              </span>
            </>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Riwayat;
