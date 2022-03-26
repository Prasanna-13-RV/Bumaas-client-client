import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import React, { useState, useEffect } from "react";
import {useNavigation} from '@react-navigation/native';
import { projectGet } from "../../axios/axios";
const showProjects = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const [searchProject, setSearchProject] = useState([]);
  useEffect(async () => {
    await projectGet().then((res) => {
      setProjects(res);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
    });
  }, []);
  const handleSearch = (text) => {
    setSearch(text);
    projects && setSearchProject(projects.filter((project) => project.project_name.includes(text)));
  }
  return (
    <View 
    style={{
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }}
    >
    <View
      style = {styles.search}>
      <SearchBar
        placeholder="Type Here..."
        
        lightTheme
          // round
        onChangeText={(text) => handleSearch(text)}
        value={search}
      />
      </View>
    <ScrollView style={styles.container}>
      
      {
        search.length > 0 && searchProject.map((project) => (
          <TouchableOpacity
           onPress={() => navigation.push("Reports", { projectid: project.project_id })}
          
          >
          <View style={styles.container2}>
            <Text style={styles.title}>{project.project_name}</Text>
          </View></TouchableOpacity>
        ))
      }
      {search.length == 0 &&
        projects.map((project) => (
          <><TouchableOpacity
          onPress={() => navigation.push("Reports", { projectid: project.project_id })}
          >
            <View style={styles.container2}>
              <Text style={styles.title}>{project.project_name}</Text>
            </View></TouchableOpacity>
            
          </>
        ))}
    </ScrollView></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight+ 50,
    zIndex: 1,
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
   width: "95%",

    alignSelf: "center",
    borderRadius: 50,
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    backgroundColor: "black",
    zIndex: 5,
  }
});
export default showProjects;
