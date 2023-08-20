import React, {FC} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {TDocuments} from './index';

export interface IItemDocument {
  document: TDocuments;
  deleteDoc(item: TDocuments, index: number): void;
  index: number;
}

export const ItemDocument: FC<IItemDocument> = ({
  document,
  deleteDoc,
  index = 0,
}) => {
  const imageFormat = ['image/jpeg', 'image/png'];
  function cropNameFile(name: string) {
    const startSection = name[0] + name[1];

    const lastSection =
      name[name.length - 3] + name[name.length - 2] + name[name.length - 1];

    return `${startSection}...${lastSection}`;
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={sy.docItem}>
        {document.type && imageFormat.includes(document.type) ? (
          <View>
            <Image style={sy.preview} source={{uri: document.uri}} />
          </View>
        ) : (
          <FontAwesome name="file" />
        )}
        <TouchableOpacity
          style={sy.delete}
          onPress={() => deleteDoc(document, index)}>
          <FontAwesome name="close" />
        </TouchableOpacity>
      </View>
      <Text style={sy.fileName}>
        {cropNameFile(document.name || 'unknown name')}
      </Text>
    </View>
  );
};

const sy = StyleSheet.create({
  docItem: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: '#015AC1',
    borderWidth: 1,
    borderColor: '#CAC4D0',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 12,
  },
  preview: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  delete: {
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 6,
    position: 'absolute',
    end: -6,
    top: -6,
  },
});
