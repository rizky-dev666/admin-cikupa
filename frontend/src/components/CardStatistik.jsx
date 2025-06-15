import React from "react";
import { Link } from "react-router-dom";

const CardStatistik = ({ title, caption, image, link }) => {
  return (
    <Link
      to={link}
      className="relative flex flex-col bg-white shadow-xl border border-slate-200 rounded-lg w-96 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
        <p className="text-slate-600 leading-normal font-light">{caption}</p>
      </div>
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </Link>
  );
};

export default CardStatistik;
