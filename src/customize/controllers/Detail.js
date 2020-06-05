import React, {createContext} from 'react';
import axios from 'axios';
import {SUPPORT_URL, SENDER, DESTINATION, BEARER} from 'react-native-dotenv';

import DetailScreen from '../views/screens/Detail';
import {RequestContext} from '../../weosHelpers';
import {useState} from 'react';
import {useEffect} from 'react';

const value = {
  status: null,
  makeRequest(form) {
    this.status = 'pending';
  },
};
const Detail = (props) => {
  const [status, setStatus] = useState('init');
  const makeRequest = (form) => {
    console.log(
      SUPPORT_URL,
      '\n',
      BEARER,
      '\n',
      SENDER,
      '\n',
      DESTINATION,
      '\n',
      form,
    );
    setStatus('pending');
    axios({
      method: 'post',
      url: SUPPORT_URL,
      headers: {
        Authorization: BEARER,
      },
      data: {
        meta: {
          sender: SENDER,
          destination: DESTINATION,
        },
        payload: form,
      },
    })
      .then((res) => {
        console.log('Success!!', res.data);
        setStatus('success');
      })
      .catch((error) => {
        console.log('Error!!', error);
        setStatus('error');
      });
  };

  return <DetailScreen {...props} status={status} makeRequest={makeRequest} />;
};

export default Detail;