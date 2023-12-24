import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';

class AppInfo extends StatelessWidget {
  const AppInfo({
    super.key,
    required PackageInfo? packageInfo,
  }) : _packageInfo = packageInfo;

  final PackageInfo? _packageInfo;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text("appName"),
            Text(_packageInfo?.appName ?? ""),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text("packageName"),
            Text(_packageInfo?.packageName ?? ""),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text("version"),
            Text(_packageInfo?.version ?? ""),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text("buildNumber"),
            Text(_packageInfo?.buildNumber ?? ""),
          ],
        ),
      ],
    );
  }
}
