import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import axios from "axios";
import { apiGet } from "../../data/api";
import { useAtom } from "jotai";

export default function Dashboard() {
  const [urlGet, setUrlGet] = useAtom(apiGet);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlGet}infodashboard`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="container my-4">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body shadow bg-white rounded">
                  <h5 className="card-title m-0">Kopi Dipanen</h5>
                  <p className="card-text">Hasil panen kopi (2022)</p>
                  <h1 className="card-text">
                    {data.total_berat
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    kg
                  </h1>
                  <div className="row">
                    <divs>
                      <a
                        href="#"
                        className="btn"
                        style={{
                          backgroundColor: "#151515",
                          color: "white",
                        }}
                      >
                        Lihat detail
                      </a>
                    </divs>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body shadow bg-white rounded">
                  <h5 className="card-title m-0">Kopi Sorting Bagus</h5>
                  <p className="card-text">Hasil sortingan bagus</p>
                  <h1 className="card-text">
                    {data.total_sorting_bagus
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    kg
                  </h1>
                  <div className="row">
                    <div>
                      <a href="#" className="btn btn-primary">
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body shadow bg-white rounded">
                  <h5 className="card-title m-0">Kopi Sorting Jelek</h5>
                  <p className="card-text">Hasil sortingan jelek</p>
                  <h1 className="card-text">
                    {data.total_sorting_jelek
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    kg
                  </h1>
                  <div className="row">
                    <div>
                      <a
                        href="#"
                        className="btn"
                        style={{
                          backgroundColor: "#4E0404",
                          color: "white",
                        }}
                      >
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body shadow bg-white rounded">
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="card-title m-0">Stok kopi</h5>
                      <p className="card-text">
                        Stok kopi yang tersedia saat ini
                      </p>
                      <h1 className="card-text">
                        {data.total_berat_stok
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        kg
                      </h1>
                      <div className="row">
                        <div>
                          <a href="#" className="btn btn-primary">
                            Lihat Detail
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100 text-center">
                        <div className="card-body shadow bg-white rounded">
                          <h5 className="card-title m-0">Grade A</h5>
                          <h1 className="card-text mt-4">
                            {data.total_berat_kopi_tanpa_kulit_grade_1
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kg
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100 text-center">
                        <div className="card-body shadow bg-white rounded">
                          <h5 className="card-title m-0">Grade B</h5>
                          <h1 className="card-text mt-4">
                            {data.total_berat_kopi_tanpa_kulit_grade_2
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kg
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100 text-center">
                        <div className="card-body shadow bg-white rounded">
                          <h5 className="card-title m-0">Grade C</h5>
                          <h1 className="card-text mt-4">
                            {data.total_berat_kopi_tanpa_kulit_grade_3
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kg
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body shadow bg-white rounded">
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="card-title m-0">Kopi dalam proses</h5>
                      <p className="card-text">
                        Kopi yang sedang diproses saat ini
                      </p>
                      <h1 className="card-text">
                        {(
                          parseInt(data.total_berat_fermentasi) +
                          parseInt(data.total_berat_penjemuran)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        kg
                      </h1>
                      <div className="row">
                        <div>
                          <a href="#" className="btn btn-primary">
                            Lihat Detail
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100 text-center">
                        <div className="card-body shadow bg-white rounded">
                          <h5 className="card-title m-0">Fermentasi</h5>
                          <h1 className="card-text mt-4">
                            {data.total_berat_fermentasi
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kg
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100 text-center">
                        <div className="card-body shadow bg-white rounded">
                          <h5 className="card-title m-0">Penjemuran</h5>
                          <h1 className="card-text mt-4">
                            {data.total_berat_penjemuran
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kg
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}