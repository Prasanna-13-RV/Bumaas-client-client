import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
const ReportsForecast = ({ forecast }) => {
  console.log(forecast, "llhh");
  const [projects, setProjects] = useState();

  const [show, setShow] = useState(false);
  const [parts, setParts] = useState();
  const [json, setJson] = useState();
  useEffect(async () => {
    if (projects) {
      setJson(JSON.parse(projects.BestPartNumber));
    } else {
      if (forecast && forecast[0]) {
        const projectRef = db
          .collection("projects")
          .where("Projectname", "==", forecast[0].Projectname);
        const project = await projectRef.get();
        setProjects(project.docs[0].data());
        console.log(projects, "projects");
      }
    }
  }, [forecast, projects]);
  const handleShow = async (name) => {
    // setShow(false)
    const inventoryRef = db
      .collection("inventory")
      .where("BestPartNumber", "==", name);
    const data = await inventoryRef.get();
    console.log(data.docs, "ll");
    setParts(data.docs.map((doc) => ({ ...doc.data() })));

    setShow(true);
  };
  return (
    // <TouchableOpacity>
    <>
      {forecast && forecast[0] && projects && json && (
        <>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Forecast No</Text>
            <Text style={styles.text_answer}>{forecast[0].Forecastid}</Text>
          </View>

          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Project Name </Text>
            <Text style={styles.text_answer}>{forecast[0].Projectname}</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Customer part no</Text>
            <Text style={styles.text_answer}>
              {projects.CustomerPartNumber}
            </Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>BEST Part no </Text>
            {json.length > 0 &&
              json.map((element) => {
                // handleShow(element)
                console.log(json, "sjon");
              })}
            {json &&
              json.length > 0 &&
              json.map((element) => {
                // handleShow(element)
                console.log(json);
                return (
                  <>
                    <View>
                      <Text style={{ fontSize: 13 }}>{element}</Text>
                      <TouchableOpacity onPress={() => handleShow(element)}>
                        <Text
                          style={{
                            padding: 5,
                            paddingLeft: 15,
                            borderColor: "green",
                            borderRadius: 50,
                            borderWidth: 2,
                            color: "green",
                            marginVertical: 10,
                          }}
                        >
                          {`View Details of ${element}`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              })}
            {parts && (
              <View
                style={{
                  width: "100%",
                  borderColor: "green",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Best Part No
                  </Text>
                  <Text style={styles.miniCardText}>
                    {parts[0].BestPartNumber}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Description
                  </Text>
                  <Text style={styles.miniCardText}>
                    {parts[0].Description}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Type
                  </Text>
                  <Text style={styles.miniCardText}>{parts[0].Type}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Product group
                  </Text>
                  <Text style={styles.miniCardText}>{parts[0].Productgrp}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Weight
                  </Text>
                  <Text style={styles.miniCardText}>
                    {parts[0].Weightperpieceingrams}
                  </Text>
                </View>
              </View>
            )}
            {/* <Text style={styles.text_answer}>{project.}</Text> */}
          </View>

          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Norms per project</Text>
            <Text style={styles.text_answer}>{projects.norms_per_project}</Text>
          </View>
          {forecast[0].Qtm.map((element,index) => (
            <View style={styles.viewtable}>
              <Text style={styles.text_question}>
                {`QTY requirment for this month ${index+1}`}
              </Text>
              <Text style={styles.text_answer}>{forecast[0].Qtm[index]}</Text>
            </View>
          ))}

          
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Safety stock</Text>
            <Text style={styles.text_answer}>
              {projects.Safetystock}
            </Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Re Order Level</Text>
            <Text style={styles.text_answer}>
              {projects.re_order_level}
            </Text>
          </View>
        </>
      )}
    </>
    // </TouchableOpacity>
  );
};

export default ReportsForecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 30,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 80,
    zIndex: 1,
  },
  viewtable: {
    justifyContent: "space-between",
    alignContent: "center",
    margin: 10,
    // width: "90%",
    borderColor: "#6c757d",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  text_question: {
    fontSize: 15,
    fontWeight: "bold",
    // width: "50%",
    padding: 5,
  },
  text_answer: {
    fontSize: 15,
    // width: "50%",
    padding: 5,
    // paddingBottom: 10,
  },
});
