import React from 'react'
import TabelPekerjaan from '../../../components/TabelPekerjaan';

const DataPekerjaan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Pekerjaan
        </h1>
      </div>
      <TabelPekerjaan />
    </div>
  )
}

export default DataPekerjaan;