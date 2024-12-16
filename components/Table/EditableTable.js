import { useState, useEffect } from "react";

export function EditableTable({
  tableConfigs = [],
  onRowChange = () => {}, // Optional: Callback to handle row changes
  onSendQuote = () => {}, // Optional: Callback to handle quote submission
}) {
  // Initialize table data based on tableConfigs
  const initialData = tableConfigs.map((config) => ({
    rows: config.initialRows?.length
      ? config.initialRows.map((row) => ({
          ...row,
          checked: config.showCheckbox ? true : false, // Default all rows as "checked"
        }))
      : [
          {
            id: Date.now(),
            cells: Array(config.columns.length).fill(""),
            checked: config.showCheckbox ? true : false,
          },
        ],
    columns: config.columns,
    showCheckbox: config.showCheckbox || false,
    showAddButton: config.showAddButton || true,
  }));

  const [tables, setTables] = useState(initialData);

  // Reinitialize the checked state when the tableConfigs or showCheckbox changes
  useEffect(() => {
    const updatedTables = tables.map((table) => {
      if (!table.showCheckbox) {
        // If checkbox is disabled, assume all rows are checked by default (no checkbox UI).
        table.rows.forEach((row) => {
          row.checked = true; // Implicitly checked (no UI)
        });
      }
      return table;
    });
    setTables(updatedTables);
  }, [tableConfigs]);

  // Add a new row
  const addRow = (tableIndex) => {
    const emptyRow = tables[tableIndex].columns.map(() => "");
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push({
      id: Date.now(),
      cells: emptyRow,
      checked: updatedTables[tableIndex].showCheckbox ? true : false,
    });
    setTables(updatedTables);
  };

  // Remove a row
  const removeRow = (tableIndex, rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows = updatedTables[tableIndex].rows.filter(
      (_, i) => i !== rowIndex
    );
    setTables(updatedTables);
  };

  // Update a cell value and recalculate amount if necessary
  const updateCell = (tableIndex, rowIndex, cellIndex, value) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].cells[cellIndex] = value;

    // If the updated cell is in the Price or Qty column, recalculate the Amount
    if (cellIndex === 1 || cellIndex === 2) {
      const price = parseFloat(
        updatedTables[tableIndex].rows[rowIndex].cells[1]
      );
      const qty = parseInt(updatedTables[tableIndex].rows[rowIndex].cells[2]);

      if (!isNaN(price) && !isNaN(qty)) {
        const amount = price * qty;
        updatedTables[tableIndex].rows[rowIndex].cells[3] = amount.toFixed(2); // Update Amount (4th column)
      } else {
        updatedTables[tableIndex].rows[rowIndex].cells[3] = ""; // If invalid, clear the Amount
      }
    }

    // Notify the parent component of the row change (if required)
    onRowChange(
      updatedTables[tableIndex].rows[rowIndex],
      rowIndex,
      cellIndex,
      value
    );
    setTables(updatedTables);
  };

  // Toggle a row's checked state
  const toggleRowCheck = (tableIndex, rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].checked =
      !updatedTables[tableIndex].rows[rowIndex].checked;
    setTables(updatedTables);
  };

  // Toggle "Select All" checkbox
  const toggleSelectAll = (tableIndex) => {
    const updatedTables = [...tables];
    const areAllChecked = updatedTables[tableIndex].rows.every(
      (row) => row.checked
    );
    updatedTables[tableIndex].rows.forEach((row) => {
      row.checked = !areAllChecked; // Toggle the checked state of all rows
    });
    setTables(updatedTables);
  };

  // Calculate the total amount (only sum of checked rows' Amount values)
  const calculateTotal = () => {
    let total = 0;
    tables.forEach((table) => {
      table.rows.forEach((row) => {
        if (row.checked) {
          // Only consider checked rows
          const amount = parseFloat(row.cells[3]);
          if (!isNaN(amount)) {
            total += amount;
          }
        }
      });
    });
    return total.toFixed(2);
  };

  // Handle Save action (Save button)
  const handleSave = () => {
    const checkedData = [];
    const uncheckedData = [];

    // Separate checked and unchecked rows
    tables.forEach((table) => {
      table.rows.forEach((row) => {
        if (row.checked) {
          checkedData.push(row);
        } else {
          uncheckedData.push(row);
        }
      });
    });

    // Log checked and unchecked rows separately in the console
    console.log("Checked rows:", JSON.stringify(checkedData, null, 2));
    console.log("Unchecked rows:", JSON.stringify(uncheckedData, null, 2));

    // Log the total amount
    console.log("Total Amount: ", calculateTotal());

    alert(`
      Checked rows: ${JSON.stringify(checkedData, null, 2)}
      Unchecked rows: ${JSON.stringify(uncheckedData, null, 2)}
      Total Amount: ${calculateTotal()}
    `);
  };

  // Handle Send Quote action (send quote button)
  const handleSendQuote = () => {
    // You can implement the logic to send the quote, for example, an API request
    alert("Quote has been sent!");
    // Optionally call an onSendQuote function passed as prop
    onSendQuote();
  };

  return (
    <div className="space-y-6">
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="space-y-4">
          <h2 className="font-bold m-3">{tableConfigs[tableIndex].title}</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {table.showCheckbox && (
                  <th className="border-b py-2 px-4 text-left">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectAll(tableIndex)}
                      checked={table.rows.every((row) => row.checked)} // Check if all rows are selected
                      className="w-5 h-5 accent-blue-500"
                    />
                  </th>
                )}
                {table.columns.map((col, index) => (
                  <th key={index} className="border-b py-2 px-4 text-left">
                    {col.header}
                  </th>
                ))}
                <th className="border-b py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={row.id}>
                  {table.showCheckbox && (
                    <td className="border-b px-4 py-2">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => toggleRowCheck(tableIndex, rowIndex)}
                        className="w-5 h-5 accent-blue-500"
                      />
                    </td>
                  )}
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-b px-4 py-2">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          updateCell(
                            tableIndex,
                            rowIndex,
                            cellIndex,
                            e.target.value
                          )
                        }
                        className="w-full border p-2 rounded"
                      />
                    </td>
                  ))}
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => removeRow(tableIndex, rowIndex)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {table.showAddButton && (
                <tr>
                  <td
                    colSpan={
                      table.columns.length + (table.showCheckbox ? 2 : 1)
                    }
                    className="text-center"
                  >
                    <button
                      onClick={() => addRow(tableIndex)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Add Row
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {/* Total Amount Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Total:</h3>
        <div className="text-xl font-bold">{calculateTotal()}</div>
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
