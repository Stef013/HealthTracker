import React from 'react-native';
import Realm from 'realm';

export const ConsumedSchema = {
  name: 'Consumed',
  properties: {
    date: 'date',
    barcode: 'string',
    product_name: 'string',
    grade: 'string',
    quantity: 'string',
    calories: 'string',
    imageURL: 'string',
  }
};
