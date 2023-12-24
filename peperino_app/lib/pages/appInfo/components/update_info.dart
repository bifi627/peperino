import 'package:flutter/material.dart';
import 'package:peperino_app/updater/metadata.dart';

class UpdateInfo extends StatelessWidget {
  const UpdateInfo({
    super.key,
    required UpdateMetaDataModel? metaData,
  }) : _metaData = metaData;

  final UpdateMetaDataModel? _metaData;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("version"),
                Text(_metaData?.elements[0].versionName ?? ""),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("buildNumber"),
                Text(_metaData?.elements[0].versionCode.toString() ?? ""),
              ],
            ),
          ],
        )
      ],
    );
  }
}
