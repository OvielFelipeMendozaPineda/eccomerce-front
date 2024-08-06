import React from 'react';

const Table = ({ data, headers }) => (
  <div className="px-4 py-3">
    <div className="flex overflow-hidden rounded-xl border border-[#d0dbe6] bg-[#f8fafb]">
      <table className="flex-1">
        <thead>
          <tr className="bg-[#f8fafb]">
            {headers.map((header, index) => (
              <th key={index} className={header.className}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-t-[#d0dbe6]">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className={header.className}>
                    {header.render ? header.render(row) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="p-5">
                <div className="bg-gray-200 p-5 flex justify-center items-center w-full h-20 rounded-md shadow-md">
                  <h2 className="text-gray-700 font-semibold">No hay registros</h2>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
