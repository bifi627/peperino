import 'package:flutter/material.dart';
import 'package:peperino_app/pages/home/components/default.dart';
import 'package:peperino_app/pages/home/components/empty.dart';

import '../../state/auth/auth.dart';

class WidgetTree extends StatefulWidget {
  const WidgetTree({super.key});

  @override
  State<WidgetTree> createState() => _WidgetTreeState();
}

class _WidgetTreeState extends State<WidgetTree> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: Auth().authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return const DefaultPage();
        } else {
          return const EmptyPage();
        }
      },
    );
  }
}
