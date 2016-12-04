# Basic Twitter Data Visualization and Sentiment Analysis

This is the final project for ITP 404 class.

###About
  -       Given a keyword, get and parse related tweets. (extract useful info, clean stopwords).
  - Output a wordcloud and a sentiment analysis visualization based on it.
<br>

![enter image description here](http://i.imgur.com/IMnG5XP.png)

![enter image description here](http://i.imgur.com/3nVjPwh.png)
###About
  -      [/api/twitter/:key](http://45.55.213.242:3000/api/twitter/trump) - return list of related tweets and sentiment score for a given keyword.
  - [/api/twitter-user/:key](http://45.55.213.242:3000/api/twitter-user/trump) - Return list of users that have post tweets about given keyword.
  -    [/api/twitter-loc/:key](http://45.55.213.242:3000/api/twitter-loc/trump) - return list of places that tweet about given keyword is located. (could be very few.)
<br>



### Libraries

* [sentiment] - AFINN-based sentiment analysis for Node.js.
* [wordCloud2]  - JS based library to generate WordCloud from list of words and frequency.
* [Highcharts] -  Create interactive charts easily for web projects.
* [Twitter] -   A Twitter API Wrapper for Node.js.

### Misc.

* **List of Stop words** - Parse and clean the selected words.(get rid of likes of 'the', 'of', 'I' and etc.).
* **Google Material Design**  - Loosely based on Google's material design principle.
* **Spiner** -  Customized css, triggers animation when making the Ajax call.



License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [sentiment]: <https://github.com/thisandagain/sentiment>
   [Twitter]: <https://www.npmjs.com/package/twitter>
[Highcharts]: <http://www.highcharts.com/>
[wordCloud2]: <https://github.com/timdream/wordcloud2.js/>
