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


def find_reuters_articles(homepage='https://www.reuters.com/'):
    page = urllib.urlopen(homepage)

    soup = BeautifulSoup(page, 'html.parser')

    divs = soup.findAll('div', attrs={'class': 'story-content'})
    links = []
    for div in divs:
        first_a = div.find('a')
        if first_a:
            a_tags = [first_a] + first_a.find_next_siblings('a')
            for a in a_tags:
                links += ['https://www.reuters.com' + a['href']]
    return links

def write_article(url):
    # url = 'https://www.reuters.com/article/us-usa-trump-russia-indictment/u-s-charges-russians-with-2016-u-s-election-tampering-to-boost-trump-idUSKCN1G022U'
    text = get_reuters_article_text(url)
    words = text.split(" ")
    f = open("articles/reuters-" + str(round(random.random(), 5)) + ".txt", "w")
    for word in words:
      try:
          f.write(word + " ")
      except UnicodeEncodeError:
          pass
          # print("Warning: bad charcter, recovering")
    f.flush()

if __name__ == '__main__':
    articles = find_reuters_articles()
    map(write_article, articles)