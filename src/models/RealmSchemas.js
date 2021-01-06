import React from 'react-native';
import Realm from 'realm';

export const ProductSchema = {
  name: 'Product_',
  properties: {
    name: 'string',
    origin: 'string',
    barcode: 'string',
    grade: 'string',

  }
};

export const ConsumedSchema = {
  name: 'Consumed',
  properties: {
    date: 'date',
    product: 'Product_',
  }
};