import sampleData from "./sample-data.json"
import DataTable from "./components/DataTable"
import { useState } from "react"
import { useEffect } from "react"

const App = () => {
  const [filteredData, setFilteredData] = useState([sampleData])
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleFilter = () => {
    const filtered = sampleData.filter(item => {
      const matchesName = nameFilter === '' || item.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesCategory = categoryFilter === '' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

      return matchesName && matchesCategory && matchesPrice;
    });

    setFilteredData(filtered.length > 0 ? filtered : []);
  }
  const resetFilters = () => {
    setNameFilter('');
    setCategoryFilter('');
    setPriceRange([0, 100]);
    setFilteredData(sampleData);
  };

  useEffect(() => {
    setFilteredData(sampleData); // Ensure sampleData is set initially
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Filter by Name"
          required
          className="border p-2 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          placeholder="Filter by Category"
          required
          className="border p-2 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium">Price Range:</label>
          <div className="flex">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="border p-1 mx-1 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="border p-1 mx-1 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Max"
            />
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300 w-full"
        >
          Reset Filters
        </button>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Table Data</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <DataTable data={filteredData} /> {/* Pass filtered data */}
        </div>
      </div>
    </div>
  )
}

export default App