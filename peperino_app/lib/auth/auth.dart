import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class Auth {
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;

  User? get currentUser => _firebaseAuth.currentUser;

  bool get isLoggedIn => currentUser != null;

  Stream<User?> get authStateChanges => _firebaseAuth.authStateChanges();

  Future<UserCredential> signInWithEmailAndPassword(
      {required String email, required String password}) async {
    return await _firebaseAuth.signInWithEmailAndPassword(email: email, password: password);
  }

  Future<UserCredential> createUserWithEmailAndPassword(
      {required String email, required String password}) async {
    return await _firebaseAuth.createUserWithEmailAndPassword(email: email, password: password);
  }

  Future<UserCredential> signInWithProvider(String provider) async {
    if (provider == "google") {
      if (kIsWeb) {
        return await _firebaseAuth.signInWithPopup(GoogleAuthProvider());
      }
      if (Platform.isAndroid) {
        return await _firebaseAuth.signInWithProvider(GoogleAuthProvider());
      }
    }

    throw Exception("provider $provider is not implemented");
  }

  Future<void> signOut() async {
    return await _firebaseAuth.signOut();
  }
}
