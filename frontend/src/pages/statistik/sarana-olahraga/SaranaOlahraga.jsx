import React from "react";
import TabelSaranaOlahraga from "../../../components/TabelSaranaOlahraga";

const SaranaOlahraga = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Sarana Olahraga
        </h1>
      </div>
      <TabelSaranaOlahraga />
    </div>
  );
};

export default SaranaOlahraga;
