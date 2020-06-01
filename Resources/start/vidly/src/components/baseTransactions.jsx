import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Table from "./common/table";

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
      label: "EndYear",
      path: "endYear"
    },

    {
      label: "Archived",
      path: "archived"
    },
    {
      label: "AreaLocation",
      path: "areaLocation"
    },
    {
      label: "AreaPallet",
      path: "areaPallet"
    },
    {
      label: "AreaUOM",
      path: "areaUom"
    },
    {
      label: "Code",
      path: "code"
    },
    {
      label: "Country",
      path: "country"
    },
    {
      label: "CreatedDStamp",
      path: "createdDstamp"
    },
    {
      label: "Credit",
      path: "credit"
    },
    {
      label: "Currency",
      path: "currency"
    },
    {
      label: "NoRuleFound",
      path: "noRuleFound"
    },
    {
      label: "Status",
      path: "status"
    },
    {
      label: "StatusMessage",
      path: "statusMessage"
    },
    {
      label: "SystemID",
      path: "systemId"
    },
    {
      label: "UploadedDStamp",
      path: "uploadedDstamp"
    },
    {
      label: "UserDefine",
      path: "userDefined"
    },
    {
      key: "Details",
      content: currentRow => (
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

  render() {
    const { transdata, sortColumn } = this.state;

    return (
      <div>
        <h1 align="center">Base Transactions</h1>
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

export default BaseTransaction;
