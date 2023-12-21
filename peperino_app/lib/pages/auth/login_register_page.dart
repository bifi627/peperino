import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:peperino_app/auth/auth.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String? errorMessage = "";
  bool isLogin = true;

  Widget _title() {
    return const Text("Einloggen");
  }

  final TextEditingController _controllerEmail = TextEditingController();
  Widget _emailField() {
    return TextField(
      controller: _controllerEmail,
      decoration: const InputDecoration(
        labelText: "Email",
      ),
    );
  }

  final TextEditingController _controllerPassword = TextEditingController();
  Widget _passwordField() {
    return TextField(
      controller: _controllerPassword,
      decoration: const InputDecoration(
        labelText: "Passwort",
      ),
      obscureText: true,
    );
  }

  Widget _errorMessage() {
    return Text(errorMessage ?? "");
  }

  Widget _submitButton() {
    return ElevatedButton(
      onPressed: isLogin ? signInWithEmailAndPassword : createUserWithEmailAndPassword,
      child: Text(isLogin ? "Login" : "Register"),
    );
  }

  Widget _loginGoogleButton() {
    return ElevatedButton(
      onPressed: signInGoogle,
      child: const Text("Google"),
    );
  }

  Widget _loginOrRegisterButton() {
    return TextButton(
      onPressed: () {
        setState(() {
          isLogin = !isLogin;
        });
      },
      child: Text(isLogin ? "Register" : "Login"),
    );
  }

  Future<void> signInWithEmailAndPassword() async {
    try {
      await Auth().signInWithEmailAndPassword(
          email: _controllerEmail.text, password: _controllerPassword.text);
    } on FirebaseAuthException catch (e) {
      setState(() {
        errorMessage = e.message;
      });
    }
  }

  Future<void> signInGoogle() async {
    try {
      await Auth().signInWithProvider("google");
    } on FirebaseAuthException catch (e) {
      setState(() {
        errorMessage = e.message;
      });
    }
  }

  Future<void> createUserWithEmailAndPassword() async {
    try {
      await Auth().createUserWithEmailAndPassword(
          email: _controllerEmail.text, password: _controllerPassword.text);
    } on FirebaseAuthException catch (e) {
      setState(() {
        errorMessage = e.message;
      });
    }
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
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _emailField(),
            _passwordField(),
            _errorMessage(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _submitButton(),
                _loginOrRegisterButton(),
                if (isLogin) _loginGoogleButton(),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
