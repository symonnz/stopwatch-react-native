import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let hours = 0;
let minutes = 0;
let seconds = 0;

let timer = null;

export default function App() {
  const [timerValue, setTimerValue] = useState('00:00:00');
  const [startButton, setStartButton] = useState('START');
  const [lastTime, setLastTime] = useState(null);

  function start() {
    setStartButton('PAUSE');

    if (startButton == 'PAUSE') setStartButton('RESUME');

    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    } else {
      timer = setInterval(() => {
        seconds++;

        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }

        let formatTimer =
          (hours < 10 ? `0${hours}` : hours) +
          ':' +
          (minutes < 10 ? `0${minutes}` : minutes) +
          ':' +
          (seconds < 10 ? `0${seconds}` : seconds);

        setTimerValue(formatTimer);
      }, 1000);
    }
  }

  function reset() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setLastTime(timerValue);
    hours = 0;
    minutes = 0;
    seconds = 0;
    setTimerValue('00:00:00');
    setStartButton('START');
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 271, height: 330 }}
        source={require('./src/crono.png')}
      />
      <Text style={styles.timer}>{timerValue}</Text>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={start}>
          <Text style={styles.buttonText}>{startButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTimeArea}>
        <Text style={styles.lastTimeAreaText}>
          {lastTime ? `Last Time ${lastTime}` : ''}
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008aff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer: {
    marginTop: -160,
    fontSize: 40,
    color: '#fff'
  },
  buttonArea: {
    flexDirection: 'row',
    marginTop: 140,
    height: 40
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 12,
    height: 40
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008aff'
  },
  lastTimeArea: {
    marginTop: 40
  },
  lastTimeAreaText: {
    fontSize: 20,
    color: '#fff'
  }
});
