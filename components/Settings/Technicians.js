import React, { useState } from "react";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: "John Doe",
      specialization: "Engine Repair",
      bloodGroup: "O+",
      documents: "https://drive.google.com/file/d/1-example1",
    },
    {
      id: 2,
      name: "Jane Smith",
      specialization: "Electrical Systems",
      bloodGroup: "A-",
      documents: "https://drive.google.com/file/d/2-example2",
    },
    {
      id: 3,
      name: "Sam Wilson",
      specialization: "Brake Maintenance",
      bloodGroup: "B+",
      documents: "https://drive.google.com/file/d/3-example3",
    },
  ]);

  const specializations = [
    "Engine Repair",
    "Electrical Systems",
    "Brake Maintenance",
    "Suspension Work",
    "Transmission Repair",
  ];

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const [isEditing, setIsEditing] = useState(null);
  const [newTechnician, setNewTechnician] = useState({
    name: "",
    specialization: "",
    bloodGroup: "",
    documents: "",
  });

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Technician Information</h2>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Specialization
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Blood Group
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Documents
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech, index) => (
            <tr key={tech.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === tech.id ? (
                  <input
                    type="text"
                    defaultValue={tech.name}
                    onChange={(e) =>
                      setTechnicians((prev) =>
                        prev.map((t) =>
                          t.id === tech.id ? { ...t, name: e.target.value } : t
                        )
                      )
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  tech.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === tech.id ? (
                  <select
                    defaultValue={tech.specialization}
                    onChange={(e) =>
                      setTechnicians((prev) =>
                        prev.map((t) =>
                          t.id === tech.id
                            ? { ...t, specialization: e.target.value }
                            : t
                        )
                      )
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>
                      Select Specialization
                    </option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                ) : (
                  tech.specialization
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === tech.id ? (
                  <select
                    defaultValue={tech.bloodGroup}
                    onChange={(e) =>
                      setTechnicians((prev) =>
                        prev.map((t) =>
                          t.id === tech.id
                            ? { ...t, bloodGroup: e.target.value }
                            : t
                        )
                      )
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                ) : (
                  tech.bloodGroup
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === tech.id ? (
                  <input
                    type="url"
                    defaultValue={tech.documents}
                    onChange={(e) =>
                      setTechnicians((prev) =>
                        prev.map((t) =>
                          t.id === tech.id
                            ? { ...t, documents: e.target.value }
                            : t
                        )
                      )
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <a
                    href={tech.documents}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {isEditing === tech.id ? (
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(tech.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setTechnicians((prev) =>
                          prev.filter((t) => t.id !== tech.id)
                        )
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Technician */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Technician</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={newTechnician.name}
            onChange={(e) =>
              setNewTechnician((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
          <select
            value={newTechnician.specialization}
            onChange={(e) =>
              setNewTechnician((prev) => ({
                ...prev,
                specialization: e.target.value,
              }))
            }
            className="w-1/4 border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Specialization
            </option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <select
            value={newTechnician.bloodGroup}
            onChange={(e) =>
              setNewTechnician((prev) => ({
                ...prev,
                bloodGroup: e.target.value,
              }))
            }
            className="w-1/4 border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <input
            type="url"
            placeholder="Drive URL"
            value={newTechnician.documents}
            onChange={(e) =>
              setNewTechnician((prev) => ({
                ...prev,
                documents: e.target.value,
              }))
            }
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={() => {
              if (
                newTechnician.name &&
                newTechnician.specialization &&
                newTechnician.bloodGroup &&
                newTechnician.documents
              ) {
                setTechnicians((prev) => [
                  ...prev,
                  { id: Date.now(), ...newTechnician },
                ]);
                setNewTechnician({
                  name: "",
                  specialization: "",
                  bloodGroup: "",
                  documents: "",
                });
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Technicians;
