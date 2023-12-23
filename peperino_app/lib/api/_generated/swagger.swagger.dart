// ignore_for_file: type=lint

import 'package:json_annotation/json_annotation.dart';
import 'package:collection/collection.dart';
import 'dart:convert';

import 'package:chopper/chopper.dart';

import 'client_mapping.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:http/http.dart' show MultipartFile;
import 'package:chopper/chopper.dart' as chopper;
import 'swagger.enums.swagger.dart' as enums;
export 'swagger.enums.swagger.dart';

part 'swagger.swagger.chopper.dart';
part 'swagger.swagger.g.dart';

// **************************************************************************
// SwaggerChopperGenerator
// **************************************************************************

@ChopperApi()
abstract class Swagger extends ChopperService {
  static Swagger create({
    ChopperClient? client,
    http.Client? httpClient,
    Authenticator? authenticator,
    ErrorConverter? errorConverter,
    Converter? converter,
    Uri? baseUrl,
    Iterable<dynamic>? interceptors,
  }) {
    if (client != null) {
      return _$Swagger(client);
    }

    final newClient = ChopperClient(
        services: [_$Swagger()],
        converter: converter ?? $JsonSerializableConverter(),
        interceptors: interceptors ?? [],
        client: httpClient,
        authenticator: authenticator,
        errorConverter: errorConverter,
        baseUrl: baseUrl ?? Uri.parse('http://'));
    return _$Swagger(newClient);
  }

  ///
  ///@param listSlug
  Future<chopper.Response<CheckListOutDto>> apiCheckListGet(
      {required String? listSlug}) {
    generatedMapping.putIfAbsent(
        CheckListOutDto, () => CheckListOutDto.fromJsonFactory);

    return _apiCheckListGet(listSlug: listSlug);
  }

  ///
  ///@param listSlug
  @Get(path: '/api/CheckList')
  Future<chopper.Response<CheckListOutDto>> _apiCheckListGet(
      {@Query('listSlug') required String? listSlug});

  ///
  Future<chopper.Response<CheckListOutDto>> apiCheckListPost(
      {required CreateCheckListCommand? body}) {
    generatedMapping.putIfAbsent(
        CheckListOutDto, () => CheckListOutDto.fromJsonFactory);

    return _apiCheckListPost(body: body);
  }

  ///
  @Post(
    path: '/api/CheckList',
    optionalBody: true,
  )
  Future<chopper.Response<CheckListOutDto>> _apiCheckListPost(
      {@Body() required CreateCheckListCommand? body});

  ///
  Future<chopper.Response> apiCheckListDelete(
      {required DeleteCheckListCommand? body}) {
    return _apiCheckListDelete(body: body);
  }

  ///
  @Delete(path: '/api/CheckList')
  Future<chopper.Response> _apiCheckListDelete(
      {@Body() required DeleteCheckListCommand? body});

  ///
  ///@param slug
  Future<chopper.Response> apiCheckListSlugRenamePost({
    required String? slug,
    required RenameCheckListCommand? body,
  }) {
    return _apiCheckListSlugRenamePost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckList/{slug}/rename',
    optionalBody: true,
  )
  Future<chopper.Response> _apiCheckListSlugRenamePost({
    @Path('slug') required String? slug,
    @Body() required RenameCheckListCommand? body,
  });

  ///
  ///@param slug
  Future<chopper.Response<BaseCheckListItemOutDto>>
      apiCheckListItemSlugTextAddPost({
    required String? slug,
    required TextCheckListItemInDto? body,
  }) {
    generatedMapping.putIfAbsent(
        BaseCheckListItemOutDto, () => BaseCheckListItemOutDto.fromJsonFactory);

    return _apiCheckListItemSlugTextAddPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/text/add',
    optionalBody: true,
  )
  Future<chopper.Response<BaseCheckListItemOutDto>>
      _apiCheckListItemSlugTextAddPost({
    @Path('slug') required String? slug,
    @Body() required TextCheckListItemInDto? body,
  });

  ///
  ///@param slug
  Future<chopper.Response<BaseCheckListItemOutDto>>
      apiCheckListItemSlugLinkAddPost({
    required String? slug,
    required LinkCheckListItemInDto? body,
  }) {
    generatedMapping.putIfAbsent(
        BaseCheckListItemOutDto, () => BaseCheckListItemOutDto.fromJsonFactory);

    return _apiCheckListItemSlugLinkAddPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/link/add',
    optionalBody: true,
  )
  Future<chopper.Response<BaseCheckListItemOutDto>>
      _apiCheckListItemSlugLinkAddPost({
    @Path('slug') required String? slug,
    @Body() required LinkCheckListItemInDto? body,
  });

  ///
  ///@param slug
  Future<chopper.Response<BaseCheckListItemOutDto>>
      apiCheckListItemSlugImageAddPost({
    required String? slug,
    required ImageCheckListItemInDto? body,
  }) {
    generatedMapping.putIfAbsent(
        BaseCheckListItemOutDto, () => BaseCheckListItemOutDto.fromJsonFactory);

    return _apiCheckListItemSlugImageAddPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/image/add',
    optionalBody: true,
  )
  Future<chopper.Response<BaseCheckListItemOutDto>>
      _apiCheckListItemSlugImageAddPost({
    @Path('slug') required String? slug,
    @Body() required ImageCheckListItemInDto? body,
  });

  ///
  ///@param slug
  Future<chopper.Response<BaseCheckListItemOutDto>>
      apiCheckListItemSlugInventoryAddPost({
    required String? slug,
    required InventoryCheckListItemInDto? body,
  }) {
    generatedMapping.putIfAbsent(
        BaseCheckListItemOutDto, () => BaseCheckListItemOutDto.fromJsonFactory);

    return _apiCheckListItemSlugInventoryAddPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/inventory/add',
    optionalBody: true,
  )
  Future<chopper.Response<BaseCheckListItemOutDto>>
      _apiCheckListItemSlugInventoryAddPost({
    @Path('slug') required String? slug,
    @Body() required InventoryCheckListItemInDto? body,
  });

  ///
  ///@param slug
  Future<chopper.Response> apiCheckListItemSlugUpdateItemPost({
    required String? slug,
    required BaseCheckListItemOutDto? body,
  }) {
    return _apiCheckListItemSlugUpdateItemPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/updateItem',
    optionalBody: true,
  )
  Future<chopper.Response> _apiCheckListItemSlugUpdateItemPost({
    @Path('slug') required String? slug,
    @Body() required BaseCheckListItemOutDto? body,
  });

  ///
  ///@param slug
  ///@param id
  Future<chopper.Response> apiCheckListItemSlugIdDelete({
    required String? slug,
    required int? id,
  }) {
    return _apiCheckListItemSlugIdDelete(slug: slug, id: id);
  }

  ///
  ///@param slug
  ///@param id
  @Delete(path: '/api/CheckListItem/{slug}/{id}')
  Future<chopper.Response> _apiCheckListItemSlugIdDelete({
    @Path('slug') required String? slug,
    @Path('id') required int? id,
  });

  ///
  ///@param slug
  ///@param id
  Future<chopper.Response> apiCheckListItemSlugIdBaseCheckPost({
    required String? slug,
    required int? id,
  }) {
    return _apiCheckListItemSlugIdBaseCheckPost(slug: slug, id: id);
  }

  ///
  ///@param slug
  ///@param id
  @Post(
    path: '/api/CheckListItem/{slug}/{id}/base/check',
    optionalBody: true,
  )
  Future<chopper.Response> _apiCheckListItemSlugIdBaseCheckPost({
    @Path('slug') required String? slug,
    @Path('id') required int? id,
  });

  ///
  ///@param slug
  Future<chopper.Response> apiCheckListItemSlugBaseArrangePost({
    required String? slug,
    required RearrangeCheckListItemsInDto? body,
  }) {
    return _apiCheckListItemSlugBaseArrangePost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/CheckListItem/{slug}/base/arrange',
    optionalBody: true,
  )
  Future<chopper.Response> _apiCheckListItemSlugBaseArrangePost({
    @Path('slug') required String? slug,
    @Body() required RearrangeCheckListItemsInDto? body,
  });

  ///
  Future<chopper.Response<List<Demo>>> apiDemoGet() {
    generatedMapping.putIfAbsent(Demo, () => Demo.fromJsonFactory);

    return _apiDemoGet();
  }

  ///
  @Get(path: '/api/Demo')
  Future<chopper.Response<List<Demo>>> _apiDemoGet();

  ///
  Future<chopper.Response> apiDemoPost() {
    return _apiDemoPost();
  }

  ///
  @Post(
    path: '/api/Demo',
    optionalBody: true,
  )
  Future<chopper.Response> _apiDemoPost();

  ///
  Future<chopper.Response> apiDemoDelete() {
    return _apiDemoDelete();
  }

  ///
  @Delete(path: '/api/Demo')
  Future<chopper.Response> _apiDemoDelete();

  ///
  ///@param id
  Future<chopper.Response<Demo>> apiDemoIdGet({required int? id}) {
    generatedMapping.putIfAbsent(Demo, () => Demo.fromJsonFactory);

    return _apiDemoIdGet(id: id);
  }

  ///
  ///@param id
  @Get(path: '/api/Demo/{id}')
  Future<chopper.Response<Demo>> _apiDemoIdGet({@Path('id') required int? id});

  ///
  Future<chopper.Response<EnvironmentOutDto>> apiEnvironmentGet() {
    generatedMapping.putIfAbsent(
        EnvironmentOutDto, () => EnvironmentOutDto.fromJsonFactory);

    return _apiEnvironmentGet();
  }

  ///
  @Get(path: '/api/Environment')
  Future<chopper.Response<EnvironmentOutDto>> _apiEnvironmentGet();

  ///
  ///@param slug
  Future<chopper.Response> apiFavoritesChecklistSlugPost({
    required String? slug,
    required UpdateFavoritesCommand? body,
  }) {
    return _apiFavoritesChecklistSlugPost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/Favorites/checklist/{slug}',
    optionalBody: true,
  )
  Future<chopper.Response> _apiFavoritesChecklistSlugPost({
    @Path('slug') required String? slug,
    @Body() required UpdateFavoritesCommand? body,
  });

  ///
  Future<chopper.Response<List<CheckListOutDto>>> apiFavoritesChecklistGet() {
    generatedMapping.putIfAbsent(
        CheckListOutDto, () => CheckListOutDto.fromJsonFactory);

    return _apiFavoritesChecklistGet();
  }

  ///
  @Get(path: '/api/Favorites/checklist')
  Future<chopper.Response<List<CheckListOutDto>>> _apiFavoritesChecklistGet();

  ///
  Future<chopper.Response<List<CheckListOutDto>>> apiFavoritesInventoryGet() {
    generatedMapping.putIfAbsent(
        CheckListOutDto, () => CheckListOutDto.fromJsonFactory);

    return _apiFavoritesInventoryGet();
  }

  ///
  @Get(path: '/api/Favorites/inventory')
  Future<chopper.Response<List<CheckListOutDto>>> _apiFavoritesInventoryGet();

  ///
  Future<chopper.Response<int>> apiHealthCheckGet() {
    return _apiHealthCheckGet();
  }

  ///
  @Get(path: '/api/HealthCheck')
  Future<chopper.Response<int>> _apiHealthCheckGet();

  ///
  ///@param contextId
  ///@param guid
  Future<chopper.Response> apiImageStoreContextIdGuidGet({
    required int? contextId,
    required String? guid,
  }) {
    return _apiImageStoreContextIdGuidGet(contextId: contextId, guid: guid);
  }

  ///
  ///@param contextId
  ///@param guid
  @Get(path: '/api/ImageStore/{contextId}/{guid}')
  Future<chopper.Response> _apiImageStoreContextIdGuidGet({
    @Path('contextId') required int? contextId,
    @Path('guid') required String? guid,
  });

  ///
  ///@param inventorySlug
  Future<chopper.Response<InventoryOutDto>> apiInventoryGet(
      {required String? inventorySlug}) {
    generatedMapping.putIfAbsent(
        InventoryOutDto, () => InventoryOutDto.fromJsonFactory);

    return _apiInventoryGet(inventorySlug: inventorySlug);
  }

  ///
  ///@param inventorySlug
  @Get(path: '/api/Inventory')
  Future<chopper.Response<InventoryOutDto>> _apiInventoryGet(
      {@Query('inventorySlug') required String? inventorySlug});

  ///
  Future<chopper.Response<InventoryOutDto>> apiInventoryPost(
      {required CreateInventoryCommand? body}) {
    generatedMapping.putIfAbsent(
        InventoryOutDto, () => InventoryOutDto.fromJsonFactory);

    return _apiInventoryPost(body: body);
  }

  ///
  @Post(
    path: '/api/Inventory',
    optionalBody: true,
  )
  Future<chopper.Response<InventoryOutDto>> _apiInventoryPost(
      {@Body() required CreateInventoryCommand? body});

  ///
  Future<chopper.Response> apiInventoryDelete(
      {required DeleteInventoryCommand? body}) {
    return _apiInventoryDelete(body: body);
  }

  ///
  @Delete(path: '/api/Inventory')
  Future<chopper.Response> _apiInventoryDelete(
      {@Body() required DeleteInventoryCommand? body});

  ///
  ///@param slug
  Future<chopper.Response> apiInventorySlugRenamePost({
    required String? slug,
    required RenameInventoryCommand? body,
  }) {
    return _apiInventorySlugRenamePost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/Inventory/{slug}/rename',
    optionalBody: true,
  )
  Future<chopper.Response> _apiInventorySlugRenamePost({
    @Path('slug') required String? slug,
    @Body() required RenameInventoryCommand? body,
  });

  ///
  Future<chopper.Response<RoomOutDto>> apiRoomPost(
      {required CreateRoomCommand? body}) {
    generatedMapping.putIfAbsent(RoomOutDto, () => RoomOutDto.fromJsonFactory);

    return _apiRoomPost(body: body);
  }

