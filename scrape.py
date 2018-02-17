import urllib2 as urllib
from bs4 import BeautifulSoup

def tag_visible(element):
    return element.name == 'p'

def get_text(url):
  page = urllib.urlopen(url)

  soup = BeautifulSoup(page, 'html.parser')

  texts = soup.findAll('p')
  texts = map(lambda(tag): tag.string, texts)
  texts = [elem for elem in texts if elem is not None]
  text = u" ".join(texts)
  return text


if __name__ == "__main__":
	url = 'https://www.reuters.com/article/us-usa-trump-russia-indictment/u-s-charges-russians-with-2016-u-s-election-tampering-to-boost-trump-idUSKCN1G022U'
	# url.replace('%', '%%')
	print(get_text(url))
