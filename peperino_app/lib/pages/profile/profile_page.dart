import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peperino_app/api/auth_api.dart';

import '../../auth/bloc/auth_bloc.dart';
import '../../components/app_bar.dart';
import '../../components/app_drawer.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Future<void> fetch() async {
    var responseSwagger = await PeperinoClient.api.apiHealthCheckGet();
    debugPrint(responseSwagger.body.toString());
    var responseRooms = await PeperinoClient.api.apiRoomGet();
    debugPrint(responseRooms.body.toString());
  }

  @override
  void initState() {
    super.initState();
    fetch();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        var display = state.user?.displayName ?? state.user?.email ?? "User";
        return Scaffold(
          appBar: MainAppBar(title: "Profile $display"),
          drawer: const MainAppDrawer(),
          body: Container(
            height: double.infinity,
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [],
            ),
          ),
        );
      },
    );
  }
}