  ///
  @Post(
    path: '/api/Room',
    optionalBody: true,
  )
  Future<chopper.Response<RoomOutDto>> _apiRoomPost(
      {@Body() required CreateRoomCommand? body});

  ///
  Future<chopper.Response<List<RoomOutDto>>> apiRoomGet() {
    generatedMapping.putIfAbsent(RoomOutDto, () => RoomOutDto.fromJsonFactory);

    return _apiRoomGet();
  }

  ///
  @Get(path: '/api/Room')
  Future<chopper.Response<List<RoomOutDto>>> _apiRoomGet();

  ///
  ///@param slug
  Future<chopper.Response<RoomOutDto>> apiRoomSlugGet({required String? slug}) {
    generatedMapping.putIfAbsent(RoomOutDto, () => RoomOutDto.fromJsonFactory);

    return _apiRoomSlugGet(slug: slug);
  }

  ///
  ///@param slug
  @Get(path: '/api/Room/{slug}')
  Future<chopper.Response<RoomOutDto>> _apiRoomSlugGet(
      {@Path('slug') required String? slug});

  ///
  ///@param slug
  Future<chopper.Response> apiRoomSlugDelete({required String? slug}) {
    return _apiRoomSlugDelete(slug: slug);
  }

  ///
  ///@param slug
  @Delete(path: '/api/Room/{slug}')
  Future<chopper.Response> _apiRoomSlugDelete(
      {@Path('slug') required String? slug});

  ///
  ///@param slug
  Future<chopper.Response> apiRoomSlugRenamePost({
    required String? slug,
    required RenameRoomCommand? body,
  }) {
    return _apiRoomSlugRenamePost(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/Room/{slug}/rename',
    optionalBody: true,
  )
  Future<chopper.Response> _apiRoomSlugRenamePost({
    @Path('slug') required String? slug,
    @Body() required RenameRoomCommand? body,
  });

  ///
  ///@param slug
  Future<chopper.Response> apiRoomSlugRevokeDelete({
    required String? slug,
    required RevokeRoomAccessCommand? body,
  }) {
    return _apiRoomSlugRevokeDelete(slug: slug, body: body);
  }

  ///
  ///@param slug
  @Delete(path: '/api/Room/{slug}/revoke')
  Future<chopper.Response> _apiRoomSlugRevokeDelete({
    @Path('slug') required String? slug,
    @Body() required RevokeRoomAccessCommand? body,
  });

  ///
  Future<chopper.Response<SharedLinkOutDto>> apiSharedLinkPost(
      {required SharedLinkInDto? body}) {
    generatedMapping.putIfAbsent(
        SharedLinkOutDto, () => SharedLinkOutDto.fromJsonFactory);

    return _apiSharedLinkPost(body: body);
  }

  ///
  @Post(
    path: '/api/SharedLink',
    optionalBody: true,
  )
  Future<chopper.Response<SharedLinkOutDto>> _apiSharedLinkPost(
      {@Body() required SharedLinkInDto? body});

  ///
  ///@param slug
  Future<chopper.Response<SharedLinkResolvedOutDto>> apiSharedLinkSlugPost(
      {required String? slug}) {
    generatedMapping.putIfAbsent(SharedLinkResolvedOutDto,
        () => SharedLinkResolvedOutDto.fromJsonFactory);

    return _apiSharedLinkSlugPost(slug: slug);
  }

  ///
  ///@param slug
  @Post(
    path: '/api/SharedLink/{slug}',
    optionalBody: true,
  )
  Future<chopper.Response<SharedLinkResolvedOutDto>> _apiSharedLinkSlugPost(
      {@Path('slug') required String? slug});

  ///
  Future<chopper.Response<int>> apiUserPost({required UserInDto? body}) {
    return _apiUserPost(body: body);
  }

  ///
  @Post(
    path: '/api/User',
    optionalBody: true,
  )
  Future<chopper.Response<int>> _apiUserPost(
      {@Body() required UserInDto? body});

  ///
  Future<chopper.Response<UserStoreDto>> apiUserStoreGet() {
    generatedMapping.putIfAbsent(
        UserStoreDto, () => UserStoreDto.fromJsonFactory);

    return _apiUserStoreGet();
  }

  ///
  @Get(path: '/api/UserStore')
  Future<chopper.Response<UserStoreDto>> _apiUserStoreGet();

  ///
  Future<chopper.Response> apiUserStorePost({required UserStoreDto? body}) {
    return _apiUserStorePost(body: body);
  }

  ///
  @Post(
    path: '/api/UserStore',
    optionalBody: true,
  )
  Future<chopper.Response> _apiUserStorePost(
      {@Body() required UserStoreDto? body});

  ///
  Future<chopper.Response<List<WeatherForecast>>> weatherForecastGet() {
    generatedMapping.putIfAbsent(
        WeatherForecast, () => WeatherForecast.fromJsonFactory);

    return _weatherForecastGet();
  }

  ///
  @Get(path: '/WeatherForecast')
  Future<chopper.Response<List<WeatherForecast>>> _weatherForecastGet();

  ///
  Future<chopper.Response<List<WeatherForecast>>> weatherForecastAuthGet() {
    generatedMapping.putIfAbsent(
        WeatherForecast, () => WeatherForecast.fromJsonFactory);

    return _weatherForecastAuthGet();
  }

  ///
  @Get(path: '/WeatherForecast/auth')
  Future<chopper.Response<List<WeatherForecast>>> _weatherForecastAuthGet();
}

@JsonSerializable(explicitToJson: true)
class ArrangeItemInDto {
  const ArrangeItemInDto({
    required this.id,
    required this.sortIndex,
  });

  factory ArrangeItemInDto.fromJson(Map<String, dynamic> json) =>
      _$ArrangeItemInDtoFromJson(json);

  static const toJsonFactory = _$ArrangeItemInDtoToJson;
  Map<String, dynamic> toJson() => _$ArrangeItemInDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  static const fromJsonFactory = _$ArrangeItemInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ArrangeItemInDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      runtimeType.hashCode;
}

extension $ArrangeItemInDtoExtension on ArrangeItemInDto {
  ArrangeItemInDto copyWith({int? id, int? sortIndex}) {
    return ArrangeItemInDto(
        id: id ?? this.id, sortIndex: sortIndex ?? this.sortIndex);
  }

  ArrangeItemInDto copyWithWrapped(
      {Wrapped<int>? id, Wrapped<int>? sortIndex}) {
    return ArrangeItemInDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex));
  }
}

@JsonSerializable(explicitToJson: true)
class BaseCheckListItemOutDto {
  const BaseCheckListItemOutDto({
    required this.id,
    required this.sortIndex,
    required this.checked,
    required this.itemType,
    this.$type,
  });

  factory BaseCheckListItemOutDto.fromJson(Map<String, dynamic> json) =>
      _$BaseCheckListItemOutDtoFromJson(json);

  static const toJsonFactory = _$BaseCheckListItemOutDtoToJson;
  Map<String, dynamic> toJson() => _$BaseCheckListItemOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  @JsonKey(name: 'checked')
  final bool checked;
  @JsonKey(name: 'itemType')
  final CheckListItemTypeOutDto itemType;
  @JsonKey(name: '\$type')
  final String? $type;
  static const fromJsonFactory = _$BaseCheckListItemOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is BaseCheckListItemOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)) &&
            (identical(other.checked, checked) ||
                const DeepCollectionEquality()
                    .equals(other.checked, checked)) &&
            (identical(other.itemType, itemType) ||
                const DeepCollectionEquality()
                    .equals(other.itemType, itemType)) &&
            (identical(other.$type, $type) ||
                const DeepCollectionEquality().equals(other.$type, $type)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      const DeepCollectionEquality().hash(checked) ^
      const DeepCollectionEquality().hash(itemType) ^
      const DeepCollectionEquality().hash($type) ^
      runtimeType.hashCode;
}

extension $BaseCheckListItemOutDtoExtension on BaseCheckListItemOutDto {
  BaseCheckListItemOutDto copyWith(
      {int? id,
      int? sortIndex,
      bool? checked,
      CheckListItemTypeOutDto? itemType,
      String? $type}) {
    return BaseCheckListItemOutDto(
        id: id ?? this.id,
        sortIndex: sortIndex ?? this.sortIndex,
        checked: checked ?? this.checked,
        itemType: itemType ?? this.itemType,
        $type: $type ?? this.$type);
  }

  BaseCheckListItemOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<int>? sortIndex,
      Wrapped<bool>? checked,
      Wrapped<CheckListItemTypeOutDto>? itemType,
      Wrapped<String?>? $type}) {
    return BaseCheckListItemOutDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex),
        checked: (checked != null ? checked.value : this.checked),
        itemType: (itemType != null ? itemType.value : this.itemType),
        $type: ($type != null ? $type.value : this.$type));
  }
}

@JsonSerializable(explicitToJson: true)
class BaseOwnableEntity {
  const BaseOwnableEntity({
    this.id,
    this.events,
    this.created,
    this.createdBy,
    this.lastModified,
    this.lastModifiedBy,
    this.userAccess,
    this.groupAccess,
  });

  factory BaseOwnableEntity.fromJson(Map<String, dynamic> json) =>
      _$BaseOwnableEntityFromJson(json);

  static const toJsonFactory = _$BaseOwnableEntityToJson;
  Map<String, dynamic> toJson() => _$BaseOwnableEntityToJson(this);

  @JsonKey(name: 'id')
  final int? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'created')
  final DateTime? created;
  @JsonKey(name: 'createdBy')
  final User? createdBy;
  @JsonKey(name: 'lastModified')
  final DateTime? lastModified;
  @JsonKey(name: 'lastModifiedBy')
  final User? lastModifiedBy;
  @JsonKey(name: 'userAccess', defaultValue: <UserAccess>[])
  final List<UserAccess>? userAccess;
  @JsonKey(name: 'groupAccess', defaultValue: <GroupAccess>[])
  final List<GroupAccess>? groupAccess;
  static const fromJsonFactory = _$BaseOwnableEntityFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is BaseOwnableEntity &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.created, created) ||
                const DeepCollectionEquality()
                    .equals(other.created, created)) &&
            (identical(other.createdBy, createdBy) ||
                const DeepCollectionEquality()
                    .equals(other.createdBy, createdBy)) &&
            (identical(other.lastModified, lastModified) ||
                const DeepCollectionEquality()
                    .equals(other.lastModified, lastModified)) &&
            (identical(other.lastModifiedBy, lastModifiedBy) ||
                const DeepCollectionEquality()
                    .equals(other.lastModifiedBy, lastModifiedBy)) &&
            (identical(other.userAccess, userAccess) ||
                const DeepCollectionEquality()
                    .equals(other.userAccess, userAccess)) &&
            (identical(other.groupAccess, groupAccess) ||
                const DeepCollectionEquality()
                    .equals(other.groupAccess, groupAccess)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(created) ^
      const DeepCollectionEquality().hash(createdBy) ^
      const DeepCollectionEquality().hash(lastModified) ^
      const DeepCollectionEquality().hash(lastModifiedBy) ^
      const DeepCollectionEquality().hash(userAccess) ^
      const DeepCollectionEquality().hash(groupAccess) ^
      runtimeType.hashCode;
}

extension $BaseOwnableEntityExtension on BaseOwnableEntity {
  BaseOwnableEntity copyWith(
      {int? id,
      List<INotification>? events,
      DateTime? created,
      User? createdBy,
      DateTime? lastModified,
      User? lastModifiedBy,
      List<UserAccess>? userAccess,
      List<GroupAccess>? groupAccess}) {
    return BaseOwnableEntity(
        id: id ?? this.id,
        events: events ?? this.events,
        created: created ?? this.created,
        createdBy: createdBy ?? this.createdBy,
        lastModified: lastModified ?? this.lastModified,
        lastModifiedBy: lastModifiedBy ?? this.lastModifiedBy,
        userAccess: userAccess ?? this.userAccess,
        groupAccess: groupAccess ?? this.groupAccess);
  }

  BaseOwnableEntity copyWithWrapped(
      {Wrapped<int?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<DateTime?>? created,
      Wrapped<User?>? createdBy,
      Wrapped<DateTime?>? lastModified,
      Wrapped<User?>? lastModifiedBy,
      Wrapped<List<UserAccess>?>? userAccess,
      Wrapped<List<GroupAccess>?>? groupAccess}) {
    return BaseOwnableEntity(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        created: (created != null ? created.value : this.created),
        createdBy: (createdBy != null ? createdBy.value : this.createdBy),
        lastModified:
            (lastModified != null ? lastModified.value : this.lastModified),
        lastModifiedBy: (lastModifiedBy != null
            ? lastModifiedBy.value
            : this.lastModifiedBy),
        userAccess: (userAccess != null ? userAccess.value : this.userAccess),
        groupAccess:
            (groupAccess != null ? groupAccess.value : this.groupAccess));
  }
}

@JsonSerializable(explicitToJson: true)
class CheckListItemTypeOutDto {
  const CheckListItemTypeOutDto({
    this.name,
    this.description,
    required this.variant,
  });

  factory CheckListItemTypeOutDto.fromJson(Map<String, dynamic> json) =>
      _$CheckListItemTypeOutDtoFromJson(json);

  static const toJsonFactory = _$CheckListItemTypeOutDtoToJson;
  Map<String, dynamic> toJson() => _$CheckListItemTypeOutDtoToJson(this);

  @JsonKey(name: 'name')
  final String? name;
  @JsonKey(name: 'description')
  final String? description;
  @JsonKey(
    name: 'variant',
    toJson: itemVariantToJson,
    fromJson: itemVariantFromJson,
  )
  final enums.ItemVariant variant;
  static const fromJsonFactory = _$CheckListItemTypeOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is CheckListItemTypeOutDto &&
            (identical(other.name, name) ||
                const DeepCollectionEquality().equals(other.name, name)) &&
            (identical(other.description, description) ||
                const DeepCollectionEquality()
                    .equals(other.description, description)) &&
            (identical(other.variant, variant) ||
                const DeepCollectionEquality().equals(other.variant, variant)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(name) ^
      const DeepCollectionEquality().hash(description) ^
      const DeepCollectionEquality().hash(variant) ^
      runtimeType.hashCode;
}

extension $CheckListItemTypeOutDtoExtension on CheckListItemTypeOutDto {
  CheckListItemTypeOutDto copyWith(
      {String? name, String? description, enums.ItemVariant? variant}) {
    return CheckListItemTypeOutDto(
        name: name ?? this.name,
        description: description ?? this.description,
        variant: variant ?? this.variant);
  }

