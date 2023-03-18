import React, { Component } from "react";
import "../assets/styles/dashboard.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

// import data from "../static/data.js";
import axios from "../config/api/axios";

class CurvedChat extends Component {
  constructor(props) {
    let id = sessionStorage.getItem("facility_id");
    let token = sessionStorage.getItem("userToken");
    super(props);
    this.state = {
      data: [],
      shop_id: id,
      accessToken: token,
    };
  }

  componentDidMount() {
    axios
      .post(
        "/pharmacy/sales/monthly-sales",
        { shop_id: this.state.shop_id },
        { headers: { "auth-token": this.state.accessToken } }
      )
      .then((res) => this.setState({ data: res.data.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const data = [
      {
        month: "Jan",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Feb",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Mar",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Apr",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "May",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Jun",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Jul",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Aug",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Sep",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Oct",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Nov",
        lastYear: 0,
        thisYear: 0,
      },
      {
        month: "Dec",
        lastYear: 0,
        thisYear: 0,
      },
    ];

    this.state.data.forEach(({ name, sale }) => {
      data.forEach((item) => {
        if (item.month === name) {
          item.thisYear = sale;
        }
      });
    });

    return (
      <div
        className="mt-3 card chat border-0"
        style={{ borderRadius: "10px", height: "20rem" }}
      >
        <ResponsiveContainer>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7D5B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FB7D5B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCC43E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FCC43E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <CartesianGrid stroke="#c1bbeb" horizontal={false} />
            <Tooltip />

            {/* <ReferenceLine
              x="Sep"
              stroke="#000"
              strokeDasharray="3 3"
              height={0}
            /> */}

            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="#FB7D5B"
              strokeWidth={3}
              fillOpacity={10}
              fill="url(#colorUv)"
              name="This Year"
              animationBegin={1500}
              animationDuration={1000}
              animationEasing="ease-in"
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="#FCC42E"
              strokeWidth={3}
              fillOpacity={10}
              fill="url(#colorPv)"
              name="Last Year"
              animationBegin={1000}
              animationDuration={2000}
              animationEasing="ease-in"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CurvedChat;
