import React, { memo } from "react";
import { Icon, Header, Button } from "react-native-elements";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
const moment = require("moment");

const SalesReports = (props) => {
  const { navigation, SocketConfig } = props;
  const [selectedValue, setSelectedValue] = React.useState({
    tableHead: ["Department", "Date", "Total Sales", ""],
  });
  var [Total, setTotal] = React.useState(0);
  const [reports, setReports] = React.useState({ data: [] });
  const [date, setDate] = React.useState(moment().format("MM/DD/YYYY"));

  var [TrxTotal, setTrxTotal] = React.useState(0);
  const [TrxtableData, setTrxTableData] = React.useState({ data: [] });

  React.useEffect(() => {
    SocketConfig.socket.emit("GETSALESREPORT", {
      date: moment().format("MM/DD/YYYY"),
      dateType: "Datetrack",
    });

    SocketConfig.socket.on("SALESREPORTSALET", (callback) => {
      setReports({ ...reports, data: callback });

      TrxtableData.data = [];
      TrxTotal = 0;

      callback.map((data) => {
        TrxtableData.data.push([data.Department, data.Date, data.GrandTotal, <Button onPress={() => {

          SocketConfig.socket.emit("GETSALESTICKETS", data.Datetrack);

          setTimeout(() => {
            navigation.navigate("TicketsReports")
          }, 300);


        }} title="Open" />]);
        setTrxTableData({ ...TrxtableData, data: TrxtableData.data });
        TrxTotal = data.GrandTotal + TrxTotal;
      });

      setTrxTotal(TrxTotal);
    });
    SocketConfig.socket.on("SALESREPORTLIST", (callback) => {
      // console.log(callback.data);
      setReports({ ...reports, data: callback.data });

      TrxtableData.data = [];
      TrxTotal = 0;

      callback.map((data) => {
        TrxtableData.data.push([data.Department, data.Date, data.GrandTotal, <Button onPress={() => {

          SocketConfig.socket.emit("GETSALESTICKETS", data.Datetrack);

          setTimeout(() => {
            navigation.navigate("TicketsReports")
          }, 300);


        }} title="Open" />]);
        setTrxTableData({ ...TrxtableData, data: TrxtableData.data });
        TrxTotal = data.GrandTotal + TrxTotal;
      });
    });
  }, []);

  // for (let i = 0; i < 30; i += 1) {
  //   const rowData = [];
  //   for (let j = 0; j < 9; j += 1) {
  //     rowData.push(`${i}${j}`);
  //   }
  //   tableData.push(rowData);
  // }

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        centerComponent={{
          text: "SWITCH SMART SALES REPORTS",
          style: { color: "#fff" },
        }}
        leftComponent={
          <View>
            <Icon
              onPress={() => navigation.navigate("Dashboard")}
              name="ios-arrow-back"
              type="ionicon"
              color="#fff"
            />
          </View>
        }
      />
      <DatePicker
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="MM/DD/YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          setDate(date);
          SocketConfig.socket.emit("GETSALESREPORT", {
            date: date,
            dateType: "Datetrack",
          });
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesReports);
