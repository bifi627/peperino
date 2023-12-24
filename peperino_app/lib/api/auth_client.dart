import 'dart:io';

import 'package:http/http.dart' as http;

import '../state/auth/auth.dart';

class AuthorizedClient extends http.BaseClient {
  final _httpClient = http.Client();

  AuthorizedClient();

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    final newToken = await Auth().getAuthToken() ?? "";
    request.headers[HttpHeaders.authorizationHeader] = "Bearer $newToken";
    return _httpClient.send(request);
  }
}
