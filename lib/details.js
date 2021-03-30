const cheerio = require("cheerio");
const axios = require("axios");
module.exports = {
  getDetails: async (courseName) => {
    console.log(courseName);
    let details = null;
    await axios
      .get("https://www.udemy.com/course/" + courseName)
      .then((response) => {
        details = response.data;
      })
      .catch((err) => {
        details = err.data;
      });
    const data = await setDetails(details);
    return data;
  },
};
const setText = async (text) => {
  const res = await text.replace(/\n/g, "").trim();
  return res;
};
const setDetails = async (data) => {
  let details = null;
  if (data === undefined || data === null) {
    details = getError();
  } else {
    details = getData(data);
  }
  return details;
};

function getError() {
  return {
    title: "Course Not Found !",
  };
}
async function getData(data) {
  let result = {
    title: null,
    img: null,
    description: null,
    you_will_learn: [],
    language: null,
    last_updated: null,
    created_by: [],
    requirements: [],
  };
  let $ = cheerio.load(data);
  result.img = $(".intro-asset--img-aspect--1UbeZ > img").attr("src");
  // const imgs = $(".intro-asset--img-aspect--1UbeZ > img").attr("src");
  // console.log(imgs);
  result.title = await setText($("h1").text());
  result.description = await setText(
    $("meta[property='og:description']").attr("content")
  );
  $(".what-you-will-learn--objective-item--ECarc").each(function () {
    let learnItem = $(this).text();
    result.you_will_learn.push(learnItem);
  });
  result.language = await setText($(".clp-lead__locale").text());
  result.last_updated = await setText($(".last-update-date").text());

  $(".udlite-instructor-links").each(async function () {
    let created_by = $(this).find("span");
    let name = await setText(created_by.text());
    result.created_by.push(name);
  });

  const requirementItemSet = $(
    ".ud-component--course-landing-page-udlite--requirements"
  ).attr("data-component-props");
  const requirement = await setText(requirementItemSet);

  const requirementItem = requirement
    .substring(requirement.indexOf("[") + 1)
    .split("]")[0]
    .split(',"');
  requirementItem.forEach((el) => {
    result.requirements.push(el.replace(/\\/g, "").replace(/"/g, ""));
  });
  return result;
}
// course - unit - container - Studentsareviewing;
