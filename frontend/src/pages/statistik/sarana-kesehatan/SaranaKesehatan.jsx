import React from "react";
import TabelSaranaKesehatan from "../../../components/TabelSaranaKesehatan";

const SaranaKesehatan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Sarana Kesehatan
        </h1>
      </div>
      <TabelSaranaKesehatan />
    </div>
  );
};

export default SaranaKesehatan;
