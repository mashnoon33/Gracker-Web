class PrettyDate {
  PrettyDate();
  static const monthsAbbr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  static const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  static const weekdaysAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  static const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  static String humanify(DateTime date) {
    String builder = "";
    builder += weekdays[date.weekday - 1] +
        ", " +
        months[date.month - 1] +
        " " +
        date.day.toString();

    return builder;
  }

  static DateTime tomorrow() {
    var now = DateTime.now();
    return DateTime(now.year, now.month, now.day + 1);
  }

  static DateTime today() {
    var now = DateTime.now();
    return DateTime(now.year, now.month, now.day);
  }

  static DateTime nextWeekToday() {
    var now = DateTime.now();
    return DateTime(now.year, now.month, now.day + 7);
  }

  static bool isHumanTomorrow() {
    var now = DateTime.now();

    if (now.hour >= 6) return true;
    return false;
  }

  static DateTime tomorrowHuman() {
    var now = DateTime.now();
    return DateTime(
        now.year, now.month, isHumanTomorrow() ? now.day + 1 : now.day);
  }

  static DateTime tomorrowMidnight() {
    var now = DateTime.now();
    return DateTime(now.year, now.month, now.day + 1, 23, 59, 59, 999);
  }

  static DateTime midnight() {
    var now = DateTime.now();
    return DateTime(now.year, now.month, now.day, 23, 59, 59, 999);
  }

  static bool isInThePast(DateTime date) {
    var now = DateTime.now();
    var diff = date.difference(now).inDays;

    if (diff.isNegative) return true;
    return false;
  }

  static String when(DateTime date, bool showDue) {
    var now = DateTime.now();
    var diff = date.difference(now);
    var y = diff.inDays.round();
    var x = diff.inDays.abs().round();
    final due = showDue ? "due " : "";

// Probably can do better with a switch
    if (diff.isNegative) {
      if (y == -1) {
        return due + "Yesterday";
      }

      if (y == -2) {
        return "$x days ago";
      }

      if (y.abs() == 0) {
        return due + "Today";
      }

      return "$x days ago";
    } else {
      if (y == 1) {
        return due + "Tomorrow";
      }
      if (y.abs() == 0) {
        return due + "Today";
      }
      return due + "" + humanify(date);
    }
  }
}

main(List<String> args) {
  // print(PrettyDate.when(DateTime.now()));
  // print(PrettyDate.when(DateTime(2018, 12, 21, 23)));
  print(PrettyDate.tomorrow().toUtc().millisecondsSinceEpoch);
  print(PrettyDate.tomorrowMidnight().toString());
  print(DateTime.now().hour);
}
