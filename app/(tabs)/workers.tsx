import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Worker {
  id: string;
  name: string;
  lastUpdated: string;
}

const savedWorkers: Worker[] = [
  { id: '1', name: 'ПЗПІ-22-9', lastUpdated: '05.10.2024 18:01:19' },
  { id: '2', name: 'ПЗПІ-22-10', lastUpdated: '05.10.2024 18:01:19' },
];

export default function WorkersScreen() {
  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  const handleAddWorker = () => {
    console.log('Adding a new worker...');
  };

  const renderWorker = ({ item }: { item: Worker }) => (
    <View style={styles.workerContainer}>
      <View style={styles.workerInfo}>
        <Text style={styles.workerName}>{item.name}</Text>
        <Text style={styles.workerDetails}>{item.lastUpdated}</Text>
      </View>
      <Ionicons name="refresh-outline" size={24} color="white" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {}
      <View style={styles.header}>
        <Text style={styles.headerText}>Збережені розклади</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleRefresh}>
            <Ionicons name="refresh-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddWorker}>
            <Ionicons name="add-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {}
      <FlatList
        data={savedWorkers}
        renderItem={renderWorker}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50, 
    backgroundColor: '#1c1c1c',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 10, 
  },
  workerContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
  },
  workerInfo: {
    flex: 1, 
  },
  workerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerDetails: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
});
