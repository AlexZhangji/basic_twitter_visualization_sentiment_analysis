/*
    return text with:
      only characters
      lowercase
      get rid of stopwords.
*/


function cleanTextArr(line) {
    var res = line.toLowerCase().replace(/\W/g, ' ').trim().split(' ');
    // console.log(res);
    return res;
}

// get word counter, result like [['word1': 3], ['word2': 2] ].
function getWordCounter(inList) {
    // var wordList = [];
    var wordCounter = {};

    for (var i = 0; i < inList.length; i++) {
        var cleanSentense = cleanTextArr(inList[i]);

        for (var j = 0; j < cleanSentense.length; j++) {
            var curWord = cleanSentense[j];
            if (curWord in wordCounter) {
                wordCounter[curWord] += 1;
            } else {
                wordCounter[curWord] = 1;
            }
        }
    }

    // console.log(dictObjArr(wordCounter));
    return dictObjArr(wordCounter)
    // return wordCounter;
}

function dictObjArr(dict){
  var objArr = [];

  for( var key in dict){
    var curItem = [];

    curItem.push(key);
    curItem.push(dict[key]);
    objArr.push(curItem);
  }

  return objArr;
}
