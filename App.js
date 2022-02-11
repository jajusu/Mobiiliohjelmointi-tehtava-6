import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image, TouchableOpacity  } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
 
  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals)) //tähän taulukon nimi, tässä tapauksessa meals
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
    console.log("ok");
    console.log(repositories);
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={styles.image} source={{uri:item.strMealThumb}}></Image> 
            {/* huomaa että kuvalle pitää antaa kokomääritys, jotta näkyy */}
          </View>}
        data={repositories} 
        ItemSeparatorComponent={listSeparator} />
      <View style={styles.inputNappi}>
        <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
          onChangeText={text => setKeyword(text)} />
        <Button title="Find" onPress={getRepositories} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  //alignItems: 'center',
  justifyContent: 'center',
 },
 image:{
  //kuvan koon määritys
  width:100,
  height: 100
 },
 inputNappi:{
   //keskitetään vain input ja nappi, ei hakutuloksia
  alignItems: 'center',
 }
});