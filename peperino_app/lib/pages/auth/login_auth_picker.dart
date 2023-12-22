import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';

import '../../auth/auth.dart';
import 'login_register_page.dart';

class LoginAuthPickerPage extends StatefulWidget {
  const LoginAuthPickerPage({super.key});

  @override
  State<LoginAuthPickerPage> createState() => _LoginAuthPickerPageState();
}

class _LoginAuthPickerPageState extends State<LoginAuthPickerPage> {
  Widget _title() {
    return const Text("Login Methode auswählen");
  }

  Widget _loginEmailButton() {
    return Container(
      height: 40,
      margin: const EdgeInsets.all(10),
      child: SignInButton(
        Buttons.Email,
        onPressed: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => const LoginRegisterPage()));
        },
      ),
    );
  }

  Widget _loginGoogleButton() {
    return Container(
      height: 40,
      margin: const EdgeInsets.all(10),
      child: SignInButton(
        Buttons.GoogleDark,
        onPressed: signInGoogle,
      ),
    );
  }

  Future<void> signInGoogle() async {
    try {
      await Auth().signInWithProvider("google");
    } on FirebaseAuthException catch (e) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: _title(),
      ),
      body: Container(
        height: double.infinity,
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            _loginEmailButton(),
            _loginGoogleButton(),
          ],
        ),
      ),
    );
  }
}