  CheckListItemTypeOutDto copyWithWrapped(
      {Wrapped<String?>? name,
      Wrapped<String?>? description,
      Wrapped<enums.ItemVariant>? variant}) {
    return CheckListItemTypeOutDto(
        name: (name != null ? name.value : this.name),
        description:
            (description != null ? description.value : this.description),
        variant: (variant != null ? variant.value : this.variant));
  }
}

@JsonSerializable(explicitToJson: true)
class CheckListOutDto {
  const CheckListOutDto({
    required this.id,
    required this.room,
    required this.name,
    required this.slug,
    required this.entities,
    required this.accessLevel,
    required this.isFavorite,
  });

  factory CheckListOutDto.fromJson(Map<String, dynamic> json) =>
      _$CheckListOutDtoFromJson(json);

  static const toJsonFactory = _$CheckListOutDtoToJson;
  Map<String, dynamic> toJson() => _$CheckListOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'room')
  final RoomOutDto room;
  @JsonKey(name: 'name')
  final String name;
  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'entities', defaultValue: <BaseCheckListItemOutDto>[])
  final List<BaseCheckListItemOutDto> entities;
  @JsonKey(
    name: 'accessLevel',
    toJson: accessLevelToJson,
    fromJson: accessLevelFromJson,
  )
  final enums.AccessLevel accessLevel;
  @JsonKey(name: 'isFavorite')
  final bool isFavorite;
  static const fromJsonFactory = _$CheckListOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is CheckListOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.room, room) ||
                const DeepCollectionEquality().equals(other.room, room)) &&
            (identical(other.name, name) ||
                const DeepCollectionEquality().equals(other.name, name)) &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.entities, entities) ||
                const DeepCollectionEquality()
                    .equals(other.entities, entities)) &&
            (identical(other.accessLevel, accessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.accessLevel, accessLevel)) &&
            (identical(other.isFavorite, isFavorite) ||
                const DeepCollectionEquality()
                    .equals(other.isFavorite, isFavorite)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(room) ^
      const DeepCollectionEquality().hash(name) ^
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(entities) ^
      const DeepCollectionEquality().hash(accessLevel) ^
      const DeepCollectionEquality().hash(isFavorite) ^
      runtimeType.hashCode;
}

extension $CheckListOutDtoExtension on CheckListOutDto {
  CheckListOutDto copyWith(
      {int? id,
      RoomOutDto? room,
      String? name,
      String? slug,
      List<BaseCheckListItemOutDto>? entities,
      enums.AccessLevel? accessLevel,
      bool? isFavorite}) {
    return CheckListOutDto(
        id: id ?? this.id,
        room: room ?? this.room,
        name: name ?? this.name,
        slug: slug ?? this.slug,
        entities: entities ?? this.entities,
        accessLevel: accessLevel ?? this.accessLevel,
        isFavorite: isFavorite ?? this.isFavorite);
  }

  CheckListOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<RoomOutDto>? room,
      Wrapped<String>? name,
      Wrapped<String>? slug,
      Wrapped<List<BaseCheckListItemOutDto>>? entities,
      Wrapped<enums.AccessLevel>? accessLevel,
      Wrapped<bool>? isFavorite}) {
    return CheckListOutDto(
        id: (id != null ? id.value : this.id),
        room: (room != null ? room.value : this.room),
        name: (name != null ? name.value : this.name),
        slug: (slug != null ? slug.value : this.slug),
        entities: (entities != null ? entities.value : this.entities),
        accessLevel:
            (accessLevel != null ? accessLevel.value : this.accessLevel),
        isFavorite: (isFavorite != null ? isFavorite.value : this.isFavorite));
  }
}

@JsonSerializable(explicitToJson: true)
class CreateCheckListCommand {
  const CreateCheckListCommand({
    required this.name,
    required this.roomSlug,
  });

  factory CreateCheckListCommand.fromJson(Map<String, dynamic> json) =>
      _$CreateCheckListCommandFromJson(json);

  static const toJsonFactory = _$CreateCheckListCommandToJson;
  Map<String, dynamic> toJson() => _$CreateCheckListCommandToJson(this);

