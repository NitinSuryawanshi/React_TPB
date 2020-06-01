import Dashboard from "views/Dashboard/Dashboard";
//import Icons from "views/Icons/Icons";
//import Maps from "views/Maps/Maps";
//import Notifications from "views/Notifications/Notifications";
import Invoice from "./../views/TPBScreens/invoice";
import Rules from "./../views/TPBScreens/rules";
import BaseTransaction from "./../views/TPBScreens/baseTransactions";
import Dashboard_SA from "./../views/Dashboard/Dashboard_SA";
import InvoiceDetails from "./../views/TPBScreens/invoiceDetails";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard - Revenue Assurance",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/systemadmin",
    name: "Admin",
    icon: "pe-7s-user",
    component: Dashboard_SA
  },
  {
    path: "/invoice",
    name: "Invoice",
    icon: "pe-7s-cash",
    image: "assets/img/jda_rgb.png",
    component: Invoice
  },
  {
    path: "/invoiceDetails/:id",
    name: "InvoiceDetails",
    icon: "pe-7s-user",
    component: InvoiceDetails
  },
  {
    path: "/rules",
    name: "Rules",
    icon: "pe-7s-note2",
    component: Rules
  },
  {
    path: "/basetransaction",
    name: "BaseTransaction",
    icon: "pe-7s-news-paper",
    component: BaseTransaction
  },
  /* { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },*/

  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
