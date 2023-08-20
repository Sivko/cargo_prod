import React, {FC, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
} from 'react-native-document-picker';
import {ItemDocument} from './itemFile';

export type TDocuments = DocumentPickerResponse & {path?: string};

export interface ISelectFile {
  onSelect(docs: TDocuments[]): void;
}

export const SelectFile: FC<ISelectFile> = ({onSelect}) => {
  const [result, setResult] = useState<TDocuments[]>([]);

  useEffect(() => {
    // console.log(result);
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const deleteFile = (item: TDocuments, index: number) => {
    console.log(item, index);
    const exceptionDelete = new Set(result);
    exceptionDelete.delete(item);

    setResult(Array.from(exceptionDelete));
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={sy.buttonAddContainer}>
        <TouchableOpacity
          style={sy.buttonAdd}
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pick({
                allowMultiSelection: true,
                presentationStyle: 'formSheet',
                copyTo: 'cachesDirectory',
                mode: 'import',
              });
              setResult([...(result || []), ...(pickerResult || [])]);
              onSelect([...(result || []), ...(pickerResult || [])]);
            } catch (e) {
              handleError(e);
            }
          }}>
          <FontAwesome name="file" />
        </TouchableOpacity>
      </View>
      {result.length > 0 && result && (
        <ScrollView horizontal={true} style={{width: '70%'}}>
          {result.map((item, index) => (
            <ItemDocument
              key={`ItemDocument_${index}`}
              deleteDoc={deleteFile}
              document={item}
              index={index}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const sy = StyleSheet.create({
  buttonAddContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  buttonAdd: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBE2F9',
  },

  docItem: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: '#015AC1',
    borderWidth: 1,
    borderColor: '#CAC4D0',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 12,
  },
});
