import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:install_plugin/install_plugin.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'package:peperino_app/updater/metadata.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'package:permission_handler/permission_handler.dart';

import '../../auth/bloc/auth_bloc.dart';
import '../../components/app_bar.dart';

class AppInfoPage extends StatefulWidget {
  const AppInfoPage({super.key});

  @override
  State<AppInfoPage> createState() => _AppInfoPageState();
}

class _AppInfoPageState extends State<AppInfoPage> {
  PackageInfo? _packageInfo;
  UpdateMetaDataModel? _metaData;

  bool hasUpdate = false;

  double downloadPercent = 0.0;

  bool canInstall = false;

  Future<void> fetch() async {
    var packageInfo = await PackageInfo.fromPlatform();
    setState(() {
      _packageInfo = packageInfo;
      hasUpdate = false;
      canInstall = false;
      downloadPercent = 0.0;
    });
    var metadata = await checkUpdate();
    setState(() {
      _metaData = metadata;
      hasUpdate = int.parse(_packageInfo?.buildNumber ?? "0") < metadata!.elements[0].versionCode;
    });
  }

  Future<void> downloadUpdate() async {
    var storagePermission = await Permission.storage.request();
    if (storagePermission.isGranted) {
      var appDocDir = await getTemporaryDirectory();
      String savePath = "${appDocDir.path}/app-release.apk";
      String fileUrl =
          "https://firebasestorage.googleapis.com/v0/b/peperino-app.appspot.com/o/public%2Fandroid%2Fapp-release.test?alt=media";
      await Dio().download(fileUrl, savePath, onReceiveProgress: (count, total) {
        final value = count / total;
        if (downloadPercent != value) {
          setState(() {
            if (downloadPercent < 1.0) {
              downloadPercent = count / total;
            } else {
              downloadPercent = 0.0;
            }
          });
        }
        if (count == total) {
          setState(() {
            canInstall = true;
          });
        }
      });
    }
  }

  Future<void> installUpdate() async {
    var installPackage = await Permission.requestInstallPackages.request();
    if (installPackage.isGranted) {
      var appDocDir = await getTemporaryDirectory();
      String savePath = "${appDocDir.path}/app-release.apk";
      var result = await InstallPlugin.install(savePath);
      debugPrint(result.toString());
    }
  }

  Future<UpdateMetaDataModel?> checkUpdate() async {
    if (_packageInfo != null) {
      var metadataUrl =
          "https://firebasestorage.googleapis.com/v0/b/peperino-app.appspot.com/o/public%2Fandroid%2Foutput-metadata.json?alt=media";

      var metadataResponse = await http.get(Uri.parse(metadataUrl));
      var metadata = UpdateMetaDataModel.fromJson(json.decode(metadataResponse.body));

      return metadata;
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    fetch();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return Scaffold(
          appBar: const MainAppBar(title: "App Info"),
          body: Container(
            height: double.infinity,
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(30, 20, 30, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Column(
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
                    )
                  ],
                ),
                const Divider(),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size.fromHeight(30),
                  ),
                  onPressed: () {
                    fetch();
                  },
                  child: const Text('Check Update'),
                ),
                if (hasUpdate)
                  Column(
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
                  ),
                if (hasUpdate) const Divider(),
                if (hasUpdate)
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(30),
                    ),
                    onPressed: () {
                      downloadUpdate();
                    },
                    child: const Text('Download Update'),
                  ),
                if (downloadPercent > 0.0)
                  LinearPercentIndicator(
                    lineHeight: 14.0,
                    percent: downloadPercent,
                    backgroundColor: Colors.grey,
                    progressColor: Colors.lightGreen,
                  ),
                if (canInstall)
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(30),
                    ),
                    onPressed: () async {
                      await installUpdate();
                      await fetch();
                    },
                    child: const Text('Install Update'),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
