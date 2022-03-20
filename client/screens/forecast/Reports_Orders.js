import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import React from "react";
import ReportsOrders from "../../components/forecast/ReportsOrders.component";

const Reports_Forecast = () => {
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#00BCD4"
                translucent={true}
            />
            <View style={styles.container}>
                <Text style={styles.text}>Reports vise orders </Text>
            </View>
            <ScrollView>
                <ReportsOrders />
            </ScrollView>
        </>
    );
};

export default Reports_Forecast;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 50,
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        marginLeft: "25%",
    },
});
