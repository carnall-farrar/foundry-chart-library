import Colors from "./colors";

export const RatingResult = {
  none: "none",
  good: "good",
  improving: "improving",
  bad: "bad",
  noPlan: "noPlan",
};

export const RatingCellBgColorMap = {
  [RatingResult.none]: Colors.gray_dark,
  [RatingResult.good]: Colors.green_dark,
  [RatingResult.improving]: Colors.amber_dark,
  [RatingResult.bad]: Colors.red_dark,
  [RatingResult.noPlan]: Colors.blue,
};

export const RatingCellColorMap = {
  [RatingResult.none]: Colors.black,
  [RatingResult.good]: Colors.white,
  [RatingResult.improving]: Colors.black,
  [RatingResult.bad]: Colors.black,
  [RatingResult.noPlan]: Colors.blue,
};

export const getRatingResult = (
  rating,
  previousMonthRating,
  isAboveAmbition,
  isAboveGood,
  plan
) => {
  if (!rating) {
    return RatingResult.none;
  }
  if (plan === "") {
    return RatingResult.noPlan;
  }
  if (isAboveGood) {
    if (isAboveAmbition) {
      return RatingResult.good;
    } else {
      return previousMonthRating && rating > previousMonthRating
        ? RatingResult.improving
        : RatingResult.bad;
    }
  }
  // below good
  if (isAboveAmbition) {
    return previousMonthRating && rating < previousMonthRating
      ? RatingResult.improving
      : RatingResult.bad;
  } else {
    return RatingResult.good;
  }
};
