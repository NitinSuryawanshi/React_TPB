import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import Table from "./../../components/common/table";

class BaseTransaction extends Component {
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
      label: "Transaction ID",
      path: "id"
    },
    {
      label: "ClientID",
      path: "clientId"
    },
    {
      label: "SiteID",
      path: "siteId"
    },
    {
      label: "OwnerID",
      path: "ownerId"
    },
    {
      label: "TransactionType",
      path: "transactionType"
    },
    {
      label: "Quantity",
      path: "quantity"
    },
    {
      label: "Assigned",
      path: "assigned"
    },
    {
      label: "Processed",
      path: "processed"
    },
    {
      label: "StartYear",
      path: "startYear"
    },
    {
      key: "Details",
      content: currentRow => (
        <li key={currentRow.id}>
          <Link to={`/invoiceDetails/:${currentRow.id}`}>Details</Link>
        </li>
      )
    }
  ];

  componentDidMount() {
    let clientId = "ACLIENT";
    axios
      .get(
        process.env.REACT_APP_API_SERVER + "clientbasetrans?client=" + clientId,
        {
          responseType: "json"
        }
      )
      .then(response => {
        this.setState({ transdata: response.data });
        console.log("inside job");
        console.log(response.data);
      });
  }

  /*printDocument() {
    const input = document.getElementById("root");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }*/

  render() {
    const { transdata, sortColumn } = this.state;
    return (
      <div style={{ background: "white" }}>
        {/* <li align="center">Base Transactions</li> */}
        {/* <p align="center">
          <b>Base Transactions</b>
        </p> */}
        <Table
          columns={this.columns}
          data={transdata}
          sortColumn={sortColumn}
        />
        {/*<button onClick={this.printDocument}>PRINT</button>*/}
      </div>
    );
  }
}

export default BaseTransaction;
