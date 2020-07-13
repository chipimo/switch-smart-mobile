import React, { memo } from "react";
import { Card, Icon, Header, Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";

const WorkPeriodReports = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = React.useState({
    tableHead: [
      "Head",
      "Head2",
      "Head3",
      "Head4",
      "Head5",
      "Head6",
      "Head7",
      "Head8",
      "Head9",
    ],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
  });

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        centerComponent={{
          text: "WORK PERIOD REPORTS",
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
      <DropDownPicker
        items={[
          { label: "Item 1", value: "item1" },
          { label: "Item 2", value: "item2" },
        ]}
        defaultIndex={0}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => console.log(item.label, item.value)}
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
            {tableData.map((rowData, index) => (
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
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});

export default memo(WorkPeriodReports);
