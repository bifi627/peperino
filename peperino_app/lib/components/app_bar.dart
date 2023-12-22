import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../auth/bloc/auth_bloc.dart';
import '../pages/profile/profile_page.dart';

class MainAppBar extends StatefulWidget implements PreferredSizeWidget {
  final String title;

  const MainAppBar({super.key, required this.title});

  @override
  State<MainAppBar> createState() => _MainAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _MainAppBarState extends State<MainAppBar> {
  Future<void> onIconPressed() async {
    await Navigator.push(context, MaterialPageRoute(builder: (context) => const ProfilePage()));
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return AppBar(
          title: Text(widget.title),
          backgroundColor: const ColorScheme.dark().background,
          actions: [
            if (state.user?.photoURL != null)
              IconButton(
                icon: Image.network(state.user?.photoURL ?? ""),
                onPressed: onIconPressed,
              )
            else if (state.user != null)
              IconButton(
                icon: const Icon(Icons.person),
                onPressed: onIconPressed,
              ),
          ],
        );
      },
    );
  }
}
