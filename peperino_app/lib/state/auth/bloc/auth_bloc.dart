import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;

  AuthBloc() : super(AuthState()) {
    _firebaseAuth.authStateChanges().listen(
      (event) {
        if (event != null) {
          add(Login(user: event));
        } else {
          add(Logout());
        }
      },
    );

    on<Login>((event, emit) {
      emit(state.copyWith(user: event.user));
    });
    on<Logout>((event, emit) {
      emit(state.copyWith(user: null));
    });
  }
}
