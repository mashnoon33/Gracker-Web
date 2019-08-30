import 'package:cloud_firestore/cloud_firestore.dart';

class Course {
  String name;
  // Category category;
  String id = "";
  String color;

  // final int hitpoints;
  // final String img;

  Course({
    this.id,
    this.name,
    this.color,
    // this.hitpoints,
    // this.img,
  });

  factory Course.fromFirestore(DocumentSnapshot doc) {
    Map data = doc.data;

    return Course(
        id: doc.documentID,
        name: data['name'] ?? '',
        color: data['color'] ?? '');
  }
}
