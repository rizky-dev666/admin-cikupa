import React from "react";
import ButtonTambah from "../../../components/ButtonTambah";
import TabelAgama from "../../../components/TabelAgama";

const DataAgama = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">Data Agama</h1>
        <div className="flex space-x-1"></div>
      </div>
      <TabelAgama />
    </div>
  );
};

export default DataAgama;