  @JsonKey(name: 'name')
  final String name;
  @JsonKey(name: 'roomSlug')
  final String roomSlug;
  static const fromJsonFactory = _$CreateCheckListCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is CreateCheckListCommand &&
            (identical(other.name, name) ||
                const DeepCollectionEquality().equals(other.name, name)) &&
            (identical(other.roomSlug, roomSlug) ||
                const DeepCollectionEquality()
                    .equals(other.roomSlug, roomSlug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(name) ^
      const DeepCollectionEquality().hash(roomSlug) ^
      runtimeType.hashCode;
}

extension $CreateCheckListCommandExtension on CreateCheckListCommand {
  CreateCheckListCommand copyWith({String? name, String? roomSlug}) {
    return CreateCheckListCommand(
        name: name ?? this.name, roomSlug: roomSlug ?? this.roomSlug);
  }

  CreateCheckListCommand copyWithWrapped(
      {Wrapped<String>? name, Wrapped<String>? roomSlug}) {
    return CreateCheckListCommand(
        name: (name != null ? name.value : this.name),
        roomSlug: (roomSlug != null ? roomSlug.value : this.roomSlug));
  }
}

@JsonSerializable(explicitToJson: true)
class CreateInventoryCommand {
  const CreateInventoryCommand({
    required this.name,
    required this.roomSlug,
  });

  factory CreateInventoryCommand.fromJson(Map<String, dynamic> json) =>
      _$CreateInventoryCommandFromJson(json);

  static const toJsonFactory = _$CreateInventoryCommandToJson;
  Map<String, dynamic> toJson() => _$CreateInventoryCommandToJson(this);

  @JsonKey(name: 'name')
  final String name;
  @JsonKey(name: 'roomSlug')
  final String roomSlug;
  static const fromJsonFactory = _$CreateInventoryCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is CreateInventoryCommand &&
            (identical(other.name, name) ||
                const DeepCollectionEquality().equals(other.name, name)) &&
            (identical(other.roomSlug, roomSlug) ||
                const DeepCollectionEquality()
                    .equals(other.roomSlug, roomSlug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(name) ^
      const DeepCollectionEquality().hash(roomSlug) ^
      runtimeType.hashCode;
}

extension $CreateInventoryCommandExtension on CreateInventoryCommand {
  CreateInventoryCommand copyWith({String? name, String? roomSlug}) {
    return CreateInventoryCommand(
        name: name ?? this.name, roomSlug: roomSlug ?? this.roomSlug);
  }

  CreateInventoryCommand copyWithWrapped(
      {Wrapped<String>? name, Wrapped<String>? roomSlug}) {
    return CreateInventoryCommand(
        name: (name != null ? name.value : this.name),
        roomSlug: (roomSlug != null ? roomSlug.value : this.roomSlug));
  }
}

@JsonSerializable(explicitToJson: true)
class CreateRoomCommand {
  const CreateRoomCommand({
    required this.roomName,
  });

  factory CreateRoomCommand.fromJson(Map<String, dynamic> json) =>
      _$CreateRoomCommandFromJson(json);

  static const toJsonFactory = _$CreateRoomCommandToJson;
  Map<String, dynamic> toJson() => _$CreateRoomCommandToJson(this);

  @JsonKey(name: 'roomName')
  final String roomName;
  static const fromJsonFactory = _$CreateRoomCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is CreateRoomCommand &&
            (identical(other.roomName, roomName) ||
                const DeepCollectionEquality()
                    .equals(other.roomName, roomName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(roomName) ^ runtimeType.hashCode;
}

extension $CreateRoomCommandExtension on CreateRoomCommand {
  CreateRoomCommand copyWith({String? roomName}) {
    return CreateRoomCommand(roomName: roomName ?? this.roomName);
  }

  CreateRoomCommand copyWithWrapped({Wrapped<String>? roomName}) {
    return CreateRoomCommand(
        roomName: (roomName != null ? roomName.value : this.roomName));
  }
}

@JsonSerializable(explicitToJson: true)
class DeleteCheckListCommand {
  const DeleteCheckListCommand({
    required this.checkListSlug,
  });

  factory DeleteCheckListCommand.fromJson(Map<String, dynamic> json) =>
      _$DeleteCheckListCommandFromJson(json);

  static const toJsonFactory = _$DeleteCheckListCommandToJson;
  Map<String, dynamic> toJson() => _$DeleteCheckListCommandToJson(this);

  @JsonKey(name: 'checkListSlug')
  final String checkListSlug;
  static const fromJsonFactory = _$DeleteCheckListCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is DeleteCheckListCommand &&
            (identical(other.checkListSlug, checkListSlug) ||
                const DeepCollectionEquality()
                    .equals(other.checkListSlug, checkListSlug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(checkListSlug) ^ runtimeType.hashCode;
}

extension $DeleteCheckListCommandExtension on DeleteCheckListCommand {
  DeleteCheckListCommand copyWith({String? checkListSlug}) {
    return DeleteCheckListCommand(
        checkListSlug: checkListSlug ?? this.checkListSlug);
  }

  DeleteCheckListCommand copyWithWrapped({Wrapped<String>? checkListSlug}) {
    return DeleteCheckListCommand(
        checkListSlug:
            (checkListSlug != null ? checkListSlug.value : this.checkListSlug));
  }
}

@JsonSerializable(explicitToJson: true)
class DeleteInventoryCommand {
  const DeleteInventoryCommand({
    required this.inventorySlug,
  });

  factory DeleteInventoryCommand.fromJson(Map<String, dynamic> json) =>
      _$DeleteInventoryCommandFromJson(json);

  static const toJsonFactory = _$DeleteInventoryCommandToJson;
  Map<String, dynamic> toJson() => _$DeleteInventoryCommandToJson(this);

  @JsonKey(name: 'inventorySlug')
  final String inventorySlug;
  static const fromJsonFactory = _$DeleteInventoryCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is DeleteInventoryCommand &&
            (identical(other.inventorySlug, inventorySlug) ||
                const DeepCollectionEquality()
                    .equals(other.inventorySlug, inventorySlug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(inventorySlug) ^ runtimeType.hashCode;
}

extension $DeleteInventoryCommandExtension on DeleteInventoryCommand {
  DeleteInventoryCommand copyWith({String? inventorySlug}) {
    return DeleteInventoryCommand(
        inventorySlug: inventorySlug ?? this.inventorySlug);
  }

  DeleteInventoryCommand copyWithWrapped({Wrapped<String>? inventorySlug}) {
    return DeleteInventoryCommand(
        inventorySlug:
            (inventorySlug != null ? inventorySlug.value : this.inventorySlug));
  }
}

@JsonSerializable(explicitToJson: true)
class Demo {
  const Demo({
    this.id,
    this.events,
    this.created,
    this.createdBy,
    this.lastModified,
    this.lastModifiedBy,
    this.userAccess,
    this.groupAccess,
    this.value,
  });

  factory Demo.fromJson(Map<String, dynamic> json) => _$DemoFromJson(json);

  static const toJsonFactory = _$DemoToJson;
  Map<String, dynamic> toJson() => _$DemoToJson(this);

  @JsonKey(name: 'id')
  final int? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'created')
  final DateTime? created;
  @JsonKey(name: 'createdBy')
  final User? createdBy;
  @JsonKey(name: 'lastModified')
  final DateTime? lastModified;
  @JsonKey(name: 'lastModifiedBy')
  final User? lastModifiedBy;
  @JsonKey(name: 'userAccess', defaultValue: <UserAccess>[])
  final List<UserAccess>? userAccess;
  @JsonKey(name: 'groupAccess', defaultValue: <GroupAccess>[])
  final List<GroupAccess>? groupAccess;
  @JsonKey(name: 'value')
  final String? value;
  static const fromJsonFactory = _$DemoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is Demo &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.created, created) ||
                const DeepCollectionEquality()
                    .equals(other.created, created)) &&
            (identical(other.createdBy, createdBy) ||
                const DeepCollectionEquality()
                    .equals(other.createdBy, createdBy)) &&
            (identical(other.lastModified, lastModified) ||
                const DeepCollectionEquality()
                    .equals(other.lastModified, lastModified)) &&
            (identical(other.lastModifiedBy, lastModifiedBy) ||
                const DeepCollectionEquality()
                    .equals(other.lastModifiedBy, lastModifiedBy)) &&
            (identical(other.userAccess, userAccess) ||
                const DeepCollectionEquality()
                    .equals(other.userAccess, userAccess)) &&
            (identical(other.groupAccess, groupAccess) ||
                const DeepCollectionEquality()
                    .equals(other.groupAccess, groupAccess)) &&
            (identical(other.value, value) ||
                const DeepCollectionEquality().equals(other.value, value)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(created) ^
      const DeepCollectionEquality().hash(createdBy) ^
      const DeepCollectionEquality().hash(lastModified) ^
      const DeepCollectionEquality().hash(lastModifiedBy) ^
      const DeepCollectionEquality().hash(userAccess) ^
      const DeepCollectionEquality().hash(groupAccess) ^
      const DeepCollectionEquality().hash(value) ^
      runtimeType.hashCode;
}

extension $DemoExtension on Demo {
  Demo copyWith(
      {int? id,
      List<INotification>? events,
      DateTime? created,
      User? createdBy,
      DateTime? lastModified,
      User? lastModifiedBy,
      List<UserAccess>? userAccess,
      List<GroupAccess>? groupAccess,
      String? value}) {
    return Demo(
        id: id ?? this.id,
        events: events ?? this.events,
        created: created ?? this.created,
        createdBy: createdBy ?? this.createdBy,
        lastModified: lastModified ?? this.lastModified,
        lastModifiedBy: lastModifiedBy ?? this.lastModifiedBy,
        userAccess: userAccess ?? this.userAccess,
        groupAccess: groupAccess ?? this.groupAccess,
        value: value ?? this.value);
  }

  Demo copyWithWrapped(
      {Wrapped<int?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<DateTime?>? created,
      Wrapped<User?>? createdBy,
      Wrapped<DateTime?>? lastModified,
      Wrapped<User?>? lastModifiedBy,
      Wrapped<List<UserAccess>?>? userAccess,
      Wrapped<List<GroupAccess>?>? groupAccess,
      Wrapped<String?>? value}) {
    return Demo(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        created: (created != null ? created.value : this.created),
        createdBy: (createdBy != null ? createdBy.value : this.createdBy),
        lastModified:
            (lastModified != null ? lastModified.value : this.lastModified),
        lastModifiedBy: (lastModifiedBy != null
            ? lastModifiedBy.value
            : this.lastModifiedBy),
        userAccess: (userAccess != null ? userAccess.value : this.userAccess),
        groupAccess:
            (groupAccess != null ? groupAccess.value : this.groupAccess),
        value: (value != null ? value.value : this.value));
  }
}

@JsonSerializable(explicitToJson: true)
class EnvironmentOutDto {
  const EnvironmentOutDto({
    required this.railwaYENVIRONMENT,
    required this.railwaYGITCOMMITSHA,
    required this.railwaYGITCOMMITMESSAGE,
    required this.railwaYGITAUTHOR,
  });

  factory EnvironmentOutDto.fromJson(Map<String, dynamic> json) =>
      _$EnvironmentOutDtoFromJson(json);

  static const toJsonFactory = _$EnvironmentOutDtoToJson;
  Map<String, dynamic> toJson() => _$EnvironmentOutDtoToJson(this);

  @JsonKey(name: 'railwaY_ENVIRONMENT')
  final String railwaYENVIRONMENT;
  @JsonKey(name: 'railwaY_GIT_COMMIT_SHA')
  final String railwaYGITCOMMITSHA;
  @JsonKey(name: 'railwaY_GIT_COMMIT_MESSAGE')
  final String railwaYGITCOMMITMESSAGE;
  @JsonKey(name: 'railwaY_GIT_AUTHOR')
  final String railwaYGITAUTHOR;
  static const fromJsonFactory = _$EnvironmentOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is EnvironmentOutDto &&
            (identical(other.railwaYENVIRONMENT, railwaYENVIRONMENT) ||
                const DeepCollectionEquality()
                    .equals(other.railwaYENVIRONMENT, railwaYENVIRONMENT)) &&
            (identical(other.railwaYGITCOMMITSHA, railwaYGITCOMMITSHA) ||
                const DeepCollectionEquality()
                    .equals(other.railwaYGITCOMMITSHA, railwaYGITCOMMITSHA)) &&
            (identical(
                    other.railwaYGITCOMMITMESSAGE, railwaYGITCOMMITMESSAGE) ||
                const DeepCollectionEquality().equals(
                    other.railwaYGITCOMMITMESSAGE, railwaYGITCOMMITMESSAGE)) &&
            (identical(other.railwaYGITAUTHOR, railwaYGITAUTHOR) ||
                const DeepCollectionEquality()
                    .equals(other.railwaYGITAUTHOR, railwaYGITAUTHOR)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(railwaYENVIRONMENT) ^
      const DeepCollectionEquality().hash(railwaYGITCOMMITSHA) ^
      const DeepCollectionEquality().hash(railwaYGITCOMMITMESSAGE) ^
      const DeepCollectionEquality().hash(railwaYGITAUTHOR) ^
      runtimeType.hashCode;
}

extension $EnvironmentOutDtoExtension on EnvironmentOutDto {
  EnvironmentOutDto copyWith(
      {String? railwaYENVIRONMENT,
      String? railwaYGITCOMMITSHA,
      String? railwaYGITCOMMITMESSAGE,
      String? railwaYGITAUTHOR}) {
    return EnvironmentOutDto(
        railwaYENVIRONMENT: railwaYENVIRONMENT ?? this.railwaYENVIRONMENT,
        railwaYGITCOMMITSHA: railwaYGITCOMMITSHA ?? this.railwaYGITCOMMITSHA,
        railwaYGITCOMMITMESSAGE:
            railwaYGITCOMMITMESSAGE ?? this.railwaYGITCOMMITMESSAGE,
        railwaYGITAUTHOR: railwaYGITAUTHOR ?? this.railwaYGITAUTHOR);
  }

  EnvironmentOutDto copyWithWrapped(
      {Wrapped<String>? railwaYENVIRONMENT,
      Wrapped<String>? railwaYGITCOMMITSHA,
      Wrapped<String>? railwaYGITCOMMITMESSAGE,
      Wrapped<String>? railwaYGITAUTHOR}) {
    return EnvironmentOutDto(
        railwaYENVIRONMENT: (railwaYENVIRONMENT != null
            ? railwaYENVIRONMENT.value
            : this.railwaYENVIRONMENT),
        railwaYGITCOMMITSHA: (railwaYGITCOMMITSHA != null
            ? railwaYGITCOMMITSHA.value
            : this.railwaYGITCOMMITSHA),
        railwaYGITCOMMITMESSAGE: (railwaYGITCOMMITMESSAGE != null
            ? railwaYGITCOMMITMESSAGE.value
            : this.railwaYGITCOMMITMESSAGE),
        railwaYGITAUTHOR: (railwaYGITAUTHOR != null
            ? railwaYGITAUTHOR.value
            : this.railwaYGITAUTHOR));
  }
}

@JsonSerializable(explicitToJson: true)
class GroupAccess {
  const GroupAccess({
    this.id,
    this.events,
    this.userGroup,
    this.accessLevel,
    this.entities,
  });

  factory GroupAccess.fromJson(Map<String, dynamic> json) =>
      _$GroupAccessFromJson(json);

  static const toJsonFactory = _$GroupAccessToJson;
  Map<String, dynamic> toJson() => _$GroupAccessToJson(this);

  @JsonKey(name: 'id')
  final int? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'userGroup')
  final UserGroup? userGroup;
  @JsonKey(
    name: 'accessLevel',
    toJson: accessLevelNullableToJson,
    fromJson: accessLevelNullableFromJson,
  )
  final enums.AccessLevel? accessLevel;
  @JsonKey(name: 'entities', defaultValue: <BaseOwnableEntity>[])
  final List<BaseOwnableEntity>? entities;
  static const fromJsonFactory = _$GroupAccessFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is GroupAccess &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.userGroup, userGroup) ||
                const DeepCollectionEquality()
                    .equals(other.userGroup, userGroup)) &&
            (identical(other.accessLevel, accessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.accessLevel, accessLevel)) &&
            (identical(other.entities, entities) ||
                const DeepCollectionEquality()
                    .equals(other.entities, entities)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(userGroup) ^
      const DeepCollectionEquality().hash(accessLevel) ^
      const DeepCollectionEquality().hash(entities) ^
      runtimeType.hashCode;
}

extension $GroupAccessExtension on GroupAccess {
  GroupAccess copyWith(
      {int? id,
      List<INotification>? events,
      UserGroup? userGroup,
      enums.AccessLevel? accessLevel,
      List<BaseOwnableEntity>? entities}) {
    return GroupAccess(
        id: id ?? this.id,
        events: events ?? this.events,
        userGroup: userGroup ?? this.userGroup,
        accessLevel: accessLevel ?? this.accessLevel,
        entities: entities ?? this.entities);
  }

  GroupAccess copyWithWrapped(
      {Wrapped<int?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<UserGroup?>? userGroup,
      Wrapped<enums.AccessLevel?>? accessLevel,
      Wrapped<List<BaseOwnableEntity>?>? entities}) {
    return GroupAccess(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        userGroup: (userGroup != null ? userGroup.value : this.userGroup),
        accessLevel:
            (accessLevel != null ? accessLevel.value : this.accessLevel),
        entities: (entities != null ? entities.value : this.entities));
  }
}

@JsonSerializable(explicitToJson: true)
class ImageCheckListItemInDto {
  const ImageCheckListItemInDto({
    required this.imageBase64,
    required this.title,
  });

  factory ImageCheckListItemInDto.fromJson(Map<String, dynamic> json) =>
      _$ImageCheckListItemInDtoFromJson(json);

  static const toJsonFactory = _$ImageCheckListItemInDtoToJson;
  Map<String, dynamic> toJson() => _$ImageCheckListItemInDtoToJson(this);

  @JsonKey(name: 'imageBase64')
  final String imageBase64;
  @JsonKey(name: 'title')
  final String title;
  static const fromJsonFactory = _$ImageCheckListItemInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ImageCheckListItemInDto &&
            (identical(other.imageBase64, imageBase64) ||
                const DeepCollectionEquality()
                    .equals(other.imageBase64, imageBase64)) &&
            (identical(other.title, title) ||
                const DeepCollectionEquality().equals(other.title, title)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(imageBase64) ^
      const DeepCollectionEquality().hash(title) ^
      runtimeType.hashCode;
}

extension $ImageCheckListItemInDtoExtension on ImageCheckListItemInDto {
  ImageCheckListItemInDto copyWith({String? imageBase64, String? title}) {
    return ImageCheckListItemInDto(
        imageBase64: imageBase64 ?? this.imageBase64,
        title: title ?? this.title);
  }

  ImageCheckListItemInDto copyWithWrapped(
      {Wrapped<String>? imageBase64, Wrapped<String>? title}) {
    return ImageCheckListItemInDto(
        imageBase64:
            (imageBase64 != null ? imageBase64.value : this.imageBase64),
        title: (title != null ? title.value : this.title));
  }
}

@JsonSerializable(explicitToJson: true)
class ImageCheckListItemOutDto {
  const ImageCheckListItemOutDto({
    required this.id,
    required this.sortIndex,
    required this.checked,
    required this.itemType,
    required this.title,
    required this.imageReference,
    this.$type,
  });

  factory ImageCheckListItemOutDto.fromJson(Map<String, dynamic> json) =>
      _$ImageCheckListItemOutDtoFromJson(json);

  static const toJsonFactory = _$ImageCheckListItemOutDtoToJson;
  Map<String, dynamic> toJson() => _$ImageCheckListItemOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  @JsonKey(name: 'checked')
  final bool checked;
  @JsonKey(name: 'itemType')
  final CheckListItemTypeOutDto itemType;
  @JsonKey(name: 'title')
  final String title;
  @JsonKey(name: 'imageReference')
  final String imageReference;
  @JsonKey(name: '\$type')
  final String? $type;
  static const fromJsonFactory = _$ImageCheckListItemOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ImageCheckListItemOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)) &&
            (identical(other.checked, checked) ||
                const DeepCollectionEquality()
                    .equals(other.checked, checked)) &&
            (identical(other.itemType, itemType) ||
                const DeepCollectionEquality()
                    .equals(other.itemType, itemType)) &&
            (identical(other.title, title) ||
                const DeepCollectionEquality().equals(other.title, title)) &&
            (identical(other.imageReference, imageReference) ||
                const DeepCollectionEquality()
                    .equals(other.imageReference, imageReference)) &&
            (identical(other.$type, $type) ||
                const DeepCollectionEquality().equals(other.$type, $type)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      const DeepCollectionEquality().hash(checked) ^
      const DeepCollectionEquality().hash(itemType) ^
      const DeepCollectionEquality().hash(title) ^
      const DeepCollectionEquality().hash(imageReference) ^
      const DeepCollectionEquality().hash($type) ^
      runtimeType.hashCode;
}

extension $ImageCheckListItemOutDtoExtension on ImageCheckListItemOutDto {
  ImageCheckListItemOutDto copyWith(
      {int? id,
      int? sortIndex,
      bool? checked,
      CheckListItemTypeOutDto? itemType,
      String? title,
      String? imageReference,
      String? $type}) {
    return ImageCheckListItemOutDto(
        id: id ?? this.id,
        sortIndex: sortIndex ?? this.sortIndex,
        checked: checked ?? this.checked,
        itemType: itemType ?? this.itemType,
        title: title ?? this.title,
        imageReference: imageReference ?? this.imageReference,
        $type: $type ?? this.$type);
  }

  ImageCheckListItemOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<int>? sortIndex,
      Wrapped<bool>? checked,
      Wrapped<CheckListItemTypeOutDto>? itemType,
      Wrapped<String>? title,
      Wrapped<String>? imageReference,
      Wrapped<String?>? $type}) {
    return ImageCheckListItemOutDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex),
        checked: (checked != null ? checked.value : this.checked),
        itemType: (itemType != null ? itemType.value : this.itemType),
        title: (title != null ? title.value : this.title),
        imageReference: (imageReference != null
            ? imageReference.value
            : this.imageReference),
        $type: ($type != null ? $type.value : this.$type));
  }
}

@JsonSerializable(explicitToJson: true)
class INotification {
  const INotification();

  factory INotification.fromJson(Map<String, dynamic> json) =>
      _$INotificationFromJson(json);

  static const toJsonFactory = _$INotificationToJson;
  Map<String, dynamic> toJson() => _$INotificationToJson(this);

  static const fromJsonFactory = _$INotificationFromJson;

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode => runtimeType.hashCode;
}

@JsonSerializable(explicitToJson: true)
class InventoryCheckListItemInDto {
  const InventoryCheckListItemInDto({
    required this.text,
    required this.quantity,
    required this.unit,
  });

  factory InventoryCheckListItemInDto.fromJson(Map<String, dynamic> json) =>
      _$InventoryCheckListItemInDtoFromJson(json);

  static const toJsonFactory = _$InventoryCheckListItemInDtoToJson;
  Map<String, dynamic> toJson() => _$InventoryCheckListItemInDtoToJson(this);

  @JsonKey(name: 'text')
  final String text;
  @JsonKey(name: 'quantity')
  final double quantity;
  @JsonKey(
    name: 'unit',
    toJson: quantityUnitToJson,
    fromJson: quantityUnitFromJson,
  )
  final enums.QuantityUnit unit;
  static const fromJsonFactory = _$InventoryCheckListItemInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is InventoryCheckListItemInDto &&
            (identical(other.text, text) ||
                const DeepCollectionEquality().equals(other.text, text)) &&
            (identical(other.quantity, quantity) ||
                const DeepCollectionEquality()
                    .equals(other.quantity, quantity)) &&
            (identical(other.unit, unit) ||
                const DeepCollectionEquality().equals(other.unit, unit)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(text) ^
      const DeepCollectionEquality().hash(quantity) ^
      const DeepCollectionEquality().hash(unit) ^
      runtimeType.hashCode;
}

extension $InventoryCheckListItemInDtoExtension on InventoryCheckListItemInDto {
  InventoryCheckListItemInDto copyWith(
      {String? text, double? quantity, enums.QuantityUnit? unit}) {
    return InventoryCheckListItemInDto(
        text: text ?? this.text,
        quantity: quantity ?? this.quantity,
        unit: unit ?? this.unit);
  }

  InventoryCheckListItemInDto copyWithWrapped(
      {Wrapped<String>? text,
      Wrapped<double>? quantity,
      Wrapped<enums.QuantityUnit>? unit}) {
    return InventoryCheckListItemInDto(
        text: (text != null ? text.value : this.text),
        quantity: (quantity != null ? quantity.value : this.quantity),
        unit: (unit != null ? unit.value : this.unit));
  }
}

@JsonSerializable(explicitToJson: true)
class InventoryCheckListItemOutDto {
  const InventoryCheckListItemOutDto({
    required this.id,
    required this.sortIndex,
    required this.checked,
    required this.itemType,
    required this.text,
    required this.quantity,
    required this.unit,
    this.$type,
  });

  factory InventoryCheckListItemOutDto.fromJson(Map<String, dynamic> json) =>
      _$InventoryCheckListItemOutDtoFromJson(json);

  static const toJsonFactory = _$InventoryCheckListItemOutDtoToJson;
  Map<String, dynamic> toJson() => _$InventoryCheckListItemOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  @JsonKey(name: 'checked')
  final bool checked;
  @JsonKey(name: 'itemType')
  final CheckListItemTypeOutDto itemType;
  @JsonKey(name: 'text')
  final String text;
  @JsonKey(name: 'quantity')
  final double quantity;
  @JsonKey(
    name: 'unit',
    toJson: quantityUnitToJson,
    fromJson: quantityUnitFromJson,
  )
  final enums.QuantityUnit unit;
  @JsonKey(name: '\$type')
  final String? $type;
  static const fromJsonFactory = _$InventoryCheckListItemOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is InventoryCheckListItemOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)) &&
            (identical(other.checked, checked) ||
                const DeepCollectionEquality()
                    .equals(other.checked, checked)) &&
            (identical(other.itemType, itemType) ||
                const DeepCollectionEquality()
                    .equals(other.itemType, itemType)) &&
            (identical(other.text, text) ||
                const DeepCollectionEquality().equals(other.text, text)) &&
            (identical(other.quantity, quantity) ||
                const DeepCollectionEquality()
                    .equals(other.quantity, quantity)) &&
            (identical(other.unit, unit) ||
                const DeepCollectionEquality().equals(other.unit, unit)) &&
            (identical(other.$type, $type) ||
                const DeepCollectionEquality().equals(other.$type, $type)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      const DeepCollectionEquality().hash(checked) ^
      const DeepCollectionEquality().hash(itemType) ^
      const DeepCollectionEquality().hash(text) ^
      const DeepCollectionEquality().hash(quantity) ^
      const DeepCollectionEquality().hash(unit) ^
      const DeepCollectionEquality().hash($type) ^
      runtimeType.hashCode;
}

extension $InventoryCheckListItemOutDtoExtension
    on InventoryCheckListItemOutDto {
  InventoryCheckListItemOutDto copyWith(
      {int? id,
      int? sortIndex,
      bool? checked,
      CheckListItemTypeOutDto? itemType,
      String? text,
      double? quantity,
      enums.QuantityUnit? unit,
      String? $type}) {
    return InventoryCheckListItemOutDto(
        id: id ?? this.id,
        sortIndex: sortIndex ?? this.sortIndex,
        checked: checked ?? this.checked,
        itemType: itemType ?? this.itemType,
        text: text ?? this.text,
        quantity: quantity ?? this.quantity,
        unit: unit ?? this.unit,
        $type: $type ?? this.$type);
  }

  InventoryCheckListItemOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<int>? sortIndex,
      Wrapped<bool>? checked,
      Wrapped<CheckListItemTypeOutDto>? itemType,
      Wrapped<String>? text,
      Wrapped<double>? quantity,
      Wrapped<enums.QuantityUnit>? unit,
      Wrapped<String?>? $type}) {
    return InventoryCheckListItemOutDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex),
        checked: (checked != null ? checked.value : this.checked),
        itemType: (itemType != null ? itemType.value : this.itemType),
        text: (text != null ? text.value : this.text),
        quantity: (quantity != null ? quantity.value : this.quantity),
        unit: (unit != null ? unit.value : this.unit),
        $type: ($type != null ? $type.value : this.$type));
  }
}

