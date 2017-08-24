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
  $(document).on('click', '.img-link', showArticle);
  $(document).on('click', '.nav-icon', toggleNav);
  $(document).on('click', '.breadcrumbs a', renderHome);
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



// Toggle responsive nav
function toggleNav () {
  console.log('toggle nav');
  if ($('nav ul').hasClass('responsive')) {
    $('nav ul').removeClass('responsive');
  } else {
    $('nav ul').addClass('responsive');
  };
}

// Generate Home Page view
function renderHome () {
  $('.content').html('<h1>Top Stories</h1>');
  $('.content').append('<div class="feature-primary"></div>');
  $('.content').append('<div class="features-secondary"></div>');
  $('.content').append('<div class="clearfix"></div>');
  $('.content').append('<div class="article-list"></div>');

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
  // add div for "hero" area
  $('.feature-primary').append('<div class="hero"></div>');

  // add clickable thumbnail image
  $('.feature-primary .hero').append(
    '<a data-id="0" class="img-link" href="' + articleData.web_url + '">' +
    '<img class="thumbnail" src="' + getThumbnail(articleData) + '"/>' +
    '</a>'
  );

  // add clickable headline
  $('.feature-primary .hero').append(
    '<h2 class="title"><a data-id="0" href="' +
    articleData.web_url + '">' +
    articleData.headline.main +
    '</a></h2>'
  );

  // add byline
  $('.feature-primary .hero').append(
    '<p class="byline"><span class="author">' +
    articleData.byline.original.toLowerCase() +
    '</span> <span class="timestamp">' +
    formatTimestamp(articleData.pub_date) +
    '</span></p>'
  );

  // add lead paragraph
  $('.feature-primary').append(
    '<p class="lead-para">' +
    articleData.lead_paragraph +
    '</p>'
  );
};

// render series of secondary features on home page
function renderSecondaryFeatures(articles) {
  articles.forEach((article, i) => renderSecondaryFeature(article, i));
  $('.features-secondary').append('<div class="clearfix"></div>');
};

// render secondary feature component
function renderSecondaryFeature(articleData, i) {
  // create secondary feature div
  $('.features-secondary').append('<div class="feature-secondary"></div>');

  // define current secondary feature div in features-secondary
  const articleDiv = $('.features-secondary .feature-secondary').get(i);

  // add HTML elements for feature
  $(articleDiv).append(
    '<h2 class="title"><a data-id="' + (i + 1) + '" href="' + articleData.web_url + '">' + articleData.headline.main + '</a></h2>'
  );

  $(articleDiv).append(
    '<p class="byline"><span class="author">' +
    articleData.byline.original.toLowerCase() +
    '</span> <span class="timestamp">' +
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
    '<a data-id="' + (i + 2) + '" class="img-link" href="' + articleData.web_url + '">' +
    '<img class="thumbnail" src="' + getThumbnail(articleData) + '"/>' +
    '</a>'
  );

  $(articleDiv).append(
    '<h2 class="title"><a data-id="' + (i + 2) + '" href="' + articleData.web_url + '">' +
    articleData.headline.main +
    '</a></h2>'
  );

  $(articleDiv).append(
    '<p class="lead-para">' + articleData.lead_paragraph + '</p>'
  );

  // add byline if there is one. if no byline, use source
  if (articleData.byline.original) {
    $(articleDiv).append(
      '<span class="byline"><span class="author">' +
      articleData.byline.original.toLowerCase() +
      '</span> <span class="timestamp">' +
      formatTimestamp(articleData.pub_date) +
      '</span></span>'
    );
  } else {
    $(articleDiv).append(
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

// return formatted UTC timestamp
function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  };

  return date.toLocaleTimeString("en-us", options);
};

// override default link behavior and show article at event.target.href
function showArticle(event) {
  const i = $(event.currentTarget).data('id');
  const articleData = storyData[i];

  event.preventDefault();

  $('.content').html(
    '<div class="breadcrumbs"><span><a href="#">Home</a><span class="chevron"><span> > </span></span><span class="title">'+ articleData.headline.main + '</span></div>'
  );

  $('.content').append('<h1>' + articleData.headline.main + '</h1>');

  $('.content').append(
    '<p class="article-byline"><span class="author">' +
    articleData.byline.original.toLowerCase() +
    '</span> <span class="timestamp">' +
    formatTimestamp(articleData.pub_date) +
    '</span></p>'
  );

  $('.content').append('<iframe id="iframe" height="100%" src="' + articleData.web_url + '"></iframe>');
};
