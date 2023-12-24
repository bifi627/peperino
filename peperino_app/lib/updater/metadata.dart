class UpdateMetaDataModel {
  int version;
  ArtifactType artifactType;
  String applicationId;
  String variantName;
  List<Element> elements;
  String elementType;

  UpdateMetaDataModel({
    required this.version,
    required this.artifactType,
    required this.applicationId,
    required this.variantName,
    required this.elements,
    required this.elementType,
  });

  factory UpdateMetaDataModel.fromJson(Map<String, dynamic> json) {
    return UpdateMetaDataModel(
      version: json['version'],
      artifactType: ArtifactType.fromJson(json['artifactType']),
      applicationId: json['applicationId'],
      variantName: json['variantName'],
      elements: List<Element>.from(json['elements'].map((e) => Element.fromJson(e))),
      elementType: json['elementType'],
    );
  }
}

class ArtifactType {
  String type;
  String kind;

  ArtifactType({
    required this.type,
    required this.kind,
  });

  factory ArtifactType.fromJson(Map<String, dynamic> json) {
    return ArtifactType(
      type: json['type'],
      kind: json['kind'],
    );
  }
}

class Element {
  String type;
  List<String> filters;
  List<String> attributes;
  int versionCode;
  String versionName;
  String outputFile;

  Element({
    required this.type,
    required this.filters,
    required this.attributes,
    required this.versionCode,
    required this.versionName,
    required this.outputFile,
  });

  factory Element.fromJson(Map<String, dynamic> json) {
    return Element(
      type: json['type'],
      filters: List<String>.from(json['filters']),
      attributes: List<String>.from(json['attributes']),
      versionCode: json['versionCode'],
      versionName: json['versionName'],
      outputFile: json['outputFile'],
    );
  }
}