@JsonSerializable(explicitToJson: true)
class InventoryOutDto {
  const InventoryOutDto({
    required this.id,
    required this.roomInventory,
    required this.name,
    required this.slug,
    required this.entities,
    required this.accessLevel,
  });

  factory InventoryOutDto.fromJson(Map<String, dynamic> json) =>
      _$InventoryOutDtoFromJson(json);

  static const toJsonFactory = _$InventoryOutDtoToJson;
  Map<String, dynamic> toJson() => _$InventoryOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'room_Inventory')
  final RoomOutDto roomInventory;
  @JsonKey(name: 'name')
  final String name;
  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'entities', defaultValue: <BaseCheckListItemOutDto>[])
  final List<BaseCheckListItemOutDto> entities;
  @JsonKey(
    name: 'accessLevel',
    toJson: accessLevelToJson,
    fromJson: accessLevelFromJson,
  )
  final enums.AccessLevel accessLevel;
  static const fromJsonFactory = _$InventoryOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is InventoryOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.roomInventory, roomInventory) ||
                const DeepCollectionEquality()
                    .equals(other.roomInventory, roomInventory)) &&
            (identical(other.name, name) ||
                const DeepCollectionEquality().equals(other.name, name)) &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.entities, entities) ||
                const DeepCollectionEquality()
                    .equals(other.entities, entities)) &&
            (identical(other.accessLevel, accessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.accessLevel, accessLevel)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(roomInventory) ^
      const DeepCollectionEquality().hash(name) ^
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(entities) ^
      const DeepCollectionEquality().hash(accessLevel) ^
      runtimeType.hashCode;
}

extension $InventoryOutDtoExtension on InventoryOutDto {
  InventoryOutDto copyWith(
      {int? id,
      RoomOutDto? roomInventory,
      String? name,
      String? slug,
      List<BaseCheckListItemOutDto>? entities,
      enums.AccessLevel? accessLevel}) {
    return InventoryOutDto(
        id: id ?? this.id,
        roomInventory: roomInventory ?? this.roomInventory,
        name: name ?? this.name,
        slug: slug ?? this.slug,
        entities: entities ?? this.entities,
        accessLevel: accessLevel ?? this.accessLevel);
  }

  InventoryOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<RoomOutDto>? roomInventory,
      Wrapped<String>? name,
      Wrapped<String>? slug,
      Wrapped<List<BaseCheckListItemOutDto>>? entities,
      Wrapped<enums.AccessLevel>? accessLevel}) {
    return InventoryOutDto(
        id: (id != null ? id.value : this.id),
        roomInventory:
            (roomInventory != null ? roomInventory.value : this.roomInventory),
        name: (name != null ? name.value : this.name),
        slug: (slug != null ? slug.value : this.slug),
        entities: (entities != null ? entities.value : this.entities),
        accessLevel:
            (accessLevel != null ? accessLevel.value : this.accessLevel));
  }
}

@JsonSerializable(explicitToJson: true)
class LinkCheckListItemInDto {
  const LinkCheckListItemInDto({
    required this.title,
    required this.link,
  });

  factory LinkCheckListItemInDto.fromJson(Map<String, dynamic> json) =>
      _$LinkCheckListItemInDtoFromJson(json);

  static const toJsonFactory = _$LinkCheckListItemInDtoToJson;
  Map<String, dynamic> toJson() => _$LinkCheckListItemInDtoToJson(this);

  @JsonKey(name: 'title')
  final String title;
  @JsonKey(name: 'link')
  final String link;
  static const fromJsonFactory = _$LinkCheckListItemInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is LinkCheckListItemInDto &&
            (identical(other.title, title) ||
                const DeepCollectionEquality().equals(other.title, title)) &&
            (identical(other.link, link) ||
                const DeepCollectionEquality().equals(other.link, link)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(title) ^
      const DeepCollectionEquality().hash(link) ^
      runtimeType.hashCode;
}

extension $LinkCheckListItemInDtoExtension on LinkCheckListItemInDto {
  LinkCheckListItemInDto copyWith({String? title, String? link}) {
    return LinkCheckListItemInDto(
        title: title ?? this.title, link: link ?? this.link);
  }

  LinkCheckListItemInDto copyWithWrapped(
      {Wrapped<String>? title, Wrapped<String>? link}) {
    return LinkCheckListItemInDto(
        title: (title != null ? title.value : this.title),
        link: (link != null ? link.value : this.link));
  }
}

@JsonSerializable(explicitToJson: true)
class LinkCheckListItemOutDto {
  const LinkCheckListItemOutDto({
    required this.id,
    required this.sortIndex,
    required this.checked,
    required this.itemType,
    required this.title,
    required this.link,
    this.$type,
  });

  factory LinkCheckListItemOutDto.fromJson(Map<String, dynamic> json) =>
      _$LinkCheckListItemOutDtoFromJson(json);

  static const toJsonFactory = _$LinkCheckListItemOutDtoToJson;
  Map<String, dynamic> toJson() => _$LinkCheckListItemOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  @JsonKey(name: 'checked')
  final bool checked;
  @JsonKey(name: 'itemType')
  final CheckListItemTypeOutDto itemType;
  @JsonKey(name: 'title')
  final String title;
  @JsonKey(name: 'link')
  final String link;
  @JsonKey(name: '\$type')
  final String? $type;
  static const fromJsonFactory = _$LinkCheckListItemOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is LinkCheckListItemOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)) &&
            (identical(other.checked, checked) ||
                const DeepCollectionEquality()
                    .equals(other.checked, checked)) &&
            (identical(other.itemType, itemType) ||
                const DeepCollectionEquality()
                    .equals(other.itemType, itemType)) &&
            (identical(other.title, title) ||
                const DeepCollectionEquality().equals(other.title, title)) &&
            (identical(other.link, link) ||
                const DeepCollectionEquality().equals(other.link, link)) &&
            (identical(other.$type, $type) ||
                const DeepCollectionEquality().equals(other.$type, $type)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      const DeepCollectionEquality().hash(checked) ^
      const DeepCollectionEquality().hash(itemType) ^
      const DeepCollectionEquality().hash(title) ^
      const DeepCollectionEquality().hash(link) ^
      const DeepCollectionEquality().hash($type) ^
      runtimeType.hashCode;
}

extension $LinkCheckListItemOutDtoExtension on LinkCheckListItemOutDto {
  LinkCheckListItemOutDto copyWith(
      {int? id,
      int? sortIndex,
      bool? checked,
      CheckListItemTypeOutDto? itemType,
      String? title,
      String? link,
      String? $type}) {
    return LinkCheckListItemOutDto(
        id: id ?? this.id,
        sortIndex: sortIndex ?? this.sortIndex,
        checked: checked ?? this.checked,
        itemType: itemType ?? this.itemType,
        title: title ?? this.title,
        link: link ?? this.link,
        $type: $type ?? this.$type);
  }

  LinkCheckListItemOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<int>? sortIndex,
      Wrapped<bool>? checked,
      Wrapped<CheckListItemTypeOutDto>? itemType,
      Wrapped<String>? title,
      Wrapped<String>? link,
      Wrapped<String?>? $type}) {
    return LinkCheckListItemOutDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex),
        checked: (checked != null ? checked.value : this.checked),
        itemType: (itemType != null ? itemType.value : this.itemType),
        title: (title != null ? title.value : this.title),
        link: (link != null ? link.value : this.link),
        $type: ($type != null ? $type.value : this.$type));
  }
}

@JsonSerializable(explicitToJson: true)
class RearrangeCheckListItemsInDto {
  const RearrangeCheckListItemsInDto({
    required this.items,
  });

  factory RearrangeCheckListItemsInDto.fromJson(Map<String, dynamic> json) =>
      _$RearrangeCheckListItemsInDtoFromJson(json);

  static const toJsonFactory = _$RearrangeCheckListItemsInDtoToJson;
  Map<String, dynamic> toJson() => _$RearrangeCheckListItemsInDtoToJson(this);

  @JsonKey(name: 'items', defaultValue: <ArrangeItemInDto>[])
  final List<ArrangeItemInDto> items;
  static const fromJsonFactory = _$RearrangeCheckListItemsInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RearrangeCheckListItemsInDto &&
            (identical(other.items, items) ||
                const DeepCollectionEquality().equals(other.items, items)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(items) ^ runtimeType.hashCode;
}

extension $RearrangeCheckListItemsInDtoExtension
    on RearrangeCheckListItemsInDto {
  RearrangeCheckListItemsInDto copyWith({List<ArrangeItemInDto>? items}) {
    return RearrangeCheckListItemsInDto(items: items ?? this.items);
  }

  RearrangeCheckListItemsInDto copyWithWrapped(
      {Wrapped<List<ArrangeItemInDto>>? items}) {
    return RearrangeCheckListItemsInDto(
        items: (items != null ? items.value : this.items));
  }
}

@JsonSerializable(explicitToJson: true)
class RenameCheckListCommand {
  const RenameCheckListCommand({
    required this.slug,
    required this.newName,
  });

