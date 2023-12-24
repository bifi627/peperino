import 'package:flutter/material.dart';

import '../../components/app_bar.dart';

class RoomOverviewPage extends StatefulWidget {
  const RoomOverviewPage({super.key});

  @override
  State<RoomOverviewPage> createState() => _RoomOverviewPageState();
}

class _RoomOverviewPageState extends State<RoomOverviewPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MainAppBar(title: "Räume"),
      drawer: Drawer(
        child: ListView(
          children: [
            ListTile(
              title: const Text("Peperino"),
              onTap: () {
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
            ),
          ],
        ),
      ),
      body: Container(
        height: double.infinity,
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [],
        ),
      ),
    );
  }
}
