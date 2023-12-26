import React from "react";
import { motion } from "framer-motion";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "./Icons";
import { notifyDelete, notifyRowEdit } from "./Toaster";

//Input component
const InputField = ({ value, onChange, className }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={`w-full py-1 rounded-md text-center ${className}`}
  />
);

//Action component
const ActionButton = ({ onClick, className, children }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

//Table Header Component
const DataTableheader = ({ selectedRows, currentItems, handleSelectAll }) => (
  <tr className="bg-gray-200">
    <th className="text-center py-2 px-4 w-16">
      <input
        type="checkbox"
        checked={selectedRows.length === currentItems.length}
        onChange={handleSelectAll}
        className="h-5 w-5"
      />
    </th>
    <th className="py-4 px-4 border-r-2 w-48">Name</th>
    <th className="py-4 px-4 border-r-2 w-64">Email</th>
    <th className="py-4 px-4 border-r-2 w-32">Shift</th>
    <th className="py-4 px-4 border-r-2 w-48">Actions</th>
  </tr>
);

//Table Row Component
const DataTableRow = ({
  item,
  selectedRows,
  handleRowSelect,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleDelete,
}) => (
  <motion.tr
    key={item._id}
    initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
    animate={{ opacity: 1, y: 0, scaleY: 1 }}
    exit={{ opacity: 0, y: 10, scaleY: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`border-b cursor-pointer hover:bg-purple-100 ${
      selectedRows.includes(item._id) ? "bg-gray-100 hover:bg-gray-100" : ""
    } ${item.editing ? "bg-sky-50" : ""}`}
  >
    <td className="text-center">
      <input
        className="h-5 w-5 accent-purple-500"
        type="checkbox"
        checked={selectedRows.includes(item._id)}
        onChange={() => handleRowSelect(item._id)}
      />
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item._id)}
      className="py-3 px-4"
    >
      {item.editing ? (
        <InputField
          value={item.name}
          onChange={(e) => handleInputChange(item._id, "name", e.target.value)}
        />
      ) : (
        item.name
      )}
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item._id)}
      className="py-3 px-4 h-12"
    >
      {item.editing ? (
        <InputField
          value={item.email}
          onChange={(e) => handleInputChange(item._id, "email", e.target.value)}
        />
      ) : (
        item.email
      )}
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item._id)}
      className="py-3 px-4 h-12"
    >
      {item.editing ? (
        <InputField
          value={item.shift}
          onChange={(e) => handleInputChange(item._id, "shift", e.target.value)}
        />
      ) : (
        item.shift
      )}
    </td>
    <td className="py-3 px-4 h-12">
      {item.editing ? (
        <>
          <ActionButton
            onClick={() => {
              handleSave(item._id);
              notifyRowEdit();
            }}
            className="saveButton text-green-500 p-2 rounded-md mr-2 hover:bg-green-600 hover:text-white"
          >
            <SaveIcon />
          </ActionButton>
          <ActionButton
            onClick={() => handleCancel(item._id)}
            className="cancelButton p-2 rounded-md mr-2 hover:bg-red-500 hover:text-white"
          >
            <CancelIcon />
          </ActionButton>
        </>
      ) : (
        <>
          <ActionButton
            onClick={() => handleEdit(item._id)}
            className="editButton text-purple-600 p-2 rounded-md mr-2 hover:bg-[#66279a] hover:text-white transition-all duration-100"
          >
            <EditIcon />
          </ActionButton>
          <ActionButton
            onClick={() => {
              handleDelete(item._id);
              notifyDelete();
            }}
            className="deleteButton text-red-500 p-2 rounded-md hover:bg-red-600 hover:text-white"
          >
            <DeleteIcon />
          </ActionButton>
        </>
      )}
    </td>
  </motion.tr>
);

const DataTable = ({
  selectedRows,
  currentItems,
  handleSelectAll,
  handleRowSelect,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleDelete,
}) => {
  return (
    <div>
      <table className="w-11/12 mx-auto bg-white border rounded-lg">
        <thead>
          <DataTableheader
            selectedRows={selectedRows}
            currentItems={currentItems}
            handleSelectAll={handleSelectAll}
          />
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <DataTableRow
              key={item._id}
              item={item}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleEdit={handleEdit}
              handleCancel={handleCancel}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
