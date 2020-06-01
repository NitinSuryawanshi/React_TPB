import React, { Component } from "react";
class InvoiceDetails extends Component {
  state = {};
  handleSave = () => {
    // Navigate to /products
    this.props.history.replace("/invoice");
  };

  render() {
    return (
      <div>
        <h1>Invoice Details{this.props.match.params.id}</h1>
        <button className="btn btn-primary btn-sm" onClick={this.handleSave}>
          Close
        </button>
        <button btn btn-secondary btn-sm onClick={this.handleSave}>
          Print
        </button>
      </div>
    );
  }
}

export default InvoiceDetails;
