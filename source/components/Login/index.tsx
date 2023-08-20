import axios from 'axios';
import {useEffect, useState} from 'react';
import {View, Image, TextInput, Text, Button, StyleSheet} from 'react-native';
import CONST from '../../../consts.json';

import config, {fields} from '../../requests/config';
import loginStore from '../../stores/logginStore';

function Login() {
  const {loggin} = loginStore();

  const [email, setEmail] = useState<any>('ddmitrova@gmail.com');
  const [password, setPassword] = useState<any>('');
  const [errors, setErrors] = useState<any>([]);
  const [submit, setSubmit] = useState<any>(false);

  useEffect(() => {
    if (email && password && submit) {
      setSubmit(false);
    }
  }, [email, password]);

  const auth = async () => {
    setSubmit(true);
    setErrors(() => {
      const err = [];
      if (!email) {
        err.push('Укажите логин');
      }
      if (!password) {
        err.push('Укажите пароль');
      }
      return err;
    });
    if (email && password) {
      try {
        const res: any = await axios.get(
          `${CONST.PUBLIC_API_URL}/users?filter[email]=${encodeURI(email)}`,
          config,
        );
        const data = res.data?.data[0];
        if (res.status !== 200) {
          const errors = new Set();
          errors.add(JSON.stringify(res.data.errors));
          setErrors(Array.from(errors));
          return;
        }
        if (data.attributes.email !== email) {
          setErrors(['Email не найден']);
          return;
        }
        if (!true) {
          setErrors(['У пользователя не задан пароль в настройках']);
          return;
        }
        if (password !== '123') {
          setErrors(['Неверный пароль']);
          return;
        }
        if (data[fields.token] === '') {
          setErrors(['У пользователя не указан Токен']);
          return;
        }
        loggin({
          id: data.id,
          token: data[fields.token],
          ...data.attributes,
        });
      } catch (error) {
        setErrors([JSON.stringify(error)]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{width: 100, height: 100}}
        source={require('../../assets/logo-v2.png')}
      />
      <TextInput
        style={styles.input}
        onChangeText={e => setEmail(e.toLowerCase())}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="username"
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={e => setPassword(e)}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        textContentType="password"
      />
      {/* <Text>{errors.length}</Text> */}
      {errors.map((e: any, index: number) => {
        return (
          <Text key={index} style={styles.errors}>
            {e}
          </Text>
        );
      })}
      <Button title="Войти" onPress={auth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '90%',
    marginHorizontal: '5%',
  },
  input: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  errors: {
    color: '#fc2847',
  },
});

export default Login;
