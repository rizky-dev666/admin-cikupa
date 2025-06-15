import React, { useState } from "react";
import TabelPengguna from "../../components/TabelPengguna";

const Pengguna = () => {

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          List Pengguna
        </h1>
        <div className="flex space-x-1">
          <div className="mb-4 ml-3 text-center"></div>
        </div>
      </div>
      <TabelPengguna />
    </div>
  );
};

export default Pengguna;
