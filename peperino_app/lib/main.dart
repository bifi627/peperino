import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:peperino_app/pages/auth/login_register_page.dart';
import 'package:peperino_app/pages/home/home_page.dart';

import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.green,
          // ···
          brightness: Brightness.dark,
        ),
      ),
      home: const HomePage(),
      routes: {
        // '/': (context) => const HomePage(),
        '/login': (context) => const LoginPage(),
      },
    );
  }
}
