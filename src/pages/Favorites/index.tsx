import React, {useState} from 'react';
import { View, ScrollView} from 'react-native';
import asyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/PageTeacherItem';

import styles from './styles';

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    asyncStorage.getItem('favorites').then(response => {
      if(response ) {
        const favoritedTeachers = (JSON.parse(response));
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
      loadFavorites();
    });

  return (
  <View style={styles.container}>
     <View  style={styles.container}>
       <PageHeader  title=" Meus proffys favoritos" />

       <ScrollView
     style={styles.teacherList}
     contentContainerStyle={{
       paddingHorizontal: 16,
       paddingBottom: 16,
     }}
     >
      {favorites.map((teacher: Teacher) => {
        return (
          <TeacherItem 
          key={teacher.id}
          teacher={teacher}
          favorited={true}
          />
        )
      })}

     </ScrollView>
     </View>
  </View>
);
}

export default Favorites;