  factory RenameCheckListCommand.fromJson(Map<String, dynamic> json) =>
      _$RenameCheckListCommandFromJson(json);

  static const toJsonFactory = _$RenameCheckListCommandToJson;
  Map<String, dynamic> toJson() => _$RenameCheckListCommandToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'newName')
  final String newName;
  static const fromJsonFactory = _$RenameCheckListCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RenameCheckListCommand &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.newName, newName) ||
                const DeepCollectionEquality().equals(other.newName, newName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(newName) ^
      runtimeType.hashCode;
}

extension $RenameCheckListCommandExtension on RenameCheckListCommand {
  RenameCheckListCommand copyWith({String? slug, String? newName}) {
    return RenameCheckListCommand(
        slug: slug ?? this.slug, newName: newName ?? this.newName);
  }

  RenameCheckListCommand copyWithWrapped(
      {Wrapped<String>? slug, Wrapped<String>? newName}) {
    return RenameCheckListCommand(
        slug: (slug != null ? slug.value : this.slug),
        newName: (newName != null ? newName.value : this.newName));
  }
}

@JsonSerializable(explicitToJson: true)
class RenameInventoryCommand {
  const RenameInventoryCommand({
    required this.slug,
    required this.newName,
  });

  factory RenameInventoryCommand.fromJson(Map<String, dynamic> json) =>
      _$RenameInventoryCommandFromJson(json);

  static const toJsonFactory = _$RenameInventoryCommandToJson;
  Map<String, dynamic> toJson() => _$RenameInventoryCommandToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'newName')
  final String newName;
  static const fromJsonFactory = _$RenameInventoryCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RenameInventoryCommand &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.newName, newName) ||
                const DeepCollectionEquality().equals(other.newName, newName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(newName) ^
      runtimeType.hashCode;
}

extension $RenameInventoryCommandExtension on RenameInventoryCommand {
  RenameInventoryCommand copyWith({String? slug, String? newName}) {
    return RenameInventoryCommand(
        slug: slug ?? this.slug, newName: newName ?? this.newName);
  }

  RenameInventoryCommand copyWithWrapped(
      {Wrapped<String>? slug, Wrapped<String>? newName}) {
    return RenameInventoryCommand(
        slug: (slug != null ? slug.value : this.slug),
        newName: (newName != null ? newName.value : this.newName));
  }
}

@JsonSerializable(explicitToJson: true)
class RenameRoomCommand {
  const RenameRoomCommand({
    required this.slug,
    required this.newName,
  });

  factory RenameRoomCommand.fromJson(Map<String, dynamic> json) =>
      _$RenameRoomCommandFromJson(json);

  static const toJsonFactory = _$RenameRoomCommandToJson;
  Map<String, dynamic> toJson() => _$RenameRoomCommandToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'newName')
  final String newName;
  static const fromJsonFactory = _$RenameRoomCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RenameRoomCommand &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.newName, newName) ||
                const DeepCollectionEquality().equals(other.newName, newName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(newName) ^
      runtimeType.hashCode;
}

extension $RenameRoomCommandExtension on RenameRoomCommand {
  RenameRoomCommand copyWith({String? slug, String? newName}) {
    return RenameRoomCommand(
        slug: slug ?? this.slug, newName: newName ?? this.newName);
  }

  RenameRoomCommand copyWithWrapped(
      {Wrapped<String>? slug, Wrapped<String>? newName}) {
    return RenameRoomCommand(
        slug: (slug != null ? slug.value : this.slug),
        newName: (newName != null ? newName.value : this.newName));
  }
}

@JsonSerializable(explicitToJson: true)
class RevokeRoomAccessCommand {
  const RevokeRoomAccessCommand({
    required this.slug,
    required this.userId,
  });

  factory RevokeRoomAccessCommand.fromJson(Map<String, dynamic> json) =>
      _$RevokeRoomAccessCommandFromJson(json);

  static const toJsonFactory = _$RevokeRoomAccessCommandToJson;
  Map<String, dynamic> toJson() => _$RevokeRoomAccessCommandToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'userId')
  final String userId;
  static const fromJsonFactory = _$RevokeRoomAccessCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RevokeRoomAccessCommand &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.userId, userId) ||
                const DeepCollectionEquality().equals(other.userId, userId)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(userId) ^
      runtimeType.hashCode;
}

extension $RevokeRoomAccessCommandExtension on RevokeRoomAccessCommand {
  RevokeRoomAccessCommand copyWith({String? slug, String? userId}) {
    return RevokeRoomAccessCommand(
        slug: slug ?? this.slug, userId: userId ?? this.userId);
  }

  RevokeRoomAccessCommand copyWithWrapped(
      {Wrapped<String>? slug, Wrapped<String>? userId}) {
    return RevokeRoomAccessCommand(
        slug: (slug != null ? slug.value : this.slug),
        userId: (userId != null ? userId.value : this.userId));
  }
}

@JsonSerializable(explicitToJson: true)
class RoomOutDto {
  const RoomOutDto({
    required this.id,
    required this.roomName,
    required this.slug,
    required this.createdBy,
    required this.accessLevel,
    required this.checkLists,
    required this.inventories,
    required this.users,
  });

  factory RoomOutDto.fromJson(Map<String, dynamic> json) =>
      _$RoomOutDtoFromJson(json);

  static const toJsonFactory = _$RoomOutDtoToJson;
  Map<String, dynamic> toJson() => _$RoomOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'roomName')
  final String roomName;
  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'createdBy')
  final UserOutDto createdBy;
  @JsonKey(
    name: 'accessLevel',
    toJson: accessLevelToJson,
    fromJson: accessLevelFromJson,
  )
  final enums.AccessLevel accessLevel;
  @JsonKey(name: 'checkLists', defaultValue: <CheckListOutDto>[])
  final List<CheckListOutDto> checkLists;
  @JsonKey(name: 'inventories', defaultValue: <InventoryOutDto>[])
  final List<InventoryOutDto> inventories;
  @JsonKey(name: 'users', defaultValue: <UserOutDto>[])
  final List<UserOutDto> users;
  static const fromJsonFactory = _$RoomOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is RoomOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.roomName, roomName) ||
                const DeepCollectionEquality()
                    .equals(other.roomName, roomName)) &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.createdBy, createdBy) ||
                const DeepCollectionEquality()
                    .equals(other.createdBy, createdBy)) &&
            (identical(other.accessLevel, accessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.accessLevel, accessLevel)) &&
            (identical(other.checkLists, checkLists) ||
                const DeepCollectionEquality()
                    .equals(other.checkLists, checkLists)) &&
            (identical(other.inventories, inventories) ||
                const DeepCollectionEquality()
                    .equals(other.inventories, inventories)) &&
            (identical(other.users, users) ||
                const DeepCollectionEquality().equals(other.users, users)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(roomName) ^
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(createdBy) ^
      const DeepCollectionEquality().hash(accessLevel) ^
      const DeepCollectionEquality().hash(checkLists) ^
      const DeepCollectionEquality().hash(inventories) ^
      const DeepCollectionEquality().hash(users) ^
      runtimeType.hashCode;
}

extension $RoomOutDtoExtension on RoomOutDto {
  RoomOutDto copyWith(
      {int? id,
      String? roomName,
      String? slug,
      UserOutDto? createdBy,
      enums.AccessLevel? accessLevel,
      List<CheckListOutDto>? checkLists,
      List<InventoryOutDto>? inventories,
      List<UserOutDto>? users}) {
    return RoomOutDto(
        id: id ?? this.id,
        roomName: roomName ?? this.roomName,
        slug: slug ?? this.slug,
        createdBy: createdBy ?? this.createdBy,
        accessLevel: accessLevel ?? this.accessLevel,
        checkLists: checkLists ?? this.checkLists,
        inventories: inventories ?? this.inventories,
        users: users ?? this.users);
  }

  RoomOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<String>? roomName,
      Wrapped<String>? slug,
      Wrapped<UserOutDto>? createdBy,
      Wrapped<enums.AccessLevel>? accessLevel,
      Wrapped<List<CheckListOutDto>>? checkLists,
      Wrapped<List<InventoryOutDto>>? inventories,
      Wrapped<List<UserOutDto>>? users}) {
    return RoomOutDto(
        id: (id != null ? id.value : this.id),
        roomName: (roomName != null ? roomName.value : this.roomName),
        slug: (slug != null ? slug.value : this.slug),
        createdBy: (createdBy != null ? createdBy.value : this.createdBy),
        accessLevel:
            (accessLevel != null ? accessLevel.value : this.accessLevel),
        checkLists: (checkLists != null ? checkLists.value : this.checkLists),
        inventories:
            (inventories != null ? inventories.value : this.inventories),
        users: (users != null ? users.value : this.users));
  }
}

@JsonSerializable(explicitToJson: true)
class SharedLinkInDto {
  const SharedLinkInDto({
    required this.grantAccessLevel,
    required this.entityType,
    required this.slug,
  });

  factory SharedLinkInDto.fromJson(Map<String, dynamic> json) =>
      _$SharedLinkInDtoFromJson(json);

  static const toJsonFactory = _$SharedLinkInDtoToJson;
  Map<String, dynamic> toJson() => _$SharedLinkInDtoToJson(this);

  @JsonKey(
    name: 'grantAccessLevel',
    toJson: accessLevelToJson,
    fromJson: accessLevelFromJson,
  )
  final enums.AccessLevel grantAccessLevel;
  @JsonKey(name: 'entityType')
  final String entityType;
  @JsonKey(name: 'slug')
  final String slug;
  static const fromJsonFactory = _$SharedLinkInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SharedLinkInDto &&
            (identical(other.grantAccessLevel, grantAccessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.grantAccessLevel, grantAccessLevel)) &&
            (identical(other.entityType, entityType) ||
                const DeepCollectionEquality()
                    .equals(other.entityType, entityType)) &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(grantAccessLevel) ^
      const DeepCollectionEquality().hash(entityType) ^
      const DeepCollectionEquality().hash(slug) ^
      runtimeType.hashCode;
}

extension $SharedLinkInDtoExtension on SharedLinkInDto {
  SharedLinkInDto copyWith(
      {enums.AccessLevel? grantAccessLevel, String? entityType, String? slug}) {
    return SharedLinkInDto(
        grantAccessLevel: grantAccessLevel ?? this.grantAccessLevel,
        entityType: entityType ?? this.entityType,
        slug: slug ?? this.slug);
  }

  SharedLinkInDto copyWithWrapped(
      {Wrapped<enums.AccessLevel>? grantAccessLevel,
      Wrapped<String>? entityType,
      Wrapped<String>? slug}) {
    return SharedLinkInDto(
        grantAccessLevel: (grantAccessLevel != null
            ? grantAccessLevel.value
            : this.grantAccessLevel),
        entityType: (entityType != null ? entityType.value : this.entityType),
        slug: (slug != null ? slug.value : this.slug));
  }
}

@JsonSerializable(explicitToJson: true)
class SharedLinkOutDto {
  const SharedLinkOutDto({
    required this.slug,
  });

  factory SharedLinkOutDto.fromJson(Map<String, dynamic> json) =>
      _$SharedLinkOutDtoFromJson(json);

  static const toJsonFactory = _$SharedLinkOutDtoToJson;
  Map<String, dynamic> toJson() => _$SharedLinkOutDtoToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  static const fromJsonFactory = _$SharedLinkOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SharedLinkOutDto &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^ runtimeType.hashCode;
}

extension $SharedLinkOutDtoExtension on SharedLinkOutDto {
  SharedLinkOutDto copyWith({String? slug}) {
    return SharedLinkOutDto(slug: slug ?? this.slug);
  }

  SharedLinkOutDto copyWithWrapped({Wrapped<String>? slug}) {
    return SharedLinkOutDto(slug: (slug != null ? slug.value : this.slug));
  }
}

@JsonSerializable(explicitToJson: true)
class SharedLinkResolvedOutDto {
  const SharedLinkResolvedOutDto({
    required this.entityType,
    required this.slug,
  });

  factory SharedLinkResolvedOutDto.fromJson(Map<String, dynamic> json) =>
      _$SharedLinkResolvedOutDtoFromJson(json);

  static const toJsonFactory = _$SharedLinkResolvedOutDtoToJson;
  Map<String, dynamic> toJson() => _$SharedLinkResolvedOutDtoToJson(this);

  @JsonKey(name: 'entityType')
  final String entityType;
  @JsonKey(name: 'slug')
  final String slug;
  static const fromJsonFactory = _$SharedLinkResolvedOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SharedLinkResolvedOutDto &&
            (identical(other.entityType, entityType) ||
                const DeepCollectionEquality()
                    .equals(other.entityType, entityType)) &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(entityType) ^
      const DeepCollectionEquality().hash(slug) ^
      runtimeType.hashCode;
}

extension $SharedLinkResolvedOutDtoExtension on SharedLinkResolvedOutDto {
  SharedLinkResolvedOutDto copyWith({String? entityType, String? slug}) {
    return SharedLinkResolvedOutDto(
        entityType: entityType ?? this.entityType, slug: slug ?? this.slug);
  }

  SharedLinkResolvedOutDto copyWithWrapped(
      {Wrapped<String>? entityType, Wrapped<String>? slug}) {
    return SharedLinkResolvedOutDto(
        entityType: (entityType != null ? entityType.value : this.entityType),
        slug: (slug != null ? slug.value : this.slug));
  }
}

@JsonSerializable(explicitToJson: true)
class TextCheckListItemInDto {
  const TextCheckListItemInDto({
    required this.text,
  });

  factory TextCheckListItemInDto.fromJson(Map<String, dynamic> json) =>
      _$TextCheckListItemInDtoFromJson(json);

  static const toJsonFactory = _$TextCheckListItemInDtoToJson;
  Map<String, dynamic> toJson() => _$TextCheckListItemInDtoToJson(this);

  @JsonKey(name: 'text')
  final String text;
  static const fromJsonFactory = _$TextCheckListItemInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is TextCheckListItemInDto &&
            (identical(other.text, text) ||
                const DeepCollectionEquality().equals(other.text, text)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(text) ^ runtimeType.hashCode;
}

extension $TextCheckListItemInDtoExtension on TextCheckListItemInDto {
  TextCheckListItemInDto copyWith({String? text}) {
    return TextCheckListItemInDto(text: text ?? this.text);
  }

  TextCheckListItemInDto copyWithWrapped({Wrapped<String>? text}) {
    return TextCheckListItemInDto(
        text: (text != null ? text.value : this.text));
  }
}

@JsonSerializable(explicitToJson: true)
class TextCheckListItemOutDto {
  const TextCheckListItemOutDto({
    required this.id,
    required this.sortIndex,
    required this.checked,
    required this.itemType,
    required this.text,
    this.$type,
  });

  factory TextCheckListItemOutDto.fromJson(Map<String, dynamic> json) =>
      _$TextCheckListItemOutDtoFromJson(json);

  static const toJsonFactory = _$TextCheckListItemOutDtoToJson;
  Map<String, dynamic> toJson() => _$TextCheckListItemOutDtoToJson(this);

  @JsonKey(name: 'id')
  final int id;
  @JsonKey(name: 'sortIndex')
  final int sortIndex;
  @JsonKey(name: 'checked')
  final bool checked;
  @JsonKey(name: 'itemType')
  final CheckListItemTypeOutDto itemType;
  @JsonKey(name: 'text')
  final String text;
  @JsonKey(name: '\$type')
  final String? $type;
  static const fromJsonFactory = _$TextCheckListItemOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is TextCheckListItemOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.sortIndex, sortIndex) ||
                const DeepCollectionEquality()
                    .equals(other.sortIndex, sortIndex)) &&
            (identical(other.checked, checked) ||
                const DeepCollectionEquality()
                    .equals(other.checked, checked)) &&
            (identical(other.itemType, itemType) ||
                const DeepCollectionEquality()
                    .equals(other.itemType, itemType)) &&
            (identical(other.text, text) ||
                const DeepCollectionEquality().equals(other.text, text)) &&
            (identical(other.$type, $type) ||
                const DeepCollectionEquality().equals(other.$type, $type)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(sortIndex) ^
      const DeepCollectionEquality().hash(checked) ^
      const DeepCollectionEquality().hash(itemType) ^
      const DeepCollectionEquality().hash(text) ^
      const DeepCollectionEquality().hash($type) ^
      runtimeType.hashCode;
}

extension $TextCheckListItemOutDtoExtension on TextCheckListItemOutDto {
  TextCheckListItemOutDto copyWith(
      {int? id,
      int? sortIndex,
      bool? checked,
      CheckListItemTypeOutDto? itemType,
      String? text,
      String? $type}) {
    return TextCheckListItemOutDto(
        id: id ?? this.id,
        sortIndex: sortIndex ?? this.sortIndex,
        checked: checked ?? this.checked,
        itemType: itemType ?? this.itemType,
        text: text ?? this.text,
        $type: $type ?? this.$type);
  }

  TextCheckListItemOutDto copyWithWrapped(
      {Wrapped<int>? id,
      Wrapped<int>? sortIndex,
      Wrapped<bool>? checked,
      Wrapped<CheckListItemTypeOutDto>? itemType,
      Wrapped<String>? text,
      Wrapped<String?>? $type}) {
    return TextCheckListItemOutDto(
        id: (id != null ? id.value : this.id),
        sortIndex: (sortIndex != null ? sortIndex.value : this.sortIndex),
        checked: (checked != null ? checked.value : this.checked),
        itemType: (itemType != null ? itemType.value : this.itemType),
        text: (text != null ? text.value : this.text),
        $type: ($type != null ? $type.value : this.$type));
  }
}

@JsonSerializable(explicitToJson: true)
class UpdateFavoritesCommand {
  const UpdateFavoritesCommand({
    required this.slug,
    required this.favorite,
  });

  factory UpdateFavoritesCommand.fromJson(Map<String, dynamic> json) =>
      _$UpdateFavoritesCommandFromJson(json);

  static const toJsonFactory = _$UpdateFavoritesCommandToJson;
  Map<String, dynamic> toJson() => _$UpdateFavoritesCommandToJson(this);

  @JsonKey(name: 'slug')
  final String slug;
  @JsonKey(name: 'favorite')
  final bool favorite;
  static const fromJsonFactory = _$UpdateFavoritesCommandFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UpdateFavoritesCommand &&
            (identical(other.slug, slug) ||
                const DeepCollectionEquality().equals(other.slug, slug)) &&
            (identical(other.favorite, favorite) ||
                const DeepCollectionEquality()
                    .equals(other.favorite, favorite)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(slug) ^
      const DeepCollectionEquality().hash(favorite) ^
      runtimeType.hashCode;
}

extension $UpdateFavoritesCommandExtension on UpdateFavoritesCommand {
  UpdateFavoritesCommand copyWith({String? slug, bool? favorite}) {
    return UpdateFavoritesCommand(
        slug: slug ?? this.slug, favorite: favorite ?? this.favorite);
  }

  UpdateFavoritesCommand copyWithWrapped(
      {Wrapped<String>? slug, Wrapped<bool>? favorite}) {
    return UpdateFavoritesCommand(
        slug: (slug != null ? slug.value : this.slug),
        favorite: (favorite != null ? favorite.value : this.favorite));
  }
}

@JsonSerializable(explicitToJson: true)
class User {
  const User({
    this.id,
    this.events,
    this.userName,
    this.userGroups,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  static const toJsonFactory = _$UserToJson;
  Map<String, dynamic> toJson() => _$UserToJson(this);

  @JsonKey(name: 'id')
  final String? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'userName')
  final String? userName;
  @JsonKey(name: 'userGroups', defaultValue: <UserGroup>[])
  final List<UserGroup>? userGroups;
  static const fromJsonFactory = _$UserFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is User &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.userName, userName) ||
                const DeepCollectionEquality()
                    .equals(other.userName, userName)) &&
            (identical(other.userGroups, userGroups) ||
                const DeepCollectionEquality()
                    .equals(other.userGroups, userGroups)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(userName) ^
      const DeepCollectionEquality().hash(userGroups) ^
      runtimeType.hashCode;
}

extension $UserExtension on User {
  User copyWith(
      {String? id,
      List<INotification>? events,
      String? userName,
      List<UserGroup>? userGroups}) {
    return User(
        id: id ?? this.id,
        events: events ?? this.events,
        userName: userName ?? this.userName,
        userGroups: userGroups ?? this.userGroups);
  }

  User copyWithWrapped(
      {Wrapped<String?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<String?>? userName,
      Wrapped<List<UserGroup>?>? userGroups}) {
    return User(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        userName: (userName != null ? userName.value : this.userName),
        userGroups: (userGroups != null ? userGroups.value : this.userGroups));
  }
}

@JsonSerializable(explicitToJson: true)
class UserAccess {
  const UserAccess({
    this.id,
    this.events,
    this.user,
    this.accessLevel,
    this.entities,
  });

  factory UserAccess.fromJson(Map<String, dynamic> json) =>
      _$UserAccessFromJson(json);

  static const toJsonFactory = _$UserAccessToJson;
  Map<String, dynamic> toJson() => _$UserAccessToJson(this);

  @JsonKey(name: 'id')
  final int? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'user')
  final User? user;
  @JsonKey(
    name: 'accessLevel',
    toJson: accessLevelNullableToJson,
    fromJson: accessLevelNullableFromJson,
  )
  final enums.AccessLevel? accessLevel;
  @JsonKey(name: 'entities', defaultValue: <BaseOwnableEntity>[])
  final List<BaseOwnableEntity>? entities;
  static const fromJsonFactory = _$UserAccessFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UserAccess &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.user, user) ||
                const DeepCollectionEquality().equals(other.user, user)) &&
            (identical(other.accessLevel, accessLevel) ||
                const DeepCollectionEquality()
                    .equals(other.accessLevel, accessLevel)) &&
            (identical(other.entities, entities) ||
                const DeepCollectionEquality()
                    .equals(other.entities, entities)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(user) ^
      const DeepCollectionEquality().hash(accessLevel) ^
      const DeepCollectionEquality().hash(entities) ^
      runtimeType.hashCode;
}

extension $UserAccessExtension on UserAccess {
  UserAccess copyWith(
      {int? id,
      List<INotification>? events,
      User? user,
      enums.AccessLevel? accessLevel,
      List<BaseOwnableEntity>? entities}) {
    return UserAccess(
        id: id ?? this.id,
        events: events ?? this.events,
        user: user ?? this.user,
        accessLevel: accessLevel ?? this.accessLevel,
        entities: entities ?? this.entities);
  }

  UserAccess copyWithWrapped(
      {Wrapped<int?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<User?>? user,
      Wrapped<enums.AccessLevel?>? accessLevel,
      Wrapped<List<BaseOwnableEntity>?>? entities}) {
    return UserAccess(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        user: (user != null ? user.value : this.user),
        accessLevel:
            (accessLevel != null ? accessLevel.value : this.accessLevel),
        entities: (entities != null ? entities.value : this.entities));
  }
}

@JsonSerializable(explicitToJson: true)
class UserGroup {
  const UserGroup({
    this.id,
    this.events,
    this.created,
    this.createdBy,
    this.lastModified,
    this.lastModifiedBy,
    this.groupName,
    this.users,
  });

  factory UserGroup.fromJson(Map<String, dynamic> json) =>
      _$UserGroupFromJson(json);

  static const toJsonFactory = _$UserGroupToJson;
  Map<String, dynamic> toJson() => _$UserGroupToJson(this);

  @JsonKey(name: 'id')
  final int? id;
  @JsonKey(name: 'events', defaultValue: <INotification>[])
  final List<INotification>? events;
  @JsonKey(name: 'created')
  final DateTime? created;
  @JsonKey(name: 'createdBy')
  final User? createdBy;
  @JsonKey(name: 'lastModified')
  final DateTime? lastModified;
  @JsonKey(name: 'lastModifiedBy')
  final User? lastModifiedBy;
  @JsonKey(name: 'groupName')
  final String? groupName;
  @JsonKey(name: 'users', defaultValue: <User>[])
  final List<User>? users;
  static const fromJsonFactory = _$UserGroupFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UserGroup &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.events, events) ||
                const DeepCollectionEquality().equals(other.events, events)) &&
            (identical(other.created, created) ||
                const DeepCollectionEquality()
                    .equals(other.created, created)) &&
            (identical(other.createdBy, createdBy) ||
                const DeepCollectionEquality()
                    .equals(other.createdBy, createdBy)) &&
            (identical(other.lastModified, lastModified) ||
                const DeepCollectionEquality()
                    .equals(other.lastModified, lastModified)) &&
            (identical(other.lastModifiedBy, lastModifiedBy) ||
                const DeepCollectionEquality()
                    .equals(other.lastModifiedBy, lastModifiedBy)) &&
            (identical(other.groupName, groupName) ||
                const DeepCollectionEquality()
                    .equals(other.groupName, groupName)) &&
            (identical(other.users, users) ||
                const DeepCollectionEquality().equals(other.users, users)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(events) ^
      const DeepCollectionEquality().hash(created) ^
      const DeepCollectionEquality().hash(createdBy) ^
      const DeepCollectionEquality().hash(lastModified) ^
      const DeepCollectionEquality().hash(lastModifiedBy) ^
      const DeepCollectionEquality().hash(groupName) ^
      const DeepCollectionEquality().hash(users) ^
      runtimeType.hashCode;
}

extension $UserGroupExtension on UserGroup {
  UserGroup copyWith(
      {int? id,
      List<INotification>? events,
      DateTime? created,
      User? createdBy,
      DateTime? lastModified,
      User? lastModifiedBy,
      String? groupName,
      List<User>? users}) {
    return UserGroup(
        id: id ?? this.id,
        events: events ?? this.events,
        created: created ?? this.created,
        createdBy: createdBy ?? this.createdBy,
        lastModified: lastModified ?? this.lastModified,
        lastModifiedBy: lastModifiedBy ?? this.lastModifiedBy,
        groupName: groupName ?? this.groupName,
        users: users ?? this.users);
  }

  UserGroup copyWithWrapped(
      {Wrapped<int?>? id,
      Wrapped<List<INotification>?>? events,
      Wrapped<DateTime?>? created,
      Wrapped<User?>? createdBy,
      Wrapped<DateTime?>? lastModified,
      Wrapped<User?>? lastModifiedBy,
      Wrapped<String?>? groupName,
      Wrapped<List<User>?>? users}) {
    return UserGroup(
        id: (id != null ? id.value : this.id),
        events: (events != null ? events.value : this.events),
        created: (created != null ? created.value : this.created),
        createdBy: (createdBy != null ? createdBy.value : this.createdBy),
        lastModified:
            (lastModified != null ? lastModified.value : this.lastModified),
        lastModifiedBy: (lastModifiedBy != null
            ? lastModifiedBy.value
            : this.lastModifiedBy),
        groupName: (groupName != null ? groupName.value : this.groupName),
        users: (users != null ? users.value : this.users));
  }
}

@JsonSerializable(explicitToJson: true)
class UserInDto {
  const UserInDto({
    this.userName,
  });

  factory UserInDto.fromJson(Map<String, dynamic> json) =>
      _$UserInDtoFromJson(json);

  static const toJsonFactory = _$UserInDtoToJson;
  Map<String, dynamic> toJson() => _$UserInDtoToJson(this);

