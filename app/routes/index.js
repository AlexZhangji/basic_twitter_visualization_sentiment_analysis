import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    // add spiner when loading ajax
    Ember.$('#spiner-overlay').hide();

    Ember.$(document).ajaxStart(function() {
      $('#spiner-overlay').show(); // show loading indicator
    });

    Ember.$(document).ajaxStop(function() {
      $('#spiner-overlay').hide(); // hide loading indicator
    });

    //  enable enter key to search
    Ember.$("#input-search").keypress(function(e) {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        createWC();
        return false;
      } else {
        return true;
      }
    });


    function createWC(){
      e.preventDefault();
      // var searchTerm = $('#input-search').val();
      var searchTerm = this.get('input-search');

      Ember.$.ajax({
        url: "http://localhost:3000/api/twitter/" + searchTerm,
      }).then(function(rawWordList) {

        // add search term to stopwords
        var addStopWords = searchTerm.split(' ').join(',');
        stopWords += addStopWords;

        var counterList = getWordCounter(rawWordList.cleanTweetsArr);
        var sentiList = parsePieData(rawWordList.sentiArr);

        pieChartInit(sentiList, searchTerm);


        WordCloud(document.getElementById('my_canvas'), {
          list: counterList
            // minSize: 9
            // fontFamily:'Lato'
        });
      });
    }

  }
});
