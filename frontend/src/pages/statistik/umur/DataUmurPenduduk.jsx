import React from 'react'
import TabelUmurPenduduk from '../../../components/TabelUmurPenduduk'

const DataUmurPenduduk = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Umur Penduduk
        </h1>
      </div>
      <TabelUmurPenduduk />
    </div>
  )
}

export default DataUmurPenduduk