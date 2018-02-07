import commonColors from "../../constants/colors";

//------------------ACTIVITY DATA--------------------

export const activityPointsData = [
  {
    seriesName: "Running",
    data: [
      { x: "2017-01-01", y: 300 },
      { x: "2017-02-01", y: 2000 },
      { x: "2017-03-01", y: 1700 },
      { x: "2017-04-01", y: 2500 },
      { x: "2017-06-01", y: 3500 },
      { x: "2017-07-01", y: 1500 }
    ],
    color: commonColors.GREEN
  },
  {
    seriesName: "Hiking",
    data: [
      { x: "2017-01-01", y: 200 },
      { x: "2017-02-01", y: 4000 },
      { x: "2017-03-01", y: 1400 },
      { x: "2018-05-01", y: 2000 },
      { x: "2018-06-01", y: 400 },
      { x: "2018-07-01", y: 1000 }
    ],
    color: commonColors.PINK
  }
];

//------------------DONATIONS DATA--------------------

export const donationsData = [
  {
    seriesName: "donations",
    data: [
      { x: "Cancer", y: 1000 },
      { x: "Forest", y: 2500 },
      { x: "Owls", y: 4000 },
      { x: "Education", y: 1500 }
    ],
    color: commonColors.GREEN
  }
];

//------------------LEADERS DATA--------------------

export const leadersData = [
  {
    seriesName: "Snow-Shoeing",
    data: [
      { x: "2017-01-01", y: 300 },
      { x: "2017-02-01", y: 800 },
      { x: "2017-03-01", y: 1700 },
      { x: "2017-04-01", y: 2500 },
      { x: "2017-06-01", y: 3500 },
      { x: "2017-07-01", y: 7500 }
    ],
    color: commonColors.GREEN
  },
  {
    seriesName: "Hiking",
    data: [
      { x: "2017-01-01", y: 900 },
      { x: "2017-02-01", y: 4000 },
      { x: "2017-03-01", y: 6000 },
      { x: "2018-05-01", y: 7000 },
      { x: "2018-06-01", y: 8000 },
      { x: "2018-07-01", y: 9000 }
    ],
    color: commonColors.PINK
  },
  {
    seriesName: "Hiking",
    data: [
      { x: "2017-01-01", y: 1000 },
      { x: "2017-02-01", y: 2000 },
      { x: "2017-03-01", y: 4000 },
      { x: "2018-05-01", y: 4300 },
      { x: "2018-06-01", y: 4400 },
      { x: "2018-07-01", y: 5000 }
    ],
    color: commonColors.LIGHT_GREY
  }
];
