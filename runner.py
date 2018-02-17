import os
from articles import Article
from cluster import cluster
from cluster import average_relation
from cluster import group_sentences
from cluster import common_keywords
from utils import vectorize_text
from utils import split_sentences

CUTOFF = 0.73

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
	correlations.append(average_relation(group))

i = len(correlations) - 1
while i >= 0:
	corr = correlations[i]
	if corr < CUTOFF:
		correlations.pop(i)
		groupings.pop(i)
	i -= 1

i = len(groupings) - 1
while i >= 0:
	group = groupings[i]
	if len(group) <= 1:
		correlations.pop(i)
		groupings.pop(i)
	i -= 1


gr1 = groupings[0]
scoring1 = group_sentences(gr1)[0:10]
scoring1 = sorted(scoring1, key=lambda x: x[1])
gr2 = groupings[1]
scoring2 = group_sentences(gr2)[0:10]
scoring2 = sorted(scoring2, key=lambda x: x[1])
gr3 = groupings[2]
scoring3 = group_sentences(gr3)[0:10]
scoring3 = sorted(scoring3, key=lambda x: x[1])
gr4 = groupings[3]
scoring4 = group_sentences(gr4)[0:10]
scoring4 = sorted(scoring4, key=lambda x: x[1])