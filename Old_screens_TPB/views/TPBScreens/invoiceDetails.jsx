import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import Table from "./../../components/common/table";
import axios from "axios";
import ReactToPrint from "react-to-print";
class InvoiceDetails extends Component {
  state = {
    transdata: [
      {
        id: {
          invoice: "INV0.014357357257736236",
          clientId: "NIKE",
          invoiceType: "I",
          lineId: 1
        },
        archived: null,
        createdDstamp: "2019-03-29T15:34:29.707",
        description: null,
        invoiceDescription: null,
        notes: null,
        originalTotalPrice: 36710,
        pricePer: "1.0",
        ruleBackupNumber: 0,
        ruleKey: 291,
        ruleType: "INVOCIE",
        totalPrice: 3456,
        transactionType: "S",
        valuePriced: 1
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
      path: "id.clientId"
    },
    {
      label: "Invoice Type",
      path: "id.invoiceType"
    },
    {
      label: "Price Per",
      path: "pricePer"
    },
    {
      label: "Total Price",
      path: "totalPrice"
    }
  ];
  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_API_SERVER +
          "invoice?client=NIKE&invoice=INV0.014357357257736236&type=I",
        {
          responseType: "json"
        }
      )
      .then(response => {
        //this.setState({ transdata: response.data });
        this.state.transdata.push(response.data);
        console.log("inside job invoicedetails", this.state.transdata);
        console.log(this.state.transdata);
        // console.log(this.state.transdata[0].abInvoiceLines.length);
      });
  }
  handleSave = () => {
    // Navigate to /products
    this.props.history.replace("/invoice");
  };

  render() {
    const { transdata, sortColumn } = this.state;
    //const componentRef = useRef();
    return (
      <div>
        <b>Invoice Details{this.props.match.params.id}</b>
        {/* <h1>{this.state.transdata[0]}</h1> */}
        <div>
          {/* <p align="center">
          <b>Invoice</b>
        </p> */}
          <ReactToPrint
            trigger={() => <a href="/pablo">Print this out!</a>}
            content={() => this.componentRef}
          />
          <ComponentToPrint
            ref={el => (this.componentRef = el)}
            trandata={transdata}
            sortcolumn={sortColumn}
            column={this.columns}
          />
          {/* <Table
            columns={this.columns}
            data={transdata}
            sortColumn={sortColumn}
          /> */}
          {/*} <button onClick={this.printDocument}>PRINT</button>*/}
        </div>
        <ButtonToolbar>
          <Button variant="primary" size="lg" onClick={this.handleSave}>
            Close
          </Button>
          <Button variant="secondary" size="lg" onClick={() => window.print()}>
            Print
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}
class ComponentToPrint extends React.Component {
  render() {
    return (
      <Table
        columns={this.props.column}
        data={this.props.trandata}
        sortColumn={this.props.sortcolumn}
      />
    );
  }
}
export default InvoiceDetails;
