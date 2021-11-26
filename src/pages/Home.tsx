



import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, StyleSheet, ToastAndroid, Dimensions, TouchableOpacity, RefreshControl, Image, FlatList } from 'react-native';
import api from '@/services';
import Axios from 'axios';
// import { Container } from './styles';
import { format } from 'date-fns'
import * as Location from 'expo-location';
import { typeLocation } from '@/Models';
import { dataServiceGet } from '../services/services';
import { AntDesign } from '@expo/vector-icons'
const openWeatherKey = `67a07ac30ad7f13e55fc36178eaea1d4`;
let url = `https://api.openweathermap.org/data/2.5/onecall?&lang=pt_br&units=metric&exclude=minutely&appid=${openWeatherKey}`;


function Current() {
    const [forecast, setForecast] = useState<any>(null);
    const [refreshing, setRefreshing] = useState<any>(false);
    const [location, setLocation] = useState<typeLocation>({
        city: '',
        country: '',
        district: '',
        isoCountryCode: '',
        name: '',
        postalCode: '',
        region: '',
        street: '',
        subregion: '',
        timezone: '',
    });

    const loadForecast = async () => {
        setRefreshing(true);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });

        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();

        if (!response.ok) {
            Alert.alert(`Error retrieving weather data: ${data.message}`);
        } else {
            setForecast(data);
        }

        Location.reverseGeocodeAsync(location.coords).then((res: any) => {
            setLocation(res[0])

        }).catch((err) => {

        })

        setRefreshing(false);
    }

    useEffect(() => {
        loadForecast();
    }, [])

    const current = forecast?.current?.weather[0];
    console.log(location)
    return (
        <SafeAreaView style={styles.container}>


            <Text style={styles.title}>{location.subregion}</Text>
            <Text style={styles.subtitle}>{location.district}</Text>
            <View style={styles.current}>
                <Image
                    style={styles.largeIcon}
                    source={{
                        uri: `http://openweathermap.org/img/wn/${current?.icon}@4x.png`,
                    }}
                />
                <Text style={styles.currentTemp}>{Math.round(forecast?.current?.temp)}°C</Text>
            </View>
            <View style={{  width: '100%', backgroundColor: 'white', borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
               
                <FlatList
                    horizontal
                    style={{ marginTop: 20, marginHorizontal: 10 }}
                    data={forecast?.hourly?.slice(0, 24)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const weather = item.weather[0];
                        var dt = new Date(item.dt * 1000);
                   

                        return (
                            <View style={styles.hour}>
                                <Text>{format(dt, 'dd/mm/yyyy')}</Text>
                                <Text>{format(dt, 'HH:mm')}</Text>
                                <Text>{Math.round(item.temp)}°C</Text>
                                <Image
                                    style={styles.smallIcon}
                                    source={{
                                        uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                                    }}
                                />
                                <Text>{weather.description}</Text>

                            </View>
                        )
                    }}
                />

            </View>
            <View style={{flex:1,backgroundColor:'white'}}></View>
            
        </SafeAreaView>
    );
}

export default Current;

const styles = StyleSheet.create({
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 12,
        // marginLeft: 7,
        color: 'white',
        textAlign: 'center'
    },
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: '#57abff',

    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        // alignContent: 'center',
        alignSelf: 'center',
    },
    currentTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    currentDescription: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 24,
        marginBottom: 5
    },
    hour: {
        padding: 6,
        alignItems: 'center',
    },
    largeIcon: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    smallIcon: {
        width: 100,
        height: 100,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
});
