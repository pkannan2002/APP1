import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  // Sample workout data
  const [workouts, setWorkouts] = useState([
    { id: '1', title: 'Push-ups', completed: false },
    { id: '2', title: 'Squats', completed: false },
    { id: '3', title: 'Plank', completed: false },
    { id: '4', title: 'Lunges', completed: false },
    { id: '5', title: 'Burpees', completed: false },
  ]);

  // Function to toggle workout completion status
  const toggleWorkoutCompletion = (id) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    );
  };

  // Function to reset all workouts
  const resetWorkouts = () => {
    Alert.alert(
      'Reset Workouts',
      'Are you sure you want to reset all workouts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () =>
            setWorkouts((prevWorkouts) =>
              prevWorkouts.map((workout) => ({ ...workout, completed: false }))
            ),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Schedule</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.workoutItem,
              item.completed && styles.completedWorkout,
            ]}
            onPress={() => toggleWorkoutCompletion(item.id)}
          >
            <Text style={styles.workoutText}>{item.title}</Text>
            {item.completed && (
              <Text style={styles.completedText}>✅ Completed</Text>
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetWorkouts}>
        <Text style={styles.resetButtonText}>Reset All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  workoutItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  workoutText: {
    fontSize: 18,
    color: '#333',
  },
  completedWorkout: {
    backgroundColor: '#e6ffe6',
  },
  completedText: {
    color: '#28a745',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});