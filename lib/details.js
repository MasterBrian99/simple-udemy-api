const cheerio = require("cheerio");
const axios = require("axios");
module.exports = {
  getDetails: async (courseName) => {
    let details = null;

    await axios
      .get("https://www.udemy.com/course/" + courseName)
      .then((response) => {
        // do stuff
        // console.log(response.status);
        details = response.data;
      })
      .catch((err) => {
        // what now?
        // console.log(err.response.data);
        details = err.data;
      });
    // const data = await response.data;
    const data = await setDetails(details);
    return data;
  },
};

const setText = async (text) => {
  const res = await text.replace(/\n/g, "").trim();
  return res;
};
const setDetails = async (data) => {
  let result = {
    title: null,
    description: null,
    you_will_learn: [],
    language: null,
    last_updated: null,
    created_by: [],
    requirements: [],
  };

  let $ = cheerio.load(data);

  const h1Title = await setText($("h1").text());
  console.log(h1Title);

  //   result.title = await setText($("h1").text());
  //   result.description = await setText(
  //     $("meta[property='og:description']").attr("content")
  //   );
  //   $(".what-you-will-learn--objective-item--ECarc").each(function () {
  //     let learnItem = $(this).text();
  //     result.you_will_learn.push(learnItem);
  //   });
  //   result.language = await setText($(".clp-lead__locale").text());
  //   result.last_updated = await setText($(".last-update-date").text());

  //   $(".udlite-instructor-links").each(async function () {
  //     let created_by = $(this).find("span");
  //     let name = await setText(created_by.text());
  //     result.created_by.push(name);
  //   });

  //   const requirementItemSet = $(
  //     ".ud-component--course-landing-page-udlite--requirements"
  //   ).attr("data-component-props");
  //   const requirement = await setText(requirementItemSet);

  //   const requirementItem = requirement
  //     .substring(requirement.indexOf("[") + 1)
  //     .split("]")[0]
  //     .split(',"');
  //   requirementItem.forEach((el) => {
  //     result.requirements.push(el.replace(/\\/g, "").replace(/"/g, ""));
  //   });

  //   $(".safely-set-inner-html:description:description").each(async function () {
  //     let created_by = $(this).find("p");
  //     let name = await setText(created_by.text());
  //     console.log(name);
  //   });

  return result;
};

// Oops!
