import urllib2 as urllib
from bs4 import BeautifulSoup
import random

def tag_visible(element):
    return element.name == 'p'

def get_reuters_article_text(url):
  page = urllib.urlopen(url)

  soup = BeautifulSoup(page, 'html.parser')

  texts = soup.findAll('p')
  texts = map( lambda tag: tag.string, texts)
  texts = [elem for elem in texts if elem is not None]
  text = u" ".join(texts)
  return text


if __name__ == "__main__":
  news_outlet = "https://www.reuters.com/article/"
  article = 'us-usa-trump-russia-indictment/u-s-charges-russians-with-2016-u-s-election-tampering-to-boost-trump-idUSKCN1G022U'
  url = news_outlet + article

  text = get_reuters_article_text(url)
  words = text.split(" ")
  f = open("articles/reuters-" + str(round(random.random(), 5)) + ".txt", "w")
  for word in words:
    try:
      f.write(word + " ")
    except UnicodeEncodeError:
      print("Warning: bad charcter, recovering")
  f.flush()