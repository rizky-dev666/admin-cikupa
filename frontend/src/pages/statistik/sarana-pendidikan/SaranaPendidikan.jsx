import React from "react";
import TabelSaranaPendidikan from "../../../components/TabelSaranaPendidikan";

const SaranaPendidikan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Sarana Pendidikan
        </h1>
      </div>
      <TabelSaranaPendidikan />
    </div>
  );
};

export default SaranaPendidikan;
