import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:gracker_reborn/Model/user_repository.dart';
import 'package:gracker_reborn/Firebase/DatabaseService.dart';
import 'package:gracker_reborn/Model/Assignment.dart';
import 'package:gracker_reborn/Model/Course.dart';

import 'package:native_color/native_color.dart';
import 'package:gracker_reborn/Views/CustomListTile.dart';
import 'package:gracker_reborn/Views/AssignmentView.dart';

import 'package:gracker_reborn/Packages/PrettyDate.dart';

import 'package:circular_check_box/circular_check_box.dart';

import 'package:collection/collection.dart';

class AllAssignmentView extends StatelessWidget {
  final FirebaseUser user;

  const AllAssignmentView({Key key, this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final db = DatabaseService();

    return Scaffold(
        appBar: AppBar(
          backgroundColor: HexColor("00000"),
          elevation: 0,
          title: Container(
            padding: EdgeInsets.only(left: 50, top: 10),
            child: Text(
              "Assignments",
              style: TextStyle(color: HexColor("000000"), fontSize: 30),
            ),
          ),
        ),
        body: MultiProvider(
          providers: [
            StreamProvider<List<Assignment>>(
              builder: (_) => db.streamAssignnments(user.uid),
            ),
            StreamProvider<List<Course>>(
              builder: (_) => db.streamCourses(user.uid),
            )
          ],
          child: AssignmentList(),
        ));
    //  Center(
    //   child: Column(
    //     mainAxisAlignment: MainAxisAlignment.center,
    //     children: <Widget>[
    //       Text(user.uid),
    //     ],
    //   ),
    // ),
  }
}

class AssignmentList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var assignments = Provider.of<List<Assignment>>(context);
    var courses = Provider.of<List<Course>>(context);

    return Container(
        child: assignments != null
            ? ListView(
                children: assignments.map(
                (assignment) {
                  var course = courses != null
                      ? courses.firstWhere(
                          (course) => course.id == assignment.course,
                          orElse: () => null)
                      : null;

                  return Container(
                      // padding: EdgeInsets.only(top: 5),
                      decoration: new BoxDecoration(
                        border: new Border(
                            bottom: BorderSide(
                                color: Colors.black12,
                                width: 0.5,
                                style: BorderStyle.solid)),
                      ),
                      child: (CustomListTile(
                          onTap: () {
                            var route = new MaterialPageRoute(
                              builder: (BuildContext context) =>
                                  new AssignmentView(
                                assignment: assignment,
                                course: course,
                                assignments: assignments,
                                courses: courses,
                              ),
                            );
                            Navigator.of(context).push(route);
                          },
                          leading: CircularCheckBox(
                            value: assignment.done,
                            activeColor: Colors.green,
                            materialTapTargetSize: MaterialTapTargetSize.padded,
                          ),
                          title: Text(
                            assignment.name,
                            style: TextStyle(
                                fontWeight: FontWeight.w500,
                                color: Colors.black87,
                                fontSize: 16),
                          ),
                          subtitle: Wrap(
                              spacing: 5,
                              runSpacing: -10,
                              children: <Widget>[
                                Chip(
                                  // onPressed: () => {},
                                  shape: RoundedRectangleBorder(
                                      borderRadius:
                                          BorderRadius.all(Radius.circular(5))),
                                  backgroundColor:
                                      PrettyDate.isInThePast(assignment.dueDate)
                                          ? HexColor("FDEDF0")
                                          : HexColor("EDF6FD"),
                                  avatar: Icon(
                                    Icons.calendar_today,
                                    color: PrettyDate.isInThePast(
                                            assignment.dueDate)
                                        ? HexColor("CE2243")
                                        : Colors.blue,
                                    size: 13,
                                  ),
                                  label: Text(
                                    PrettyDate.when(assignment.dueDate, false),
                                    style: TextStyle(
                                        color: (PrettyDate.isInThePast(
                                                assignment.dueDate)
                                            ? HexColor("CE2243")
                                            : Colors.blue),
                                        fontSize: 12),
                                  ),
                                ),
                                Chip(
                                  shape: RoundedRectangleBorder(
                                      borderRadius:
                                          BorderRadius.all(Radius.circular(5))),
                                  backgroundColor:
                                      HexColor("#10" + course.color),
                                  avatar: Icon(
                                    Icons.bookmark_border,
                                    color: HexColor(course.color ?? ""),
                                    size: 16,
                                  ),
                                  label: Text(
                                    course.name,
                                    overflow: TextOverflow.clip,
                                    style: TextStyle(
                                        fontSize: 12,
                                        color: HexColor(course.color)),
                                  ),
                                ),
                              ]))));
                },
              ).toList())
            : null);
  }
}
