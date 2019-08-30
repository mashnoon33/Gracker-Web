import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:async';
import 'package:gracker_reborn/Model/Assignment.dart';
import 'package:gracker_reborn/Model/Course.dart';
import 'package:collection/collection.dart';

class DatabaseService {
  final Firestore _db = Firestore.instance;

  /// Get a stream of a single document
  Stream<List<Assignment>> streamAssignnments(String id) {
    var ref = _db
        .collection('Users')
        .document(id)
        .collection('Assignments')
        .orderBy('dueDate', descending: false);

    return ref.snapshots().map((list) =>
        list.documents.map((doc) => Assignment.fromFirestore(doc)).toList());
  }

  Stream<List<Course>> streamCourses(String id) {
    var ref = _db
        .collection('Users')
        .document(id)
        .collection('Courses')
        .orderBy('name', descending: false);

    return ref.snapshots().map((list) =>
        list.documents.map((doc) => Course.fromFirestore(doc)).toList());
  }

  // /// Query a subcollection
  // Stream<List<Weapon>> streamWeapons(FirebaseUser user) {
  //   var ref = _db.collection('heroes').document(user.uid).collection('weapons');

  //   return ref.snapshots().map((list) =>
  //       list.documents.map((doc) => Weapon.fromFirestore(doc)).toList());
  // }

  /// Write data
  Future<void> createHero(String heroId) {
    return _db.collection('heroes').document(heroId).setData({/* some data */});
  }
}
