import React, { memo } from "react";
import { Card, ListItem, Icon, Header, Button } from "react-native-elements";
import { ScrollView, Text, View } from "react-native";



const DepartmentReports = ()=>{

}

const Departments = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Header
      placement="left"
      centerComponent={{
        text: "Departments",
        style: { color: "#fff" },
      }}
      
    />

    <ScrollView style={{ paddingBottom: 20 }}>
    
      <Card title="DEPARTMENTS REPORTS">
        <View style={{}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Department</Text>
            <Text style={{ fontWeight: "bold" }}>User</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text 
            onPress={() => navigation.navigate("SalesReports")} 
            style={{}}>Arcades mall</Text>
            
            <Text style={{fontWeight:'600'}}>Melvin chipimo</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{}}>Arcades mall</Text>
            <Text style={{fontWeight:'600'}}>Melvin chipimo</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{}}>Arcades mall</Text>
            <Text style={{}}>Melvin chipimo</Text>
          </View>
        </View>
      </Card>

      
      <View style={{ height: 30 }}></View>
    </ScrollView>
  </View>
);

export default memo(Departments);
