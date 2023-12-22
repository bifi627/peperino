part of 'auth_bloc.dart';

sealed class AuthEvent {}

class Login extends AuthEvent {
  User user;
  Login({required this.user});
}

class Logout extends AuthEvent {}
