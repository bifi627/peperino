// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'swagger.swagger.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: type=lint
final class _$Swagger extends Swagger {
  _$Swagger([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = Swagger;

  @override
  Future<Response<CheckListOutDto>> _apiCheckListGet(
      {required String? listSlug}) {
    final Uri $url = Uri.parse('/api/CheckList');
    final Map<String, dynamic> $params = <String, dynamic>{
      'listSlug': listSlug
    };
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
      parameters: $params,
    );
    return client.send<CheckListOutDto, CheckListOutDto>($request);
  }

  @override
  Future<Response<CheckListOutDto>> _apiCheckListPost(
      {required CreateCheckListCommand? body}) {
    final Uri $url = Uri.parse('/api/CheckList');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<CheckListOutDto, CheckListOutDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListDelete(
      {required DeleteCheckListCommand? body}) {
    final Uri $url = Uri.parse('/api/CheckList');
    final $body = body;
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListSlugRenamePost({
    required String? slug,
    required RenameCheckListCommand? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckList/${slug}/rename');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<BaseCheckListItemOutDto>> _apiCheckListItemSlugTextAddPost({
    required String? slug,
    required TextCheckListItemInDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/text/add');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client
        .send<BaseCheckListItemOutDto, BaseCheckListItemOutDto>($request);
  }

  @override
  Future<Response<BaseCheckListItemOutDto>> _apiCheckListItemSlugLinkAddPost({
    required String? slug,
    required LinkCheckListItemInDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/link/add');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client
        .send<BaseCheckListItemOutDto, BaseCheckListItemOutDto>($request);
  }

  @override
  Future<Response<BaseCheckListItemOutDto>> _apiCheckListItemSlugImageAddPost({
    required String? slug,
    required ImageCheckListItemInDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/image/add');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client
        .send<BaseCheckListItemOutDto, BaseCheckListItemOutDto>($request);
  }

  @override
  Future<Response<BaseCheckListItemOutDto>>
      _apiCheckListItemSlugInventoryAddPost({
    required String? slug,
    required InventoryCheckListItemInDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/inventory/add');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client
        .send<BaseCheckListItemOutDto, BaseCheckListItemOutDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListItemSlugUpdateItemPost({
    required String? slug,
    required BaseCheckListItemOutDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/updateItem');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListItemSlugIdDelete({
    required String? slug,
    required int? id,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/${id}');
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListItemSlugIdBaseCheckPost({
    required String? slug,
    required int? id,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/${id}/base/check');
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiCheckListItemSlugBaseArrangePost({
    required String? slug,
    required RearrangeCheckListItemsInDto? body,
  }) {
    final Uri $url = Uri.parse('/api/CheckListItem/${slug}/base/arrange');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<List<Demo>>> _apiDemoGet() {
    final Uri $url = Uri.parse('/api/Demo');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<Demo>, Demo>($request);
  }

  @override
  Future<Response<dynamic>> _apiDemoPost() {
    final Uri $url = Uri.parse('/api/Demo');
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiDemoDelete() {
    final Uri $url = Uri.parse('/api/Demo');
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<Demo>> _apiDemoIdGet({required int? id}) {
    final Uri $url = Uri.parse('/api/Demo/${id}');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<Demo, Demo>($request);
  }

  @override
  Future<Response<EnvironmentOutDto>> _apiEnvironmentGet() {
    final Uri $url = Uri.parse('/api/Environment');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<EnvironmentOutDto, EnvironmentOutDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiFavoritesChecklistSlugPost({
    required String? slug,
    required UpdateFavoritesCommand? body,
  }) {
    final Uri $url = Uri.parse('/api/Favorites/checklist/${slug}');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<List<CheckListOutDto>>> _apiFavoritesChecklistGet() {
    final Uri $url = Uri.parse('/api/Favorites/checklist');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<CheckListOutDto>, CheckListOutDto>($request);
  }

  @override
  Future<Response<List<CheckListOutDto>>> _apiFavoritesInventoryGet() {
    final Uri $url = Uri.parse('/api/Favorites/inventory');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<CheckListOutDto>, CheckListOutDto>($request);
  }

  @override
  Future<Response<int>> _apiHealthCheckGet() {
    final Uri $url = Uri.parse('/api/HealthCheck');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<int, int>($request);
  }

  @override
  Future<Response<dynamic>> _apiImageStoreContextIdGuidGet({
    required int? contextId,
    required String? guid,
  }) {
    final Uri $url = Uri.parse('/api/ImageStore/${contextId}/${guid}');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<InventoryOutDto>> _apiInventoryGet(
      {required String? inventorySlug}) {
    final Uri $url = Uri.parse('/api/Inventory');
    final Map<String, dynamic> $params = <String, dynamic>{
      'inventorySlug': inventorySlug
    };
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
      parameters: $params,
    );
    return client.send<InventoryOutDto, InventoryOutDto>($request);
  }

  @override
  Future<Response<InventoryOutDto>> _apiInventoryPost(
      {required CreateInventoryCommand? body}) {
    final Uri $url = Uri.parse('/api/Inventory');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<InventoryOutDto, InventoryOutDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiInventoryDelete(
      {required DeleteInventoryCommand? body}) {
    final Uri $url = Uri.parse('/api/Inventory');
    final $body = body;
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiInventorySlugRenamePost({
    required String? slug,
    required RenameInventoryCommand? body,
  }) {
    final Uri $url = Uri.parse('/api/Inventory/${slug}/rename');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<RoomOutDto>> _apiRoomPost(
      {required CreateRoomCommand? body}) {
    final Uri $url = Uri.parse('/api/Room');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<RoomOutDto, RoomOutDto>($request);
  }

  @override
  Future<Response<List<RoomOutDto>>> _apiRoomGet() {
    final Uri $url = Uri.parse('/api/Room');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<RoomOutDto>, RoomOutDto>($request);
  }

  @override
  Future<Response<RoomOutDto>> _apiRoomSlugGet({required String? slug}) {
    final Uri $url = Uri.parse('/api/Room/${slug}');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<RoomOutDto, RoomOutDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiRoomSlugDelete({required String? slug}) {
    final Uri $url = Uri.parse('/api/Room/${slug}');
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiRoomSlugRenamePost({
    required String? slug,
    required RenameRoomCommand? body,
  }) {
    final Uri $url = Uri.parse('/api/Room/${slug}/rename');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> _apiRoomSlugRevokeDelete({
    required String? slug,
    required RevokeRoomAccessCommand? body,
  }) {
    final Uri $url = Uri.parse('/api/Room/${slug}/revoke');
    final $body = body;
    final Request $request = Request(
      'DELETE',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<SharedLinkOutDto>> _apiSharedLinkPost(
      {required SharedLinkInDto? body}) {
    final Uri $url = Uri.parse('/api/SharedLink');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<SharedLinkOutDto, SharedLinkOutDto>($request);
  }

  @override
  Future<Response<SharedLinkResolvedOutDto>> _apiSharedLinkSlugPost(
      {required String? slug}) {
    final Uri $url = Uri.parse('/api/SharedLink/${slug}');
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
    );
    return client
        .send<SharedLinkResolvedOutDto, SharedLinkResolvedOutDto>($request);
  }

  @override
  Future<Response<int>> _apiUserPost({required UserInDto? body}) {
    final Uri $url = Uri.parse('/api/User');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<int, int>($request);
  }

  @override
  Future<Response<UserStoreDto>> _apiUserStoreGet() {
    final Uri $url = Uri.parse('/api/UserStore');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<UserStoreDto, UserStoreDto>($request);
  }

  @override
  Future<Response<dynamic>> _apiUserStorePost({required UserStoreDto? body}) {
    final Uri $url = Uri.parse('/api/UserStore');
    final $body = body;
    final Request $request = Request(
      'POST',
      $url,
      client.baseUrl,
      body: $body,
    );
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<List<WeatherForecast>>> _weatherForecastGet() {
    final Uri $url = Uri.parse('/WeatherForecast');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<WeatherForecast>, WeatherForecast>($request);
  }

  @override
  Future<Response<List<WeatherForecast>>> _weatherForecastAuthGet() {
    final Uri $url = Uri.parse('/WeatherForecast/auth');
    final Request $request = Request(
      'GET',
      $url,
      client.baseUrl,
    );
    return client.send<List<WeatherForecast>, WeatherForecast>($request);
  }
}
