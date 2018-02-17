import urllib2 as urllib
from bs4 import BeautifulSoup
import random
import itertools
import re

def tag_visible(element):
    return element.name == 'p'

def get_reuters_article_text(url):
    page = urllib.urlopen(url)

    soup = BeautifulSoup(page, 'html.parser')

    texts = soup.findAll('p')
    texts = map( lambda tag: tag.string, texts)
    texts = [elem for elem in texts if elem is not None]
    text = u". ".join(texts)
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
                links += [homepage + a['href']]
    
    return links


def get_washpo_article_text(url):
    # print url
    page = urllib.urlopen(url)

    soup = BeautifulSoup(page, 'html.parser')

    texts = soup.findAll('p')
    texts = map( lambda tag: tag.string, texts)
    texts = [elem for elem in texts if elem is not None]
    text = u". ".join(texts)
    return text

def find_washpo_articles(homepage='https://www.washingtonpost.com'):
    page = urllib.urlopen(homepage)

    soup = BeautifulSoup(page, 'html.parser')

    divs = soup.findAll('div', attrs={'class': 'headline'})
    links = []
    for div in divs:
        first_a = div.find('a')
        if first_a:
            a_tags = [first_a] + first_a.find_next_siblings('a')
            for a in a_tags:
                try:
                    link = a['href']
                    if 'graphics' not in link and 'in-sight' not in link and 'photos' not in link:   
                        # print link   
                        if homepage in link:
                            links += [link]
                        else:
                            links += [homepage + a['href']]
                except(KeyError):
                    pass

    return links


def get_fox_article_text(url):
    try:
        page = urllib.urlopen(url)
    except urllib.HTTPError, e:
        print e.fp.read()

    soup = BeautifulSoup(page, 'html.parser')

    texts = soup.findAll('p')
    texts = map( lambda tag: tag.string, texts)
    texts = [re.sub(r"\s+", ' ', elem) for elem in texts if elem is not None]
    text = u". ".join(texts)
    text = text.replace('This material may not be published, broadcast, rewritten, or redistributed. ', '').strip()
    text = text.replace('FOX News Network, LLC. All rights reserved. All market data delayed 20 minutes. ', '').strip()
    text = text.replace('Continue Reading Below. ', '').strip()
    text = text.replace('ADVERTISEMENT', '')
    return text.strip()

def find_fox_articles(homepage='https://www.foxnews.com'):
    try:
        page = urllib.urlopen(homepage)
    except urllib.HTTPError, e:
        print e.fp.read()

    soup = BeautifulSoup(page, 'html.parser')

    divs = soup.findAll('h2', attrs={'class': 'title'})
    links = []
    for div in divs:
        first_a = div.find('a')
        if first_a:
            a_tags = [first_a] + first_a.find_next_siblings('a')
            for a in a_tags:
                try:
                    link = a['href']
                    if 'video' not in link:
                        if link[0] == "/":
                            i = 0
                            while link[i] == "/":
                                i += 1
                            link = link[i:].strip()
                            link = "http://"+link
                        links.append(link)
                except(KeyError):
                    pass

    return links

def write_article_fox(text, source):
    # url = 'https://www.reuters.com/article/us-usa-trump-russia-indictment/u-s-charges-russians-with-2016-u-s-election-tampering-to-boost-trump-idUSKCN1G022U'
    text = text.strip()
    words = text.split(" ")
    #TO DO CHANGE THIS TAG
    f = open("articles/" + source + '-' +text[25:min(40, len(text))] + ".txt", "w")

    for word in words:
      try:
          f.write(word + " ")
      except UnicodeEncodeError:
          pass
          # print("Warning: bad charcter, recovering")
    f.flush()



def write_article(text, source):
    # url = 'https://www.reuters.com/article/us-usa-trump-russia-indictment/u-s-charges-russians-with-2016-u-s-election-tampering-to-boost-trump-idUSKCN1G022U'
    words = text.split(" ")
    #TO DO CHANGE THIS TAG
    f = open("articles/" + source + '-' +text[25:min(40, len(text))] + ".txt", "w")

    for word in words:
      try:
          f.write(word + " ")
      except UnicodeEncodeError:
          pass
          # print("Warning: bad charcter, recovering")
    f.flush()


if __name__ == '__main__':
    """washpo_links = find_washpo_articles()
    washpo_texts = map(get_washpo_article_text, washpo_links)
    map(write_article, washpo_texts, itertools.repeat(('washpo'), len(washpo_texts)))


    reuters_links = find_reuters_articles()
    reuters_texts = map(get_reuters_article_text, reuters_links)
    map(write_article, reuters_texts, itertools.repeat(('reuters'), len(reuters_texts)))"""

    fox_links = find_fox_articles()
    fox_texts = map(get_fox_article_text, fox_links)
    map(write_article_fox, fox_texts, itertools.repeat(('fox'), len(fox_texts)))


















