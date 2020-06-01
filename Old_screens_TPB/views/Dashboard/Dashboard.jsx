import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import Table from "./../../components/common/table";

import { Card } from "components/Card/Card.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  legendPie,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendPie_Site,
  dataPie_Site
} from "variables/Variables.jsx";

class Dashboard extends Component {
  state = {
    totalTransaction: 0,
    invoicestatusData: [
      {
        client: "",
        invoicestatus: "",
        invoiceamount: 0
      }
    ],
    dataPie: "",
    transdata: [],
    invoicebycode: [
      {
        code: "",
        total: 0,
        client: ""
      }
    ],
    dataException: [
      {
        clientId: "Skechers",
        IQC: "876",
        INVENTORY: "576",
        priceTransaction: "46"
      },
      {
        clientId: "Nike",
        IQC: "456",
        INVENTORY: "49",
        STORAGE: "5"
      },
      {
        clientId: "Adidas",
        IQC: "686",
        INVENTORY: "76",
        STORAGE: "56"
      },
      {
        clientId: "Under Armour",
        IQC: "5765",
        INVENTORY: "678",
        STORAGE: "76"
      }
    ],
    sortColumn: { path: "clientId", order: "asc" }
  };
  columns = [
    {
      label: "Client",
      path: "clientId"
    },
    {
      label: "Approved($)",
      path: "approvedInvoice"
    },
    {
      label: "Pending ($)",
      path: "pendingInvoice"
    },
    {
      label: "Rejected ($)",
      path: "rejectedInvoice"
    }
  ];
  columnsExceptions = [
    {
      label: "Client",
      path: "clientId"
    },
    {
      label: "IQC",
      path: "IQC"
    },
    {
      label: "INVENTORY",
      path: "INVENTORY"
    },
    {
      label: "STORAGE",
      path: "STORAGE"
    }
  ];

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_SERVER + "invstsamt", {
        responseType: "json"
      })
      .then(response => {
        this.setState({ invoicestatusData: response.data });
        console.log("inside job dashboard invstsamt");
        console.log(this.state.invoicestatusData);
        var approvedInvoice;
        var pendingInvoice;
        var rejectedInvoice;
        var clientArray = ["NIKE", "ADIDAS", "SKECHERS"];

        for (let i = 0; i < clientArray.length; i++) {
          var invoiceData = this.state.invoicestatusData.filter(
            pilot => pilot.client === clientArray[i]
          );

          //this.state.transdata.push({})
          invoiceData.map(e => {
            if (e.invoicestatus === "Pending") pendingInvoice = e.invoiceamount;
            if (e.invoicestatus === "Approved")
              approvedInvoice = e.invoiceamount;
            if (e.invoicestatus === "Rejected")
              rejectedInvoice = e.invoiceamount;
          });
          var finalRow = {
            clientId: clientArray[i],
            approvedInvoice: approvedInvoice,
            pendingInvoice: pendingInvoice,
            rejectedInvoice: rejectedInvoice
          };
          this.state.transdata.push(finalRow);
        }
      });

    axios
      .get(process.env.REACT_APP_API_SERVER + "totalsbycode", {
        responseType: "json"
      })
      .then(response => {
        this.setState({ invoicebycode: response.data });
        console.log("current time API call", Date());
        console.log("inside job invoicebycode");
        console.log(this.state.invoicebycode);
        //-----------------------
        var activityByCodeStorage = this.state.invoicebycode
          .filter(e => e.code === "Storage")
          .map(e => e.total)
          .reduce((acc, score) => acc + score, 0);

        var activityByCodeIQC = this.state.invoicebycode
          .filter(e => e.code === "IQC")
          .map(jedi => jedi.total)
          .reduce((acc, score) => acc + score, 0);
        var activityByCodeOrder = this.state.invoicebycode
          .filter(e => e.code === "ORDER")
          .map(jedi => jedi.total)
          .reduce((acc, score) => acc + score, 0);

        var activityByCodeInventory = this.state.invoicebycode
          .filter(e => e.code === "INVENTORY")
          .map(jedi => jedi.total)
          .reduce((acc, score) => acc + score, 0);

        var activityByCodeReceipt = this.state.invoicebycode
          .filter(e => e.code === "RECEIPT")
          .map(jedi => jedi.total)
          .reduce((acc, score) => acc + score, 0);

        console.log("current time code values", Date());

        console.log("activityByCodeStorage", activityByCodeStorage);
        console.log("activityByCodeIQC", activityByCodeIQC);
        console.log("activityByCodeOrder", activityByCodeOrder);
        console.log("activityByCodeInventory", activityByCodeInventory);
        console.log("activityByCodeReceipt", activityByCodeReceipt);

        var totalActivity =
          activityByCodeStorage +
          activityByCodeIQC +
          activityByCodeOrder +
          activityByCodeInventory +
          activityByCodeReceipt;

        var Label = {
          labels: [
            ((activityByCodeIQC / totalActivity) * 100).toFixed() + "%",
            ((activityByCodeOrder / totalActivity) * 100).toFixed() + "%",
            ((activityByCodeInventory / totalActivity) * 100).toFixed() + "%",

            ((activityByCodeReceipt / totalActivity) * 100).toFixed() + "%",

            ((activityByCodeStorage / totalActivity) * 100).toFixed() + "%"
          ],
          series: [
            ((activityByCodeIQC / totalActivity) * 100).toFixed(),
            ((activityByCodeOrder / totalActivity) * 100).toFixed(),

            {
              className: "ct-series-c",
              data: ((activityByCodeInventory / totalActivity) * 100).toFixed(),
              fontweight: "bold",
              fontSize: 16
            },
            {
              className: "ct-series-f",
              data: ((activityByCodeReceipt / totalActivity) * 100).toFixed(),
              weight: "bold",
              fontSize: 14
            },

            {
              className: "ct-series-e",
              data: ((activityByCodeStorage / totalActivity) * 100).toFixed(),
              weight: "bold"
            }
          ]
        };
        console.log(
          "Activity by Code 67fsadfLogic 7987978activityByCode",
          activityByCodeStorage
        );
        this.setState({ dataPie: Label });

        console.log(
          "Activity by Code 67fsadfLogic activityByCode",
          totalActivity
        );
      });

    // }, 1000);
    //var jediPersonnel = this.state.transdata.filter(rowid =>{

    // Activity by Code Logic
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <div>
          <b>Revenue Assurance</b>
        </div>
        <Grid fluid>
          <Row>
            <Col lg={6} sm={12}>
              <Card
                statsIcon="fa fa-history"
                id="invoiceChart"
                title="April-2019 Invoice Status"
                category="Client Group"
                stats=""
                content={
                  <div className="ct-chart">
                    <Table
                      columns={this.columns}
                      data={this.state.transdata}
                      sortColumn={this.state.sortColumn}
                    />
                  </div>
                }
                legend=""
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="exceptionChart"
                title="Un-Billed Transactions(Activity)"
                category="Client Group"
                stats=""
                content={
                  <div className="ct-chart">
                    <Table
                      columns={this.columnsExceptions}
                      data={this.state.dataException}
                      sortColumn={this.state.sortColumn}
                    />
                  </div>
                }
                legend=""
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Activity"
                category="Client group"
                content={
                  <div>
                    <div id="chartPreferences" className="ct-chart">
                      <ChartistGraph
                        data={this.state.dataPie}
                        title="Activity"
                        type="Pie"
                      />
                    </div>
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
            <Col md={3}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Site"
                category="Invoice"
                content={
                  <div>
                    <div id="chartPreferences" className="ct-chart">
                      <ChartistGraph
                        data={dataPie_Site}
                        title="Activity"
                        type="Pie"
                      />
                    </div>
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendPie_Site)}
                  </div>
                }
              />
            </Col>
            <Col lg={5} sm={10}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Last six months "
                category="Client Group Invoice($)"
                stats="Y -axis is Invoice value in k$"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                title="Insight"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
