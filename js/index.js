'use strict';

let storyData = [];

// JavaScript Functions
$(function(){
  getData('exercise-sample-data.json');
});

function getData (url) {
  $.ajax({
    dataType: "json",
    url: url
  })
  .done(function(data) {
    // save data is global array of stories
    storyData = data.response.docs
    renderHome();
  })
  .fail(function(err) {
    console.log(err);
  });
};

function renderHome () {
  // console.log(storyData);

  // render primary article
  renderPrimaryFeature(storyData[0]);

  // render two secondary articles
  renderSecondaryFeatures(storyData.slice(1,2));


  // render list of remaining articles
  renderArticleList(storyData.slice(3));
};

// render primary feature on home page
function renderPrimaryFeature(articleData) {
  $('.feature-primary').append('<div class="hero"></div>');
  $('.feature-primary .hero').append('<h2 class="article-title"><a href="' + articleData.web_url + '" target="_blank">' + articleData.headline.main + '</a></h2>');
  $('.feature-primary .hero').append('<p class="byline"><span class="author">' + articleData.byline.original + '</span><span class="timestamp">' + formatTimestamp(articleData.pub_date) + '</span></p>');
  $('.feature-primary .hero').append('<img class="thumbnail" src="' + getThumbnail(articleData) + '"/>');
  $('.feature-primary').append('<p class="lead-para">' + articleData.lead_paragraph + '</p>');
};

// render series of secondary features on home page
function renderSecondaryFeatures(articles) {
  articles.forEach((article, i) => renderSecondaryFeature(article, i));
};

// render secondary feature
function renderSecondaryFeature(articleData, i) {
  $('.features-secondary').append('<div class="feature-secondary"></div>');
  const featureDiv = $('.features-secondary .feature-secondary').get(i);

  $(featureDiv).append('<h2 class="article-title"><a href="' + articleData.web_url + '" target="_blank">' + articleData.headline.main + '</a></h2>');
  $(featureDiv).append('<p class="byline"><span class="author">' + articleData.byline.original + '</span><span class="timestamp">' + formatTimestamp(articleData.pub_date) + '</span></p>');
};

// generate list of non-featured articles
function renderArticleList(articles) {
  articles.forEach((article, i) => renderArticle(article, i));
};

// create article component for each articles
function renderArticle(articleData, i) {
  // create article div
  $('.article-list').append('<div class="article"></div>');

  const articleDiv = $('.article-list .article').get(i);

  $(articleDiv).append('<img class="thumbnail" src="' + getThumbnail(articleData) + '"/>');
  $(articleDiv).append('<h2 class="article-title"><a href="' + articleData.web_url + '" target="_blank">' + articleData.headline.main + '</a></h2>');
  $(articleDiv).append('<p class="lead-para">' + articleData.lead_paragraph + '</p>');
  $(articleDiv).append('<p class="byline"><span class="author">' + articleData.byline.original + '</span><span class="timestamp">' + formatTimestamp(articleData.pub_date) + '</span></p>');
}

// return url to thumbnail if there is one or else return default placeholder
function getThumbnail (articleData) {
  if (articleData.multimedia.length > 0) {
    const thumbnailObj = articleData.multimedia.filter(obj => {
      return obj.subtype === "wide";
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
    year: "numeric", month: "long",
    day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short"
  };

  return date.toLocaleDateString("en-us", options);
};
