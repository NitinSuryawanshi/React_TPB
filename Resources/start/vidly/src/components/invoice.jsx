import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
//import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Table from "./common/table";

class Invoice extends Component {
  state = {
    transdata: [
      {
        archived: "",
        areaLocation: "",
        areaPallet: "",
        areaUom: "",
        assigned: "",
        clientId: "",
        code: "",
        country: "",
        createdDstamp: "",
        credit: "",
        currency: "",
        daysInMonth: "",
        daysReceived: "",
        disallowMergeRules: "",
        elapsedTime: "",
        endDstamp: "",
        endMonth: "",
        endMonthDay: "",
        endWeekDay: "",
        endWeekNumber: "",
        endYear: "",
        lengthUom: "",
        noRuleFound: "",
        numberUom: "",
        ownerId: "",
        partMonth: "",
        processed: "",
        quantity: "",
        receiptDstamp: "",
        rollbackInvoice: "",
        rollbackRequired: "",
        siteId: "",
        sourceId: "",
        sourceKey: "",
        startDstamp: "",
        startMonth: "",
        startMonthDay: "",
        startWeekDay: "",
        startWeekNumber: "",
        startYear: "",
        status: "",
        statusMessage: "",
        systemId: "",
        timeUom: "",
        transactionType: "",
        uploadedDstamp: "",
        userDefined: "",
        volumeActPallet: "",
        volumeActual: "",
        volumeFullConfig: "",
        volumeFullPallet: "",
        volumeLocation: "",
        volumePallet: "",
        volumeUom: "",
        weightActPallet: "",
        weightActual: "",
        weightFullConfig: "",
        weightFullPallet: "",
        weightPallet: "",
        weightUom: "",
        id: ""
      }
    ],
    sortColumn: { path: "title", order: "asc" }
  };

  columns = [
    {
      label: "ID",
      path: "id"
    },
    {
      label: "Site ID",
      path: "siteId"
    },
    {
      label: "Client ID",
      path: "clientId"
    },
    {
      label: "Transaction Type",
      path: "transactionType"
    },
    {
      key: "Details",
      content: currentRow => (
        /*<button
          onClick={() => this.onDetails(currentRow)}
          className="btn btn-danger btn-sm"
        >
          Details
        </button>*/
        <li key={currentRow.id}>
          <Link to={`/invoiceDetails/${currentRow.id}`}>Details</Link>
        </li>
      )
    }
  ];

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_SERVER + "basetrans/", {
        responseType: "json"
      })
      .then(response => {
        this.setState({ transdata: response.data });
        console.log("inside job");
        console.log(response.data);
      });
  }

  printDocument() {
    const input = document.getElementById("root");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  onDetails = currentRow => {
    // Navigate to /products
    this.props.history.replace("/invoiceDetails");
  };

  render() {
    const { transdata, sortColumn } = this.state;

    return (
      <div>
        <h1 align="center">Invoice</h1>
        <Table
          columns={this.columns}
          data={transdata}
          sortColumn={sortColumn}
        />
        <button onClick={this.printDocument}>PRINT</button>

        <p>Click above button opens print preview with these words on page</p>
      </div>
    );
  }
}

export default Invoice;
