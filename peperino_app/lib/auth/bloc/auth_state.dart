part of 'auth_bloc.dart';

class AuthState {
  User? user;
  AuthState({this.user});
  AuthState copyWith({User? user}) {
    return AuthState(user: user);
  }
}
