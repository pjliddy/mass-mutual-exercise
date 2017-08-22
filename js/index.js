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
    handleData(data.response.docs);
  })
  .fail(function(err) {
    console.log(err);
  });
};

function handleData (data) {
  storyData = data;
  console.log(storyData);
}
