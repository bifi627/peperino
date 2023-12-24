import 'package:flutter/material.dart';
import 'package:peperino_app/api/auth_api.dart';

import '../../../api/_generated/swagger.swagger.dart';

class DefaultPage extends StatefulWidget {
  const DefaultPage({super.key});

  @override
  State<DefaultPage> createState() => _DefaultPageState();
}

class _DefaultPageState extends State<DefaultPage> {
  List<RoomOutDto> rooms = List.empty();

  Future<void> fetch() async {
    var responseRooms = await PeperinoClient.api.apiRoomGet();
    setState(() {
      rooms = responseRooms.body!;
    });
  }

  Future<void> onRoomSelected(RoomOutDto room) async {}

  @override
  void initState() {
    super.initState();
    fetch();
  }

  Widget getRoomWidgets() {
    if (rooms.isEmpty) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return ListView(
      children: rooms
          .map(
            (room) => GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () {
                onRoomSelected(room);
              },
              child: Container(
                padding: const EdgeInsets.all(15),
                child: Flex(
                  direction: Axis.horizontal,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      child: Flex(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        direction: Axis.vertical,
                        children: [
                          Text(room.roomName),
                          Text(
                            room.createdBy.userName,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    Center(
                      child: IconButton(
                        iconSize: 48,
                        onPressed: () {
                          onRoomSelected(room);
                        },
                        icon: const Icon(Icons.arrow_right),
                      ),
                    )
                  ],
                ),
              ),
            ),
          )
          .toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return getRoomWidgets();
  }
}
