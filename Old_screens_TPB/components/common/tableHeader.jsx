import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr
          style={{
            fontWeight: "bold",
            color: "black",
            border: "1px solid black"
          }}
        >
          {this.props.columns.map(column => (
            <th
              className=""
              key={column.path || column.key}
              // onClick={() => this.raiseSort(column.path)}
              style={{
                fontWeight: "bold",
                color: "black",
                background: "",
                border: "1px solid black"
              }}
            >
              {column.label}
              {/* {this.renderSortIcon(column)} */}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
