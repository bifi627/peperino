import '_generated/swagger.swagger.dart';
import 'auth_client.dart';

final class PeperinoClient {
  static final PeperinoClient _instance = PeperinoClient._internal();
  factory PeperinoClient() => _instance;

  static final Swagger _api = Swagger.create(
    baseUrl: Uri.parse("http://localhost:5000"),
    httpClient: AuthorizedClient(),
  );

  PeperinoClient._internal();

  static Swagger get api => _api;
}
