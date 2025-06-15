import React from 'react'
import TabelPernikahan from '../../../components/TabelPernikahan'

const DataPernikahan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Pernikahan
        </h1>
      </div>
      <TabelPernikahan />
    </div>
  )
}

export default DataPernikahan