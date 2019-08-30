import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:gracker_reborn/Model/user_repository.dart';
import 'package:gracker_reborn/Firebase/DatabaseService.dart';
import 'package:gracker_reborn/Model/Assignment.dart';
import 'package:gracker_reborn/Model/Course.dart';

import 'package:native_color/native_color.dart';
import 'package:gracker_reborn/Views/CustomListTile.dart';
import 'package:gracker_reborn/Packages/PrettyDate.dart';

import 'package:circular_check_box/circular_check_box.dart';

import 'package:gracker_reborn/Views/md2DatePicker.dart';

class AssignmentView extends StatefulWidget {
  final Assignment assignment;
  final Course course;
  final GlobalKey<ScaffoldState> scaffoldKey;

  final assignments;
  final courses;

  const AssignmentView(
      {Key key,
      this.assignment,
      this.course,
      this.assignments,
      this.courses,
      this.scaffoldKey})
      : super(key: key);

  @override
  _AssignmentViewState createState() => _AssignmentViewState();
}

class _AssignmentViewState extends State<AssignmentView> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        backgroundColor: HexColor("00000"),
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black54),
        actions: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Icon(Icons.delete_outline),
          )
        ],
      ),
      body: Container(
          child: ListView(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Row(
              children: <Widget>[
                CircularCheckBox(
                  value: widget.assignment.done,
                  activeColor: Colors.green,
                  materialTapTargetSize: MaterialTapTargetSize.padded,
                ),
                Flexible(
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: TextField(
                      controller:
                          TextEditingController(text: widget.assignment.name),
                      style:
                          TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: 'Assignment Name',
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
          MaterialButton(
            padding: EdgeInsets.all(0),
            onPressed: () {
              showBottomSheet(
                  context: context,
                  builder: (context) => Container(
                        color: Colors.red,
                      ));
            },
            child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 5.0, vertical: 0),
                child: CustomListTile(
                  leading: IconButton(
                    icon: Icon(
                      Icons.bookmark_border,
                      size: 24,
                      // color: PrettyDate.isInThePast(assignment.dueDate)
                      //     ? HexColor("#CE2243")
                      //     : Colors.blue,
                    ),
                    onPressed: () => {},
                  ),
                  title: Container(
                      decoration: new BoxDecoration(
                        color: HexColor("#10" + widget.course.color),
                        borderRadius: BorderRadius.circular(5),
                        border: new Border.all(
                            color: PrettyDate.isInThePast(
                                    widget.assignment.dueDate)
                                ? HexColor("#30000000")
                                : Colors.blue,
                            width: 1,
                            style: BorderStyle.solid),
                      ),
                      padding: EdgeInsets.all(10),
                      child:
                          Flex(direction: Axis.horizontal, children: <Widget>[
                        Container(
                          width: 15,
                          height: 15,
                          margin: EdgeInsets.only(right: 10),
                          decoration: new BoxDecoration(
                            color: HexColor(widget.course.color),
                            borderRadius: BorderRadius.circular(300),
                            border: new Border.all(
                                color: HexColor("#30" + widget.course.color),
                                width: 1,
                                style: BorderStyle.solid),
                          ),
                        ),
                        Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              widget.course.name,
                              overflow: TextOverflow.clip,
                              style: TextStyle(
                                  fontSize: 13,
                                  color: HexColor(widget.course.color)),
                            )
                          ],
                        )
                      ])),
                )),
          ),
          Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5.0, vertical: 0),
              child: CustomListTile(
                leading: IconButton(
                  icon: Icon(
                    Icons.calendar_today,
                    size: 19,
                    color: PrettyDate.isInThePast(widget.assignment.dueDate)
                        ? HexColor("#CE2243")
                        : Colors.blue,
                  ),
                  onPressed: () => {},
                ),
                title: Container(
                    decoration: new BoxDecoration(
                      color: PrettyDate.isInThePast(widget.assignment.dueDate)
                          ? HexColor("FDEDF0")
                          : HexColor("EDF6FD"),
                      borderRadius: BorderRadius.circular(5),
                      border: new Border.all(
                          color:
                              PrettyDate.isInThePast(widget.assignment.dueDate)
                                  ? HexColor("#30CE2243")
                                  : Colors.blue,
                          width: 1,
                          style: BorderStyle.solid),
                    ),
                    padding: EdgeInsets.all(10),
                    child: Flex(direction: Axis.horizontal, children: <Widget>[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            PrettyDate.humanify(widget.assignment.dueDate),
                            style: TextStyle(
                                color: (PrettyDate.isInThePast(
                                        widget.assignment.dueDate)
                                    ? HexColor("CE2243")
                                    : Colors.blue),
                                fontSize: 14),
                          ),
                          Text(
                            PrettyDate.when(widget.assignment.dueDate, false),
                            style: TextStyle(
                                color: (PrettyDate.isInThePast(
                                        widget.assignment.dueDate)
                                    ? HexColor("CE2243")
                                    : Colors.blue),
                                fontSize: 12),
                          )
                        ],
                      )
                    ])),
              ))
        ],
      )),
    );
  }
}
