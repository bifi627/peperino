import 'package:json_annotation/json_annotation.dart';
import 'package:collection/collection.dart';

enum AccessLevel {
  @JsonValue(null)
  swaggerGeneratedUnknown(null),

  @JsonValue('None')
  none('None'),
  @JsonValue('Read')
  read('Read'),
  @JsonValue('WriteContent')
  writecontent('WriteContent'),
  @JsonValue('Write')
  write('Write'),
  @JsonValue('Delete')
  delete('Delete'),
  @JsonValue('Owner')
  owner('Owner');

  final String? value;

  const AccessLevel(this.value);
}

enum ItemVariant {
  @JsonValue(null)
  swaggerGeneratedUnknown(null),

  @JsonValue('Text')
  text('Text'),
  @JsonValue('Link')
  link('Link'),
  @JsonValue('Image')
  image('Image'),
  @JsonValue('Inventory')
  inventory('Inventory');

  final String? value;

  const ItemVariant(this.value);
}

enum QuantityUnit {
  @JsonValue(null)
  swaggerGeneratedUnknown(null),

  @JsonValue('Unit')
  unit('Unit');

  final String? value;

  const QuantityUnit(this.value);
}
