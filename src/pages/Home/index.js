import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  Button,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

function Home({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function postUser() {
      const jsonValue = await AsyncStorage.getItem('@users');

      if (!jsonValue) {
        const response = await api.get(`/users/italocedrosales`);

        const data = {
          login: response.data.login,
          avatar: response.data.avatar_url,
          name: response.data.name,
          bio: response.data.bio,
        };

        setRepos([...repos, data]);
      }
    }

    postUser();
  }, [repos]);

  useEffect(() => {
    async function getUsers() {
      const jsonValue = await AsyncStorage.getItem('@users');

      if (jsonValue) {
        const dataJson = JSON.parse(jsonValue);

        setRepos(dataJson);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    const jsonValue = JSON.stringify(repos);

    AsyncStorage.setItem('@users', jsonValue);
  }, [repos]);

  async function handleAddUser() {
    setLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const data = {
      login: response.data.login,
      avatar: response.data.avatar_url,
      name: response.data.name,
      bio: response.data.bio,
    };

    setRepos([...repos, data]);

    Keyboard.dismiss();

    setNewUser('');
    setLoading(false);
  }

  function handleNavigation(user) {
    navigation.navigate('Detalhes', { user });
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCaptalize="none"
          placeholder="Adicionar usuário..."
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <Button loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={30} color="#FFF" />
          )}
        </Button>
      </Form>

      <List
        data={repos}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton
              onPress={() => {
                handleNavigation(item);
              }}
            >
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

export default Home;
