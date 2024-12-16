import { useState } from "react";

const FlexibleTableData = ({
  columns,
  data,
  onSave,
  onRemoveRow,
  onAddRow,
}) => {
  // This state will hold the current data in the table
  const [tableData, setTableData] = useState(data);

  // Update cell value when editing
  const handleCellChange = (rowIndex, columnIndex, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columns[columnIndex].name] = value;
    setTableData(updatedData);
  };

  // Add a new row
  const addRow = () => {
    const newRow = {};
    columns.forEach((col) => {
      newRow[col.name] = col.type === "date" ? "" : ""; // Empty fields
    });
    setTableData([...tableData, newRow]);
    if (onAddRow) onAddRow(newRow);
  };

  // Remove a row
  const removeRow = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    if (onRemoveRow) onRemoveRow(updatedData);
  };

  // Save all changes
  const handleSave = () => {
    onSave(tableData);
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border-b py-2 px-4 text-left">
                {col.name}
              </th>
            ))}
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border-b px-4 py-2">
                  {col.type === "date" ? (
                    <input
                      type="date"
                      value={row[col.name]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                  ) : col.type === "text" ? (
                    <input
                      type="text"
                      value={row[col.name]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                  ) : col.type === "select" ? (
                    <select
                      value={row[col.name]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select</option>
                      <option value="Govt">Govt</option>
                      <option value="RH">RH</option>
                      <option value="Spannerdoor">Spannerdoor</option>
                    </select>
                  ) : null}
                </td>
              ))}
              <td className="border-b px-4 py-2">
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          onClick={addRow}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Row
        </button>

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FlexibleTableData;
