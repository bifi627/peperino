import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:peperino_app/components/app_bar.dart';
import 'package:peperino_app/components/app_drawer.dart';
import 'package:peperino_app/pages/home/widget_tree.dart';

import '../../state/auth/bloc/auth_bloc.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  Widget _userEmail() {
    return BlocBuilder<AuthBloc, AuthState>(builder: (context, state) {
      return Text(state.user?.email ?? "User email");
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return Scaffold(
          appBar: const MainAppBar(title: "Peperino"),
          drawer: const MainAppDrawer(),
          body: Container(
            height: double.infinity,
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            child: const WidgetTree(),
          ),
        );
      },
    );
  }
}
