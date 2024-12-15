import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';

export default function CementSandCalculator() {
  const theme = useTheme();
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [roomInputs, setRoomInputs] = useState([{ name: '', size: '', length: '', width: '', height: '', thickness: '', cementRatio: '', sandRatio: '' }]);
  const [results, setResults] = useState<{ name: string; size: string; wallVolume: string; cementQuantity: string; sandQuantity: string }[]>([]);

  const handleRoomInputChange = (index: number, field: string, value: any) => {
    const updatedRooms = [...roomInputs];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: value,
    };
    setRoomInputs(updatedRooms);
  };

  const calculateMortar = () => {
    const computedResults = roomInputs.map((room) => {
      const { length, width, height, thickness, cementRatio, sandRatio } = room;
      const L = parseFloat(length);
      const W = parseFloat(width);
      const H = parseFloat(height);
      const T = parseFloat(thickness);
      const C = parseFloat(cementRatio);
      const S = parseFloat(sandRatio);

      const V = 2 * (L + W) * H * T; // Total wall volume
      const wasteMargin = 1.3;
      const cementWeightConversion = 1.25;
      const cementQuantity = ((V * wasteMargin) / (C + S)) * (C / cementWeightConversion);
      const sandQuantity = ((V * wasteMargin) / (C + S)) * S;

      return {
        ...room,
        wallVolume: V.toFixed(2),
        cementQuantity: cementQuantity.toFixed(2),
        sandQuantity: sandQuantity.toFixed(2),
      };
    });
    setResults(computedResults);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Number of Rooms"
        value={numberOfRooms}
        keyboardType="numeric"
        onChangeText={(value: string) => {
          setNumberOfRooms(value);
          setRoomInputs(Array.from({ length: parseInt(value || '0') }, () => ({
            name: '',
            size: '',
            length: '',
            width: '',
            height: '',
            thickness: '',
            cementRatio: '',
            sandRatio: '',
          })));
        }}
        style={styles.input}
      />

      {roomInputs.map((room, index) => (
        <View key={index} style={styles.roomContainer}>
          <Text style={styles.roomTitle}>Room {index + 1}</Text>
          <TextInput
            label="Room Name"
            value={room.name}
            onChangeText={(value: any) => handleRoomInputChange(index, 'name', value)}
            style={styles.input}
          />
          <TextInput
            label="Room Size"
            value={room.size}
            onChangeText={(value: any) => handleRoomInputChange(index, 'size', value)}
            style={styles.input}
          />
          <TextInput
            label="Length (L)"
            value={room.length}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'length', value)}
            style={styles.input}
          />
          <TextInput
            label="Width (W)"
            value={room.width}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'width', value)}
            style={styles.input}
          />
          <TextInput
            label="Height (H)"
            value={room.height}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'height', value)}
            style={styles.input}
          />
          <TextInput
            label="Wall Thickness (T)"
            value={room.thickness}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'thickness', value)}
            style={styles.input}
          />
          <TextInput
            label="Cement Ratio (C)"
            value={room.cementRatio}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'cementRatio', value)}
            style={styles.input}
          />
          <TextInput
            label="Sand Ratio (S)"
            value={room.sandRatio}
            keyboardType="numeric"
            onChangeText={(value: any) => handleRoomInputChange(index, 'sandRatio', value)}
            style={styles.input}
          />
        </View>
      ))}

      <Button mode="contained" onPress={calculateMortar} style={styles.button}>
        Calculate
      </Button>

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          {results.map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <Text>Room Name: {result.name}</Text>
              <Text>Room Size: {result.size}</Text>
              <Text>Wall Volume: {result.wallVolume} m³</Text>
              <Text>Cement Quantity: {result.cementQuantity} bags</Text>
              <Text>Sand Quantity: {result.sandQuantity} m³</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  roomContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultCard: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
});
