import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";

const ReportsForecast = () => {
    return (
        // <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Forecast No</Text>
                    <Text style={styles.text_answer}>2345sdfgsdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Project Name </Text>
                    <Text style={styles.text_answer}>ergergefg</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Customer part no</Text>
                    <Text style={styles.text_answer}>asdfvadfasdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>BEST Part no </Text>
                    <Text style={styles.text_answer}>asdfasdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Description </Text>
                    <Text style={styles.text_answer}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia debitis, porro iste assumenda inventore impedit
                        odio? Iure tempora laborum impedit, non libero animi,
                        eius fugiat, eum vero culpa enim eligendi.
                    </Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Product Group</Text>
                    <Text style={styles.text_answer}>asdfasdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Weight /Pc</Text>
                    <Text style={styles.text_answer}>asdffgsdfgsdfgasdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>
                        Standard Box Quantity
                    </Text>
                    <Text style={styles.text_answer}>456345</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Norms per Project</Text>
                    <Text style={styles.text_answer}>45635</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>
                        QTY requirment for this month
                    </Text>
                    <Text style={styles.text_answer}>3452345sdsfasdf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>
                        QTY requirment for this month+1
                    </Text>
                    <Text style={styles.text_answer}>afgsdfgadf</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>
                        QTY requirment for this month+2
                    </Text>
                    <Text style={styles.text_answer}>agfsdfgsghdfh</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>Safety stock </Text>
                    <Text style={styles.text_answer}>356345</Text>
                </View>
                <View style={styles.viewtable}>
                    <Text style={styles.text_question}>ROL</Text>
                    <Text style={styles.text_answer}>56345dfdfg</Text>
                </View>
            </View>
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
        justifyContent: "space-between",
        // height: 80,
    },
    viewtable: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        margin: 10,
        // width: "90%",
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
    },
    text_question: {
        fontSize: 15,
        fontWeight: "bold",
        width: "50%",
        padding: 10,
    },
    text_answer: {
        fontSize: 15,
        width: "50%",
        paddingTop: 10,
        paddingBottom: 10,
    },
});
