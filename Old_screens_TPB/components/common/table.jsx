import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table
      className="table table-striped table-bordered table-hover"
      bordered="true"
      style={{
        fontWeight: "bold",
        background: "white",
        border: "1px solid black"
      }}
    >
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
