import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constant/styles";
// import MapView, { Marker } from 'react-native-maps';
// import GoogleMap from "../../components/googleMapScreen";
import { useFocusEffect } from "@react-navigation/native";
import { __postApiData } from "../../utils/api";
import { URL } from "../../utils/api/constant";

const TransportRoutesScreen = ({ navigation, route }) => {
  const { student_id } = route.params;
  const [data, setData] = useState({});
  const __handleGetData2 = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    __postApiData("/webservice/gettransportroutes", {
      student_id: student_id,
      year: currentYear,
      month: currentMonth,
    })
      .then((res) => {
        // console.log(res.route, "res");
        const list = res?.route?.map((item) => ({
          Pick_up_point: item.pickup_point_name,
          id: item.route_pickup_point_id,
          route: item.route_title,
          vehicle_number: item.vehicle_no,
          driver_name: item.driver_name,
          driver_contact: item.driver_contact,
          vehicle_photo: item.vehicle_photo,
        }));

        console.log(list, "list");
        // updateState({ notification: list });
        const route = res?.route;
        setData(route);
      })
      .catch((error) => {
        updateState({ isLoading: false });
        console.log(error);
      });
  };
  const __handleGetData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    __postApiData("/webservice/gettransportroutes", {
      student_id: student_id,
      year: currentYear,
      month: currentMonth,
    })
      .then((res) => {
        console.log(res, "API Response");
        const route = res?.route;
        if (route) {
          setData(route);
          console.log(route, "Route Data");
        } else {
          console.log("No route data found in response");
        }
      })
      .catch((error) => {
        console.log(error, "Error fetching data");
      });
  };
  console.log(data, "data");
  useFocusEffect(
    useCallback(() => {
      __handleGetData();
      return () => {};
    }, [])
  );
  // Sample student transport data
  const studentTransportData = {
    id: 1,
    studentName: "Roshan Sodhi",
    routeName: "From Home (Nehru Nagar)",
    pickup: {
      location: "Nehru Nagar ,Near Park",
      time: "7:30 AM",
    },
    drop: {
      location: "Near Bustand ",
      time: "3:00 pM",
    },
    currentLocationName: "Near Railway station New Delhi",
    // currentLocation: {
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    // }
  };

  return (
    <View style={styles.container}>
      {backArrow()}
      <ScrollView>
        <View style={styles.card}>
          {/* <Text style={styles.studentName}>
            {studentTransportData?.studentName}
          </Text> */}
          {/* <Text style={styles.studentName}>Route:{data?.route_title}</Text> */}

          <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Pick-up Point:</Text>
            <Text style={styles.itemText}>{data?.pickup_point_name}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Route:</Text>
            <Text style={styles.itemText}>{data?.route_title}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Vehicle Number:</Text>
            <Text style={styles.itemText}>{data?.vehicle_no}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Driver Name</Text>
            <Text style={styles.itemText}>{data?.driver_name}</Text>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Driver Contact</Text>
            <Text style={styles.itemText}>{data?.driver_contact}</Text>
          </View>
          {/* <View style={styles.functionalitiesIconWrapStyle}>
            <Image
              source={
                data?.vehicle_photo
                  ? {
                      uri: `${URL}/${data?.vehicle_photo}`,
                    }
                  : ""
              }
              style={{ height: 100.0, width: 200.0, borderRadius: 50 }}
              resizeMode="cover"
            />
          </View> */}

          {/* <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Drop Location</Text>
            <Text style={styles.itemText}>
              {studentTransportData?.drop.location}
            </Text>
          </View> */}
          {/* <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Drop Time</Text>
            <Text style={styles.itemText}>
              {studentTransportData?.drop.time}
            </Text>
          </View> */}
          {/* <View style={styles.cardItem}>
            <Text style={styles.itemTitle}>Current Location</Text>
            <Text style={styles.itemText}>
              {studentTransportData?.currentLocationName}
            </Text>
          </View> */}
        </View>
        {/* {mapInfo()} */}
      </ScrollView>
    </View>
  );
  // function mapInfo() {
  //     const [liveLocation, setLiveLocation] = React.useState({
  //         latitude: 28.6129,
  //         longitude: 77.2295,
  //     });

  //     // Simulate live location updates
  //     React.useEffect(() => {
  //         const interval = setInterval(() => {
  //             // Update live location (this is just for demonstration)
  //             setLiveLocation({
  //                 latitude: liveLocation.latitude + 0.001, // Increment latitude
  //                 longitude: liveLocation.longitude + 0.001, // Increment longitude
  //             });
  //         }, 5000); // Update every 5 seconds

  //         return () => clearInterval(interval); // Cleanup interval on component unmount
  //     }, [liveLocation]);
  //     // Calculate distance between two points
  //     const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //         const R = 6371; // Radius of the Earth in km
  //         const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  //         const dLon = (lon2 - lon1) * (Math.PI / 180);
  //         const a =
  //             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //             Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //         const d = R * c; // Distance in km
  //         return d * 1000; // Convert distance to meters
  //     };

  //     // Calculate appropriate zoom level based on distance
  //     const calculateZoomLevel = (distance) => {
  //         // Adjust these values based on your requirements
  //         if (distance < 500) {
  //             return 15; // Close-up zoom level
  //         } else if (distance < 1000) {
  //             return 14; // Moderate zoom level
  //         } else {
  //             return 12; // Wide zoom level
  //         }
  //     };

  //     // Calculate the height of the map based on the screen dimensions and zoom level
  //     const screenWidth = Dimensions.get('window').width;
  //     const screenHeight = Dimensions.get('window').height;
  //     const zoomLevel = calculateZoomLevel(
  //         calculateDistance(liveLocation.latitude, liveLocation.longitude, 28.6129, 77.2295)
  //     );
  //     const mapHeight = (screenWidth * screenHeight) / zoomLevel;

  //     return (
  //         <View style={styles.container}>
  //             <View style={[styles.mapStyle, { height: '' }]}>
  //                 <GoogleMap
  //                     latitude={liveLocation.latitude}
  //                     longitude={liveLocation.longitude}
  //                     pinColor="#FF0000"
  //                     height={200}
  //                 // width={400}
  //                 />
  //             </View>
  //         </View>

  //     )
  // }
  function backArrow() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.primaryColor,
          elevation: 2,
        }}
      >
        <View style={{ ...styles.backArrowWrapStyle }}>
          <MaterialIcons
            name="chevron-left"
            color={Colors.whiteColor}
            size={26}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={{ ...Fonts.whiteColor20Regular }}>Transport Routes</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  backArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    // borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 1.0,
    marginHorizontal: Sizes.fixPadding * 1.0,
    // borderWidth: 0.3,
    // borderColor: Colors.grayColor,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bodyColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 16,
  },
  card: {
    margin: 20,
    padding: 25,
    borderRadius: 40,
    backgroundColor: Colors.whiteColor,
    elevation: 9,
    // marginTop: 30,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    ...Fonts.blackColor16Regular,
  },
  routeName: {
    fontSize: 16,
    marginBottom: 16,
  },
  cardItem: {
    // marginBottom: 8,
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    ...Fonts.blackColor16Medium,
  },
  itemText: {
    fontSize: 14,
    ...Fonts.grayColor18Medium,
  },

  mapStyle: {
    borderRadius: Sizes.fixPadding + 10,
    marginVertical: Sizes.fixPadding - 5.0,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
});

export default TransportRoutesScreen;
