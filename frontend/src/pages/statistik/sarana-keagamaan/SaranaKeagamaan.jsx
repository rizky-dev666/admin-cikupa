import React from 'react'
import TabelSaranaKeagamaan from '../../../components/TabelSaranaKeagamaan'

const SaranaKeagamaan = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Data Sarana Keagamaan
        </h1>
      </div>
      <TabelSaranaKeagamaan />
    </div>
  )
}

export default SaranaKeagamaan