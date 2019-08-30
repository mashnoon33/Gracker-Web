import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dart:async';
import 'package:provider/provider.dart';

class Assignment {
  String name;
  // Category category;
  bool done = false;
  bool hide = false;
  String course = "";
  String id = "";
  DateTime dueDate;

  // final int hitpoints;
  // final String img;

  Assignment({
    this.id,
    this.name,
    this.done,
    this.dueDate,
    this.course,
    // this.hitpoints,
    // this.img,
  });

  factory Assignment.fromFirestore(DocumentSnapshot doc) {
    Map data = doc.data;

    return Assignment(
        id: doc.documentID,
        name: data['name'] ?? '',
        dueDate: new DateTime.fromMillisecondsSinceEpoch(
                data['dueDate'].millisecondsSinceEpoch) ??
            new DateTime.now(),
        course: data['course'] ?? "",
        done: data['done'] ?? false);
  }
}
