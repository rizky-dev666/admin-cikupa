import React from "react";
import TabelPenduduk from "../../../components/TabelPenduduk";
import TabelDomisili from "../../../components/TabelDomisili";

const DataPenduduk = () => {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-6 text-center">Data SLS</h1>
        </div>
        <TabelDomisili />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-6 text-center">
            Data Penduduk
          </h1>
        </div>
        <TabelPenduduk />
      </div>
    </>
  );
};

export default DataPenduduk;
