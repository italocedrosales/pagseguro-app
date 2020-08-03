import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoaderContainer,
} from './styles';

function User({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();

  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: user.name });
  }, []);

  useEffect(() => {
    async function getUserStars() {
      setLoading(true);

      const response = await api.get(`/users/${user.login}/starred?pages=1`);

      const { data } = response;

      setStars(data);

      setLoading(false);
    }

    getUserStars();
  }, [user.login]);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <LoaderContainer>
          <ActivityIndicator color="#7159c1" size="large" />
        </LoaderContainer>
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

export default User;
