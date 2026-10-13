import Form from "./Components/Form.tsx";
import Table from "./Components/Table.tsx";
import { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("table");
  const changePage = () => {
    if (currentPage === "table") {
      setCurrentPage("form");
    } else {
      setCurrentPage("table");
    }
  };
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-900">Watchlist</h1>
          <button
            onClick={changePage}
            className="bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            {currentPage !== "form" ? "Add movie" : "View list"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {currentPage === "form" ? <Form /> : <Table />}
      </main>
    </div>
  );
};

export default App;
