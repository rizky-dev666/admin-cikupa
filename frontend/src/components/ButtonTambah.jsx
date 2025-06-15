import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonTambah = ({ to = "/tambah" }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(to)}
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover"
      >
        Tambah
      </button>
    </div>
  );
};

export default ButtonTambah;
