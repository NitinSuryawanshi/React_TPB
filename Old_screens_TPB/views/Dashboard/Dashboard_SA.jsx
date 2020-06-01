import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
//import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  // dataPie,
  //legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  // legendSales,
  //dataBar,
  //optionsBar,
  //responsiveBar,
  //legendBar,
  legendTransactions
} from "variables/Variables.jsx";

class Dashboard_SA extends Component {
  state = {
    totalTransaction: 0
  };
  componentDidMount() {
    // this.interval = setInterval(() => {
    axios
      .get(
        process.env.REACT_APP_API_SERVER +
          "totalclientbasetrans?client=" +
          "ACLIENT",
        {
          responseType: "json"
        }
      )
      .then(response => {
        this.setState({ totalTransaction: response.data });
        console.log("inside job dashboard");
        //console.log(response.data[0].abInvoiceLines[0].ruleKey);
        console.log(this.state.totalTransaction);
        // console.log(this.state.transdata[0].abInvoiceLines.length);
      });
    // }, 1000);
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
    // let procesessdPer = 40;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={10}>
              <StatsCard
                bigIcon={<i className="pe-7s-notebook text-warning" />}
                statsText="Transactions"
                statsValue={this.state.totalTransaction + "0000"}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
                statsDetailsPage="basetransaction"
              />
            </Col>
            <Col lg={4} sm={10}>
              <StatsCard
                bigIcon={<i className="pe-7s-notebook text-success" />}
                statsText="Processed"
                statsValue="500,000"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={4} sm={10}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Total Invoice"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            {/*<Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
    </Col>*/}
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Transactions in Progress"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendTransactions)}
                  </div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Transaction Types"
                category="Performance"
                content={
                  <div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-info progress-bar-striped active"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "50%" }}
                      >
                        50% Complete
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-danger progress-bar-striped active"
                        role="progressbar"
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "70%" }}
                      >
                        70% Complete
                      </div>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-warning progress-bar-striped active"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "60%" }}
                      >
                        60% Complete
                      </div>
                    </div>
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendTransactions)}
                  </div>
                }
              />
            </Col>
          </Row>

          {/* <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2019 Performance"
                category="All Transactions Included"
                stats="Data information"
                statsIcon="fa fa-check"
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
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
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
          </Row> */}
        </Grid>
      </div>
    );
  }
}

export default Dashboard_SA;
