import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import Pagination from "../common/Pagination";
import SearchBar from "../common/SearchBar";
import DeleteButton from "../common/DeleteButton";
import axios from "axios";
import { notifyDeleteMultiple } from "../common/Toaster";

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  //function to fetch json data from ENDPOINT
  const fetchApiData = async () => {
    try {
      const jsonData = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setData(jsonData.data);
      setFilteredData(jsonData.data);
    } catch (err) {
      throw err;
    }
  };

  //useEffect hook to fetch adad
  useEffect(() => {
    fetchApiData();
  }, []);

  // useEffect(() => {
  //   const filtered = data.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  //   );
  //   setFilteredData(filtered);
  // }, [searchTerm, data]);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  //function to handle search
  const handleSearch = () => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  //function to handle key press event
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //function to handle edit mode for certain row
  const handleEdit = (id) => {
    const updatedData = data.map((item) =>
      item._id === id
        ? { ...item, editing: true, originalData: { ...item } }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to cancel edit mode for certain row
  const handleCancel = (id) => {
    const updatedData = data.map((item) =>
      item._id === id && item.editing
        ? { ...item.originalData, editing: false }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to handle input change in editable row
  const handleInputChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to delete users on mongoDB
  const handleDelete = async (id) => {
    try {
      const idsToDelete = Array.isArray(id) ? id : [id];
      console.log('Deleting users with IDs:', idsToDelete);

      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users`, { data: { ids: idsToDelete } });
      console.log('Server response:', response);

      const updatedData = data.filter((item) => !idsToDelete.includes(item._id));
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error deleting user(s):', error.message);
    }
  };

  //function to handle saves for editable row
  const handleSave = async (id) => {
    try {
      const editedItem = data.find(item => item._id === id);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users`, editedItem);
      console.log('Server response:', response);

      const updatedData = data.map((item) =>
        item._id === id ? { ...item, editing: false } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error saving user changes:', error.message);
    }
  };

  //function to select all rows on current page
  const handleSelectAll = () => {
    const allIdsOnCurrentPage = currentItems.map((item) => item._id);
    const updatedSelectedRows =
      selectedRows.length === allIdsOnCurrentPage.length
        ? []
        : [...allIdsOnCurrentPage];
    setSelectedRows(updatedSelectedRows);
  };

  //function to select/deselect a certain row
  const handleRowSelect = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((selectedId) => selectedId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
  };

  //function to delete selected row(s)
  const handleDeleteSelected = () => {
    const idsToDelete = selectedRows;

    handleDelete(idsToDelete);
    setSelectedRows([]);
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center my-4 w-11/12 mx-auto">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          onKeyDown={handleKeyPress}
        />
        <DeleteButton
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
          selectedRows={selectedRows}
          notifyDeleteMultiple={notifyDeleteMultiple}
        />
      </div>
      <div className="flex flex-col text-left">
        <DataTable
          selectedRows={selectedRows}
          currentItems={currentItems}
          handleSelectAll={handleSelectAll}
          handleRowSelect={handleRowSelect}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
        {data.length > 0 ?
          <Pagination
            selectedRows={selectedRows}
            filteredData={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            indexOfLastItem={indexOfLastItem}
            totalPages={totalPages}
          />
          : <div className="mx-auto mt-4 text-gray-600"> No Data Exists </div>}
      </div>
    </div>
  );
};

export default DataGrid;
