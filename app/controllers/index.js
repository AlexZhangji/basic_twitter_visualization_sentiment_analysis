import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {
    createWC: function(e) {
      e.preventDefault();
      var searchTerm = Ember.$('#input-search').val();
      // var searchTerm = this.get('input-search');
      console.log('searchTerm' + searchTerm);
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
