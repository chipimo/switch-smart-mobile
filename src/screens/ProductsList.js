import React from "react";
import { Icon, Header, Button } from "react-native-elements";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
var NumberFormat = require("react-number-format");

const moment = require("moment");

const TicketsReports = (props) => {
  const { navigation, SocketConfig } = props;
  const [selectedValue, setSelectedValue] = React.useState({
    tableHead: ["Cash Sale No", "Customer", "Items", "Total Sales"],
  });

  const [tableData, setTableData] = React.useState({ data: [] });
  const [tableItemsData, setTableItemsData] = React.useState({ data: [] });

  React.useEffect(() => {
    console.log(props.DateTrack);

    if (props.DateTrack)
      setTableData({ ...tableData, data: props.DateTrack.list });
  }, [props]);

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

      <ScrollView style={{ padding: 5 }}>
        {tableData.data.map((itmes, index) => (
          <View key={index}>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Ticket No {itmes.InvoiceNumber}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {itmes.time}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Casher: {itmes.User}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Day: {itmes.Day}
                </Text>
              </View>
              <Text style={{ fontSize: 16 }}>{itmes.Department}</Text>
            </View>

            <ScrollView style={styles.dataWrapper}>
              <View
                style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}
              >
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                  <Text style={{ fontWeight: "bold" }}>Product</Text>
                </View>
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                  <Text style={{ fontWeight: "bold" }}>Price</Text>
                </View>
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                  <Text style={{ fontWeight: "bold" }}>Quantity</Text>
                </View>
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                  <Text style={{ fontWeight: "bold" }}>inStore</Text>
                </View>
              </View>

              {itmes.TicketList.list.map((rowData, index) => (
                <View
                  style={{
                    flex: 1,
                    alignSelf: "stretch",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <Text>{rowData.ItemName}</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <NumberFormat
                      value={rowData.sallingprice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"K"}
                      renderText={(value) => <Text>{value}</Text>}
                    />
                  </View>
                  <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <Text>{rowData.qnt}</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <Text>{rowData.amountInstore}</Text>
                  </View>
                </View>
              ))}

              <View
                style={{
                  borderColor: "transparent",
                  borderBottomColor: "#3b3b3b",
                  borderStyle: "solid",
                  borderWidth: 1,
                  paddingTop: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Total </Text>
                  <NumberFormat
                    value={itmes.GrandTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"K"}
                    renderText={(value) => (
                      <Text style={{ fontWeight: "bold" }}>{value}.00</Text>
                    )}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tax </Text>
                  <NumberFormat
                    value={itmes.totalTax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"K"}
                    renderText={(value) => (
                      <Text style={{ fontWeight: "bold" }}>{value}</Text>
                    )}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 40, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "500" },
  dataWrapper: { marginTop: 15 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});
function mapStateToProps(state) {
  return {
    SocketConfig: state.SocketConfig,
    DateTrack: state.DateTrack,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsReports);
