import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Button
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import SearchBar from "react-native-dynamic-search-bar";
// import { SearchBar } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { forecastGet } from "../../axios/axios";
import { db } from "../../firebase/firebase";
import { LinearGradient } from "expo-linear-gradient";
const image = { uri: "https://wallpaperaccess.com/full/3966936.jpg" };

const forecastList = ({ route }) => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const forecastRef = db
    .collection("Forecast")
    .where("customerid", "==", route.params.forecastid);
  const [searchProject, setSearchProject] = useState([]);
  useEffect(async () => {
    const forecast = await forecastRef.get();
    setProjects(forecast.docs.map((doc) => doc.data()));
    console.log(
      forecast.docs.map((doc) => doc.data()),
      "ll",
      route.params.forecastid
    );
    // await forecastGet(route.params.customer_id).then((res) => {
    // 	setProjects(res);
    // 	console.log(res);
    // });
  }, [searchProject]);
  const handleSearch = (text) => {
    setSearch(text);
	console.log(projects.filter((project) => project.Projectname.includes(text)),'found');
    projects &&
      setSearchProject(
        projects.filter((project) => project.Projectname.includes(text))
      );
  };
  return (
    <>
      <LinearGradient
        style={styles.image}
        start={[0, 1]}
        end={[1, 0]}
        colors={["#FF8489", "#D5ADC8"]}
      >
        <View style={styles.search}>
        <Button
        onPress={() => {
          /* HERE WE GONE SHOW OUR FIRST MESSAGE */
          showMessage({
            message: "Simple message",
            type: "info",
          });
        }}
        title="Request Details"
        color="#841584"
      />
          <SearchBar
            placeholder="Search here"
            onClearPress={() => setSearch("")}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
        <ScrollView style={styles.container}>
          {search.length > 0 ?
            searchProject.map((project) =>
				(
              <TouchableOpacity
                style={styles.maincard}
                onPress={() =>
                  navigation.push("Reports_Forecast", {
                    forecastid: project.Forecastid,
                    type: route.params.type,
                  })
                }
              >
                <Text style={[styles.textquestion, { color: "#1b5cb7" }]}>
                  Project name:
                </Text>
                <Text style={styles.textquestion}>{project.Projectname}</Text>
              </TouchableOpacity>
            )):null}
			{
				search.length === 0 ? 
					(projects.map((project) => 
				(
				
				  <TouchableOpacity
					style={styles.maincard}
					onPress={() =>
					  navigation.push("Reports_Forecast", {
						forecastid: project.Forecastid,
						type: route.params.type,
					  })
					}
				  >
					
					<Text style={styles.textquestion}>{project.Projectname}</Text>
				  </TouchableOpacity>
				
			  ))
				)
			:null}
          
        </ScrollView>
      </LinearGradient>
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textquestion: {
    // color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    marginVertical: 5,
    // fontWeight: "bold",
  },
  maincard: {
    width: "90%",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    // borderWidth: 1.5,
    // borderColor: '#ffaa00',

    // borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight ,
    zIndex: 1,
    paddingTop: 50,
    // paddingVertical: 20,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",

    height: 100,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  search: {
    width: "100%",

    alignSelf: "center",
    borderRadius: 50,
    position: "absolute",
    top: 10,
    // backgroundColor: 'black',
    zIndex: 5,
  },
});
export default forecastList;
