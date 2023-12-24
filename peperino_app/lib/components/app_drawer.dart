import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peperino_app/pages/appInfo/appInfo_page.dart';

import '../pages/auth/login_auth_picker.dart';
import '../pages/rooms/rooms_overview_page.dart';
import '../state/auth/bloc/auth_bloc.dart';

class MainAppDrawer extends StatefulWidget {
  const MainAppDrawer({super.key});

  @override
  State<MainAppDrawer> createState() => _MainAppDrawerState();
}

class _MainAppDrawerState extends State<MainAppDrawer> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return Drawer(
          child: ListView(
            children: [
              ListTile(
                title: const Text("Peperino"),
                onTap: () {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                },
              ),
              const Divider(),
              if (state.user == null)
                ListTile(
                  title: const Text("Login"),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const LoginAuthPickerPage()),
                    );
                  },
                ),
              ListTile(
                title: const Text("Räume"),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const RoomOverviewPage()),
                  );
                },
              ),
              const Divider(),
              ListTile(
                title: const Text("App Info"),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const AppInfoPage()),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
