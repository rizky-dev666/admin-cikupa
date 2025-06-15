import React from 'react'
import TabelPendidikan from '../../../components/TabelPendidikan'
import ButtonTambah from '../../../components/ButtonTambah'

const DataPendidikan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Pendidikan
        </h1>
      </div>
      <TabelPendidikan />
    </div>
  )
}

export default DataPendidikan