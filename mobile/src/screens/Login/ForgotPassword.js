import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import styles from './styles';

export default function ForgotPassword({ navigation }) {
  const [input, setInput] = useState("");
  const [requested, setRequested] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Forgot password</Text>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.logInText}>Please, type your username or email:</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            maxLength={32}
            autoCapitalize="none"
          />
          { requested ? <View>
                          <ActivityIndicator size="small" color="#000" />
                        </View>
                      : <TouchableOpacity
                          style={styles.logIn}
                          onPress={null}
                        >
                          <Text style={styles.logInText}>Request password reset</Text>
                        </TouchableOpacity>
          }
        </View>

        <View style={styles.createAccountArea}>
          <TouchableOpacity style={styles.createAccountArea} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUp}>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}