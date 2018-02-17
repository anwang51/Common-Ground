import os
from cluster import cluster
from cluster import average_relation
from utils import vectorize_text

articles = []
for file in os.listdir("articles/"):
    if file.endswith(".txt"):
        articles.append(open(os.path.join("articles/", file), "r").read())

vectorized = []
for file in articles:
	vectorized.append(vectorize_text(file))

groups = cluster(vectorized)
num_groups = max(groups) + 1
groupings_articles = [[] for _ in range(num_groups)]
groupings_vectorized = [[] for _ in range(num_groups)]
for i in range(len(groups)):
	group_num = groups[i]
	article = articles[i]
	vector = vectorized[i]
	groupings_articles[group_num].append(article)
	groupings_vectorized[group_num].append(vector)

correlations = []
for group in groupings_vectorized:
	correlations.append(average_relation(group))
print(correlations)