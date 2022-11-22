import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../src/pages/login";
import Dashboard from "../src/pages/dashboard/dashboard";

function App() {
  // useEffect(() => {
  //   const nama_pengguna = Cookies.get("nama_pengguna");
  //   const id_pengguna = Cookies.get("id_pengguna");
  //   const jabatan = Cookies.get("jabatan");
  //   console.log(nama_pengguna, id_pengguna, jabatan);

  //   // if (nama_pengguna && id_pengguna && jabatan == 1) {
  //   //   <Navigate to="/dashboard" />;
  //   // } else if (nama_pengguna && id_pengguna && jabatan != 1) {
  //   //   <Navigate to="/salah" />;
  //   // } else {
  //   //   <Route exact path="/" element={<Login />} />;
  //   // }
  // }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/salah" element={<Salah />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Salah() {
  return <h2>Tidak boleh masuk</h2>;
}
export default App;
