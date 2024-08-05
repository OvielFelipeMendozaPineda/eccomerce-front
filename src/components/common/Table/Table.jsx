import React from 'react';

const Table = ({ data, headers }) => (
  <div className="px-4 py-3">
    <div className="flex overflow-hidden rounded-xl border border-[#d0dbe6] bg-[#f8fafb]">
      <table className="flex-1">
        <thead>
          <tr className="bg-[#f8fafb]">
            {headers.map((header) => (
                <th className={header.className}>
                    {header.title}
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-t-[#d0dbe6]">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className={header.className}>
                    {header.render ? header.render(row) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  </div>
);

export default Table;
