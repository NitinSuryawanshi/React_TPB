import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import Table from "./../../components/common/table";

class Invoice extends Component {
  state = {
    transdata: [
      {
        id: {
          invoice: "INV0.9154715564967989",
          clientId: "ACLIENT",
          invoiceType: "I"
        },
        adminContact: "JDA",
        approvedBy: null,
        approvedDstamp: null,
        archived: null,
        blanketBackupNumber: 0,
        blanketContractId: "BC-ACLIENT",
        calendarId: "FISCAL",
        contractBackupNumber: 0,
        contractId: "JDA",
        contractRenewalNumber: 0,
        createdDstamp: "2019-03-20T20:30:02.943",
        currency: "GBP",
        finalInvoice: "N",
        fromDstamp: "2018-11-24T20:37:02.221532",
        invoiceContact: "JDA",
        invoiceDstamp: "2019-03-20T20:30:02.943",
        invoiceGroupBackupNumber: null,
        invoiceGroupId: null,
        jdeUploaded: null,
        lastPrintedDstamp: null,
        lastUpdateBy: null,
        lastUpdateDstamp: null,
        notes: null,
        originalInvoice: null,
        report: "JDA-Detailed",
        sageUploaded: null,
        sourceInvoice: null,
        status: "Pending",
        toDstamp: null,
        totalPrice: 140,
        abInvoiceLines: [
          {
            id: {
              invoice: "INV0.9154715564967989",
              clientId: "ACLIENT",
              invoiceType: "I",
              lineId: 1
            },
            archived: null,
            createdDstamp: "2019-03-20T20:30:02.942",
            description: null,
            invoiceDescription: null,
            notes: null,
            originalTotalPrice: 80,
            pricePer: "1.0",
            ruleBackupNumber: 0,
            ruleKey: 268,
            ruleType: "INVOCIE",
            totalPrice: null,
            transactionType: "S",
            valuePriced: 1
          },
          {
            id: {
              invoice: "INV0.9154715564967989",
              clientId: "ACLIENT",
              invoiceType: "I",
              lineId: 2
            },
            archived: null,
            createdDstamp: "2019-03-20T20:30:02.942",
            description: null,
            invoiceDescription: null,
            notes: null,
            originalTotalPrice: 60,
            pricePer: "1.0",
            ruleBackupNumber: 0,
            ruleKey: 268,
            ruleType: "INVOCIE",
            totalPrice: null,
            transactionType: "S",
            valuePriced: 1
          }
        ]
      },
      {
        id: {
          invoice: "INV1.9154715564999989",
          clientId: "ACLIENT",
          invoiceType: "I"
        },
        adminContact: "JDA",
        approvedBy: null,
        approvedDstamp: null,
        archived: null,
        blanketBackupNumber: 0,
        blanketContractId: "BC-ACLIENT",
        calendarId: "FISCAL",
        contractBackupNumber: 0,
        contractId: "JDA",
        contractRenewalNumber: 0,
        createdDstamp: "2019-03-20T20:30:02.943",
        currency: "GBP",
        finalInvoice: "N",
        fromDstamp: "2018-11-24T20:37:02.221532",
        invoiceContact: "JDA",
        invoiceDstamp: "2019-03-20T20:30:02.943",
        invoiceGroupBackupNumber: null,
        invoiceGroupId: null,
        jdeUploaded: null,
        lastPrintedDstamp: null,
        lastUpdateBy: null,
        lastUpdateDstamp: null,
        notes: null,
        originalInvoice: null,
        report: "JDA-Detailed",
        sageUploaded: null,
        sourceInvoice: null,
        status: "Pending",
        toDstamp: null,
        totalPrice: 140,
        abInvoiceLines: [
          {
            id: {
              invoice: "INV1.9154715564999989",
              clientId: "ACLIENT",
              invoiceType: "I",
              lineId: 1
            },
            archived: null,
            createdDstamp: "2019-03-20T20:30:02.942",
            description: null,
            invoiceDescription: null,
            notes: null,
            originalTotalPrice: 80,
            pricePer: "1.0",
            ruleBackupNumber: 0,
            ruleKey: 268,
            ruleType: "INVOCIE",
            totalPrice: null,
            transactionType: "S",
            valuePriced: 1
          },
          {
            id: {
              invoice: "INV1.9154715564999989",
              clientId: "ACLIENT",
              invoiceType: "I",
              lineId: 2
            },
            archived: null,
            createdDstamp: "2019-03-20T20:30:02.942",
            description: null,
            invoiceDescription: null,
            notes: null,
            originalTotalPrice: 60,
            pricePer: "1.0",
            ruleBackupNumber: 0,
            ruleKey: 268,
            ruleType: "INVOCIE",
            totalPrice: null,
            transactionType: "S",
            valuePriced: 1
          }
        ]
      }
    ],
    sortColumn: { path: "title", order: "asc" }
  };

  columns = [
    {
      label: "Invoice",
      path: "id.invoice"
    },
    {
      label: "Client",
      path: "abInvoiceLines[0].id.clientId"
    },
    {
      label: "Rule Type",
      path: "abInvoiceLines[0].ruleType"
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
        // <li key={currentRow.id}>
        <Link to={`/invoiceDetails/${currentRow.id.invoice}`}>Details</Link>
        // </li>
      )
    }
  ];

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_SERVER + "invoiceresults", {
        responseType: "json"
      })
      .then(response => {
        this.setState({ transdata: response.data });
        console.log("inside job");
        //console.log(response.data[0].abInvoiceLines[0].ruleKey);
        console.log(this.state.transdata.length);
        console.log(this.state.transdata[0].abInvoiceLines.length);
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

  onDetails = currentRow => {
    // Navigate to /products
    this.props.history.replace("/invoiceDetails");
  };

  render() {
    const { transdata, sortColumn } = this.state;

    return (
      <div>
        {/* <p align="center">
          <b>Invoice</b>
        </p> */}
        <Table
          columns={this.columns}
          data={transdata}
          sortColumn={sortColumn}
        />
        {/*} <button onClick={this.printDocument}>PRINT</button>*/}
      </div>
    );
  }
}

export default Invoice;
