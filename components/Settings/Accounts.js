import React, { useState } from "react";

const Accounts = () => {
  const [accountDetails, setAccountDetails] = useState([
    {
      id: 1,
      name: "Spannerdoor Pvt Ltd",
      accountNumber: "123456789012",
      ifscCode: "SBIN0001234",
      micrCode: "560002012",
      accountType: "Current",
      branchName: "MG Road, Bangalore",
      contactEmail: "accounts@spannerdoor.com",
    },
  ]);

  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const handleEdit = (id) => {
    setEditingRowId(id);
    const rowToEdit = accountDetails.find((account) => account.id === id);
    setEditedRow({ ...rowToEdit });
  };

  const handleSave = (id) => {
    setAccountDetails((prevDetails) =>
      prevDetails.map((account) =>
        account.id === id ? { ...editedRow } : account
      )
    );
    setEditingRowId(null);
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prevRow) => ({ ...prevRow, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Accounts Information</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Account Number
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              IFSC Code
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              MICR Code
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Account Type
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Branch Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Contact Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {accountDetails.map((account) => (
            <tr
              key={account.id}
              className={account.id % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {editingRowId === account.id ? (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.accountNumber}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.ifscCode}
                      onChange={(e) =>
                        handleInputChange("ifscCode", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.micrCode}
                      onChange={(e) =>
                        handleInputChange("micrCode", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.accountType}
                      onChange={(e) =>
                        handleInputChange("accountType", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={editedRow.branchName}
                      onChange={(e) =>
                        handleInputChange("branchName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="email"
                      value={editedRow.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleSave(account.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.accountNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.ifscCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.micrCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.accountType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.branchName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {account.contactEmail}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(account.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
