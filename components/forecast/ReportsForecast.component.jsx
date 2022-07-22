import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";


const ReportsForecast = ({ forecast,order, type }) => {
  const monthData = [
    {
      month: "January",
      value: 1,
    },
    {
      month: "February",
      value: 2,
    },
    {
      month: "March",
      value: 3,
    },
    {
      month: "April",
      value: 4,
    },
    {
      month: "May",
      value: 5,
    },

    {
      month: "June",
      value: 6,
    },
    {
      month: "July",
      value: 7,
    },

    {
      month: "August",
      value: 8,
    },
    {
      month: "September",
      value: 9,
    },

    {
      month: "October",

      value: 10,
    },
    {
      month: "November",
      value: 11,
    },

    {
      month: "December",

      value: 12,
    },
  ];
  const [projects, setProjects] = useState();

  const [show, setShow] = useState(false);
  const [parts, setParts] = useState();
  const [json, setJson] = useState();
  useEffect(async () => {
    if (projects) {
      setJson(JSON.parse(projects.BestPartNumber));
    } else {
      if (forecast && forecast[0]) {
        const time = forecast[0].TimeStamp.slice(0, 11);
        console.log('====================================');
        console.log(order,'TIMEs');
        console.log('====================================');
        const projectRef = db
          .collection("projects")
          .where("Projectname", "==", forecast[0].Projectname);
        const project = await projectRef.get();
        setProjects(project.docs[0].data());
        
      }
    }
  }, [forecast, projects]);
  const handleShow = async (name) => {
    // setShow(false)
    const inventoryRef = db
      .collection("inventory")
      .where("BestPartNumber", "==", name);
    const data = await inventoryRef.get();
    
    setParts(data.docs.map((doc) => ({ ...doc.data() })));

    setShow(true);
  };
  return (
    // <TouchableOpacity>
    <>
      
        {forecast && forecast[0] && projects && json && order && (
          <><View style={styles.maincard}> 
            <View style={styles.miniCard}>
              <Text style={[styles.miniCardText, styles.textquestion]}>
                Forecast No
              </Text>
              <Text style={styles.miniCardText}>{forecast[0].Forecastid}/
              {'\n'}{forecast[0].TimeStamp.toString().slice(0,10)}</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={[styles.miniCardText, styles.textquestion]}>
                Project Name
              </Text>
              <Text style={styles.miniCardText}>{forecast[0].Projectname}</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={[styles.miniCardText, styles.textquestion]}>
                Customer part no
              </Text>
              <Text style={styles.miniCardText}>
                {projects.CustomerPartNumber}
              </Text>
            </View>
            <View style={[styles.miniCard,{flexDirection:'column'}]}>
              <Text style={[styles.miniCardText, styles.textquestion]}>
                BEST Part no
              </Text>
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
                              fontSize:12
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
                    <Text style={styles.miniCardText}>
                      {parts[0].Productgrp}
                    </Text>
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

            <View style={styles.miniCard}>
              <Text style={[styles.miniCardText, styles.textquestion]}>
                Norms per project
              </Text>
              <Text style={styles.miniCardText}>
                {projects.norms_per_project}
              </Text>
            </View>
            {forecast[0].Qtm.map((element, index) => (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  {`QTY requirment for month ${monthData[forecast[0].StartingMonth-1 + index].month}`}
                </Text>
                <Text style={styles.miniCardText}>
                  {forecast[0].Qtm[index]}
                </Text>
              </View>
            ))}

            {!type == "performance" ? (
              <>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Safety stock
                  </Text>
                  <Text style={styles.miniCardText}>
                    {projects.Safetystock}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Re Order Level
                  </Text>
                  <Text style={styles.miniCardText}>
                    {projects.re_order_level}
                  </Text>
                </View>
              </>
            ) : null}
            {type == "performance" ? (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Actual Production for this month
                </Text>
                <Text style={styles.miniCardText}>
                  {forecast[0].actual_production}
                </Text>
              </View>
            ) : null}
            {type == "performance" ? (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Forecast variation
                </Text>
                <Text style={styles.miniCardText}>
                  {1 -
                    (forecast[0].Qtm[0] - forecast[0].actual_production) /
                      forecast[0].Qtm[0]}
                </Text>
              </View>
            ) : null}
            {type == "performance" ? (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Demand Triggered date/time
                </Text>
                <Text style={styles.miniCardText}>
                  {/* {forecast[0].actual_production} */}-
                </Text>
              </View>
            ) : null}
            {type == "performance" ? (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Refilling date/time
                </Text>
                <Text style={styles.miniCardText}>
                  {/* {forecast[0].actual_production} */}-
                </Text>
              </View>
            ) : null}
            {type == "performance" ? (
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  service level accepted days
                </Text>
                <Text style={styles.miniCardText}>
                  {order[0].AcceptedDays}
                </Text>
              </View>
            ) : null}</View>
          </>
        )}
      
    </>
    // </TouchableOpacity>
  );
};

export default ReportsForecast;

const styles = StyleSheet.create({
  maincard: {
    width: "94%",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#ffffff93",
    padding: 10,
    borderRadius: 10,
    // borderColor: "black",
    // borderWidth: 1,
    marginTop:30,
    marginBottom: 20,
    marginRight:'auto',
    marginLeft:'auto'
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  miniCard: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: "#609BEB",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    paddingVertical: 12,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  miniCardText: {
    marginVertical: 5,
    marginLeft: 10,
  //  paddingRight: 1,
    width: "65%",
    fontSize: 14,
  },
  text: {
    // color: "#fff",
    fontSize: 16,

    // fontWeight: "bold",
  },
  textquestion: {
    // color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    color: "#609BEB",
    width: "35%",
  },
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
