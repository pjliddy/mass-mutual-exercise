'use strict';

// global array to store story data objects from JSON
let storyData = [];

// document ready
$(function(){
  getData('exercise-sample-data.json');
  handleEvents();
});

// event handlers
function handleEvents() {
  $(document).on('click', '.title a', showArticle);
};

// override default link behavior and show article at event.target.href
function showArticle(event) {
  event.preventDefault();
  console.log(event.target.href);
};

// make jQuery AJAX call to get json data file
function getData (url) {
  $.ajax({
    dataType: "json",
    url: url
  })
  // handle successful promise result
  .done(function(data) {
    // save data is global array of stories
    storyData = data.response.docs
    renderHome();
  })
  // handle unsuccessful promise result
  .fail(function(err) {
    console.log(err);
  });
};

function renderHome () {
  // render primary featured article
  if (storyData.length > 0) {
    renderPrimaryFeature(storyData[0]);
  }
  // render secondary featured articles
  if (storyData.length > 2) {
    renderSecondaryFeatures(storyData.slice(1,3));
  }
  // render list of remaining articles
  if (storyData.length > 3) {
    renderArticleList(storyData.slice(3));
  }
};

// render primary feature on home page
function renderPrimaryFeature(articleData) {
  $('.feature-primary').append('<div class="hero"></div>');

  $('.feature-primary .hero').append(
    '<img class="thumbnail" src="' +
    getThumbnail(articleData) +
    '"/>'
  );

  $('.feature-primary .hero').append(
    '<h2 class="title"><a href="' +
    articleData.web_url +
    '" target="_blank">' +
    articleData.headline.main +
    '</a></h2>'
  );

  $('.feature-primary .hero').append(
    '<p class="byline"><span class="author">' +
    articleData.byline.original.toLowerCase() +
    '</span> <span class="timestamp">' +
    formatTimestamp(articleData.pub_date) +
    '</span></p>'
  );

  $('.feature-primary .hero').append('<div class="clearfix"></div>');

  $('.feature-primary').append(
    '<p class="lead-para">' +
    articleData.lead_paragraph +
    '</p>'
  );
};

// render series of secondary features on home page
function renderSecondaryFeatures(articles) {
  articles.forEach((article, i) => renderSecondaryFeature(article, i));
};

// render secondary feature
function renderSecondaryFeature(articleData, i) {
  // create secondary feature div
  $('.features-secondary').append('<div class="feature-secondary"></div>');

  // define current secondary feature div in features-secondary
  const articleDiv = $('.features-secondary .feature-secondary').get(i);

  // add HTML elements for feature
  $(articleDiv).append(
    '<h2 class="title"><a href="' +
    articleData.web_url +
    '" target="_blank">' +
    articleData.headline.main +
    '</a></h2>'
  );

  $(articleDiv).append(
    '<p class="byline"><span class="author">' +
    articleData.byline.original.toLowerCase() +
    '</span><br /><span class="timestamp">' +
    formatTimestamp(articleData.pub_date) +
    '</span></p>'
  );
};

// generate list of non-featured articles
function renderArticleList(articles) {
  articles.forEach((article, i) => renderArticle(article, i));
};

// create article component for each articles
function renderArticle(articleData, i) {
  // create article div
  $('.article-list').append('<div class="article"></div>');

  // define current article div in article-list
  const articleDiv = $('.article-list .article').get(i);

  // add HTML elements for article
  $(articleDiv).append(
    '<img class="thumbnail" src="' +
    getThumbnail(articleData) +
    '"/>'
  );

  $(articleDiv).append('<div class="wrapper"></div>');

  $(articleDiv).find('.wrapper').append(
    '<h2 class="title"><a href="' +
    articleData.web_url +
    '" target="_blank">' +
    articleData.headline.main +
    '</a></h2>'
  );

  $(articleDiv).find('.wrapper').append(
    '<p class="lead-para">' +
    articleData.lead_paragraph +
    '</p>'
  );

  if (articleData.byline.original) {
    $(articleDiv).find('.wrapper').append(
      '<p class="byline"><span class="author">' +
      articleData.byline.original.toLowerCase() +
      '</span> <span class="timestamp">' +
      formatTimestamp(articleData.pub_date) +
      '</span></p>'
    );
  } else {
    $(articleDiv).find('.wrapper').append(
      '<p class="byline"><span class="author">By ' +
      articleData.source.toLowerCase() +
      '</span> <span class="timestamp">' +
      formatTimestamp(articleData.pub_date) +
      '</span></p>'
    );
  }

}

// return url to thumbnail if there is one or else return default placeholder
function getThumbnail (articleData) {
  if (articleData.multimedia.length > 0) {
    const thumbnailObj = articleData.multimedia.filter(obj => {
      return obj.subtype === "xlarge";
    });
    return `http://www.nytimes.com/${thumbnailObj[0].url}`;
  } else {
    return 'img/placeholder.png';
  }
};

// return formatted UTC datestamp
function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  };

  return date.toLocaleDateString("en-us", options);
};