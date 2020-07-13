import React, { memo } from "react";
import { Card, ListItem, Icon, Header, Button } from "react-native-elements";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Table, TableWrapper, Row } from "react-native-table-component";
const moment = require("moment");

const datainventory = [
  {
    name: "iphone",
    purchase_date: "01 feb 2020",
  },
  {
    name: "samsung",
    purchase_date: "01 feb 2020",
  },
  {
    name: "iphone 10",
    purchase_date: "01 feb 2020",
  },
];

const datainventoryMessage = [
  {
    message: "You are runing low on 8 products",
    alert: 2,
  },
  {
    message: "You are runing low on 1 product",
    alert: 2,
  },
  {
    message: "You have added 2 more products",
    alert: 1,
  },
];

const datasales = [
  {
    Total: 300,
    Tax: 45,
    date: "9-10-2020",
    dep: "acards Mall",
  },
  {
    Total: 300,
    Tax: 30,
    date: "9-10-2020",
    dep: "acards Mall",
  },
  {
    Total: 300,
    Tax: 50,
    date: "9-10-2020",
    dep: "acards Mall",
  },
];

const Dashboard = (props) => {

  const [reports, setReports] = React.useState({ data: [] });
  const [selectedValue, setSelectedValue] = React.useState({
    tableHead: ["Department", "Date", "Total Sales"],
  });
  var [Total, setTotal] = React.useState(0);

  var [TrxTotal, setTrxTotal] = React.useState(0);
  const [tableData, setTableData] = React.useState({ data: [] });
  const [TrxtableData, setTrxTableData] = React.useState({ data: [] });
  const { navigation, SocketConfig } = props;

  React.useEffect(() => {
    SocketConfig.socket.emit("GETSALESREPORT", {
      date: moment().format("MM/DD/YYYY"), 
      dateType: "Datetrack",
    });

    SocketConfig.socket.on("SALESREPORTSALET", (callback) => {
      setReports({ ...reports, data: callback });

      tableData.data = [];
      TrxtableData.data = [];
      Total = 0;
      TrxTotal = 0;

      callback.map((data) => {
        tableData.data.push([data.Department, data.Date, data.RtxGrandTotal]);
        setTableData({ ...tableData, data: tableData.data });
        Total = data.RtxGrandTotal + Total;

        TrxtableData.data.push([data.Department, data.Date, data.GrandTotal]);
        setTrxTableData({ ...TrxtableData, data: TrxtableData.data });
        TrxTotal = data.GrandTotal + TrxTotal;
      });
      setTotal(Total);
      setTrxTotal(TrxTotal);
    });
    
    SocketConfig.socket.on("SALESREPORTLIST", (callback) => {
      // console.log(callback.data);
      setReports({ ...reports, data: callback.data });

      tableData.data = [];
      Total = 0;

      callback.data.map((data) => {
        tableData.data.push([data.Department, data.Date, data.RtxGrandTotal]);
        setTableData({ ...tableData, data: tableData.data });
        Total = data.RtxGrandTotal + Total;

        TrxtableData.data.push([data.Department, data.Date, data.GrandTotal]);
        setTrxTableData({ ...TrxtableData, data: TrxtableData.data });
        TrxTotal = data.GrandTotal + TrxTotal;
      });
      setTotal(Total);
      setTrxTotal(TrxTotal);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: verticalScale(40),
          padding: moderateScale(5),
          backgroundColor: "#2DB341",
        }}
      >
        <Text style={{color:'#fff'}} >Switch Smart</Text>
      </View>
      <ScrollView style={{ paddingBottom: 20 }}>
        <Card title="SALSE REPORTS" style={{ width: "100%" }}>
          <View style={{}}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                <Row
                  data={selectedValue.tableHead}
                  widthArr={selectedValue.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  {tableData.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={selectedValue.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "transparent",
                    borderBottomColor: "#3b3b3b",
                    borderStyle: "solid",
                    borderWidth: 1,
                    padding: 6,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Total </Text>
                  <Text style={{ fontWeight: "bold" }}>K{Total}</Text>
                </View>
              </ScrollView>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                onPress={() => navigation.navigate("SalesReports")}
                title="Open"
                type="outline"
              />
            </View>
          </View>
        </Card>
        {/* <Card title="INVENTORY REPORTS">
            
        </Card> */}
        <Card title="RB REPORTS">
          <View style={{}}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                <Row
                  data={selectedValue.tableHead}
                  widthArr={selectedValue.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  {TrxtableData.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={selectedValue.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "transparent",
                    borderBottomColor: "#3b3b3b",
                    borderStyle: "solid",
                    borderWidth: 1,
                    padding: 6,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Total </Text>
                  <Text style={{ fontWeight: "bold" }}>K{TrxTotal}</Text>
                </View>
              </ScrollView>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                title="Open"
                type="outline"
                onPress={() => navigation.navigate("TrxSalesReports")}
              />
            </View>
          </View>
        </Card>
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 40, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "500" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});

function mapStateToProps(state) {
  return {
    SocketConfig: state.SocketConfig,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
