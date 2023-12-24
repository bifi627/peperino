import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../../state/auth/auth.dart';

class LoginRegisterPage extends StatefulWidget {
  const LoginRegisterPage({super.key});

  @override
  State<LoginRegisterPage> createState() => _LoginRegisterPageState();
}

class _LoginRegisterPageState extends State<LoginRegisterPage> {
  String? errorMessage = "";
  bool isLogin = true;
  bool isLoading = false;

  final _formKey = GlobalKey<FormState>();

  Widget _title() {
    return Text(isLogin ? "Einloggen" : "Registrieren");
  }

  final TextEditingController _controllerEmail = TextEditingController();
  Widget _emailField() {
    return TextFormField(
      autofocus: true,
      controller: _controllerEmail,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return "Email eingeben";
        }
      },
      decoration: const InputDecoration(
        labelText: "Email",
      ),
    );
  }

  final TextEditingController _controllerPassword = TextEditingController();
  Widget _passwordField() {
    return TextFormField(
      controller: _controllerPassword,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return "Passwort eingeben";
        }
      },
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
      onPressed: () {
        if (_formKey.currentState!.validate()) {
          isLogin ? signInWithEmailAndPassword() : createUserWithEmailAndPassword();
        }
      },
      child: Text(isLogin ? "Login" : "Register"),
    );
  }

  Future<void> signInWithEmailAndPassword() async {
    try {
      setState(() {
        errorMessage = "";
      });

      showDialog(
        context: context,
        builder: (BuildContext context) {
          return const AlertDialog(
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircularProgressIndicator(),
                SizedBox(height: 16),
                Text("Signing in..."),
              ],
            ),
          );
        },
        barrierDismissible: false, // Prevents user from dismissing the dialog
      );

      await Auth().signInWithEmailAndPassword(
        email: _controllerEmail.text,
        password: _controllerPassword.text,
      );
      await Future.delayed(const Duration(seconds: 2));
      if (context.mounted) {
        Navigator.of(context).popUntil((route) => route.isFirst);
      }
    } on FirebaseAuthException catch (e) {
      if (context.mounted) {
        Navigator.of(context).pop();
      }
      setState(() {
        errorMessage = e.message;
      });
    }
  }

  Future<void> createUserWithEmailAndPassword() async {
    try {
      setState(() {
        errorMessage = "";
      });
      await Auth().createUserWithEmailAndPassword(
        email: _controllerEmail.text,
        password: _controllerPassword.text,
      );
      await Future.delayed(const Duration(seconds: 2));
      if (context.mounted) Navigator.of(context).popUntil((route) => route.isFirst);
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
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              _emailField(),
              _passwordField(),
              _errorMessage(),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _submitButton(),
                ],
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: isLogin ? 0 : 1,
        selectedItemColor: Colors.green.shade200,
        onTap: (value) {
          setState(() {
            isLogin = value == 0;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.login),
            label: "Login",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.app_registration_rounded),
            label: "Register",
          ),
        ],
      ),
    );
  }
}
