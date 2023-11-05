import React from 'react';
import "./tableInPage.css"
const TableInPage = ({ data, columns }) => {
    return (
        <table className="table-inpage-container">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th className='table-inpage-title' key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr className='table-inpage-content' key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableInPage;