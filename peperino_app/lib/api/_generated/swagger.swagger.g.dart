// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'swagger.swagger.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArrangeItemInDto _$ArrangeItemInDtoFromJson(Map<String, dynamic> json) =>
    ArrangeItemInDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
    );

Map<String, dynamic> _$ArrangeItemInDtoToJson(ArrangeItemInDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
    };

BaseCheckListItemOutDto _$BaseCheckListItemOutDtoFromJson(
        Map<String, dynamic> json) =>
    BaseCheckListItemOutDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
      checked: json['checked'] as bool,
      itemType: CheckListItemTypeOutDto.fromJson(
          json['itemType'] as Map<String, dynamic>),
      $type: json[r'$type'] as String?,
    );

Map<String, dynamic> _$BaseCheckListItemOutDtoToJson(
        BaseCheckListItemOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
      'checked': instance.checked,
      'itemType': instance.itemType.toJson(),
      r'$type': instance.$type,
    };

BaseOwnableEntity _$BaseOwnableEntityFromJson(Map<String, dynamic> json) =>
    BaseOwnableEntity(
      id: json['id'] as int?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      created: json['created'] == null
          ? null
          : DateTime.parse(json['created'] as String),
      createdBy: json['createdBy'] == null
          ? null
          : User.fromJson(json['createdBy'] as Map<String, dynamic>),
      lastModified: json['lastModified'] == null
          ? null
          : DateTime.parse(json['lastModified'] as String),
      lastModifiedBy: json['lastModifiedBy'] == null
          ? null
          : User.fromJson(json['lastModifiedBy'] as Map<String, dynamic>),
      userAccess: (json['userAccess'] as List<dynamic>?)
              ?.map((e) => UserAccess.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      groupAccess: (json['groupAccess'] as List<dynamic>?)
              ?.map((e) => GroupAccess.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$BaseOwnableEntityToJson(BaseOwnableEntity instance) =>
    <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'created': instance.created?.toIso8601String(),
      'createdBy': instance.createdBy?.toJson(),
      'lastModified': instance.lastModified?.toIso8601String(),
      'lastModifiedBy': instance.lastModifiedBy?.toJson(),
      'userAccess': instance.userAccess?.map((e) => e.toJson()).toList(),
      'groupAccess': instance.groupAccess?.map((e) => e.toJson()).toList(),
    };

CheckListItemTypeOutDto _$CheckListItemTypeOutDtoFromJson(
        Map<String, dynamic> json) =>
    CheckListItemTypeOutDto(
      name: json['name'] as String?,
      description: json['description'] as String?,
      variant: itemVariantFromJson(json['variant']),
    );

Map<String, dynamic> _$CheckListItemTypeOutDtoToJson(
        CheckListItemTypeOutDto instance) =>
    <String, dynamic>{
      'name': instance.name,
      'description': instance.description,
      'variant': itemVariantToJson(instance.variant),
    };

CheckListOutDto _$CheckListOutDtoFromJson(Map<String, dynamic> json) =>
    CheckListOutDto(
      id: json['id'] as int,
      room: RoomOutDto.fromJson(json['room'] as Map<String, dynamic>),
      name: json['name'] as String,
      slug: json['slug'] as String,
      entities: (json['entities'] as List<dynamic>?)
              ?.map((e) =>
                  BaseCheckListItemOutDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      accessLevel: accessLevelFromJson(json['accessLevel']),
      isFavorite: json['isFavorite'] as bool,
    );

Map<String, dynamic> _$CheckListOutDtoToJson(CheckListOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'room': instance.room.toJson(),
      'name': instance.name,
      'slug': instance.slug,
      'entities': instance.entities.map((e) => e.toJson()).toList(),
      'accessLevel': accessLevelToJson(instance.accessLevel),
      'isFavorite': instance.isFavorite,
    };

CreateCheckListCommand _$CreateCheckListCommandFromJson(
        Map<String, dynamic> json) =>
    CreateCheckListCommand(
      name: json['name'] as String,
      roomSlug: json['roomSlug'] as String,
    );

Map<String, dynamic> _$CreateCheckListCommandToJson(
        CreateCheckListCommand instance) =>
    <String, dynamic>{
      'name': instance.name,
      'roomSlug': instance.roomSlug,
    };

CreateInventoryCommand _$CreateInventoryCommandFromJson(
        Map<String, dynamic> json) =>
    CreateInventoryCommand(
      name: json['name'] as String,
      roomSlug: json['roomSlug'] as String,
    );

Map<String, dynamic> _$CreateInventoryCommandToJson(
        CreateInventoryCommand instance) =>
    <String, dynamic>{
      'name': instance.name,
      'roomSlug': instance.roomSlug,
    };

CreateRoomCommand _$CreateRoomCommandFromJson(Map<String, dynamic> json) =>
    CreateRoomCommand(
      roomName: json['roomName'] as String,
    );

Map<String, dynamic> _$CreateRoomCommandToJson(CreateRoomCommand instance) =>
    <String, dynamic>{
      'roomName': instance.roomName,
    };

DeleteCheckListCommand _$DeleteCheckListCommandFromJson(
        Map<String, dynamic> json) =>
    DeleteCheckListCommand(
      checkListSlug: json['checkListSlug'] as String,
    );

Map<String, dynamic> _$DeleteCheckListCommandToJson(
        DeleteCheckListCommand instance) =>
    <String, dynamic>{
      'checkListSlug': instance.checkListSlug,
    };

DeleteInventoryCommand _$DeleteInventoryCommandFromJson(
        Map<String, dynamic> json) =>
    DeleteInventoryCommand(
      inventorySlug: json['inventorySlug'] as String,
    );

Map<String, dynamic> _$DeleteInventoryCommandToJson(
        DeleteInventoryCommand instance) =>
    <String, dynamic>{
      'inventorySlug': instance.inventorySlug,
    };

Demo _$DemoFromJson(Map<String, dynamic> json) => Demo(
      id: json['id'] as int?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      created: json['created'] == null
          ? null
          : DateTime.parse(json['created'] as String),
      createdBy: json['createdBy'] == null
          ? null
          : User.fromJson(json['createdBy'] as Map<String, dynamic>),
      lastModified: json['lastModified'] == null
          ? null
          : DateTime.parse(json['lastModified'] as String),
      lastModifiedBy: json['lastModifiedBy'] == null
          ? null
          : User.fromJson(json['lastModifiedBy'] as Map<String, dynamic>),
      userAccess: (json['userAccess'] as List<dynamic>?)
              ?.map((e) => UserAccess.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      groupAccess: (json['groupAccess'] as List<dynamic>?)
              ?.map((e) => GroupAccess.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      value: json['value'] as String?,
    );

Map<String, dynamic> _$DemoToJson(Demo instance) => <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'created': instance.created?.toIso8601String(),
      'createdBy': instance.createdBy?.toJson(),
      'lastModified': instance.lastModified?.toIso8601String(),
      'lastModifiedBy': instance.lastModifiedBy?.toJson(),
      'userAccess': instance.userAccess?.map((e) => e.toJson()).toList(),
      'groupAccess': instance.groupAccess?.map((e) => e.toJson()).toList(),
      'value': instance.value,
    };

EnvironmentOutDto _$EnvironmentOutDtoFromJson(Map<String, dynamic> json) =>
    EnvironmentOutDto(
      railwaYENVIRONMENT: json['railwaY_ENVIRONMENT'] as String,
      railwaYGITCOMMITSHA: json['railwaY_GIT_COMMIT_SHA'] as String,
      railwaYGITCOMMITMESSAGE: json['railwaY_GIT_COMMIT_MESSAGE'] as String,
      railwaYGITAUTHOR: json['railwaY_GIT_AUTHOR'] as String,
    );

Map<String, dynamic> _$EnvironmentOutDtoToJson(EnvironmentOutDto instance) =>
    <String, dynamic>{
      'railwaY_ENVIRONMENT': instance.railwaYENVIRONMENT,
      'railwaY_GIT_COMMIT_SHA': instance.railwaYGITCOMMITSHA,
      'railwaY_GIT_COMMIT_MESSAGE': instance.railwaYGITCOMMITMESSAGE,
      'railwaY_GIT_AUTHOR': instance.railwaYGITAUTHOR,
    };

GroupAccess _$GroupAccessFromJson(Map<String, dynamic> json) => GroupAccess(
      id: json['id'] as int?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      userGroup: json['userGroup'] == null
          ? null
          : UserGroup.fromJson(json['userGroup'] as Map<String, dynamic>),
      accessLevel: accessLevelNullableFromJson(json['accessLevel']),
      entities: (json['entities'] as List<dynamic>?)
              ?.map(
                  (e) => BaseOwnableEntity.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$GroupAccessToJson(GroupAccess instance) =>
    <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'userGroup': instance.userGroup?.toJson(),
      'accessLevel': accessLevelNullableToJson(instance.accessLevel),
      'entities': instance.entities?.map((e) => e.toJson()).toList(),
    };

ImageCheckListItemInDto _$ImageCheckListItemInDtoFromJson(
        Map<String, dynamic> json) =>
    ImageCheckListItemInDto(
      imageBase64: json['imageBase64'] as String,
      title: json['title'] as String,
    );

Map<String, dynamic> _$ImageCheckListItemInDtoToJson(
        ImageCheckListItemInDto instance) =>
    <String, dynamic>{
      'imageBase64': instance.imageBase64,
      'title': instance.title,
    };

ImageCheckListItemOutDto _$ImageCheckListItemOutDtoFromJson(
        Map<String, dynamic> json) =>
    ImageCheckListItemOutDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
      checked: json['checked'] as bool,
      itemType: CheckListItemTypeOutDto.fromJson(
          json['itemType'] as Map<String, dynamic>),
      title: json['title'] as String,
      imageReference: json['imageReference'] as String,
      $type: json[r'$type'] as String?,
    );

Map<String, dynamic> _$ImageCheckListItemOutDtoToJson(
        ImageCheckListItemOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
      'checked': instance.checked,
      'itemType': instance.itemType.toJson(),
      'title': instance.title,
      'imageReference': instance.imageReference,
      r'$type': instance.$type,
    };

INotification _$INotificationFromJson(Map<String, dynamic> json) =>
    INotification();

Map<String, dynamic> _$INotificationToJson(INotification instance) =>
    <String, dynamic>{};

InventoryCheckListItemInDto _$InventoryCheckListItemInDtoFromJson(
        Map<String, dynamic> json) =>
    InventoryCheckListItemInDto(
      text: json['text'] as String,
      quantity: (json['quantity'] as num).toDouble(),
      unit: quantityUnitFromJson(json['unit']),
    );

Map<String, dynamic> _$InventoryCheckListItemInDtoToJson(
        InventoryCheckListItemInDto instance) =>
    <String, dynamic>{
      'text': instance.text,
      'quantity': instance.quantity,
      'unit': quantityUnitToJson(instance.unit),
    };

InventoryCheckListItemOutDto _$InventoryCheckListItemOutDtoFromJson(
        Map<String, dynamic> json) =>
    InventoryCheckListItemOutDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
      checked: json['checked'] as bool,
      itemType: CheckListItemTypeOutDto.fromJson(
          json['itemType'] as Map<String, dynamic>),
      text: json['text'] as String,
      quantity: (json['quantity'] as num).toDouble(),
      unit: quantityUnitFromJson(json['unit']),
      $type: json[r'$type'] as String?,
    );

Map<String, dynamic> _$InventoryCheckListItemOutDtoToJson(
        InventoryCheckListItemOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
      'checked': instance.checked,
      'itemType': instance.itemType.toJson(),
      'text': instance.text,
      'quantity': instance.quantity,
      'unit': quantityUnitToJson(instance.unit),
      r'$type': instance.$type,
    };

InventoryOutDto _$InventoryOutDtoFromJson(Map<String, dynamic> json) =>
    InventoryOutDto(
      id: json['id'] as int,
      roomInventory:
          RoomOutDto.fromJson(json['room_Inventory'] as Map<String, dynamic>),
      name: json['name'] as String,
      slug: json['slug'] as String,
      entities: (json['entities'] as List<dynamic>?)
              ?.map((e) =>
                  BaseCheckListItemOutDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      accessLevel: accessLevelFromJson(json['accessLevel']),
    );

Map<String, dynamic> _$InventoryOutDtoToJson(InventoryOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'room_Inventory': instance.roomInventory.toJson(),
      'name': instance.name,
      'slug': instance.slug,
      'entities': instance.entities.map((e) => e.toJson()).toList(),
      'accessLevel': accessLevelToJson(instance.accessLevel),
    };

LinkCheckListItemInDto _$LinkCheckListItemInDtoFromJson(
        Map<String, dynamic> json) =>
    LinkCheckListItemInDto(
      title: json['title'] as String,
      link: json['link'] as String,
    );

Map<String, dynamic> _$LinkCheckListItemInDtoToJson(
        LinkCheckListItemInDto instance) =>
    <String, dynamic>{
      'title': instance.title,
      'link': instance.link,
    };

LinkCheckListItemOutDto _$LinkCheckListItemOutDtoFromJson(
        Map<String, dynamic> json) =>
    LinkCheckListItemOutDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
      checked: json['checked'] as bool,
      itemType: CheckListItemTypeOutDto.fromJson(
          json['itemType'] as Map<String, dynamic>),
      title: json['title'] as String,
      link: json['link'] as String,
      $type: json[r'$type'] as String?,
    );

Map<String, dynamic> _$LinkCheckListItemOutDtoToJson(
        LinkCheckListItemOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
      'checked': instance.checked,
      'itemType': instance.itemType.toJson(),
      'title': instance.title,
      'link': instance.link,
      r'$type': instance.$type,
    };

RearrangeCheckListItemsInDto _$RearrangeCheckListItemsInDtoFromJson(
        Map<String, dynamic> json) =>
    RearrangeCheckListItemsInDto(
      items: (json['items'] as List<dynamic>?)
              ?.map((e) => ArrangeItemInDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$RearrangeCheckListItemsInDtoToJson(
        RearrangeCheckListItemsInDto instance) =>
    <String, dynamic>{
      'items': instance.items.map((e) => e.toJson()).toList(),
    };

RenameCheckListCommand _$RenameCheckListCommandFromJson(
        Map<String, dynamic> json) =>
    RenameCheckListCommand(
      slug: json['slug'] as String,
      newName: json['newName'] as String,
    );

Map<String, dynamic> _$RenameCheckListCommandToJson(
        RenameCheckListCommand instance) =>
    <String, dynamic>{
      'slug': instance.slug,
      'newName': instance.newName,
    };

RenameInventoryCommand _$RenameInventoryCommandFromJson(
        Map<String, dynamic> json) =>
    RenameInventoryCommand(
      slug: json['slug'] as String,
      newName: json['newName'] as String,
    );

Map<String, dynamic> _$RenameInventoryCommandToJson(
        RenameInventoryCommand instance) =>
    <String, dynamic>{
      'slug': instance.slug,
      'newName': instance.newName,
    };

RenameRoomCommand _$RenameRoomCommandFromJson(Map<String, dynamic> json) =>
    RenameRoomCommand(
      slug: json['slug'] as String,
      newName: json['newName'] as String,
    );

Map<String, dynamic> _$RenameRoomCommandToJson(RenameRoomCommand instance) =>
    <String, dynamic>{
      'slug': instance.slug,
      'newName': instance.newName,
    };

RevokeRoomAccessCommand _$RevokeRoomAccessCommandFromJson(
        Map<String, dynamic> json) =>
    RevokeRoomAccessCommand(
      slug: json['slug'] as String,
      userId: json['userId'] as String,
    );

Map<String, dynamic> _$RevokeRoomAccessCommandToJson(
        RevokeRoomAccessCommand instance) =>
    <String, dynamic>{
      'slug': instance.slug,
      'userId': instance.userId,
    };

RoomOutDto _$RoomOutDtoFromJson(Map<String, dynamic> json) => RoomOutDto(
      id: json['id'] as int,
      roomName: json['roomName'] as String,
      slug: json['slug'] as String,
      createdBy: UserOutDto.fromJson(json['createdBy'] as Map<String, dynamic>),
      accessLevel: accessLevelFromJson(json['accessLevel']),
      checkLists: (json['checkLists'] as List<dynamic>?)
              ?.map((e) => CheckListOutDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      inventories: (json['inventories'] as List<dynamic>?)
              ?.map((e) => InventoryOutDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      users: (json['users'] as List<dynamic>?)
              ?.map((e) => UserOutDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$RoomOutDtoToJson(RoomOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'roomName': instance.roomName,
      'slug': instance.slug,
      'createdBy': instance.createdBy.toJson(),
      'accessLevel': accessLevelToJson(instance.accessLevel),
      'checkLists': instance.checkLists.map((e) => e.toJson()).toList(),
      'inventories': instance.inventories.map((e) => e.toJson()).toList(),
      'users': instance.users.map((e) => e.toJson()).toList(),
    };

SharedLinkInDto _$SharedLinkInDtoFromJson(Map<String, dynamic> json) =>
    SharedLinkInDto(
      grantAccessLevel: accessLevelFromJson(json['grantAccessLevel']),
      entityType: json['entityType'] as String,
      slug: json['slug'] as String,
    );

Map<String, dynamic> _$SharedLinkInDtoToJson(SharedLinkInDto instance) =>
    <String, dynamic>{
      'grantAccessLevel': accessLevelToJson(instance.grantAccessLevel),
      'entityType': instance.entityType,
      'slug': instance.slug,
    };

SharedLinkOutDto _$SharedLinkOutDtoFromJson(Map<String, dynamic> json) =>
    SharedLinkOutDto(
      slug: json['slug'] as String,
    );

Map<String, dynamic> _$SharedLinkOutDtoToJson(SharedLinkOutDto instance) =>
    <String, dynamic>{
      'slug': instance.slug,
    };

SharedLinkResolvedOutDto _$SharedLinkResolvedOutDtoFromJson(
        Map<String, dynamic> json) =>
    SharedLinkResolvedOutDto(
      entityType: json['entityType'] as String,
      slug: json['slug'] as String,
    );

Map<String, dynamic> _$SharedLinkResolvedOutDtoToJson(
        SharedLinkResolvedOutDto instance) =>
    <String, dynamic>{
      'entityType': instance.entityType,
      'slug': instance.slug,
    };

TextCheckListItemInDto _$TextCheckListItemInDtoFromJson(
        Map<String, dynamic> json) =>
    TextCheckListItemInDto(
      text: json['text'] as String,
    );

Map<String, dynamic> _$TextCheckListItemInDtoToJson(
        TextCheckListItemInDto instance) =>
    <String, dynamic>{
      'text': instance.text,
    };

TextCheckListItemOutDto _$TextCheckListItemOutDtoFromJson(
        Map<String, dynamic> json) =>
    TextCheckListItemOutDto(
      id: json['id'] as int,
      sortIndex: json['sortIndex'] as int,
      checked: json['checked'] as bool,
      itemType: CheckListItemTypeOutDto.fromJson(
          json['itemType'] as Map<String, dynamic>),
      text: json['text'] as String,
      $type: json[r'$type'] as String?,
    );

Map<String, dynamic> _$TextCheckListItemOutDtoToJson(
        TextCheckListItemOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sortIndex': instance.sortIndex,
      'checked': instance.checked,
      'itemType': instance.itemType.toJson(),
      'text': instance.text,
      r'$type': instance.$type,
    };

UpdateFavoritesCommand _$UpdateFavoritesCommandFromJson(
        Map<String, dynamic> json) =>
    UpdateFavoritesCommand(
      slug: json['slug'] as String,
      favorite: json['favorite'] as bool,
    );

Map<String, dynamic> _$UpdateFavoritesCommandToJson(
        UpdateFavoritesCommand instance) =>
    <String, dynamic>{
      'slug': instance.slug,
      'favorite': instance.favorite,
    };

User _$UserFromJson(Map<String, dynamic> json) => User(
      id: json['id'] as String?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      userName: json['userName'] as String?,
      userGroups: (json['userGroups'] as List<dynamic>?)
              ?.map((e) => UserGroup.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'userName': instance.userName,
      'userGroups': instance.userGroups?.map((e) => e.toJson()).toList(),
    };

UserAccess _$UserAccessFromJson(Map<String, dynamic> json) => UserAccess(
      id: json['id'] as int?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      user: json['user'] == null
          ? null
          : User.fromJson(json['user'] as Map<String, dynamic>),
      accessLevel: accessLevelNullableFromJson(json['accessLevel']),
      entities: (json['entities'] as List<dynamic>?)
              ?.map(
                  (e) => BaseOwnableEntity.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$UserAccessToJson(UserAccess instance) =>
    <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'user': instance.user?.toJson(),
      'accessLevel': accessLevelNullableToJson(instance.accessLevel),
      'entities': instance.entities?.map((e) => e.toJson()).toList(),
    };

UserGroup _$UserGroupFromJson(Map<String, dynamic> json) => UserGroup(
      id: json['id'] as int?,
      events: (json['events'] as List<dynamic>?)
              ?.map((e) => INotification.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      created: json['created'] == null
          ? null
          : DateTime.parse(json['created'] as String),
      createdBy: json['createdBy'] == null
          ? null
          : User.fromJson(json['createdBy'] as Map<String, dynamic>),
      lastModified: json['lastModified'] == null
          ? null
          : DateTime.parse(json['lastModified'] as String),
      lastModifiedBy: json['lastModifiedBy'] == null
          ? null
          : User.fromJson(json['lastModifiedBy'] as Map<String, dynamic>),
      groupName: json['groupName'] as String?,
      users: (json['users'] as List<dynamic>?)
              ?.map((e) => User.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$UserGroupToJson(UserGroup instance) => <String, dynamic>{
      'id': instance.id,
      'events': instance.events?.map((e) => e.toJson()).toList(),
      'created': instance.created?.toIso8601String(),
      'createdBy': instance.createdBy?.toJson(),
      'lastModified': instance.lastModified?.toIso8601String(),
      'lastModifiedBy': instance.lastModifiedBy?.toJson(),
      'groupName': instance.groupName,
      'users': instance.users?.map((e) => e.toJson()).toList(),
    };

UserInDto _$UserInDtoFromJson(Map<String, dynamic> json) => UserInDto(
      userName: json['userName'] as String?,
    );

Map<String, dynamic> _$UserInDtoToJson(UserInDto instance) => <String, dynamic>{
      'userName': instance.userName,
    };

UserOutDto _$UserOutDtoFromJson(Map<String, dynamic> json) => UserOutDto(
      id: json['id'] as String,
      userName: json['userName'] as String,
    );

Map<String, dynamic> _$UserOutDtoToJson(UserOutDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userName': instance.userName,
    };

UserStoreDto _$UserStoreDtoFromJson(Map<String, dynamic> json) => UserStoreDto(
      keyValueStorage: json['keyValueStorage'] as Map<String, dynamic>,
    );

Map<String, dynamic> _$UserStoreDtoToJson(UserStoreDto instance) =>
    <String, dynamic>{
      'keyValueStorage': instance.keyValueStorage,
    };

WeatherForecast _$WeatherForecastFromJson(Map<String, dynamic> json) =>
    WeatherForecast(
      date:
          json['date'] == null ? null : DateTime.parse(json['date'] as String),
      temperatureC: json['temperatureC'] as int?,
      temperatureF: json['temperatureF'] as int?,
      summary: json['summary'] as String?,
    );

Map<String, dynamic> _$WeatherForecastToJson(WeatherForecast instance) =>
    <String, dynamic>{
      'date': instance.date?.toIso8601String(),
      'temperatureC': instance.temperatureC,
      'temperatureF': instance.temperatureF,
      'summary': instance.summary,
    };
