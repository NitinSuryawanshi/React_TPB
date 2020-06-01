import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Table from "./common/table";

class Rules extends Component {
  state = {
    ruledata: [
      {
        ruleKey: "",
        ruleBackupNumber: "",
        assignClause: "",
        backupDstamp: "",
        blanketBackupNumber: "",
        blanketContractId: "",
        clientId: "",
        contractBackupNumber: "",
        contractId: "",
        contractRenewalNumber: "",
        createdBy: "",
        createdDstamp: "",
        credit: "",
        description: "",
        endDstamp: "",
        functionName: "",
        generateTransaction: "",
        groupClause: "",
        groupPart: "",
        groupingTypes: "",
        invoiceDescription: "",
        minLineValue: "",
        parentRuleBackupNumber: "",
        parentRuleKey: "",
        ruleId: "",
        ruleType: "",
        schedulingTypes: "",
        selectClause: "",
        selectionDays: "",
        selectionMonths: "",
        selectionQuarters: "",
        selectionTypes: "",
        selectionWeeks: "",
        selectionYears: "",
        siteId: "",
        startDstamp: "",
        status: "",
        stopProcessing: "",
        tariffId: "",
        termBackupNumber: "",
        termId: "",
        transactionType: "",
        useTariff: "",
        used: "",
        wholeDayRound: ""
      }
    ],
    sortColumn: { path: "ruleKey", order: "asc" }
  };

  columns = [
    {
      label: "RuleKey",
      path: "ruleKey"
    },
    {
      label: "RuleID",
      path: "ruleId"
    },
    {
      label: "RuleType",
      path: "ruleType"
    },
    {
      label: "SiteID",
      path: "siteId"
    },
    {
      label: "ClientID",
      path: "clientId"
    },

    {
      label: "AssignClause",
      path: "assignClause"
    },
    {
      label: "StartDStamp",
      path: "startDstamp"
    },
    {
      label: "EndDStamp",
      path: "endDstamp"
    },

    {
      label: "BlanketContractID",
      path: "blanketContractId"
    },

    {
      label: "ContractID",
      path: "contractId"
    },
    {
      label: "CreatedBy",
      path: "createdBy"
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
      label: "Description",
      path: "description"
    },

    {
      label: "GenerateTransaction",
      path: "generateTransaction"
    },
    {
      label: "GroupClause",
      path: "groupClause"
    },
    {
      label: "GroupPart",
      path: "groupPart"
    },
    {
      label: "GroupingTypes",
      path: "groupingTypes"
    },
    {
      label: "InvoiceDescription",
      path: "invoiceDescription"
    },
    {
      label: "MinimumLineValue",
      path: "minLineValue"
    },
    {
      label: "ParentRuleBackNumber",
      path: "parentRuleBackupNumber"
    },
    {
      label: "ParentRuleKey",
      path: "parentRuleKey"
    },

    {
      label: "SchedulingTypes",
      path: "schedulingTypes"
    },
    {
      label: "SelectClause",
      path: "selectClause"
    },
    {
      label: "Status",
      path: "status"
    },
    {
      label: "StopProcessing",
      path: "stopProcessing"
    },

    {
      label: "TrasactionType",
      path: "transactionType"
    },
    {
      label: "UseTariff",
      path: "useTariff"
    },
    {
      key: "Details",
      content: currentRow => (
        <button
          onClick={() => this.onDetails(currentRow)}
          className="btn btn-light btn-sm"
        >
          Details
        </button>
        /*<li key={currentRow.ruleKey}>
          <Link to={`/invoiceDetails/${currentRow.ruleKey}`}>Details</Link>
        </li>*/
      )
    }
  ];

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_SERVER + "rules/", {
        responseType: "json"
      })
      .then(response => {
        this.setState({ ruledata: response.data });
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
    console.log("rule is applied to all the transactions");
  };
  render() {
    const { ruledata, sortColumn } = this.state;

    return (
      <div>
        <h1 align="center">Rules</h1>
        <Table columns={this.columns} data={ruledata} sortColumn={sortColumn} />
        <button onClick={this.printDocument}>PRINT</button>

        <p>Click above button opens print preview with these words on page</p>
      </div>
    );
  }
}

export default Rules;
