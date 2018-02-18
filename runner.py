import os
from articles import Article
from cluster import cluster
from cluster import average_relation
from cluster import group_sentences
from cluster import common_keywords
from utils import vectorize_text
from utils import split_sentences
from utils import self_correlate
from utils import bow_caps
from utils import average_sentiment
from utils import words_sentiment
from utils import create_title

CUTOFF = 0.5

articles = []
for file in os.listdir("articles/"):
    if file.endswith(".txt"):
    	text = open(os.path.join("articles/", file), "r").read()
    	source = file[:file.index("-")]
        articles.append(Article(text, source))
groups = cluster(articles)
num_groups = max(groups) + 1
groupings = [[] for _ in range(num_groups)]
for i in range(len(groups)):
	group_num = groups[i]
	article = articles[i]
	groupings[group_num].append(article)

correlations = []
for group in groupings:
	correlations.append((average_relation(group), len(group)))

i = len(groupings) - 1
while i >= 0:
	group = groupings[i]
	if len(group) <= 1:
		correlations.pop(i)
		groupings.pop(i)
	i -= 1

processed_articles = []
sources = []
text = []
for gr in groupings:
	scoring, src = group_sentences(gr)
	sources.append(list(src))
	common = common_keywords(gr)
	processed_articles.append((common, scoring))

for article in processed_articles:
	text_list = article[1]
	temp = ""
	for sentence in text_list:
		sentence = sentence[0]
		if len(sentence) != 0:
			if sentence[0] == ".":
				sentence = sentence[2:]
			temp += sentence + " "
	text.append(temp)

i = len(correlations) - 1
while i >= 0:
	corr = self_correlate(text[i])
	if corr < CUTOFF:
		correlations.pop(i)
		groupings.pop(i)
		text.pop(i)
	i -= 1

i = 0
while i < len(text):
	article = text[i]
	fw = open("output_articles/" + str(correlations[i][0]) + ".txt", "w")
	fw.write(article)
	fw.flush()
	i += 1