  @JsonKey(name: 'userName')
  final String? userName;
  static const fromJsonFactory = _$UserInDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UserInDto &&
            (identical(other.userName, userName) ||
                const DeepCollectionEquality()
                    .equals(other.userName, userName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(userName) ^ runtimeType.hashCode;
}

extension $UserInDtoExtension on UserInDto {
  UserInDto copyWith({String? userName}) {
    return UserInDto(userName: userName ?? this.userName);
  }

  UserInDto copyWithWrapped({Wrapped<String?>? userName}) {
    return UserInDto(
        userName: (userName != null ? userName.value : this.userName));
  }
}

@JsonSerializable(explicitToJson: true)
class UserOutDto {
  const UserOutDto({
    required this.id,
    required this.userName,
  });

  factory UserOutDto.fromJson(Map<String, dynamic> json) =>
      _$UserOutDtoFromJson(json);

  static const toJsonFactory = _$UserOutDtoToJson;
  Map<String, dynamic> toJson() => _$UserOutDtoToJson(this);

  @JsonKey(name: 'id')
  final String id;
  @JsonKey(name: 'userName')
  final String userName;
  static const fromJsonFactory = _$UserOutDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UserOutDto &&
            (identical(other.id, id) ||
                const DeepCollectionEquality().equals(other.id, id)) &&
            (identical(other.userName, userName) ||
                const DeepCollectionEquality()
                    .equals(other.userName, userName)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(id) ^
      const DeepCollectionEquality().hash(userName) ^
      runtimeType.hashCode;
}

extension $UserOutDtoExtension on UserOutDto {
  UserOutDto copyWith({String? id, String? userName}) {
    return UserOutDto(id: id ?? this.id, userName: userName ?? this.userName);
  }

  UserOutDto copyWithWrapped({Wrapped<String>? id, Wrapped<String>? userName}) {
    return UserOutDto(
        id: (id != null ? id.value : this.id),
        userName: (userName != null ? userName.value : this.userName));
  }
}

@JsonSerializable(explicitToJson: true)
class UserStoreDto {
  const UserStoreDto({
    required this.keyValueStorage,
  });

  factory UserStoreDto.fromJson(Map<String, dynamic> json) =>
      _$UserStoreDtoFromJson(json);

  static const toJsonFactory = _$UserStoreDtoToJson;
  Map<String, dynamic> toJson() => _$UserStoreDtoToJson(this);

  @JsonKey(name: 'keyValueStorage')
  final Map<String, dynamic> keyValueStorage;
  static const fromJsonFactory = _$UserStoreDtoFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is UserStoreDto &&
            (identical(other.keyValueStorage, keyValueStorage) ||
                const DeepCollectionEquality()
                    .equals(other.keyValueStorage, keyValueStorage)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(keyValueStorage) ^
      runtimeType.hashCode;
}

extension $UserStoreDtoExtension on UserStoreDto {
  UserStoreDto copyWith({Map<String, dynamic>? keyValueStorage}) {
    return UserStoreDto(
        keyValueStorage: keyValueStorage ?? this.keyValueStorage);
  }

  UserStoreDto copyWithWrapped(
      {Wrapped<Map<String, dynamic>>? keyValueStorage}) {
    return UserStoreDto(
        keyValueStorage: (keyValueStorage != null
            ? keyValueStorage.value
            : this.keyValueStorage));
  }
}

@JsonSerializable(explicitToJson: true)
class WeatherForecast {
  const WeatherForecast({
    this.date,
    this.temperatureC,
    this.temperatureF,
    this.summary,
  });

  factory WeatherForecast.fromJson(Map<String, dynamic> json) =>
      _$WeatherForecastFromJson(json);

  static const toJsonFactory = _$WeatherForecastToJson;
  Map<String, dynamic> toJson() => _$WeatherForecastToJson(this);

  @JsonKey(name: 'date')
  final DateTime? date;
  @JsonKey(name: 'temperatureC')
  final int? temperatureC;
  @JsonKey(name: 'temperatureF')
  final int? temperatureF;
  @JsonKey(name: 'summary')
  final String? summary;
  static const fromJsonFactory = _$WeatherForecastFromJson;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is WeatherForecast &&
            (identical(other.date, date) ||
                const DeepCollectionEquality().equals(other.date, date)) &&
            (identical(other.temperatureC, temperatureC) ||
                const DeepCollectionEquality()
                    .equals(other.temperatureC, temperatureC)) &&
            (identical(other.temperatureF, temperatureF) ||
                const DeepCollectionEquality()
                    .equals(other.temperatureF, temperatureF)) &&
            (identical(other.summary, summary) ||
                const DeepCollectionEquality().equals(other.summary, summary)));
  }

  @override
  String toString() => jsonEncode(this);

  @override
  int get hashCode =>
      const DeepCollectionEquality().hash(date) ^
      const DeepCollectionEquality().hash(temperatureC) ^
      const DeepCollectionEquality().hash(temperatureF) ^
      const DeepCollectionEquality().hash(summary) ^
      runtimeType.hashCode;
}

extension $WeatherForecastExtension on WeatherForecast {
  WeatherForecast copyWith(
      {DateTime? date, int? temperatureC, int? temperatureF, String? summary}) {
    return WeatherForecast(
        date: date ?? this.date,
        temperatureC: temperatureC ?? this.temperatureC,
        temperatureF: temperatureF ?? this.temperatureF,
        summary: summary ?? this.summary);
  }

  WeatherForecast copyWithWrapped(
      {Wrapped<DateTime?>? date,
      Wrapped<int?>? temperatureC,
      Wrapped<int?>? temperatureF,
      Wrapped<String?>? summary}) {
    return WeatherForecast(
        date: (date != null ? date.value : this.date),
        temperatureC:
            (temperatureC != null ? temperatureC.value : this.temperatureC),
        temperatureF:
            (temperatureF != null ? temperatureF.value : this.temperatureF),
        summary: (summary != null ? summary.value : this.summary));
  }
}

String? accessLevelNullableToJson(enums.AccessLevel? accessLevel) {
  return accessLevel?.value;
}

String? accessLevelToJson(enums.AccessLevel accessLevel) {
  return accessLevel.value;
}

enums.AccessLevel accessLevelFromJson(
  Object? accessLevel, [
  enums.AccessLevel? defaultValue,
]) {
  return enums.AccessLevel.values.firstWhereOrNull((e) =>
          e.value.toString().toLowerCase() ==
          accessLevel?.toString().toLowerCase()) ??
      defaultValue ??
      enums.AccessLevel.swaggerGeneratedUnknown;
}

enums.AccessLevel? accessLevelNullableFromJson(
  Object? accessLevel, [
  enums.AccessLevel? defaultValue,
]) {
  if (accessLevel == null) {
    return null;
  }
  return enums.AccessLevel.values
          .firstWhereOrNull((e) => e.value == accessLevel) ??
      defaultValue;
}

String accessLevelExplodedListToJson(List<enums.AccessLevel>? accessLevel) {
  return accessLevel?.map((e) => e.value!).join(',') ?? '';
}

List<String> accessLevelListToJson(List<enums.AccessLevel>? accessLevel) {
  if (accessLevel == null) {
    return [];
  }

  return accessLevel.map((e) => e.value!).toList();
}

List<enums.AccessLevel> accessLevelListFromJson(
  List? accessLevel, [
  List<enums.AccessLevel>? defaultValue,
]) {
  if (accessLevel == null) {
    return defaultValue ?? [];
  }

  return accessLevel.map((e) => accessLevelFromJson(e.toString())).toList();
}

List<enums.AccessLevel>? accessLevelNullableListFromJson(
  List? accessLevel, [
  List<enums.AccessLevel>? defaultValue,
]) {
  if (accessLevel == null) {
    return defaultValue;
  }

  return accessLevel.map((e) => accessLevelFromJson(e.toString())).toList();
}

String? itemVariantNullableToJson(enums.ItemVariant? itemVariant) {
  return itemVariant?.value;
}

String? itemVariantToJson(enums.ItemVariant itemVariant) {
  return itemVariant.value;
}

enums.ItemVariant itemVariantFromJson(
  Object? itemVariant, [
  enums.ItemVariant? defaultValue,
]) {
  return enums.ItemVariant.values.firstWhereOrNull((e) =>
          e.value.toString().toLowerCase() ==
          itemVariant?.toString().toLowerCase()) ??
      defaultValue ??
      enums.ItemVariant.swaggerGeneratedUnknown;
}

enums.ItemVariant? itemVariantNullableFromJson(
  Object? itemVariant, [
  enums.ItemVariant? defaultValue,
]) {
  if (itemVariant == null) {
    return null;
  }
  return enums.ItemVariant.values
          .firstWhereOrNull((e) => e.value == itemVariant) ??
      defaultValue;
}

String itemVariantExplodedListToJson(List<enums.ItemVariant>? itemVariant) {
  return itemVariant?.map((e) => e.value!).join(',') ?? '';
}

List<String> itemVariantListToJson(List<enums.ItemVariant>? itemVariant) {
  if (itemVariant == null) {
    return [];
  }

  return itemVariant.map((e) => e.value!).toList();
}

List<enums.ItemVariant> itemVariantListFromJson(
  List? itemVariant, [
  List<enums.ItemVariant>? defaultValue,
]) {
  if (itemVariant == null) {
    return defaultValue ?? [];
  }

  return itemVariant.map((e) => itemVariantFromJson(e.toString())).toList();
}

List<enums.ItemVariant>? itemVariantNullableListFromJson(
  List? itemVariant, [
  List<enums.ItemVariant>? defaultValue,
]) {
  if (itemVariant == null) {
    return defaultValue;
  }

  return itemVariant.map((e) => itemVariantFromJson(e.toString())).toList();
}

String? quantityUnitNullableToJson(enums.QuantityUnit? quantityUnit) {
  return quantityUnit?.value;
}

String? quantityUnitToJson(enums.QuantityUnit quantityUnit) {
  return quantityUnit.value;
}

enums.QuantityUnit quantityUnitFromJson(
  Object? quantityUnit, [
  enums.QuantityUnit? defaultValue,
]) {
  return enums.QuantityUnit.values.firstWhereOrNull((e) =>
          e.value.toString().toLowerCase() ==
          quantityUnit?.toString().toLowerCase()) ??
      defaultValue ??
      enums.QuantityUnit.swaggerGeneratedUnknown;
}

enums.QuantityUnit? quantityUnitNullableFromJson(
  Object? quantityUnit, [
  enums.QuantityUnit? defaultValue,
]) {
  if (quantityUnit == null) {
    return null;
  }
  return enums.QuantityUnit.values
          .firstWhereOrNull((e) => e.value == quantityUnit) ??
      defaultValue;
}

String quantityUnitExplodedListToJson(List<enums.QuantityUnit>? quantityUnit) {
  return quantityUnit?.map((e) => e.value!).join(',') ?? '';
}

List<String> quantityUnitListToJson(List<enums.QuantityUnit>? quantityUnit) {
  if (quantityUnit == null) {
    return [];
  }

  return quantityUnit.map((e) => e.value!).toList();
}

List<enums.QuantityUnit> quantityUnitListFromJson(
  List? quantityUnit, [
  List<enums.QuantityUnit>? defaultValue,
]) {
  if (quantityUnit == null) {
    return defaultValue ?? [];
  }

  return quantityUnit.map((e) => quantityUnitFromJson(e.toString())).toList();
}

List<enums.QuantityUnit>? quantityUnitNullableListFromJson(
  List? quantityUnit, [
  List<enums.QuantityUnit>? defaultValue,
]) {
  if (quantityUnit == null) {
    return defaultValue;
  }

  return quantityUnit.map((e) => quantityUnitFromJson(e.toString())).toList();
}

typedef $JsonFactory<T> = T Function(Map<String, dynamic> json);

class $CustomJsonDecoder {
  $CustomJsonDecoder(this.factories);

  final Map<Type, $JsonFactory> factories;

  dynamic decode<T>(dynamic entity) {
    if (entity is Iterable) {
      return _decodeList<T>(entity);
    }

    if (entity is T) {
      return entity;
    }

    if (isTypeOf<T, Map>()) {
      return entity;
    }

    if (isTypeOf<T, Iterable>()) {
      return entity;
    }

    if (entity is Map<String, dynamic>) {
      return _decodeMap<T>(entity);
    }

    return entity;
  }

  T _decodeMap<T>(Map<String, dynamic> values) {
    final jsonFactory = factories[T];
    if (jsonFactory == null || jsonFactory is! $JsonFactory<T>) {
      return throw "Could not find factory for type $T. Is '$T: $T.fromJsonFactory' included in the CustomJsonDecoder instance creation in bootstrapper.dart?";
    }

    return jsonFactory(values);
  }

  List<T> _decodeList<T>(Iterable values) =>
      values.where((v) => v != null).map<T>((v) => decode<T>(v) as T).toList();
}

class $JsonSerializableConverter extends chopper.JsonConverter {
  @override
  FutureOr<chopper.Response<ResultType>> convertResponse<ResultType, Item>(
      chopper.Response response) async {
    if (response.bodyString.isEmpty) {
      // In rare cases, when let's say 204 (no content) is returned -
      // we cannot decode the missing json with the result type specified
      return chopper.Response(response.base, null, error: response.error);
    }

    if (ResultType == String) {
      return response.copyWith();
    }

    if (ResultType == DateTime) {
      return response.copyWith(
          body: DateTime.parse((response.body as String).replaceAll('"', ''))
              as ResultType);
    }

    final jsonRes = await super.convertResponse(response);
    return jsonRes.copyWith<ResultType>(
        body: $jsonDecoder.decode<Item>(jsonRes.body) as ResultType);
  }
}

final $jsonDecoder = $CustomJsonDecoder(generatedMapping);

// ignore: unused_element
String? _dateToJson(DateTime? date) {
  if (date == null) {
    return null;
  }

  final year = date.year.toString();
  final month = date.month < 10 ? '0${date.month}' : date.month.toString();
  final day = date.day < 10 ? '0${date.day}' : date.day.toString();

  return '$year-$month-$day';
}

class Wrapped<T> {
  final T value;
  const Wrapped.value(this.value);
}
