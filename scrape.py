import urllib2 as urllib
from bs4 import BeautifulSoup

def tag_visible(element):
    return element.name == 'p'

def get_text(url):
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
	# url.replace('%', '%%')
  text = get_text(url)
  words = text.split(" ")
  f = open("indictment.txt", "w")
  for word in words:
    try:
      f.write(word + " ")
    except UnicodeEncodeError:
      print("failed encoding")
  f.flush()